<template>
    <div class="new-body">
        <div style="padding-top: 111px;">
            <p style="position: absolute;top: 65px;left: 19px;"> <a class="homeback" @click="goHome">首页</a> > <a class="homeback" @click="goNewList">相关资讯</a> > {{ newTitle }}</p>
            <h1>{{ newTitle }}</h1>
            <h3>{{ subTitle }}</h3>
            <div style="height: 1.1px;background: rgb(196, 196, 196);width: 100%;margin-bottom: 4px;">

            </div>
            <div style="text-align: right;color: #c8c8c8;font-size: 14px;">
                <span>{{ newAuthor }} 发布于 {{ publicTime }}</span>
                <!-- <span>{{ publicTime }}</span> -->
            </div>
        </div>
        <!-- <el-divider></el-divider> -->
        <div v-html="html" style="padding-top: 7px;">

        </div>

        <div class="footer">
            阅读 {{ viewCount + 7 }}
        </div>
    </div>
</template>

<script>
import newApi from '@/api/newApi'

export default {
    data() {
        return {
            newTitle: null,
            subTitle: null,
            newId: null,
            dynamicTags: null,
            newStatus: null,
            html: null,
            newAuthor: null,
            publicTime: null,
            viewCount: null
        }
    },
    methods: {
        goHome() {
            this.$router.push('/home')
        },
        goNewList() {
            this.$router.push('/homeNews')
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
                        this.newAuthor = res.data.data.newAuthor
                        this.publicTime = res.data.data.updateTime
                        this.viewCount = res.data.data.viewCount
                        console.log(res.data.data)
                    }
                }).finally(() => {
                    this.loading = false
                })
            }
        },
        viewNew() {
            const dataForm = {
                id: this.newId,
                viewCount: this.viewCount + 1
            }
            newApi.viewNew(dataForm).then(res => {

            })
        }
    },
    created() {
        this.getNewByKey()
    },
    mounted() {
        // 10s后 观看数加一
        setTimeout(() => {
            this.viewNew()
        }, 10000)
    },
}
</script>

<style scoped>
    .new-body {
        /* margin-top: 70px; */
        padding: 0 19vw;
        /* color: rgb(196, 196, 196); */
    }
    .footer {
        width: 100%;
        height: 50px;
        margin-bottom: 20px;
        text-align: left;
        color: rgb(146, 146, 146);
    }
    .homeback:hover {
        color: #32b753;
        border-bottom: 1px solid #32b753;
        cursor: pointer;
    }
</style>