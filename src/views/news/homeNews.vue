<template>
    <div style="padding:0 19vw;">
        <div class="newCenter-header">
            <p style="position: absolute;top: 65px;left: 19px;"> <a class="homeback" @click="goHome">首页</a> > <a>相关资讯</a> </p>
            <h2>资讯中心</h2>
            <!-- <p style="text-align: right;color: gray;">
                <i class="el-icon-sort-down"></i>最新发布  
                <i class="el-icon-sort-up"></i>最早发布
            </p> -->
        </div>
        <div class="newCenter-body">
            <div class="aNew" v-for="(item,index) in news" :key="index" @click="viewNews(item)">
                <div style="width: 79%;text-align: left;">
                    <h4 style="margin-bottom: 0;margin-top: 4px;">{{ item.newTitle }}</h4>
                    <h5 style="margin-top: 0;margin-bottom: 7px;font-weight: 300;">{{ item.newSub }}</h5>
                </div>
                <div style="width: 20%;color: grey;text-align: right;">
                    <span>{{ item.updateTime }}</span>
                </div>
            </div>
        </div>

        <!-- 分页组件 -->
        <el-pagination :current-page="page" :total="total" :page-size="limit" style="padding: 30px 0; text-align: center;" layout="total, prev, pager, next, jumper" @current-change="fetchData"/>
    </div>
</template>

<script>
import newApi from '@/api/newApi'

export default {
    data() {
        return {
            news: [],
            searchObj: {},
            total: 0, // 数据库中的总记录数
            page: 1, // 默认页码
            limit: 10, // 每页记录数
        }
    },
    created() {
        this.fetchData()
    },
    methods: {
        goHome() {
            this.$router.push('/home')
        },
        // 列表
        fetchData(page = 1) {
            this.page = page
            newApi.getPageList(this.page, this.limit, this.searchObj).then(response => {
                this.news = response.data.data.records
                this.total = response.data.data.total
            })
        },
        viewNews(item) {
            this.$router.push(
                {
                    path: '/news',
                    query:  { 
                        newKey: item.newKey
                    }
                }
            )
        }
    }
}
</script>

<style scoped>
.newCenter-header {
    padding-top: 97px;
    margin-bottom: 25px;
}
.aNew {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px rgb(182, 182, 182) solid;
    cursor: pointer;
}
.aNew:hover {
    /* color: #326bb7; */
    border-bottom: 1px #32b753 solid;
}
.homeback:hover {
    color: #32b753;
    border-bottom: 1px solid #32b753;
    cursor: pointer;
}
.newCenter-body {
    min-height: 70vh;
}
</style>