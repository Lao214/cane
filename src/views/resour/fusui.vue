<template>
    <div class="body">

        <!-- 搜索框 -->
        <!-- <div class="input-container">
            <input v-model="searchObj.keyword" placeholder="用搜索更简单" type="text" class="input">
            <span @click="fetchData()">立刻搜索</span>
        </div> -->

        <div style="display: flex;gap: 2rem;">
            <!-- 搜索框 -->
            <el-select v-model="searchObj.yangPlant" placeholder="请选择样地" @change="fetchData()">
                <el-option   v-for="item in options" :key="item.value"  :label="item.label"  :value="item.value">
                </el-option>
            </el-select>

            <el-select v-model="searchObj.yangFang" placeholder="请选择样方" @change="fetchData()">
                <el-option   v-for="item in options2" :key="item.value"  :label="item.label"  :value="item.value">
                </el-option>
            </el-select>
        </div>


        <h1>扶绥基地数据</h1>

        <div class="table-box">
            <el-table :data="cardList" style="width: 100%">
                <el-table-column prop="baseName" label="基地名称" width="180"></el-table-column>
                <el-table-column prop="varietyName" label="品种名" width="180"></el-table-column>
                <el-table-column prop="measurementDate" label="测定日期" width="180"></el-table-column>
                <el-table-column prop="yangPlant" label="样地" width="180"></el-table-column>
                <el-table-column prop="yangFang" label="样方" width="180"></el-table-column>
                <el-table-column prop="zhuGaoNum" label="株数编号" width="180"></el-table-column>
                <el-table-column prop="zhuGao" label="株高" width="180"></el-table-column>
                <el-table-column prop="zhuGaoAve10" label="平均株高（10株）" width="180"></el-table-column>
                <el-table-column prop="stemDiameter" label="茎径" width="180"></el-table-column>
                <el-table-column prop="stemDiameterAve10" label="平均茎径（10株）" width="180"></el-table-column>
                <el-table-column prop="chui" label="锤度" width="180"></el-table-column>
                <el-table-column prop="lai" label="LAI" width="180"></el-table-column>
                <el-table-column prop="laiAve" label="LAI平均" width="180"></el-table-column>
                <el-table-column prop="mta" label="MTA" width="180"></el-table-column>
                <el-table-column prop="mtaAve" label="MTA平均" width="180"></el-table-column>
                <el-table-column prop="ylshl" label="叶绿素含量" width="180"></el-table-column>
                <el-table-column prop="ylshlAve" label="平均叶绿素含量" width="180"></el-table-column>
                <el-table-column prop="xianzhong3" label="鲜重（三株）" width="180"></el-table-column>
                <el-table-column prop="xianzhongAve" label="平均鲜重" width="180"></el-table-column>
                <el-table-column prop="ganzhong3" label="干重（三株）" width="180"></el-table-column>
                <el-table-column prop="ganzhongAve" label="平均干重" width="180"></el-table-column>
                <el-table-column prop="miaoshu" label="苗数" width="180"></el-table-column>
                <el-table-column prop="miaoshuAve" label="平均苗数（第2、3、4行）" width="180"></el-table-column>

            </el-table>

            <!-- 分页组件 -->
            <el-pagination :current-page="page" :total="total" :page-size="limit"  style="padding: 30px 0; text-align: center;" layout="total, prev, pager, next, jumper" @current-change="fetchData" />
        </div>

        

    </div>
</template>

<script>
import bfApi from '@/api/bfApi'
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
                yangPlant: '',
                yangFang: '',
            },
            options: [
                { value: '', label: '全部' },
                { value: 'A1', label: 'A1' },
                { value: 'A2', label: 'A2' },
                { value: 'A3', label: 'A3' },
                { value: 'A4', label: 'A4' },
                { value: 'A5', label: 'A5' },
                { value: 'B1', label: 'B1' },
                { value: 'B2', label: 'B2' },
                { value: 'B3', label: 'B3' },
                { value: 'B4', label: 'B4' },
                { value: 'B5', label: 'B5' },
                { value: 'C1', label: 'C1' },
                { value: 'C2', label: 'C2' },
                { value: 'C3', label: 'C3' },
                { value: 'C4', label: 'C4' },
                { value: 'C5', label: 'C5' }
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
            window.open(`#/fusuiDetails?tolname=${item.baseName}&caneId=${item.id}`)
        },
        fetchData(page = 1) {
            this.page = page
            bfApi.getPageData(this.page, this.limit, this.searchObj).then(response => {
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
</style>