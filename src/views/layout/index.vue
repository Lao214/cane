<template>
    <div id="main">
        <div class="header">
            <MyHeader :avatar="avatar" :nickname="name"></MyHeader>
        </div>
        <div class="main">
            <router-view></router-view>
        </div>
        <div class="footer">
            <MyFooter></MyFooter>
        </div>
    </div>
</template>
 
<script>
import MyHeader from "@/components/layout/MyHeader.vue"
import MyFooter from "@/components/layout/MyFooter.vue"
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
    components: { MyHeader, MyFooter },
    data() {
        return {}
    },
    created() {
        if(getToken()) {
            this.$store.dispatch('user/getInfo')
        }
    },
    methods: { 

    }
}
</script>
 
<style scoped>

.main {
    width: 100%;
    min-height: calc(100vh - 200px);
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