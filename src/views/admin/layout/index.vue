<template>
    <div id="main">
        <el-container>
            <MyAside :menus="menus"></MyAside>
            <el-container>
                <!-- 头部区域 -->
                <el-header style="margin: 0;">
                    <MyHeader :avatar="avatar" :nickname="name"></MyHeader>
                </el-header>
                <!-- main区域 -->
                <el-main>
                    <router-view />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
 
<script>
import MyHeader from "@/components/admin-layout/MyHeader.vue"
import MyAside from "@/components/admin-layout/MyAside.vue"
import { mapGetters } from 'vuex'
import { getToken } from "@/utils/auth"

export default {
    computed: {
        ...mapGetters([
            'avatar',
            'name',
            'menus'
        ])
    },
    components: { MyHeader, MyAside },
    data() {
        return {}
    },
    created() {
        if(!getToken()) {
            this.$confirm('系统检测不到您的验证令牌，请登录', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // 调用方法删除
                this.$router.push('/alogin')
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                })         
            })
        } else {
            this.$store.dispatch('user/getInfo').then(() => {
                const menus = this.$store.getters.menus
                // console.log('menus',menus)
                if(menus && menus.length > 0) {
                    let  isAdmin = menus.some(element => element === 'MANAGEMENT')
                    // console.log('isAdmin',isAdmin)
                    if(isAdmin === false) {
                        this.$confirm('您没有权限访问管理端系统，请联系管理员', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            // 调用方法删除
                            this.$router.push('/home')
                        }).catch(() => {
                            this.$router.push('/home')
                        })
                    }
                } else {
                    this.$confirm('您没有权限访问管理端系统，请联系管理员', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        // 调用方法删除
                        this.$router.push('/home')
                    }).catch(() => {
                        this.$router.push('/home')
                    })
                }
            })
           
        }
    },
    methods: { 

    }
}
</script>
 
<style scoped>

#main {
    width: 100%;
    height: 100vh;
    margin: 0;
    padding: 0;
}
 
.el-header,
.el-footer {
    /* background-color: #B3C0D1; */
    color: #333;
    text-align: center;
    line-height: 60px;
}
 
.el-aside {
    /* background-color: #D3DCE6; */
    color: #333;
    text-align: center;
    line-height: 200px;
}
 
.el-main {
    background-color: #f3f3f3;
    color: #333;
}
 
body>.el-container {
    margin-bottom: 40px;
}
 
.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
    line-height: 260px;
}
 
.el-container:nth-child(7) .el-aside {
    line-height: 320px;
}
 
::v-deep .el-container {
    height: 100%;
}
</style>