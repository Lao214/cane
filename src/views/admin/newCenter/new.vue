<template>
    <div>
        <div class="new-operate">
            <el-button type="primary" size="mini" @click="goNewsList()"><i class="el-icon-s-fold"></i> 查看新闻列表</el-button>
            <el-button v-if="!$route.query.newKey" type="primary" size="mini" @click="save()"><i class="el-icon-check"></i> 保存</el-button>
            <el-button v-if="!$route.query.newKey" type="success" size="mini" @click="save('已发布')"><i class="el-icon-plus"></i> 保存并发布</el-button>

            <el-button v-if="$route.query.newKey" type="primary" size="mini" @click="update()"><i class="el-icon-check"></i> 保存修改</el-button>
            <el-button v-if="$route.query.newKey && newStatus === '未发布'" type="success" size="mini" @click="saveUpdate('已发布')"><i class="el-icon-position"></i> 发布</el-button>
            <el-button v-if="$route.query.newKey && newStatus === '已发布'" type="warning" size="mini" @click="saveUpdate('未发布')"><i class="el-icon-position"></i> 停止发布</el-button>
        </div>
        <div class="new-heading">
            <input class="inputs" v-model="newTitle" style="border: none;border-bottom:1px solid grey; width: 410px;" placeholder="请输入新闻标题" type="text" name="" id=""> <br>
            <input class="inputs" v-model="subTitle" style="border: none;border-bottom:1px solid grey; margin-top: 27px;font-size: 18px;width: 610px;" placeholder="请输入副标题(非必填)" type="text" name="" id="">
        </div>
        <div class="new-content">
            <div v-if="loadings" style="height: 320px;display: flex;align-items: center;justify-content: center;">
                <svg viewBox="25 25 50 50">
                    <circle r="20" cy="50" cx="50"></circle>
                </svg>
            </div>
            <div v-if="!loadings" style="border: 1px solid #ccc;">
                <Toolbar
                    style="border-bottom: 1px solid #ccc"
                    :editor="editor"
                    :defaultConfig="toolbarConfig"
                    :mode="mode"
                />
                <Editor
                    style="height: 500px; overflow-y: hidden;"
                    v-model="html"
                    :defaultConfig="editorConfig"
                    :mode="mode"
                    @onCreated="onCreated"
                />
            </div>
        </div>
        <div class="new-tag">
            <h3>新闻类型</h3>
            <el-select v-model="newType" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </div>
        <div class="new-tag">
            <h3>文章标签</h3>
            <el-tag :key="tag"  v-for="tag in dynamicTags" closable  :disable-transitions="false" @close="handleClose(tag)">
                {{tag}}
            </el-tag>
            <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue"  ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm"  @blur="handleInputConfirm"></el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 点击添加标签</el-button>
        </div>
    </div>
</template>

<script>
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import newApi from '@/api/newApi'


export default {
    components: { Editor, Toolbar },
    data() {
        return {
            newStatus: null,
            newId: null,
            newTitle: '',
            subTitle: '',
            editor: null,
            html: null,
            newType: 0,
            addLock: false,
            imageList1: [], // 收集所有上传或者插入的图片
            imageList2: [], // 获取当前编辑器的所有图片
            options: [
                {
                    label: '最新点评',
                    value: 0
                },
                {
                    label: '相关资讯',
                    value: 1
                },
                {
                    label: '系统公告',
                    value: 2
                }
            ],
            toolbarConfig: { 
                // toolbarKeys: [ /* 显示哪些菜单，如何排序、分组 */ ],
                // excludeKeys: [ /* 隐藏哪些菜单 */ ],
                excludeKeys: [

                ]
            },
            editorConfig: { 
                placeholder: '请在此处输入新闻内容...',
                MENU_CONF: {
                    // 配置图片上传
                    uploadImage: {
                        // 自定义上传函数
                        async customUpload(file, insertFn) {
                            let formdata = new FormData()
                            formdata.append("file", file, file.name)
                            newApi.insertImgToNew(formdata).then(res => {
                                if(res.code === 200) {
                                    insertFn(res.data.url)
                                }
                            })
                        }
                    },
                    insertImage: {
                        // 用箭头函数才能调用 methods里的方法
                        onInsertedImage: (imageNode) => {
                            if (imageNode == null) return;
                            this.onInsertedImage(imageNode); // 使用 Vue 实例的 `onInsertedImage` 方法
                            const { src, alt, url, href } = imageNode;
                            console.log('inserted image', src, alt, url, href);
                        }
                    },
                }
            },
            mode: 'default', // or 'simple'
            old: '',
            new: '',
            dynamicTags: [],
            inputVisible: false,
            inputValue: '',
            loadings: false
        }
    },
    methods: {
        onInsertedImage(url) {
            this.imageList1.push(url.src)
            console.log('this.imageList1',url)
        },
        delImg() {
            this.imageList2 = this.editor.getElemsByType('image')
            // console.log('this.imageList2',this.imageList2)
            // 获取 this.imageList1 中存在但 this.imageList2 中不存在的图片
            const imagesToDelete = this.imageList1.filter(image1 => {
                return !this.imageList2.some(image2 => image2.src === image1)
            })

            newApi.removeImgListInNew(imagesToDelete).then(res => {
                if(res.code === 200) {
                    
                }
            })
            console.log('imagesToDelete',imagesToDelete)
        },
        goNewsList() {
            this.$router.push('/admin/newList')
        },
        onCreated(editor) {
            this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
            let children = editor.children
            this.imageList1 = [];
            // 开始递归查找图片元素
            this.findImages(children)

            // 打印找到的所有图片元素
            console.log('Image elements:', this.imageList1);
        },
        findImages(elements) {
            // 用于存储所有找到的图片元素
            elements.forEach(element => {
                // 检查当前元素的类型
                if (element.type === 'image') {
                    this.imageList1.push(element.src);
                }
                // 如果当前元素有子元素，递归遍历
                if (element.children && element.children.length > 0) {
                    this.findImages(element.children);
                }
            })
           
        },
        handleClose(tag) {
            this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
        },
        showInput() {
            this.inputVisible = true
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus()
            })
        },
        handleInputConfirm() {
            let inputValue = this.inputValue
            if (inputValue) {
                this.dynamicTags.push(inputValue)
            }
            this.inputVisible = false
            this.inputValue = ''
        },
        save(status = '未发布') {
            if(this.addLock) {
                return
            }
            if(!this.newTitle) {
                this.$message({
                    type: 'info',
                    message: '标题不可为空'
                })
                return
            }
            const dataForm = {
                newTitle: this.newTitle,
                newSub:  this.subTitle,
                newTags: this.dynamicTags.join(','),
                status: status,
                newContent: this.html,
                newType: this.newType
            }
            this.addLock = true
            newApi.save(dataForm).then(res => {
                if(res.code === 200) {
                    this.$message({
                        type: 'success',
                        message: '操作成功'
                    })
                    this.newId = res.data.one.id
                    this.newStatus = status

                    const newQuery = {
                        ...this.$route.query,
                        newKey: res.data.one.newKey
                    }

                    if (JSON.stringify(newQuery) !== JSON.stringify(this.$route.query)) {
                        this.$router.push({
                            path: this.$route.path,
                            query: newQuery
                        })
                    }

                    this.delImg()
                }
            }).finally(() => {
                this.addLock = false
            })
        },
        update() {
            if(this.addLock) {
                return
            }
            if(!this.newTitle) {
                this.$message({
                    type: 'info',
                    message: '标题不可为空'
                })
                return
            }
            const dataForm = {
                id: this.newId,
                newTitle: this.newTitle,
                newSub:  this.subTitle,
                newTags: this.dynamicTags.join(','),
                newContent: this.html,
                newType: this.newType,
                newKey: this.$route.query.newKey
            }
            this.addLock = true
            newApi.update(dataForm).then(res => {
                if(res.code === 200) {
                    this.$message({
                        type: 'success',
                        message: '操作成功'
                    })

                    this.delImg()
                }
            }).finally(() => {
                this.addLock = false
            })
        },
        saveUpdate(status) {
            const dataForm = {
                id: this.newId,
                status: status,
                newTitle: this.newTitle,
                newSub:  this.subTitle,
                newTags: this.dynamicTags.join(','),
                // newContent: this.html,
                newType: this.newType,
                newKey: this.$route.query.newKey
            }
            newApi.update(dataForm).then(res => {
                if(res.code === 200) {
                    this.$message({
                        type: 'success',
                        message: '操作成功'
                    })
                    this.newStatus = status

                    this.delImg()
                }
            })
        },
        getNewByKey() {
            if(this.$route.query.newKey) {
                newApi.getNewByKey(this.$route.query.newKey).then(res => {
                    if(res.code === 200) {
                        this.newTitle = res.data.data.newTitle
                        this.subTitle = res.data.data.newSub
                        this.newId = res.data.data.id
                        if(res.data.data.newTags) {
                            this.dynamicTags = res.data.data.newTags.split(',')
                        }
                        this.newStatus = res.data.data.status
                        this.html = res.data.data.newContent
                        this.newType = parseInt(res.data.data.newType)
                        this.loadings  = false
                    }
                }).finally(() => {
                    this.loadings = false
                })
            } else {
                this.loadings = false
            }
        },
    },
    mounted() {
        // 模拟 ajax 请求，异步渲染编辑器
        this.loadings  = true
        setTimeout(() => {
            this.getNewByKey()
        }, 1500)
    },
    beforeDestroy() {
        const editor = this.editor
        if (editor == null) return
        editor.destroy() // 组件销毁时，及时销毁编辑器
    }
}
</script>

<style src="@wangeditor/editor/dist/css/style.css"></style>
<style scoped>
.new-heading {
    background: white;
    width: 100%;
    height: 90px;
    padding: 10px 0;
}
.new-content {
    margin-top: 10px;
    background: white;
    min-height: 320px;
}
.new-tag {
    margin-top: 10px;
    background: white;
    min-height: 110px;
    text-align: left;
    padding:10px 20px;
}
.new-operate {
    margin-top: .1rem;
    margin-bottom: 10px;
    min-height: 2.4rem;
    background: white;
    padding: .4rem;
    display: flex;
    justify-content: center;
    align-items: center;
}
.inputs {
    border: none;border-bottom:1px solid grey;
    font-size: 24px;
    text-align: center;
}
.inputs:focus,
.inputs:valid {
  outline: 0;
  border-bottom-color: rgb(54, 54, 54);
}

.el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }

svg {
    width: 3.25em;
    transform-origin: center;
    animation: rotate4 2s linear infinite;
}

circle {
    fill: none;
    stroke: hsl(214, 97%, 59%);
    stroke-width: 2;
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    stroke-linecap: round;
    animation: dash4 1.5s ease-in-out infinite;
}

@keyframes rotate4 {
    100% {
        transform: rotate(360deg);
    }
}

@keyframes dash4 {
    0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
    }

    50% {
        stroke-dasharray: 90, 200;
        stroke-dashoffset: -35px;
    }

    100% {
        stroke-dashoffset: -125px;
    }
}

</style>