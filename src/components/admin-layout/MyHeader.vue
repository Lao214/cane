<template>
    <div class="header-body">
        <div>
          <span>欢迎登录 <a style="color: #32b753;font-weight: 500;">甘蔗农情专家数据库</a> 管理后台</span>
        </div>
        <label class="dropdown">
            <div class="dd-button">
                <img :src=avatar style="width: 36px;height: 36px;border-radius: 50%;">
                <span style="margin-left: 7px;">{{ nickname ? nickname : '管理' }}</span>
            </div>

            <input type="checkbox" class="dd-input" id="test">

            <ul class="dd-menu">
                <!-- <li><i class="fa fa-vcard"></i> 个人中心</li> -->
                <li class="divider"></li>
                <li @click="logout"><i class="fa fa-sign-out"></i> 退出登录</li>
            </ul>
        </label>
    </div>
</template>

<script>

export default {
    props: ['avatar','nickname'],
    methods: {
        logout() {
            this.$store.dispatch('user/logout')
            this.$router.push('/alogin')
        }
    },
    created() {
  
    }
}
</script>

<style scoped>
.header-body{
    /* height: 200px; */
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* background: #326bb7;
    color: #ffffff; */
}

/* Dropdown */

.dropdown {
  display: inline-block;
  position: relative;
}

.dd-button {
    /* display: inline-block; */
    /* border: 1px solid gray; */
    display: flex;
    align-items: center;
    border-radius: 4px;
    height: 100%;
    padding: 0px 30px 0px 40px;
    /* background-color: #ffffff; */
    cursor: pointer;
    white-space: nowrap;
}

.dd-button:after {
  content: '';
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  width: 0; 
  height: 0; 
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid black;
}

.dd-button:hover {
  background-color: #eeeeee;
}


.dd-input {
  display: none;
}

.dd-menu {
  position: absolute;
  z-index: 100;
  top: 100%;
  min-width: 140px;
  border-radius: 4px;
  padding: 0;
  margin: 2px 0 0 0;
  box-shadow: 0 0 6px 0 rgba(0,0,0,0.1);
  background-color: #ffffff;
  list-style-type: none;
  text-align: left;
  transition: 1.4s;
}

.dd-input + .dd-menu {
  display: none;
} 

.dd-input:checked + .dd-menu {
  display: block;
} 

.dd-menu li {
  padding-left: 15px;
  padding-right: 10px;
  cursor: pointer;
  white-space: nowrap;
}

.dd-menu li:hover {
  background-color: #f6f6f6;
}

.dd-menu li a {
  display: block;
  margin: -10px -20px;
  padding: 10px 20px;
}

.dd-menu li.divider{
  padding: 0;
  border-bottom: 1px solid #cccccc;
}
</style>