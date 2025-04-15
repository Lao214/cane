<template>
    <div class="body">
        <h1>扶绥基地数据</h1>

        <div class="archive">
            <div class="archive-content">
                <p class="archive-title">归档</p>
                <div class="archive-list-tag"><i class="el-icon-date"></i> 列表</div>
                <div class="archive-list">
                    <div v-for="(item, index) in cardList" :key="index" class="archive-list-item" @click="viewResour(item)">
                        <span>{{ item.baseName }}</span>
                        <span>{{ item.measurementDate }}</span>
                    </div>
                </div>
                <div class="archive-list-footer">
                    <el-pagination background layout="prev, pager, next" :total="total" @current-change="fetchData" style="margin-bottom: 34px;"></el-pagination>
                </div>
            </div>
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
                keyword: '',
                category: 'all',
                sortType: 'times',
                resistanceLevelHan: '',
                resistanceLevelHei: '',
                resistanceLevel: ''
            },
            hanSelected: '',
            hanOptions: [],
            coldSelected: '',
            coldOptions: [],
            smutSelected: '',
            smutOptions: [],
        }
    },
    async created() {
        // 设置 searchObj.keyword 为查询参数 'skword'
        this.searchObj.keyword = this.$route.query.skword

        await this.fetchData()

    },
    methods: {
        viewResour(item) {
            console.log(item)
            window.open(`#/wumingDetails?tolname=${item.baseName}&caneId=${item.id}`)
        },
        fetchData(page = 1) {
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
</style>