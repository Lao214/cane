<template>
    <div class="home-header">
        <div class="logo">
            <img src="https://www.gxu.edu.cn/images/logo2.png" style="width: 10rem; height: 3rem;">
            <!-- <span style="color: #fff;font-size: 24px;font-weight: 500;">多元融合功能平台</span> -->
        </div>
        <div class="nav">
            <span class="link-3" @click="goByHeader('/home')" >首页</span>
            <span class="link-3" @click="goByHeader('/team')" >团队介绍 </span>
            <span class="link-3" @click="goByHeader('/background')" >项目背景</span>
            <span class="link-3" @click="goByHeader('/resours')" >基地数据</span>
            <span class="link-3" @click="contractUs()" >联系我们</span>
        </div>

        <div v-if="!nickname" class="login">
          <button class="button" @click="changeHomeOrLogin"> {{ changeText }}</button>
        </div>
        <div  v-if="nickname" class="login">
            <el-dropdown>
                <div style="display: flex;align-items: center;color: #fff;">
                    <img :src=avatar style="width: 36px;height: 36px;border-radius: 50%;">
                    <span style="margin-left: 7px;">{{ nickname ? nickname : '无' }}</span><i class="el-icon-arrow-down el-icon--right"></i>
                </div>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item><span @click="logout">注销</span></el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>

export default {
  props: ['avatar','nickname'],
  data() {
    return {
      changeText: this.$router.currentRoute.path === '/login' ? '首页' : '登录'
    }
  },
  methods: {
    goResours(type) {
        const currentPath = this.$route.path
        const currentQuery = this.$route.query

        // 检查当前路径是否为 '/resours' 且查询参数 'ftype' 是否为目标值
        if (currentPath === '/resours' && currentQuery.ftype === type) {
            // 当前路由已经是目标路由，无需导航
            return;
        }

        // 否则执行导航操作
        this.$router.push({ 
            path: '/resours', 
            query: { ftype: type } 
        })
    },
    contractUs() {
      if(this.$router.currentRoute.path === '/contactUs') {
        return
      }
      this.$router.push('/contactUs')
    },
    logout() {
      this.$store.dispatch('user/logout')
      this.$router.push('/login')
      this.avatar = null
      this.nickname = null
      this.changeText = '首页'
    },
    goByHeader(route) {
        if(this.$router.currentRoute.path === route) {
            return
        }
        this.$router.push(route)
    },
    changeHomeOrLogin() {
      if(this.$router.currentRoute.path === '/login') {
        this.changeText = '登录'
        this.$router.push({ path: '/home' })
      } else {
        this.$router.push({ path: '/login' })
        this.changeText = '首页'
      }
    }
  }
}
</script>

<style scoped>
/* @import url(https://fonts.googleapis.com/css?family=Raleway);
body {
  margin: 0px;
}
nav {
  padding: 24px;
  text-align: center;
  font-family: Raleway;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
}
#nav-3 {
  background: #5175C0;
}


.link-2 {
  transition: 0.6s;
  color: #ffffff;
  font-size: 20px;
  text-decoration: none;
  border-right: 2px dotted transparent;
  padding: 30px 8px 0 10px;
  margin: 0 10px;
}
.link-2:hover {
  border-right: 2px dotted #ffffff;
  padding-bottom: 24px;
}
.link-3 {
  transition: 0.4s;
  color: #ffffff;
  font-size: 20px;
  text-decoration: none;
  padding: 0 10px;
  margin: 0 10px;
}
.link-3:hover {
  background-color: #ffffff;
  color: #5175C0;
  padding: 24px 10px;
} */

.home-header {
    height: 70px;
    /* background: #725ac1; */
    background: #32b753;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    width: 100%;
    z-index: 5;
}
.logo {
    width: 24%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.nav {
    width: 57%;
}
.login {
    width: 17%;
}
.link-3 { 
    cursor: pointer;
    margin: 0 17px;
    color: #fff;
    /* color: #d4def5; */
    font-size: 20px;
    font-weight: 400;
}

.button {
  display: inline-block;
  padding: 7px 21px;
  border: 1px solid  #fff;
  /* border: 1px solid  #d4def5; */
  /* border-radius: 4px; */
  transition: all 0.2s ease-in;
  position: relative;
  overflow: hidden;
  font-size: 19px;
  cursor: pointer;
  color:  #fff;
  /* color: #d4def5; */
  z-index: 1;
  background: #4f4f4f00;
}

.button:before {
  content: "";
  position: absolute;
  left: 50%;
  transform: translateX(-50%) scaleY(1) scaleX(1.25);
  top: 100%;
  width: 140%;
  height: 180%;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 50%;
  display: block;
  transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
  z-index: -1;
}

.button:after {
  content: "";
  position: absolute;
  left: 55%;
  transform: translateX(-50%) scaleY(1) scaleX(1.45);
  top: 180%;
  width: 160%;
  height: 190%;
  background-color: #39bda7;
  border-radius: 50%;
  display: block;
  transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
  z-index: -1;
}

.button:hover {
  color: #ffffff;
  border: 1px solid #39bda7;
}

.button:hover:before {
  top: -35%;
  background-color: #39bda7;
  transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
}

.button:hover:after {
  top: -45%;
  background-color: #39bda7;
  transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
}

  .homeBtn{
        font-size: 31px;
        color: white;
        /* background: #0e79b7; */
        border:1px solid white ;
        width: 48px;
        height: 48px;
        display: flex;
        justify-content: center;
        align-items: center;
        /* border-radius: 30%; */
    }

    .homeBtn:hover {
        background: #39bda7;
        cursor: pointer;
        border:1px solid #39bda7 ;
    }
</style>