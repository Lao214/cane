<template>
    <div class="body">
        <p style="position: absolute;top: 65px;left: 19px;"> <a class="homeback" @click="goHome">首页</a> > <a class="homeback" @click="goResours">查看更多</a> > {{ toolTitle }}</p>
        <!-- 搜索框 -->
        <div class="input-container">
            <input v-model="keyword" placeholder="用搜索更简单" type="text" class="input">
            <span @click="search">立刻搜索</span>
        </div>

        <div class="toolTitle" style="margin-top: 50px;">
                <h1>{{ toolTitle }}</h1>
        </div>
        <div style="height: 1.1px;background: rgb(196, 196, 196);width: 100%;margin-bottom: 4px;">

        </div>
        <div style="display: flex;justify-content: space-between;">
            <!-- <div class="downFile">
                <i class="el-icon-download"></i>
                文件版
            </div>
            <div style="display: flex;justify-content: end;">
                <span class="centered">
                    <svg t="1720601161545" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="32521" width="16" height="16"><path d="M505.018182 90.763636l167.563636 232.727273 269.963637 109.381818-186.181819 209.454546 9.309091 290.909091-256-104.727273-272.290909 104.727273 18.618182-290.909091-172.218182-214.109091 269.963637-104.727273 151.272727-232.727273m0-69.818181c-23.272727 0-46.545455 11.636364-58.181818 30.254545l-141.963637 214.109091-249.018182 97.745454c-20.945455 6.981818-37.236364 25.6-41.890909 46.545455-4.654545 20.945455 0 44.218182 13.963637 62.836364l155.927272 193.163636-16.290909 262.981818c-2.327273 23.272727 9.309091 46.545455 27.927273 60.509091 11.636364 9.309091 25.6 13.963636 41.890909 13.963636 9.309091 0 16.290909-2.327273 25.6-4.654545l246.690909-95.418182 230.4 95.418182c9.309091 4.654545 18.618182 4.654545 25.6 4.654545 13.963636 0 27.927273-4.654545 39.563637-11.636363 18.618182-13.963636 30.254545-34.909091 30.254545-60.509091l-9.309091-262.981818 167.563637-188.509091c13.963636-16.290909 20.945455-39.563636 16.290909-62.836364-4.654545-20.945455-20.945455-39.563636-41.890909-48.872727l-251.345455-102.4-155.927273-216.436364c-11.636364-16.290909-32.581818-27.927273-55.854545-27.927272z" fill="grey" p-id="32522"></path></svg>
                    <span style="font-size: 16px;margin-left: 4px;"> 收藏 </span>
                </span>
                <span class="centered">
                    <svg t="1720601553509" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="33682" width="16" height="16"><path d="M511.609097 961.619254" fill="grey" p-id="33683"></path><path d="M946.867272 147.167804l-70.839395-70.847581c-16.321734-16.08228-42.418089-16.08228-58.496276 0l-74.117045 74.108858 129.343857 129.343857 74.108858-73.882708C962.953645 189.347462 962.953645 163.245991 946.867272 147.167804L946.867272 147.167804 946.867272 147.167804zM721.512734 172.565241 320.671417 586.225515 287.815101 735.381603l149.146878-32.864502 411.561473-403.171386L721.512734 172.565241 721.512734 172.565241zM809.838386 511.651053l0 349.570607c0 11.887748-9.083889 23.541159-21.437242 23.541159-12.353352 0-626.900913-0.23536-626.900913-0.23536-13.049201 0-22.841218-12.583596-22.841218-23.305799L138.659013 236.654908c0-11.653411 10.952446-23.305799 24.705682-23.305799l348.170724 0 74.574463-74.573439-467.487204 0c-30.299073 0-54.536081 24.004717-54.536081 54.301743l0 711.496613c0 30.05655 24.470321 54.527894 54.536081 54.527894l711.49252 0c30.061666 0 54.296627-24.470321 54.296627-54.527894L884.411825 437.078637 809.838386 511.651053 809.838386 511.651053 809.838386 511.651053zM809.838386 511.651053" fill="grey" p-id="33684"></path></svg>
                    <span style="font-size: 16px;margin-left: 4px;"> 反馈 </span>
                </span>
                <span class="centered">
                    <svg t="1720601631144" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="34924" width="16" height="16"><path d="M850.879104 96.41591l-676.303067 0c-60.681034 0-110.049418 49.367361-110.049418 110.049418l0 446.200388c0 60.681034 49.367361 110.049418 110.049418 110.049418l90.307795 0L396.936381 931.129846c3.793396 4.838192 9.598612 7.66354 15.746636 7.66354s11.952216-2.825348 15.746636-7.66354l132.052548-168.414711 290.396903 0c60.681034 0 110.049418-49.367361 110.049418-110.049418L960.928522 206.465329C960.928522 145.784294 911.561162 96.41591 850.879104 96.41591zM920.91111 652.665717c0 38.614459-31.416524 70.030983-70.030983 70.030983L550.744419 722.6967c-6.147 0-11.952216 2.825348-15.745612 7.66354L412.683017 886.356107l-122.31579-155.995867c-3.792373-4.838192-9.597589-7.66354-15.745612-7.66354l-100.045577 0c-38.614459 0-70.030983-31.416524-70.030983-70.030983L104.545054 206.465329c0-38.614459 31.416524-70.030983 70.030983-70.030983l676.303067 0c38.614459 0 70.030983 31.416524 70.030983 70.030983L920.910087 652.665717zM272.621051 344.526731c-44.132126 0-80.035848 35.903721-80.035848 80.035848 0 44.132126 35.903721 80.036871 80.035848 80.036871s80.035848-35.904745 80.035848-80.036871C352.655875 380.430452 316.752154 344.526731 272.621051 344.526731zM272.621051 464.582037c-22.065552 0-40.017412-17.951861-40.017412-40.018436 0-22.065552 17.952884-40.017412 40.017412-40.017412 22.065552 0 40.017412 17.951861 40.017412 40.017412C312.638463 446.629153 294.686602 464.582037 272.621051 464.582037zM512.727571 344.526731c-44.132126 0-80.035848 35.903721-80.035848 80.035848 0 44.132126 35.903721 80.036871 80.035848 80.036871 44.132126 0 80.035848-35.904745 80.035848-80.036871C592.763418 380.430452 556.859697 344.526731 512.727571 344.526731zM512.727571 464.582037c-22.065552 0-40.017412-17.951861-40.017412-40.018436 0-22.065552 17.951861-40.017412 40.017412-40.017412 22.065552 0 40.017412 17.951861 40.017412 40.017412C552.746006 446.629153 534.793122 464.582037 512.727571 464.582037zM752.836137 344.526731c-44.131103 0-80.035848 35.903721-80.035848 80.035848 0 44.132126 35.904745 80.036871 80.035848 80.036871s80.035848-35.904745 80.035848-80.036871C832.871985 380.430452 796.96724 344.526731 752.836137 344.526731zM752.836137 464.582037c-22.066575 0-40.017412-17.951861-40.017412-40.018436 0-22.065552 17.951861-40.017412 40.017412-40.017412s40.017412 17.951861 40.017412 40.017412C792.853549 446.629153 774.902712 464.582037 752.836137 464.582037z" fill="grey" p-id="34925"></path></svg>
                    <span style="font-size: 16px;margin-left: 4px;"> 评论 </span>
                </span>
            </div> -->
            <!-- <span>{{ publicTime }}</span> -->
        </div>
        <div class="toolbody">
            <div class="toolbod-left">
                <div class="base-info">
                    <h2>基本信息</h2>
                    <div style="display: flex;width: 100%;justify-content: space-between;flex-wrap: wrap;">
                        <div class="info-item">
                            <span class="info-label">甘蔗名称</span> 
                            <span>{{ caneObj.caneName }}</span> 
                        </div>
                        <div class="info-item">
                            <span class="info-label">甘蔗别名</span> 
                            <span>{{ caneObj.caneAlias }}</span> 
                        </div>

                        <div class="info-item">
                            <span class="info-label">属名</span> 
                            <span>{{ caneObj.genericname }}</span> 
                        </div>
                        <div class="info-item">
                            <span class="info-label">分类</span> 
                            <span>{{ caneObj.categoryName }}</span> 
                        </div>

                        <div class="info-item">
                            <span class="info-label">亲本信息父</span> 
                            <span>{{ caneObj.fatherName }}</span> 
                        </div>
                        <div class="info-item">
                            <span class="info-label">亲本信息母</span> 
                            <span>{{ caneObj.motherName }}</span> 
                        </div>

                        <div class="info-item">
                            <span class="info-label">熟期</span> 
                            <span>{{ caneObj.ripePeriod }}</span> 
                        </div>
                        <div class="info-item">
                            <span class="info-label">株高</span> 
                            <span>{{ caneObj.plantHeight }}</span> 
                        </div>

                        <div class="info-item">
                            <span class="info-label">茎径</span> 
                            <span>{{ caneObj.stemDiamet }}</span> 
                        </div>
                        <div class="info-item">
                            <span class="info-label">主要种植地区编码</span> 
                            <span>{{ caneObj.cityCodes }}</span> 
                        </div>

                        <div class="info-item">
                            <span class="info-label">引入时间</span> 
                            <span>{{ caneObj.intorDates }}</span> 
                        </div>
                        <div class="info-item">
                            <span class="info-label">引入单位</span> 
                            <span>{{ caneObj.intorBusiness }}</span> 
                        </div>

                        <div class="info-item">
                            <span class="info-label">编号</span> 
                            <span>{{ caneObj.apprcode }}</span> 
                        </div>
                        <div class="info-item">
                            <span class="info-label">抗黑穗病</span> 
                            <span>{{ caneObj.smutResistance }}</span> 
                        </div>

                        <div class="info-item">
                            <span class="info-label">抗旱属性</span> 
                            <span>{{ caneObj.droughtResistance }}</span> 
                        </div>
                        <div class="info-item">
                            <span class="info-label">抗寒属性</span> 
                            <span>{{ caneObj.coldResistance }}</span> 
                        </div>

                    </div>

                    <div class="info-text">
                        <el-divider content-position="left"><span style="font-size: 1.4rem;">描述信息</span></el-divider>
                        <div class="info-content">
                            {{ caneObj.description }}
                        </div>
                    </div>
                    <div class="info-text">
                        <el-divider content-position="left"><span style="font-size: 1.4rem;">品种特性</span></el-divider>
                        <div class="info-content">
                            {{ caneObj.variFeatures }}
                        </div>
                    </div>
                    <div class="info-text">
                        <el-divider content-position="left"><span style="font-size: 1.4rem;">推荐种植区域和季节</span></el-divider>
                        <div class="info-content">
                            {{ caneObj.recommendedPlanting }}
                        </div>
                    </div>
                    <div class="info-text">
                        <el-divider content-position="left"><span style="font-size: 1.4rem;">专家建议</span></el-divider>
                        <div class="info-content">
                            {{ caneObj.expertAdvice }}
                        </div>
                    </div>

                </div>
            </div>
            <div class="toolbod-right">
                <div class="pic-box">
                    <img v-if="caneObj.imagePath" :src="caneObj.imagePath" alt="">
                    <img v-if="!caneObj.imagePath" src="../../assets/linshi/暂无图片.png" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import caneApi from '@/api/caneApi';

export default {
    data() {
        return {
            keyword: '',
            toolTitle: this.$route.query.tolname,
            caneObj: {}
        }
    },
    mounted() {
        this.getCane()
        this.viewCane()
    },
    methods: {
        viewCane() {
            const cane = {
                id: this.$route.query.caneId
            }
            caneApi.viewCane(cane).then(res => {
                if(res.code === 200) {
                    
                }
            })
        },
        search() {
            this.$router.push({
                path: '/resours',
                query: {
                    skword: this.keyword
                }
            })
        },
        goHome() {
            this.$router.push('/home')
        },
        goResours() {
            this.$router.push('/resours')
        },
        getCane() {
            caneApi.getCaneByIdWithQinBen(this.$route.query.caneId).then(res => {
                if(res.code === 200) {
                    this.caneObj = res.data.data
                }
            })
        }
    }
}
</script>

<style scoped>
.body {
  padding-top: 114px;
  margin: 0 5vw;
  background: white;
}

.toolbody {
    display: flex;
    justify-content: space-between;
    min-height: 640px;
    margin-top: 30px;
    margin-bottom: 30px;
}

.toolbod-left {
    width: 61vw;
    text-align: left;
    /* border:1px solid #cecece; */
    padding: 10px;
}

.toolbod-right {
    width: 24vw;
    /* border:1px solid #cecece; */
    text-align: left;
    padding: 10px;
}

.input-container {
  position: relative;
  display: flex;
  margin: 0 auto;
  width: 100%;
  min-width: 490px;
  width: 47%;
}

.input-container > span,
.input-container .input {
  white-space: nowrap;
  display: block;
}

.input-container > span,
.input-container .input:first-child {
  /* border-radius: 6px 0 0 6px; */
}

.input-container > span,
.input-container .input {
  /* border-radius: 0 6px 6px 0; */
}

.input-container > span,
.input-container .input {
  margin-left: -1px;
}

.input-container .input {
  position: relative;
  z-index: 1;
  flex: 1 1 auto;
  width: 1%;
  margin-top: 0;
  margin-bottom: 0;
}

.input-container span {
  text-align: center;
  padding: 8px 20px;
  font-size: 16px;
  line-height: 25px;
  color: #fff;
  background: #32b753;
  border: 1px solid #CDD9ED;
  font-weight: bold;
  transition: background 0.3s ease, border 0.3s ease, color 0.3s ease;
}

.input-container:focus-within > span {
  color: #fff;
  /* background-color: #148cd1; */
  /* border-color: #148cd1; */
  background-color: #39bda7;
  border-color: #39bda7;
  cursor: pointer;
}

.input {
  display: block;
  width: 100%;
  padding: 8px 16px;
  line-height: 25px;
  font-size: 14px;
  font-weight: 500;
  font-family: inherit;
  /* border-radius: 6px; */
  -webkit-appearance: none;
  color: #99A3BA;
  border: 1px solid  #CDD9ED;
  background: #fff;
  transition: border 0.3s ease;
}

.input::placeholder {
  color: #CBD1DC;
}

.input:focus {
  outline: none;
  /* border-color: #148cd1; */
  border-color:#39bda7 ;
}

.centered {
    display: flex;
    align-items: center;
    margin-left: 14px;
    color: grey;
    cursor: pointer;
}

.downFile {
    font-size: 14px;
    color: white;
    background: #32b753;
    padding: 4px 7px;
    /* border: 1px #cecece solid; */
    cursor: pointer;
}

.downFile:hover {
    background: #39bda7;
}

.info-label {
    width: 28%;
    margin-right: 5%;
    color: #a8a8a8;
    font-weight: 500;
}

.info-item {
    display: flex;
    width: 49%;
    border-bottom: 1px #a8a8a8 dashed;
    margin-bottom: .7rem;
}

.info-text {
    /* margin: 1rem; */
}

.info-content {
    min-height: 2rem;
}
</style>