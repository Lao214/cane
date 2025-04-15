<template>
    <div class="body">
        <p style="position: absolute;top: 65px;left: 19px;"> <a class="homeback" @click="goHome">首页</a> > {{ toolTitle
            }}</p>
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

        <div class="toolbody">
            <div class="toolbod-left">
                <div class="base-info">
                    <h2>基本信息</h2>
                    <div style="display: flex;width: 100%;justify-content: space-between;flex-wrap: wrap;">
                        <div class="info-item">
                            <span class="info-label">基地名称</span>
                            <span>{{ caneObj.baseName }}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">品种名</span>
                            <span>{{ caneObj.varietyName }}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">测定日期</span>
                            <span>{{ caneObj.measurementDate }}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">样地</span>
                            <span>{{ caneObj.samplePlot }}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">样方</span>
                            <span>{{ caneObj.sampleFang }}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">土壤含水量% 鲜重 0-10cm</span>
                            <span>{{ caneObj.waterContentXian10cm }}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">土壤含水量% 干重 0-10cm</span>
                            <span>{{ caneObj.waterContentGan10cm }}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">土壤含水量分析基% 0-10cm</span>
                            <span>{{ caneObj.waterContentFen10cm }}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">土壤平均含水量分析基% 0-10cm</span>
                            <span>{{ caneObj.waterContentFenAverage10cm }}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">土壤含水量干基% 0-10cm</span>
                            <span>{{ caneObj.waterContentGanji10cm }}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">土壤平均含水量干基% 0-10cm</span>
                            <span>{{ caneObj.waterContentGanjiAverage10cm }}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">土壤含水量% 鲜重 10-20cm</span>
                            <span>{{ caneObj.waterContentXian20cm }}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">土壤含水量% 干重 10-20cm</span>
                            <span>{{ caneObj.waterContentGan20cm }}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">土壤含水量分析基% 10-20cm</span>
                            <span>{{ caneObj.waterContentFen20cm }}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">土壤平均含水量分析基% 10-20cm</span>
                            <span>{{ caneObj.waterContentFenAverage20cm }}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">土壤含水量干基% 10-20cm</span>
                            <span>{{ caneObj.waterContentGanji20cm }}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">土壤含水量 0-10cm</span>
                            <span>{{ caneObj.waterContent10cm }}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">土壤含水量 10-20cm</span>
                            <span>{{ caneObj.waterContent20cm }}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">平均株高（m）</span>
                            <span>{{ caneObj.averagePlantHeight }}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">平均茎径（mm）</span>
                            <span>{{ caneObj.averageStemDiameter }}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">总茎重（KG）</span>
                            <span>{{ caneObj.totalStemWeight }}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">有效茎数</span>
                            <span>{{ caneObj.numberEffectiveStems }}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">茎鲜重（g/plant）</span>
                            <span>{{ caneObj.stemFreshWeight }}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">平均茎鲜重（g/plant）</span>
                            <span>{{ caneObj.stemFreshWeightAve }}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">绿叶片鲜重(g/plant)</span>
                            <span>{{ caneObj.gPlant }}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">平均绿叶片鲜重（g/plant）</span>
                            <span>{{ caneObj.gPlantAve }}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">绿叶叶鞘鲜重(g/plant)</span>
                            <span>{{ caneObj.gPlantShao }}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">平均绿叶鞘鲜重（g/plant）</span>
                            <span>{{ caneObj.gPlantShaoAve }}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">茎干重（g/plant）</span>
                            <span>{{ caneObj.gPlantGanZhong }}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">平均茎干重（g/plant）</span>
                            <span>{{ caneObj.gPlantGanZhongAve }}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">茎含水量(%)</span>
                            <span>{{ caneObj.jingWaterContent }}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">平均茎含水量（%）</span>
                            <span>{{ caneObj.jingWaterContentAve }}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">绿叶片含水量(%)</span>
                            <span>{{ caneObj.yeWaterContent }}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">绿叶叶鞘含水量(%)</span>
                            <span>{{ caneObj.yeWaterContentAve }}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">平均田间钻汁锤度(゜Bx)</span>
                            <span>{{ caneObj.bx }}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">叶序长（cm）</span>
                            <span>{{ caneObj.yxc }}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">叶序宽（cm）</span>
                            <span>{{ caneObj.yxk }}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">叶面积(cm2/leaf)</span>
                            <span>{{ caneObj.ymj }}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">平均叶面积(cm2/leaf)</span>
                            <span>{{ caneObj.ymjAve }}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">青叶数</span>
                            <span>{{ caneObj.qys }}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">平均青叶数</span>
                            <span>{{ caneObj.qysAve }}</span>
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
import wumingApi from '@/api/wumingApi';

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
    },
    methods: {
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
            wumingApi.getDataById(this.$route.query.caneId).then(res => {
                if (res.code === 200) {
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

.input-container>span,
.input-container .input {
    white-space: nowrap;
    display: block;
}

.input-container>span,
.input-container .input:first-child {
    /* border-radius: 6px 0 0 6px; */
}

.input-container>span,
.input-container .input {
    /* border-radius: 0 6px 6px 0; */
}

.input-container>span,
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

.input-container:focus-within>span {
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
    border: 1px solid #CDD9ED;
    background: #fff;
    transition: border 0.3s ease;
}

.input::placeholder {
    color: #CBD1DC;
}

.input:focus {
    outline: none;
    /* border-color: #148cd1; */
    border-color: #39bda7;
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