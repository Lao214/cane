<template>
    <div class="body">

        <div style="display: flex;gap: 2rem;">
            <!-- 搜索框 -->
            <el-select v-model="searchObj.samplePlot" placeholder="请选择样地" @change="shaixuan">
                <el-option   v-for="item in options" :key="item.value"  :label="item.label"  :value="item.value">
                </el-option>
            </el-select>

            <el-select v-model="searchObj.sampleFang" placeholder="请选择样方" @change="shaixuan">
                <el-option   v-for="item in options2" :key="item.value"  :label="item.label"  :value="item.value">
                </el-option>
            </el-select>
        </div>

        <h1>武鸣基地数据</h1>

        <div class="table-box">
            <el-table :data="cardList" style="width: 100%">
                <el-table-column prop="baseName" label="基地名称" width="180"></el-table-column>
                <el-table-column prop="varietyName" label="品种名" width="180"></el-table-column>
                <el-table-column prop="measurementDate" label="测定日期" width="180"></el-table-column>
                <el-table-column prop="samplePlot" label="样地" width="180"></el-table-column>
                <el-table-column prop="sampleFang" label="样方" width="180"></el-table-column>
                <el-table-column prop="waterContentXian10cm" label="土壤含水量% 鲜重 0-10cm" width="180"></el-table-column>
                <el-table-column prop="waterContentGan10cm" label="土壤含水量% 干重 0-10cm" width="180"></el-table-column>
                <el-table-column prop="waterContentFen10cm" label="土壤含水量分析基% 0-10cm" width="180"></el-table-column>
                <el-table-column prop="waterContentFenAverage10cm" label="土壤平均含水量分析基% 0-10cm" width="180"></el-table-column>
                <el-table-column prop="waterContentGanji10cm" label="土壤含水量干基% 0-10cm" width="180"></el-table-column>
                <el-table-column prop="waterContentGanjiAverage10cm" label="土壤平均含水量干基% 0-10cm" width="180"></el-table-column>
                <el-table-column prop="waterContentXian20cm" label="土壤含水量% 鲜重 10-20cm" width="180"></el-table-column>
                <el-table-column prop="waterContentGan20cm" label="土壤含水量% 干重 10-20cm" width="180"></el-table-column>
                <el-table-column prop="waterContentFen20cm" label="土壤含水量分析基% 10-20cm" width="180"></el-table-column>
                <el-table-column prop="waterContentFenAverage20cm" label="土壤平均含水量分析基% 10-20cm" width="180"></el-table-column>
                <el-table-column prop="waterContentGanji20cm" label="土壤含水量干基% 10-20cm" width="180"></el-table-column>
                <el-table-column prop="waterContent10cm" label="土壤含水量 0-10cm" width="180"></el-table-column>
                <el-table-column prop="waterContent20cm" label="土壤含水量 10-20cm" width="180"></el-table-column>
                <el-table-column prop="gFeso410cm" label="FeSO4取样重量 0-10cm" width="180"></el-table-column>
                <el-table-column prop="mlFeso410cm" label="FeSO4滴定体积 0-10cm" width="180"></el-table-column>
                <el-table-column prop="gkgFeso410cm" label="FeSO4有机质含量 g/kg 0-10cm" width="180"></el-table-column>
                <el-table-column prop="gFeso420cm" label="FeSO4取样重量 10-20cm" width="180"></el-table-column>
                <el-table-column prop="mlFeso420cm" label="FeSO4滴定体积 10-20cm" width="180"></el-table-column>
                <el-table-column prop="gkgFeso420cm" label="FeSO4有机质含量 g/kg 10-20cm" width="180"></el-table-column>
                <el-table-column prop="gK10cm" label="钾取样重量 g 0-10cm" width="180"></el-table-column>
                <el-table-column prop="mglK10cm" label="钾浓度 mg/l 0-10cm" width="180"></el-table-column>
                <el-table-column prop="mgkgK10cm" label="钾含量 mg/kg 0-10cm" width="180"></el-table-column>
                <el-table-column prop="gK20cm" label="钾取样重量 g 10-20cm" width="180"></el-table-column>
                <el-table-column prop="mglK20cm" label="钾浓度 mg/l 10-20cm" width="180"></el-table-column>
                <el-table-column prop="mgkgK20cm" label="钾含量 mg/kg 10-20cm" width="180"></el-table-column>
                <el-table-column prop="gN210cm" label="全氮取样重量 g 0-10cm" width="180"></el-table-column>
                <el-table-column prop="mlv1N210cm" label="全氮滴定体积V1 ml 0-10cm" width="180"></el-table-column>
                <el-table-column prop="mlv2N210cm" label="全氮滴定体积V2 ml 0-10cm" width="180"></el-table-column>
                <el-table-column prop="mlv0N210cm" label="全氮滴定体积V0 ml 0-10cm" width="180"></el-table-column>
                <el-table-column prop="gkgN210cm" label="全氮含量 g/kg 0-10cm" width="180"></el-table-column>
                <el-table-column prop="gN220cm" label="全氮取样重量 g 10-20cm" width="180"></el-table-column>
                <el-table-column prop="mlv1N220cm" label="全氮滴定体积V1 ml 10-20cm" width="180"></el-table-column>
                <el-table-column prop="mlv2N220cm" label="全氮滴定体积V2 ml 10-20cm" width="180"></el-table-column>
                <el-table-column prop="mlv0N220cm" label="全氮滴定体积V0 ml 10-20cm" width="180"></el-table-column>
                <el-table-column prop="gkgN220cm" label="全氮含量 g/kg 10-20cm" width="180"></el-table-column>
                <el-table-column prop="gP10cm" label="磷取样重量 g 0-10cm" width="180"></el-table-column>
                <el-table-column prop="airP10cm" label="磷空白吸光度 0-10cm" width="180"></el-table-column>
                <el-table-column prop="yangP10cm" label="磷样品吸光度 0-10cm" width="180"></el-table-column>
                <el-table-column prop="ugmlP10cm" label="磷浓度 μg/ml 0-10cm" width="180"></el-table-column>
                <el-table-column prop="mgkgP10cm" label="磷含量 mg/kg 0-10cm" width="180"></el-table-column>
                <el-table-column prop="gP20cm" label="磷取样重量 g 10-20cm" width="180"></el-table-column>
                <el-table-column prop="airP20cm" label="磷空白吸光度 10-20cm" width="180"></el-table-column>
                <el-table-column prop="yangP20cm" label="磷样品吸光度 10-20cm" width="180"></el-table-column>
                <el-table-column prop="ugmlP20cm" label="磷浓度 μg/ml 10-20cm" width="180"></el-table-column>
                <el-table-column prop="mgkgP20cm" label="磷含量 mg/kg 10-20cm" width="180"></el-table-column>
                <el-table-column prop="averagePlantHeight" label="平均株高（m）" width="180"></el-table-column>
                <el-table-column prop="averageStemDiameter" label="平均茎径（mm）" width="180"></el-table-column>
                <el-table-column prop="totalStemWeight" label="总茎重（KG）" width="180"></el-table-column>
                <el-table-column prop="numberEffectiveStems" label="有效茎数" width="180"></el-table-column>
                <el-table-column prop="stemFreshWeight" label="茎鲜重（g/plant）" width="180"></el-table-column>
                <el-table-column prop="stemFreshWeightAve" label="平均茎鲜重（g/plant）" width="180"></el-table-column>
                <el-table-column prop="gPlant" label="绿叶片鲜重(g/plant)" width="180"></el-table-column>
                <el-table-column prop="gPlantAve" label="平均绿叶片鲜重(g/plant)" width="180"></el-table-column>
                <el-table-column prop="gPlantShao" label="绿叶鞘鲜重(g/plant)" width="180"></el-table-column>
                <el-table-column prop="gPlantShaoAve" label="平均绿叶鞘鲜重(g/plant)" width="180"></el-table-column>
                <el-table-column prop="gPlantGanZhong" label="茎干重(g/plant)" width="180"></el-table-column>
                <el-table-column prop="gPlantGanZhongAve" label="平均茎干重(g/plant)" width="180"></el-table-column>
                <el-table-column prop="jingWaterContent" label="茎含水量(%)" width="180"></el-table-column>
                <el-table-column prop="jingWaterContentAve" label="平均茎含水量(%)" width="180"></el-table-column>
                <el-table-column prop="yeWaterContent" label="绿叶片含水量(%)" width="180"></el-table-column>
                <el-table-column prop="yeWaterContentAve" label="绿叶叶鞘含水量(%)" width="180"></el-table-column>
                <el-table-column prop="bx" label="平均田间钻汁锤度(゜Bx)" width="180"></el-table-column>
                <el-table-column prop="yxc" label="叶序长（cm）" width="180"></el-table-column>
                <el-table-column prop="yxk" label="叶序宽（cm）" width="180"></el-table-column>
                <el-table-column prop="ymj" label="叶面积(cm2/leaf)" width="180"></el-table-column>
                <el-table-column prop="ymjAve" label="平均叶面积(cm2/leaf)" width="180"></el-table-column>
                <el-table-column prop="qys" label="青叶数" width="180"></el-table-column>
                <el-table-column prop="qysAve" label="平均青叶数" width="180"></el-table-column>

            </el-table>

            <!-- 分页组件 -->
            <el-pagination :current-page="page" :total="total" :page-size="limit"  style="padding: 30px 0; text-align: center;" layout="total, prev, pager, next, jumper" @current-change="fetchData" />
        </div>

        

    </div>
</template>

<script>
import wumingApi from '@/api/wumingApi'
import MySelect from '@/components/Select/MySelect.vue'

export default {
    components: {
        MySelect
    },
    data() {
        return {
            total: 0, // 数据库中的总记录数
            page: 1, // 默认页码
            limit: 10, // 每页记录数
            cardList: [],
            searchObj: {
                samplePlot: '',
                sampleFang: '',
            },
            options: [
                { value: '', label: '全部' },
                { value: '1--1', label: '1--1' },
                { value: '1--2', label: '1--2' },
                { value: '1--3', label: '1--3' },
                { value: '2--1', label: '2--1' },
                { value: '2--2', label: '2--2' },
                { value: '2--3', label: '2--3' },
                { value: '3--1', label: '3--1' },
                { value: '3--2', label: '3--2' },
                { value: '3--3', label: '3--3' },
                { value: '4--1', label: '4--1' },
                { value: '4--2', label: '4--2' },
                { value: '4--3', label: '4--3' },
                { value: '5--1', label: '5--1' },
                { value: '5--2', label: '5--2' },
                { value: '5--3', label: '5--3' },
                { value: '6--1', label: '6--1' },
                { value: '6--2', label: '6--2' },
                { value: '6--3', label: '6--3' }
            ],
            options2: [
                { value: '', label: '全部' },
                { value: '1', label: '1' },
                { value: '2', label: '2' },
                { value: '3', label: '3' },
                { value: '4', label: '4' },
                { value: '5', label: '5' },
                { value: '6', label: '6' },
            ],

        }
    },
    async created() {

        await this.fetchData()

    },
    methods: {
        viewResour(item) {
            console.log(item)
            window.open(`#/wumingDetails?tolname=${item.baseName}&caneId=${item.id}`)
        },
        async shaixuan(val) {
            console.log(this.searchObj,'this.searchObj')
            console.log(val,'val')
            await this.fetchData()
        },
        fetchData(page = 1) {
            console.log(this.searchObj)
            this.page = page
            wumingApi.getPageData(this.page, this.limit, this.searchObj).then(response => {
                if(response.code === 200) {
                    this.cardList = response.data.data.records;
                    // 图标数组
                    const icons = [
                        require('@/assets/icon/甘蔗.png'),
                        require('@/assets/icon/甘蔗2.png'),
                        require('@/assets/icon/面性甘蔗.png'),
                        require('@/assets/icon/ganzhe.png')
                    ];
                    // 使用循环为每个元素分配一个图标
                    this.cardList.forEach((element, index) => {
                        // 根据当前元素的索引对图标数组长度取模，实现轮流分配
                        element.cardIcon = icons[index % icons.length]
                    })
                    this.total = response.data.data.total
                }
            })
        }
    }
}
</script>

<style scoped>
.body {
  padding-top: 114px;
  padding-bottom: 4rem;
  margin: 0 5vw;
  background: white;
}


.archive {
    text-align: center;
    max-width: 1200px;
    margin: 0 auto;
    margin-top: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 四边均衡阴影 */
}

.archive-content {
    bottom: 0;
    width: 100%;
    min-height: 80vh;
    z-index: 2;
    background: white;
    border-radius: .5rem;
    box-sizing: border-box;
    padding: .81rem;
    text-align: start;
}

.archive-title {
    color: #148964;
    margin-top: 0;
    margin-bottom: 2rem;
    font-size: .9rem;
}

.archive-list-tag {
    font-weight: 300;
    font-size: .9rem;
    margin-bottom: 0;
    border-bottom: .15rem solid #ecf1f7;
    padding-bottom: .5rem;
}

.archive-list {
    margin-top: 1rem;
}

.archive-list-item {
    background:  #ecf1f7;
    padding: .7rem;
    font-size: .86rem;
    display: flex;
    justify-content: space-between;
    color: #727579;
    border-radius: .3rem;
    margin-bottom: .8rem;
    cursor: pointer;
}

.archive-list-item:hover {
    color: #148964;
}

.archive-list-footer {
    text-align: center;
    margin-top: 3rem;
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
</style>