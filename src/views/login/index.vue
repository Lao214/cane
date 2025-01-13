<template>
    <div class="login-body">
        <!-- <div class="logo">
            <div style="display: flex;justify-content: center;align-items: center;">
                <img src="../../assets/icon/favicon.png" style="width: 64px; height: 64px;">
                <span style="color: black;font-size: 24px;font-weight: 500;">多元融合功能平台</span>
            </div>
        </div>
        <div class="homeBtn" @click="goHome">
            <i class="el-icon-s-home"></i>
        </div> -->
        <div class="login-form">
            <div style="width: 100%;position: relative;">
                <!-- <div class="homeBtn" @click="goHome">
                    <i class="el-icon-s-home"></i>
                </div> -->
                <div style="padding: 40px 30px 20px 30px;">
                    <h2 style="margin-bottom: 30px;">用户登录</h2>
                    <div class="group">
                        <svg t="1715068503855" class="icons" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5869" width="24" height="24"><path d="M506.075809 546.976206c-145.260076 0-263.436846-118.16774-263.436846-263.418785 0-145.260076 118.17677-263.436846 263.436846-263.436846 145.260076 0 263.436846 118.16774 263.436846 263.436846C769.512655 428.799436 651.335885 546.976206 506.075809 546.976206zM506.075809 76.996419c-113.896181 0-206.561002 92.664821-206.561002 206.561002S392.179628 490.100362 506.075809 490.100362c113.905212 0 206.561002-92.646759 206.561002-206.54294S619.981021 76.996419 506.075809 76.996419zM514.754388 621.191146c-250.902125 0-455.024817 174.88103-455.024817 389.840656l28.437922 0c0-199.607302 190.991939-361.411765 426.586895-361.411765s426.586895 161.804462 426.586895 361.411765l20.156698 0 8.281224 0C969.788235 796.072176 765.647482 621.191146 514.754388 621.191146zM514.754388 678.057959c219.547262 0 398.148973 149.360049 398.148973 332.964812l28.437922 0c0-199.607302-190.991939-361.411765-426.586895-361.411765S88.167493 811.4245 88.167493 1011.031802l28.437922 0C116.605415 827.427039 295.207126 678.057959 514.754388 678.057959z"  p-id="5870"></path></svg>
                        <input placeholder="请输入用户名" v-model="loginForm.username"  class="input">
                    </div>
                    <div class="group" style="margin-bottom: 25px;">
                        <svg t="1715069877507" class="icons" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7224" width="24" height="24"><path d="M933.645464 421.646315h-120.470375V120.470376c0-95.834184-34.876174-120.470376-131.55365-120.470376H342.25639C245.518679 0 210.823211 24.636192 210.823211 120.470376v301.175939H90.352835a61.138716 61.138716 0 0 0-60.235188 60.235188v498.747355a43.550041 43.550041 0 0 0 43.971687 43.369335h875.699161a43.550041 43.550041 0 0 0 43.790981-43.369335L993.880652 481.881503a60.235188 60.235188 0 0 0-60.235188-60.235188zM271.058398 120.470376a51.802262 51.802262 0 0 1 60.235188-60.235188h361.411127a51.802262 51.802262 0 0 1 60.235188 60.235188v301.175939H271.058398V120.470376z m662.587066 843.292629H90.352835V481.881503h843.292629v481.881502z m-460.016129-225.761484v71.860579a10.902569 10.902569 0 0 0 10.962804 10.842334h54.693551a10.902569 10.902569 0 0 0 10.962804-10.842334v-71.860579a65.656355 65.656355 0 1 0-76.619159 0z m0 0" p-id="7225"></path></svg>
                        <input placeholder="请输入密码" v-model="loginForm.password" type="password" class="input">
                    </div>
                    <div class="login-btn" @click="handleLogin">
                        登录
                    </div>
                    <div class="login-btn" @click="goALogin">
                        管理员登录
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { removeToken } from '@/utils/auth'
export default {
    data() {
        return {
            loginForm: {
                username: '',
                password: ''
            },
            loading: false
        }
    },
    methods: {
        goALogin() {
            this.$router.push({ path: '/alogin' })
        },
        goHome() {
            this.$router.push({ path: '/home' })
        },
        async handleLogin() { 
            if(!this.loginForm.username) {
                this.$message({
                    message: '请输入用户名',
                    type: 'warning'
                })
                return
            }
            if(!this.loginForm.password) {
                this.$message({
                    message: '请输入密码',
                    type: 'warning'
                })
                return
            }
            removeToken()
            this.loading = true
            try {
                // 等待 login 操作完成
                await this.$store.dispatch('user/login', this.loginForm)
                // 等待 getInfo 操作完成
                await this.$store.dispatch('user/getInfo')
                // 跳转到 /dashboard
                this.$router.push({ path: '/home' })
            } catch (error) {
                // 处理错误
                console.error(error);
            } finally {
                // 确保在操作完成后设置 loading 为 false
                this.loading = false;
            }
        }
    }
}
</script>

<style scoped>
.login-body {
    min-height: 770px;
    /* background: linear-gradient(15deg, #39bda7, #0e79b7 70%); */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    background: white;
}

.login-form {
    min-height: 440px;
    min-width: 490px;
    /* background: white; */
    /* border-radius: 11px; */
    display: flex;
    border: 1px solid rgb(205, 205, 205);
}

.group {
    display: flex;
    line-height: 28px;
    align-items: center;
    position: relative;
    margin-top: 20px;
    margin-bottom: 20px;
    /* max-width: 190px; */
}

.input {
    width: 100%;
    height: 40px;
    line-height: 28px;
    padding: 0 1rem;
    padding-left: 2.5rem;
    border: 2px solid transparent;
    /* border-radius: 8px; */
    outline: none;
    background-color: #f3f3f4;
    color: #0d0c22;
    transition: .3s ease;
}

.input::placeholder {
    color: #9e9ea7;
}

.input:focus, input:hover {
    outline: none;
    border-color: #39bda7;
    background-color: #fff;
    box-shadow: 0 0 0 4px rgba(76, 118, 234, 0.1);
}

.icons {
    position: absolute;
    left: 1rem;
    fill: #9e9ea7;
    width: 1rem;
    height: 1rem;
}


    /* 修改.login-btn的样式以应用动画 */
    .login-btn {
        margin-top: 20px;
        padding: 11px;
        color: white;
        /* 调整渐变以适应动画，增加背景尺寸使动画可见 */
        background:#32b753;
        /* border-radius: 7px; */
        cursor: pointer;
        font-weight: 700;
    }

    /* 保持原有的`:focus`和`:hover`状态效果 */
    .login-btn:hover {
        background: #39bda7;
    }

    .logo {
        position: absolute;
        left: 20px;
        top: 20px;
    }


    .homeBtn{
        position: absolute;
        font-size: 24px;
        color: white;
        background: #32b753;
        /* border:1px solid white ; */
        width: 36px;
        height: 36px;
        display: flex;
        justify-content: center;
        align-items: center;
        /* border-radius: 30%; */
    }

    .homeBtn:hover {
        background: #39bda7;
        cursor: pointer;
    }

</style>