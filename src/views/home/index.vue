<template>
    <div class="body">
        <!-- 搜索框 -->
        <div class="input-container">
            <input v-model="keyword" placeholder="用搜索更简单" type="text" class="input">
            <span @click="search">立刻搜索</span>
        </div>
        <div style="margin-top: 30px;">
            <el-divider>
                <span style="font-size: 17px;">我们 · </span>
                <span style="font-size: 17px;">用心 · </span>
                <span style="font-size: 17px;">为您做得更好 </span>
            </el-divider>
        </div>
        <!-- 热门推荐 -->
        <h1 style="margin-top: 70px;">热门推荐</h1>
        <div class="popular">
            <div v-for="(item,index) in cardList" :key="index" class="popular-card">
                <img :src="item.cardIcon" style="width: 36px;height: 36px;margin-top: 20px;" alt="">
                <h3 class="title-text" style="margin-top: 10px;">{{ item.cardTitle }}</h3>
                <div style="height: 60px;">
                    <p class="card-summary-text">{{ item.cardSummary }}</p>
                </div>
                <button class="btn2" @click="viewResour(item)">开始使用</button>
                <span style="background-color: #39bda7;position: absolute;right: 11px;top: 7px;height: 25px;width: 25px;color: aliceblue;">{{ item.cardType }}</span>
                <span style="position: absolute;left: 7px;bottom: 4px;color: aliceblue;color: #262626;font-size: 14px;">已被使用 {{ item.cardUsers }} 人次</span>
            </div>
        </div>
        <button class="btn2" style="width: 30%;min-width: 457px;margin-top: 47px;border: 1px solid;">查看更多 ></button>
        <!-- 新闻模块 -->
        <div style="margin-top: 97px;margin-bottom: 40px;display: flex;width: 100%;justify-content: space-between;">
            <div class="news-left">
                <div class="news-header">
                    <h2>技术要领</h2>
                    <h5 style="color: rgb(151 151 151);">更多 ></h5>
                </div>
                <div style="min-height: 77%;width: 100%;text-align: left;">
                    <div v-for="(item,index) in news" :key="index" style="width: 97%;margin: 10px;display: flex;justify-content: space-between;align-items: center;">
                        <el-tooltip class="item" effect="dark" :content="item.newTitle">
                            <span class="truncate" @click="viewNews(item)"> <a style="font-weight: 700;font-size: 20px;">· </a> {{ item.newTitle }} </span>
                        </el-tooltip>
                       <span style="color: rgb(151 151 151);">{{ item.createTimeStr }}</span>
                    </div>
                </div>
            </div>
            <div class="news-right">
                <div class="news-header">
                    <h2>行业资讯</h2>
                    <h5 class="more" @click="goHomeNews()">更多 ></h5>
                </div>
                <div style="min-height: 77%;width: 100%;text-align: left;">
                    <div v-for="(item,index) in news" :key="index" style="width: 97%;margin: 10px;display: flex;justify-content: space-between;align-items: center;">
                        <el-tooltip class="item" effect="dark" :content="item.newTitle">
                            <span class="truncate" @click="viewNews(item)"> <a style="font-weight: 700;font-size: 20px;">· </a> {{ item.newTitle }} </span>
                        </el-tooltip>
                       <span style="color: rgb(151 151 151);">{{ item.createTimeStr }}
                        <!-- <i class="el-icon-view" style="margin-left: 5px;"></i> -->
                       </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import newApi from '@/api/newApi'

export default {
    data() {
        return {
            keyword: '',
            cardList: [
                {
                    cardType: '选',
                    cardTitle: '岗位适应性评估',
                    cardIcon: 'http://10.134.149.222:9000/duogongneng/evaluation.png',
                    cardSummary: '帮助您评估哪些岗位适合不同类型的残疾人，便于招募及岗位安排。',
                    cardUsers: 278
                },
                {
                    cardType: '育',
                    cardTitle: '常用手语宝典',
                    cardIcon: 'http://10.134.149.222:9000/duogongneng/knowledgeCollection.png',
                    cardSummary: '带你走进无声的世界，帮助您了解工广常用手语、日常生活常用子语菱这通技巧等知识。',
                    cardUsers: 12
                },
                {
                    cardType: '育',
                    cardTitle: '培训开展指南',
                    cardIcon: 'http://10.134.149.222:9000/duogongneng/designCompass.png',
                    cardSummary: '帮助您如何开展残疾人教育培训，培训技巧、培训方式。',
                    cardUsers: 3880
                },
                {
                    cardType: '用',
                    cardTitle: '无障碍设计指南',
                    cardIcon: 'http://10.134.149.222:9000/duogongneng/designCompass.png',
                    cardSummary: '帮助您如何进行无障碍设计，含工作场所及生活场所。',
                    cardUsers: 100082
                }
            ],
            news:[]
        }
    },
    created() {
        this.getHomeNews()
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
        viewResour(item) {
            console.log(item)
            window.open(`#/resour?tolname=${item.cardTitle}`)
        },
        goMoreResour() {
            this.$router.push('/resours')
        },
        goHomeNews() {
            this.$router.push('/homeNews')
        },
        getHomeNews() {
            newApi.getHomeNews().then(res => {
                if(res.code === 200) {
                    // console.log(res.data.list)
                    this.news = res.data.list
                }
            })
        },
        viewNews(item) {
            this.$router.push(
                {
                    path: '/news',
                    query:  { 
                        newKey: item.newKey
                    }
                }
            )
        }
    }
}
</script>

<style scoped>
.body {
  padding-top: 177px;
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

.popular {
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

.news-left {
    width: 39vw;
    display: flex;
    flex-wrap: wrap;
    align-items: start;
    border: 1px solid #CDD9ED;
    padding: 20px;
    min-height: 540px;
}

.news-right {
    width: 39vw;
    display: flex;
    flex-wrap: wrap;
    align-items: start;
    border: 1px solid #CDD9ED;
    padding: 20px;
    min-height: 540px;
}

.news-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}

.truncate {
    white-space: nowrap;        /* 防止文本换行 */
    overflow: hidden;           /* 隐藏溢出内容 */
    text-overflow: ellipsis;    /* 使用省略号表示溢出 */
    width: 360px;               /* 固定宽度，可以根据需要调整 */
    display: inline-block;      /* 使元素表现为块状，方便设置宽度 */
    cursor: pointer;
    border-bottom: #ffffff00 1px solid;
}

.truncate:hover {
    border-bottom: #32b753 1px solid;
    color: #39bda7;
}

/* 当屏幕宽度小于或等于1680px时的样式，限制为两行 */
@media (max-width: 1680px) {
    .card-summary-text {
        -webkit-line-clamp: 2;
    }
}

/* 当屏幕宽度小于或等于960px时的样式，限制为两行 */
@media (max-width: 960px) {
    .btn2 {
        padding: 7px 20px;
    }
    .popular-card {
        width: 40vw;
        border: #c3c5cb 1px solid;
        height: 270px;
        position: relative;
        padding: 0 10px;
        transition: all .4s ease;
        margin:10px 0;
    }
}

.more {
    color: rgb(151 151 151);
    cursor: pointer;
}
.more:hover {
    color: #32b753;
}
</style>