<template>
    <div class="mes-body">
        <div class="search-box">
            <el-form label-width="90px" size="small">
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="是否已回答" style="">
                            <el-radio-group v-model="searchObj.isAnswered" style="width: 100%;" @input="changeIsAnswered">
                                <el-radio-button label="">全部</el-radio-button>
                                <el-radio-button label="否">未回答</el-radio-button>
                                <el-radio-button label="是">已回答</el-radio-button>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="资源名称">
                            <el-input v-model="searchObj.keyword" style="width: 95%" placeholder="资源名称" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-button type="primary" icon="el-icon-search" size="mini" @click="fetchData()">搜索</el-button>
                    </el-col>
                </el-row>
            </el-form>
        </div>

        <div style="height: 70vh;background: white;overflow-y: scroll;padding: 2rem;">
            <div v-for="(item,index) in dataList" :key="index" class="ques-card">
                <div class="card-row-1">
                    <span class="card-row-1-title">{{ item.questionTitle }}</span>
                    <div class="card-row-1-tag">
                        <span  :style="{ padding: '.15rem .3rem', color: 'white', borderRadius: '.2rem',  background: item.isAnswered === '是' ? '#25602c' : 'grey'}">{{ item.isAnswered === '是' ? '已回答' : '未回答' }}</span>
                    </div>
                </div>
                <div class="card-row-2">
                    <div class="card-row-2-des" v-html="item.questionDesc"></div>
                </div>
                <div class="card-row-2" style="margin-bottom: 1rem;">
                    <div style="display: flex;align-items: center;"> <img :src="item.askAvatar" style="width: 1.7rem;margin-right: .2rem;border-radius: 50%;" alt=""> {{ item.askNickname }}</div>
                    <span>{{ item.askTime }}</span>
                </div>
                <div v-if="item.isAnswered === '是'" class="card-row-3">
                    <div class="card-row-2-ans">
                        <div style="margin: 0;margin-top: .2rem;  display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis;" v-html="item.questionAnswer"></div>
                        <div style="margin: 0;margin-top: .8rem; text-align: end;">
                            <div style="display: flex;align-items: center;"> <img :src="item.answerAvatar" style="width: 1.7rem;margin-right: .2rem;border-radius: 50%;" alt=""> {{ item.answerNickname }} <span style="margin-left: .4rem;">{{ item.answerTime }}</span> </div>
                        </div>
                    </div>
                </div>
                <div v-if="item.isAnswered === '否'" class="card-row-3">
                    <el-button type="success" icon="el-icon-edit" size="mini" @click="reply(item.id)">写回答</el-button>
                </div>
            </div>
        </div>

        <el-dialog title="回复" :visible.sync="dialogVisible" width="70%" :close-on-click-modal="false">
            <el-form label-width="100px" size="small">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="标题" style="">
                            <el-input v-model="qaObj.questionTitle"  maxlength="100" disabled  show-word-limit style="width: 100%" placeholder="请输入描述信息" />
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="24">
                        <el-form-item label="补充" style="">
                            <el-input v-model="qaObj.questionDesc"  type="textarea" disabled :autosize="{ minRows: 3, maxRows: 8 }" maxlength="1000"  show-word-limit style="width: 100%" placeholder="请输入描述信息" />
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="24">
                        <el-form-item label="回复" style="">
                            <!-- <div v-if="loadings" style="height: 320px;display: flex;align-items: center;justify-content: center;">
                                <svg viewBox="25 25 50 50">
                                    <circle r="20" cy="50" cx="50"></circle>
                                </svg>
                            </div> -->
                            <div style="border: 1px solid #ccc;">
                                <Toolbar
                                    style="border-bottom: 1px solid #ccc"
                                    :editor="editor"
                                    :defaultConfig="toolbarConfig"
                                    :mode="mode"
                                />
                                <Editor
                                    style="height: 320px; overflow-y: hidden;"
                                    v-model="html"
                                    :defaultConfig="editorConfig"
                                    :mode="mode"
                                    @onCreated="onCreated"
                                />
                            </div>
                        </el-form-item>
                    </el-col>
                </el-row>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button @click="confirmReply()" type="success">回 复</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import caneQaApi from '@/api/caneQa'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

export default {
    components: { Editor, Toolbar },
    data() {
        return {
            searchObj: {
                keyword: '',
                isAnswered: ''
            },
            dataList: [],
            total: 0, // 数据库中的总记录数
            page: 1, // 默认页码
            limit: 5, // 每页记录数
            qaObj: {},
            toolbarConfig: { 
                // toolbarKeys: [ /* 显示哪些菜单，如何排序、分组 */ ],
                // excludeKeys: [ /* 隐藏哪些菜单 */ ],
                excludeKeys: [
                    'group-image',
                    'group-video'
                ]
            },
            editorConfig: { 
                placeholder: '请在此处输入新闻内容...',
                // MENU_CONF: {
                //     // 配置图片上传
                //     uploadImage: {
                //         // 自定义上传函数
                //         async customUpload(file, insertFn) {
                //             let formdata = new FormData()
                //             formdata.append("file", file, file.name)
                //             newApi.insertImgToNew(formdata).then(res => {
                //                 if(res.code === 200) {
                //                     insertFn(res.data.url)
                //                 }
                //             })
                //         }
                //     },
                //     insertImage: {
                //         // 用箭头函数才能调用 methods里的方法
                //         onInsertedImage: (imageNode) => {
                //             if (imageNode == null) return;
                //             this.onInsertedImage(imageNode); // 使用 Vue 实例的 `onInsertedImage` 方法
                //             const { src, alt, url, href } = imageNode;
                //             console.log('inserted image', src, alt, url, href);
                //         }
                //     },
                // }
            },
            mode: 'default', // or 'simple'
            editor: null,
            html: null,
            dialogVisible: false,
            loadings: false
        }
    },
    mounted() {
        this.fetchData()
    },
    methods: {
        onCreated(editor) {
            this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
            // let children = editor.children
            this.imageList1 = [];
            // 开始递归查找图片元素
            // this.findImages(children)

            // 打印找到的所有图片元素
            console.log('Image elements:', this.imageList1);
        },
        showQa() {
            // this.qaObj = {}
            this.dialogVisible = true
        },
        fetchData(page = 1) {
            this.page = page
            caneQaApi.getPageList(this.page, this.limit, this.searchObj).then(res => {
                if(res.code === 200) {
                    this.dataList = res.data.data.records
                    this.total = res.data.data.total
                }
            })
        },
        changeIsAnswered(val) {
            this.fetchData()
        },
        reply(id) {
            caneQaApi.getCaneQaById(id).then(res => {
                if(res.code === 200) {
                    this.qaObj = res.data.data
                    this.html = res.data.data.questionAnswer
                }
            })
            // 模拟 ajax 请求，异步渲染编辑器
            this.loadings  = true
            this.dialogVisible = true
        },
        confirmReply() {
            this.qaObj.questionAnswer = this.html
            caneQaApi.updateCaneQa(this.qaObj).then(res => {
                if(res.code === 200) {
                    this.$message({
                        type: 'success',
                        message: '回复成功'
                    })
                    this.dialogVisible = false
                }
            })
        }
    }
}
</script>


<style src="@wangeditor/editor/dist/css/style.css"></style>
<style scoped>
.mes-body {
    width: 95%;
    height: 87vh;
    padding: 20px;
}

.search-box {
    background: white;
    width: calc(100% - 40px);
    min-height: 60;
    margin-bottom: 20px;
    padding: 20px;
}

.ques-card {
    border-bottom: #cecece 1px solid ;
    margin-top: 1rem;
}

.card-row-1 {
    display: flex;
    justify-content: space-between;
    padding-bottom: 1rem;
    align-items: center;
}

.card-row-1-title {
    width: 85%;
    text-align: left;
    font-size: 1.3rem;
}

.card-row-1-tag {
    width: 12%;
    margin-left: 3%;
    text-align: end;
}

.card-row-2 {
    display: flex;
    justify-content: space-between;
    padding-bottom: .71rem;
    align-items: center;
}


.card-row-2-des {
    width: 100%;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;  
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
    font-size: .91rem;
    margin: 0;
}

.card-row-3 {
    display: flex;
    justify-content: space-between;
    padding-bottom: .91rem;
    align-items: center;
}

.card-row-2-ans {
    width: 100%;
    text-align: left;
    font-size: 1rem;
    margin: 0;
    color: #25602c;
    padding: .41rem;
    border-color: #25602c;
    border-width: 1px;
    border-style: dashed; /* 将边框样式设为虚线 */
    border-radius: .51rem;
}

</style>