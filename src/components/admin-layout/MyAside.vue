<template>
    <div>
        <div class="aside-body">
            <div class="aside-body-left">
                <div class="left-icon" style="margin-top: 20px;margin-bottom: 40px;">
                    <img src="../../assets/icon/favicon.png" style="width: 4rem;height: 4rem;" alt="">
                </div>

                <div class="left-icon" @click="switchMenus(1)" :style="{ background: menuTitle === '用户管理' ? '#00000037' : '' }">
                   <svg t="1715687659178" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3608" width="28" height="28"><path d="M513.457231 41.353846c-133.377969 2.837662-244.999877 49.189415-332.973292 137.160862C92.512492 266.488123 46.160738 378.110031 43.323077 511.488c2.837662 133.377969 49.189415 244.054646 137.160862 332.026092C268.457354 931.487508 380.079262 977.839262 513.457231 980.676923c133.377969-2.837662 244.054646-49.189415 332.026092-137.160862S979.808492 644.867938 982.646154 511.488c-2.837662-133.377969-49.189415-244.054646-137.160862-332.026092C757.511877 90.543262 646.837169 44.191508 513.457231 41.353846L513.457231 41.353846zM811.431385 799.056738c-23.650462-11.352615-49.189415-23.648492-74.730338-26.486154-67.160615-5.675323-108.782277-16.080738-124.863015-32.161477-15.137477-16.082708-21.758031-38.784-18.9184-68.109785 0.945231-17.9712 5.675323-28.376615 16.080738-33.108677 10.405415-4.728123 21.756062-31.216246 33.108677-78.513231 3.784862-14.188308 7.567754-25.540923 12.297846-34.053908 4.728123-8.512985 12.295877-26.486154 21.756062-55.809969 4.730092-20.810831 4.730092-33.108677-0.945231-35.944369-5.675323-2.837662-9.460185-3.784862-10.403446-2.837662L669.538462 411.218708c2.837662-13.243077 4.728123-29.323815 6.620554-47.296985 5.677292-47.296985-3.782892-87.973415-28.378585-122.027323-24.593723-34.999138-69.998277-52.972308-137.160862-54.864738-59.594831 0.945231-90.811077 24.595692-125.810215 53.919508-38.784 30.271015-52.027077 70.945477-41.621662 122.972554 7.567754 38.784 18.9184 70.945477 11.350646 68.107815-0.945231-0.945231-4.728123 0-9.458215 2.837662-4.730092 2.837662-5.675323 15.135508-1.892431 35.944369 10.405415 25.540923 17.973169 43.514092 23.648492 52.974277 5.675323 9.458215 9.458215 21.756062 12.297846 36.8896 9.460185 46.351754 18.9184 71.892677 29.323815 76.6208 10.405415 4.730092 17.025969 17.027938 20.810831 34.999138 4.730092 29.325785-0.945231 52.027077-17.973169 68.109785-17.025969 16.080738-57.7024 26.486154-122.027323 32.161477-23.648492 2.837662-52.027077 14.188308-74.728369 25.540923-72.837908-75.675569-115.4048-175.946831-116.352-286.621538 2.837662-117.297231 43.514092-214.728862 122.027323-293.244062s175.946831-119.187692 293.244062-122.027323c117.295262 2.837662 214.728862 43.514092 292.296862 122.027323 78.513231 78.513231 119.189662 175.946831 122.027323 293.244062C926.834215 624.055138 884.267323 724.324431 811.431385 799.056738z" p-id="3609" fill="#FFFFFF"></path></svg>
                    <h5 style="margin: 0;color: #FFFFFF;">用户管理</h5>
                </div>

                <div class="left-icon" @click="switchMenus(2)" :style="{ background: menuTitle === '信息发布' ? '#00000037' : '' }">
                    <svg t="1715687751353" class="icon" viewBox="0 0 1075 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5563" width="28" height="28"><path d="M865.54819066 779.654095L469.33333366 654.848 865.54819066 187.14819 347.42857166 654.921143 42.66666666 530.115048 1017.90476166 0l-152.356571 779.654095zM469.33333366 966.729143V748.495238l121.904762 62.342095-121.904762 155.89181z" fill="#FFFFFF" p-id="5564"></path></svg>
                    <h5 style="margin: 0;color: #FFFFFF;">信息发布</h5>
                </div>

                <div class="left-icon" @click="switchMenus(3)" :style="{ background: menuTitle === '交流互动' ? '#00000037' : '' }">
                    <svg t="1715687844224" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6573" width="28" height="28"><path d="M903.210471 595.766822 847.290881 595.766822l0 113.00575L735.469096 595.766822 399.979182 595.766822c-30.882358 0-55.908334-25.292036-55.908334-56.505945L344.070848 143.744845c0-31.208792 25.027-56.502875 55.908334-56.502875l503.231289 0c30.882358 0 55.913451 25.294083 55.913451 56.502875l0 395.515009C959.122899 570.474786 934.091806 595.766822 903.210471 595.766822L903.210471 595.766822 903.210471 595.766822zM483.850381 313.251424c-15.432481 0-27.957749 12.647041-27.957749 28.254507 0 15.60235 12.514012 28.248368 27.957749 28.248368 15.440667 0 27.955702-12.652158 27.955702-28.248368C511.80506 325.898465 499.291049 313.251424 483.850381 313.251424L483.850381 313.251424 483.850381 313.251424zM651.593803 313.251424c-15.440667 0-27.955702 12.647041-27.955702 28.254507 0 15.60235 12.515035 28.248368 27.955702 28.248368 15.441691 0 27.956725-12.652158 27.956725-28.248368C679.550529 325.898465 667.035494 313.251424 651.593803 313.251424L651.593803 313.251424 651.593803 313.251424zM819.335179 313.251424c-15.436574 0-27.956725 12.647041-27.956725 28.254507 0 15.60235 12.515035 28.248368 27.956725 28.248368 15.440667 0 27.955702-12.652158 27.955702-28.248368C847.290881 325.898465 834.775846 313.251424 819.335179 313.251424L819.335179 313.251424 819.335179 313.251424zM679.550529 652.272767l0 113.006773c0 31.203676-25.036209 56.498782-55.913451 56.498782L288.152281 821.778322 176.330496 934.784072 176.330496 821.778322l-55.919591 0c-30.881334 0-55.913451-25.295106-55.913451-56.498782L64.497455 369.754299c0-31.209816 25.032116-56.497759 55.913451-56.497759l167.740352 0 0 282.510282c0 31.208792 25.031093 56.506968 55.918567 56.506968L679.550529 652.27379 679.550529 652.272767zM679.550529 652.272767" fill="#FFFFFF" p-id="6574"></path></svg>
                    <h5 style="margin: 0;color: #FFFFFF;">交流互动</h5>
                </div>

                <div class="left-icon" @click="switchMenus(4)" :style="{ background: menuTitle === '资源共享' ? '#00000037' : '' }">
                    <svg t="1715687949328" class="icon" viewBox="0 0 1090 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7734" width="28" height="28"><path d="M1026.60096 46.08h-849.92a10.24 10.24 0 0 0-10.24 10.24v348.16h102.4V250.88h665.6v256h102.4V56.32a10.24 10.24 0 0 0-10.24-10.24z m-92.16 153.6h-665.6V97.28h665.6v102.4z m119.10656 508.29312c13.25568-13.14304-157.80864 181.4272-157.80864 181.4272h-321.81248c-76.9024 0-221.00992-98.17088-380.16 21.4528C181.84704 897.69472 20.48 729.00096 20.48 729.00096s293.54496-178.3296 309.43744-187.5456c119.36256-57.8304 206.88896 33.32096 238.70976 33.32096h250.18368c39.78752 0 84.8896 77.98272 0 104.27904h-207.72352s3.08224 42.496 44.18048 42.496h201.59488s83.95776-83.26144 97.21856-97.7152c33.15712-43.37152 60.14464-3.49184 60.14464-3.49184s99.00544-5.70368 39.3216 87.6288z" p-id="7735" fill="#FFFFFF"></path></svg>
                    <h5 style="margin: 0;color: #FFFFFF;">基地数据</h5>
                </div>

                <!-- <div class="left-icon" @click="switchMenus(5)" :style="{ background: menuTitle === '数据统计' ? '#00000037' : '' }">
                    <svg t="1715688648939" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="48578" width="28" height="28"><path d="M319.6 499.2 192 499.2l0 256.3 127.6 0L319.6 499.2zM511.5 242.9 383.9 242.9l0 511.5 127.6 0L511.5 242.9zM1023.1 818.8 64.3 818.8 64.3 115.3 0 115.3l0 767.8 1023.1 0L1023.1 818.8zM703.5 371.6 575.9 371.6l0 383.9 127.6 0L703.5 371.6zM895.4 179.6 767.8 179.6l0 575.9 127.6 0L895.4 179.6z" fill="#FFFFFF" p-id="48579"></path></svg>
                    <h5 style="margin: 0;color: #FFFFFF;">数据统计</h5>
                </div> -->

                <!-- <div class="left-icon" @click="switchMenus(6)" :style="{ background: menuTitle === '系统管理' ? '#00000037' : '' }">
                    <svg t="1715688696109" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="49610" width="28" height="28"><path d="M933.79 610.25c-53.726-93.054-21.416-212.304 72.152-266.488l-100.626-174.292c-28.75 16.854-62.176 26.518-97.846 26.518-107.536 0-194.708-87.746-194.708-195.99H411.504c0.266 33.41-8.074 67.282-25.958 98.252-53.724 93.056-173.156 124.702-266.862 70.758L18.06 343.3c28.97 16.472 54.05 40.588 71.886 71.478 53.638 92.908 21.512 211.92-71.708 266.224l100.626 174.292c28.65-16.696 61.916-26.254 97.4-26.254 107.196 0 194.144 87.192 194.7 194.958h201.254c-0.086-33.074 8.272-66.57 25.966-97.218 53.636-92.906 172.776-124.594 266.414-71.012l100.626-174.29c-28.78-16.466-53.692-40.498-71.434-71.228zM512 719.332c-114.508 0-207.336-92.824-207.336-207.334 0-114.508 92.826-207.334 207.336-207.334s207.332 92.826 207.332 207.334c-0.002 114.51-92.824 207.334-207.332 207.334z" p-id="49611" fill="#FFFFFF"></path></svg>
                    <h5 style="margin: 0;color: #FFFFFF;">系统管理</h5>
                </div> -->

                <div class="left-icon" @click="logout()">
                    <svg t="1715741375700" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="55944" width="28" height="28"><path d="M512.1 956.08c-238.49 0-432.52-191.76-432.52-427.45 0-104.39 38.48-204.88 108.31-283 19.41-21.68 41.23-41.59 64.87-59.13A431.644 431.644 0 0 1 296 158.26c19.83-11.3 44.97-4.42 56.2 15.33 11.28 19.75 4.42 44.93-15.33 56.2a356.82 356.82 0 0 0-35.06 22.89c-19.13 14.2-36.79 30.29-52.48 47.87-56.36 63-87.37 144.01-87.37 228.09 0 190.27 157.07 345.07 350.14 345.07S862.24 718.9 862.24 528.63c0-84.07-31.02-165.05-87.35-228.09a350.05 350.05 0 0 0-52.54-47.87c-11.14-8.29-22.95-15.97-35.04-22.89-19.75-11.3-26.59-36.45-15.31-56.2 11.3-19.75 36.43-26.67 56.22-15.33a443.807 443.807 0 0 1 43.18 28.2c23.57 17.5 45.42 37.41 64.91 59.17 69.85 78.16 108.31 178.65 108.31 283 0 235.7-194.03 427.46-432.52 427.46z" fill="#FFFFFF" p-id="55945"></path><path d="M512.1 564.75c-22.75 0-41.19-18.42-41.19-41.19V111.63c0-22.77 18.44-41.19 41.19-41.19s41.19 18.42 41.19 41.19v411.93c0 22.77-18.44 41.19-41.19 41.19z" fill="#FFFFFF" p-id="55946"></path></svg>
                    <h5 style="margin: 0;color: #FFFFFF;">退出登录</h5>
                </div>
            </div>
            <div class="aside-body-right">
                <h4 style="margin-left: 15px;">{{ menuTitle }}</h4>
                <div @click="clickMenus(item)" v-for="(item,index) in menus" :key="index" :style="{ background: menuSelected === item.id ? '#32b7533a' : '', color: menuSelected === item.id ? '#000' : '' }" class="menu-item">
                    <i :class="item.icon"></i> <span>{{ item.name }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            menus: [],
            menuTitle: '系统管理',
            menuSelected: '12',
            menusOne: [
                {
                    id: "1",
                    icon: 'el-icon-s-fold',
                    name: '用户列表',
                    router: '/admin/user'
                },
                {
                    id: "13",
                    icon: 'el-icon-user',
                    name: '个人中心',
                    router: '/admin/center'
                },
            ],
            menusTwo: [
                {
                    id: "2",
                    icon: 'el-icon-s-grid',
                    name: '发布新闻',
                    router: '/admin/new'
                },
            ],
            menusThree: [
                {
                    id: "5",
                    icon: 'el-icon-s-comment',
                    name: '消息中心',
                    router: '/admin/contact'
                }
            ],
            menusFour: [
                {
                    id: "6",
                    icon: 'el-icon-share',
                    name: '资源列表',
                    router: '/admin/resourList'
                }
            ],
            menusFive: [
                {
                    id: "7",
                    icon: 'el-icon-user',
                    name: '用户统计',
                    router: ''
                },
                {
                    id: "8",
                    icon: 'el-icon-s-data',
                    name: '活动统计',
                    router: ''
                },
                {
                    id: "9",
                    icon: 'el-icon-menu',
                    name: '资源使用情况',
                    router: ''
                },
            ],
            menusSix: [
                {
                    id: "10",
                    icon: 'el-icon-s-grid',
                    name: '内容管理',
                    router: ''
                },
                {
                    id: "11",
                    icon: 'el-icon-menu',
                    name: '界面管理',
                    router: ''
                },
                {
                    id: "12",
                    icon: 'el-icon-s-help',
                    name: '仪表盘',
                    router: '/dashboard'
                }
            ]
        }
    },
    created() {
        this.menus = this.menusSix
        this.getCurrentRoute()
    },
    methods: {
        getCurrentRoute() {
            const pathNow = this.$route.path
            this.menusOne.forEach(element => {
                if(element.router === pathNow) {
                    this.menus = this.menusOne
                    this.menuSelected = element.id
                }
            })
            this.menusTwo.forEach(element => {
                if(element.router === pathNow) {
                    this.menus = this.menusTwo
                    this.menuSelected = element.id
                }
            })
            this.menusThree.forEach(element => {
                if(element.router === pathNow) {
                    this.menus = this.menusThree
                    this.menuSelected = element.id
                }
            })
            this.menusFour.forEach(element => {
                if(element.router === pathNow) {
                    this.menus = this.menusFour
                    this.menuSelected = element.id
                }
            })
            this.menusFive.forEach(element => {
                if(element.router === pathNow) {
                    this.menus = this.menusFive
                    this.menuSelected = element.id
                }
            })
            this.menusSix.forEach(element => {
                if(element.router === pathNow) {
                    this.menus = this.menusSix
                    this.menuSelected = element.id
                }
            })
        },
        clickMenus(item) {
            this.menuSelected = item.id
            // 检查当前路由是否与项目的路由匹配
            if (this.$route.path === item.router) {
                // 如果当前路由与项目的路由匹配，则返回
                return
            }

            if(item.router) {
                this.$router.push(item.router)
            }
        },
        logout() {
            this.$store.dispatch('user/logout')
            this.$router.push('/alogin')
        },
        switchMenus(val) {
            switch (val) {
                case 1:
                    this.menuTitle = '用户管理'
                    this.menus = this.menusOne;
                    break;
                case 2:
                    this.menuTitle = '信息发布'
                    this.menus = this.menusTwo;
                    break;
                case 3:
                    this.menuTitle = '交流互动'
                    this.menus = this.menusThree;
                    break;
                case 4:
                    this.menuTitle = '资源共享'
                    this.menus = this.menusFour;
                    break;
                case 5:
                    this.menuTitle = '数据统计'
                    this.menus = this.menusFive;
                    break;
                default:
                    this.menuTitle = '系统管理'
                    this.menus = this.menusSix;
            }
        },
    }
}
</script>

<style scoped>
.aside-header {
    height: 60px;
    width: 287px;
    background: blanchedalmond;
}
.aside-body {
    /* height: calc(100% - 60px); */
    height: 100%;
    width: 287px;
    background: blanchedalmond;
    display: flex;
}
.aside-body-left {
    height: calc(100%);
    width: 87px;
    /* background: #e8e8e8  */
    padding:0 5px;
    background: #32b753;
    overflow: scroll;
    /* padding: 40px 0; */
    /* display: flex;
    flex-wrap: wrap;
    align-items: start; */
}
.aside-body-right {
    height: 100%;
    width: 200px;
    background: #fff;
    text-align: left;
}
.left-icon {
    width: calc(100% - 8px);
    margin: 3.1vh 4px;
    padding: 5px 0;
    cursor: pointer;
}
.left-icon:hover {
    background-color: #00000037;
}
.menu-item {
    padding: 10px;
    margin: 9px;
    cursor: pointer;
    border-radius: 4px;
}
.menu-item:hover {
    background-color: #dedede7a;
}
</style>