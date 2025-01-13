<template>
    <div>
        <div class="info-body">
            <div class="line-one">
                <span style="border-left: 4px #409EFF solid;padding-left: 14px;">个人信息</span>
                <el-divider></el-divider>
                <el-form :model="userInfo" label-width="80px">
                    <el-form-item label="昵称">
                        <el-input v-model="userInfo.nickname"></el-input>
                    </el-form-item>
                    <el-form-item label="修改密码">
                        <el-input v-model="userInfo.newPassword" placeholder="请输入新密码"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="info-footer">
            <el-button @click="updateUser" type="primary">确认</el-button>
        </div>
    </div>
</template>

<script>
import userApi from '@/api/userAndPer/user'

export default {
    data() {
        return {
            userInfo: {
                nickname: '',
                newPassword: ''
            },
            nickname: ''
        }
    },
    mounted() {
        this.getInfo()
    },
    methods: {
        getInfo() {
            this.$store.dispatch('user/getInfo').then(() => {
                this.userInfo.nickname = this.$store.getters.name
            })
        },
        updateUser() {
            userApi.updateUserInCenter(this.userInfo).then(res => {
                console.log(res)
                if(res.code === 200) {
                    this.$message({
                        type: 'success',
                        message: '操作成功'
                    })
                }
            })
        }
    }
}
</script>

<style scoped>
.info-body {
    width: calc(100% - 40px);
    background: rgb(255, 255, 255);
    height: 75vh;
    min-height: 760px;
    border-radius: 8px;
    padding: 20px;
}
.info-footer {
    width: calc(100% - 20px);
    padding: 10px 10px;
    height: 7vh;
    background: rgb(255, 255, 255);
    min-height: 70px;
    margin-top: 10px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: end;
}
.line-one {
    text-align: left;
}
</style>