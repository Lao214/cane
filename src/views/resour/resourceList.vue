<template>
    <div class="body">
        <p style="position: absolute;top: 65px;left: 19px;"> <a class="homeback" @click="goHome">首页</a> > <a>查看更多</a> </p>
        <!-- 搜索框 -->
        <div class="input-container">
            <input v-model="searchObj.keyword" placeholder="用搜索更简单" type="text" class="input">
            <span @click="search">立刻搜索</span>
        </div>

        <div style="display: flex;align-items: center;margin: 1rem 0;flex-wrap: wrap;">
            <MySelect v-model="areaSelected" label="地区：" :options="areaOptions"></MySelect>

            <MySelect v-model="parentSelected" label="父本：" :options="parentOptions"></MySelect>

            <MySelect v-model="motherSelected" label="母本：" :options="motherOptions"></MySelect>

            <MySelect v-model="businessSelected" label="选育单位：" :options="businessOptions"></MySelect>

            <MySelect v-model="hanSelected" label="抗旱：" :options="hanOptions"></MySelect>

            <MySelect v-model="coldSelected" label="抗寒：" :options="coldOptions"></MySelect>

            <MySelect v-model="smutSelected" label="抗黑穗病：" :options="smutOptions"></MySelect>
        </div>

        <div style="margin-top: 14px;display: flex;justify-content: space-between;">
            <!-- <div class="radio-btn-group">
                <div class="radio">
                    <input type="radio" name="radio" value="all" checked="checked" v-model="searchObj.category" id="all"/>
                    <label for="all">全部</label>
                </div>
                <div class="radio">
                    <input type="radio" name="radio" value="guozhe" v-model="searchObj.category" id="guozhe"/>
                    <label for="guozhe">果蔗</label>
                </div>
                <div class="radio">
                    <input type="radio" name="radio" value="tangzhe" v-model="searchObj.category" id="tangzhe"/>
                    <label for="tangzhe">糖蔗</label>
                </div>
                <div class="radio">
                    <input type="radio" name="radio" value="yeshengzhong" v-model="searchObj.category" id="yeshengzhong"/>
                    <label for="yeshengzhong">野生种</label>
                </div>
            </div> -->

            <div class="radio-btn-group">
                <div class="radio">
                    <input type="radio" name="radio2" value="times" v-model="searchObj.sortType" id="times"/>
                    <label for="times">最新发布</label>
                </div>
                <div class="radio">
                    <input type="radio" name="radio2" value="nums" checked="checked" v-model="searchObj.sortType" id="nums"/>
                    <label for="nums">最多人看</label>
                </div>
            </div>
        </div>

        <div class="popular">
            <div v-for="(item,index) in cardList" :key="index" class="popular-card">
                <img :src="item.cardIcon" style="width: 36px;height: 36px;margin-top: 20px;" alt="">
                <h3 class="title-text" style="margin-top: 10px;">{{ item.caneName }}</h3>
                <div style="height: 60px;">
                    <p class="card-summary-text">{{ item.description }}</p>
                </div>
                <button class="btn2" @click="viewResour(item)">查看详情</button>
                <span style="background-color: #39bda7;position: absolute;right: 11px;top: 7px;height: 25px;min-width: 4rem;width: auto;color: aliceblue;padding: .1rem;">{{ item.categoryName }}</span>
                <span style="position: absolute;left: 7px;bottom: 4px;color: aliceblue;color: #262626;font-size: 14px;">已被阅读 {{ item.viewCount }} 次</span>
            </div>
        </div>

        <el-pagination background layout="prev, pager, next" :total="total"  @current-change="fetchData" style="margin-bottom: 34px;"></el-pagination>
    </div>
</template>

<script>
import caneApi from '@/api/caneApi'
import MySelect from '@/components/Select/MySelect.vue'

export default {
    components: {
        MySelect
    },
    data() {
        return {
            searchObj: {
                keyword: '',
                category: 'all',
                sortType: 'times',
                cityCodes: '',
                parentId: '',
                motherId: '',
                droughtResistance: '',
                coldResistance: '',
                smutResistance: ''
            },
            total: 0, // 数据库中的总记录数
            page: 1, // 默认页码
            limit: 8, // 每页记录数
            cardList: [],
            /** options 群 **/
            businessSelected: '',
            businessOptions: [],
            parentSelected: '',
            parentOptions: [],
            motherSelected: '',
            motherOptions: [],
            hanSelected: '',
            hanOptions: [
                { value: '较差', label: '较差' },
                { value: '一般', label: '一般' },
                { value: '中等', label: '中等' },
                { value: '良好', label: '良好' },
                { value: '强', label: '强' }
            ],
            coldSelected: '',
            coldOptions: [
                { value: '较差', label: '较差' },
                { value: '一般', label: '一般' },
                { value: '中等', label: '中等' },
                { value: '良好', label: '良好' },
                { value: '强', label: '强' }
            ],
            smutSelected: '',
            smutOptions: [
                { value: '易感', label: '易感' },
                { value: '抗', label: '抗' },
                { value: '中抗', label: '中抗' },
                { value: '良好', label: '良好' },
                { value: '高抗', label: '高抗' }
            ],
            areaSelected: '',
            areaOptions: [
                { value: '广西壮族自治区', label: '广西壮族自治区' },
                { value: '云南省', label: '云南省' },
                { value: '广东省', label: '广东省' },
                { value: '福建省', label: '福建省' },
                { value: '四川省', label: '四川省' },
                { value: '浙江省', label: '浙江省' },
                { value: '台湾省', label: '台湾省' }
            ]
        }
    },
    watch: {
        'searchObj.sortType': function (newValue, oldValue) {
            console.log('搜索排序类型从', oldValue, '变为', newValue)
            this.fetchData()
        },
        async areaSelected(newValue) {
            console.log('areaSelected', newValue)
            this.searchObj.cityCodes = newValue
            this.fetchData()
        },
        async businessSelected(newValue) {
            this.searchObj.intorBusiness = newValue
            this.fetchData()
        },
        async parentSelected(newValue) {
            this.searchObj.parentId = newValue
            this.fetchData()
        },
        async motherSelected(newValue) {
            this.searchObj.motherId = newValue
            this.fetchData()
        },
        async hanSelected(newValue) {
            this.searchObj.droughtResistance = newValue
            this.fetchData()
        },
        async coldSelected(newValue) {
            this.searchObj.coldResistance = newValue
            this.fetchData()
        },
        async smutSelected(newValue) {
            this.searchObj.smutResistance = newValue
            this.fetchData()
        }
    },
    async created() {
         // 检查 URL 查询参数 'ftype' 并设置 searchObj.resourType
        if(this.$route.query.ftype) {
            this.searchObj.firstType = this.$route.query.ftype
        }

        // 设置 searchObj.keyword 为查询参数 'skword'
        this.searchObj.keyword = this.$route.query.skword

        await this.fetchData()

        await this.getOptions()
    },
    methods: {
        viewResour(item) {
            console.log(item)
            window.open(`#/resour?tolname=${item.caneName}&caneId=${item.id}`)
        },
        search() {
            const newQuery = {
                ...this.$route.query,
                skword: this.searchObj.keyword
            }

            if (JSON.stringify(newQuery) !== JSON.stringify(this.$route.query)) {
                this.$router.push({
                    path: this.$route.path,
                    query: newQuery
                })
            }

            this.fetchData()
        },
        fetchData(page = 1) {
            this.page = page
            console.log('this.searchObj',this.searchObj)
            caneApi.getPageList(this.page, this.limit, this.searchObj).then(response => {
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
        },
        handleClick() {
            console.log(this.searchObj.firstType);
            const newQuery = {
                ...this.$route.query,
                ftype: this.searchObj.firstType
            }

            if (JSON.stringify(newQuery) !== JSON.stringify(this.$route.query)) {
                this.$router.push({
                    path: this.$route.path,
                    query: newQuery
                })
            }
        },
        goHome() {
            this.$router.push('/home')
        },
        getOptions() {
            caneApi.getFilterOptions().then(res => {
                if (res.code === 200) {
                    console.log(res.data, 'res.data.data')
                    this.parentOptions =res.data.parentOptions
                    this.motherOptions =res.data.motherOptions
                    this.businessOptions =res.data.businessOptions
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

.tipsNums {
   background: rgb(235 235 235);
   /* border-radius: 14px; */
   height: 10px;
   min-width: 20px;
   line-height: 10px;
   padding: 3px;
   font-size: 12px;
   color: gray;
   margin-left: 4px;
}

/* Raido buttons 单选框 */

.radio-btn-group {
    display: flex;
}
.radio-btn-group .radio {
    margin-right: 5px;
}
.radio-btn-group .radio label {
    background: #fff;
    /* border: 1px solid #ddd; */
    padding: 5px 10px;
    /* border-radius: 5px; */
    cursor: pointer;
    color: #444;
    transition: box-shadow 400ms ease;
}
/* .radio-btn-group .radio label:hover {
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
} */
.radio-btn-group .radio input[type=radio] {
    display: none;
}
.radio-btn-group .radio input[type=radio]:checked + label {
    background: #326cb723;
    color: #32b753;
    /* border-color: #2196F3; */
}

/* 返回首页 */
.homeback:hover {
    color: #32b753;
    border-bottom: 1px solid #32b753;
    cursor: pointer;
}

/* 工具卡片 */
.popular {
    margin-top: 34px; 
    min-height: 720px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}

.popular-card {
    width: 20vw;
    border: #c3c5cb 1px solid;
    height: 270px;
    position: relative;
    padding: 0 10px;
    transition: all .4s ease;
}

.popular-card:hover {
    box-shadow: 3px 3px 5px 2px rgba(0, 0, 0, 0.3);
    scale: 1.05;
    cursor: pointer;
}

.card-summary-text {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;  
    overflow: hidden;
    text-overflow: ellipsis;
    /* height: 60px; */
}

.title-text {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;  
    overflow: hidden;
    text-overflow: ellipsis;
}

.btn2 {
  position: relative;
  display: inline-block;
  margin: 11px;
  padding: 7px 40px;
  text-align: center;
  font-size: 18px;
  letter-spacing: 1px;
  text-decoration: none;
  /* color: #0e79b7; */
  color: #32b753;
  background: transparent;
  cursor: pointer;
  transition: ease-out 0.5s;
  border: 2px solid #32b753;
  /* border-radius: 10px; */
  box-shadow: inset 0 0 0 0 #32b753;
}

.btn2:hover {
  color: white;
  box-shadow: inset 0 -100px 0 0 #32b753;
}

.btn2:active {
  transform: scale(0.9);
}

</style>