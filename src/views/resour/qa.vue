<template>
    <div class="body">
        <h1 style="text-align: center;">问答专区</h1>
        <div style="min-height: 70vh;">
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
            </div>
        </div>

        <el-pagination background layout="prev, pager, next" :total="total" style="margin-bottom: 34px;"></el-pagination>


        <div class="zhuanjia" @click="showQa">
            <img src="../../assets/icon/QandA1.png" style="width: 2.8rem;height: 2.8rem;" alt="">
            <p style="margin: 0;font-weight: 500;color: #ffffff;font-size: 1.2rem;">我要提问</p>
        </div>

        <el-dialog title="提示"  :visible.sync="dialogVisible" width="70%" :close-on-click-modal="false" >
            <el-form label-width="100px" size="small">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="标题" style="">
                            <el-input v-model="qaObj.questionTitle"  maxlength="100"  show-word-limit style="width: 97%" placeholder="请输入描述信息" />
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="24">
                        <el-form-item label="补充" style="">
                            <el-input v-model="qaObj.questionDesc"  type="textarea" :autosize="{ minRows: 3, maxRows: 8 }" maxlength="1000"  show-word-limit style="width: 97%" placeholder="请输入描述信息" />
                        </el-form-item>
                    </el-col>
                </el-row>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="success" @click="addQa()">提 问</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import caneQaApi from '@/api/caneQa';

export default {
    data() {
        return {
            dialogVisible: false,
            qaObj: {
                questionTitle: '',
                questionDesc: ''
            },
            keyword: '',
            total: 0, // 数据库中的总记录数
            page: 1, // 默认页码
            limit: 5, // 每页记录数
            dataList: []
        }
    },
    mounted() {
        this.fetchData()
    },
    methods: {
        showQa() {
            this.qaObj = {}
            this.dialogVisible = true
        },
        addQa() {
            caneQaApi.addCaneQa(this.qaObj).then(res => {
                if(res.code === 200) {
                    this.$message({
                        type: 'success',
                        message: '提问成功'
                    })
                    this.dialogVisible = false
                    this.fetchData()
                }
            })
        },
        fetchData(page = 1) {
            this.page = page
            var searchObj = {
                isAnswered: ''
            }
            caneQaApi.getPageList(this.page, this.limit, searchObj).then(res => {
                if(res.code === 200) {
                    this.dataList = res.data.data.records
                    this.total = res.data.data.total
                }
            })
        }
    }
}
</script>

<style scoped>
.body {
    padding-top: 5rem;
    margin-left: 5vw;
    margin-right: 5vw;
    background: white;
    min-height: 87vh;
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
    font-size: 1.4rem;
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
    font-size: 1rem;
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
    font-size: 1.1rem;
    margin: 0;
    color: #25602c;
    padding: .41rem;
    border-color: #25602c;
    border-width: 1px;
    border-style: dashed; /* 将边框样式设为虚线 */
    border-radius: .51rem;
}

.zhuanjia {
    position: fixed;
    right: 1rem;
    top: 50%;
    background: #32b753;
    padding: 1rem;
    border-radius: 1rem;
    cursor: pointer;
}
.zhuanjia:hover {
    background: yellowgreen;
}
</style>