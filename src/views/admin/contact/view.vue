<template>
    <div>
        <div class="body-left">
            <div class="item">
                <label class="label">联系用户：</label>  <input class="inputs" :value="one.username ? one.username : '非登录用户'" disabled>
            </div>
            <div class="item">
                <label class="label">联系方式：</label> <input class="inputs" v-model="one.contactWay" disabled>
            </div>
            <div class="item"> 
                <label class="label">发送时间：</label> <input class="inputs" v-model="one.createTime" disabled>
            </div>
            <div class="item">
                <label class="label">反馈内容：</label> <textarea class="inputs" style="border: 1px #32b753 solid;padding:5px 10px;min-height: 200px;" disabled v-model="one.contactText"></textarea>
            </div>
            <div style="text-align: right;">
                <button class="btn2" @click="backMsgList">返回列表</button>
            </div>
        </div>
    </div>
</template>

<script>
import contactApi from '@/api/contactApi';

export default {
    data() {
        return {
            msgId: this.$route.query.viewKey,
            one: {}
        }
    },
    created() {
        this.getMsg()
    },
    methods: {
        getMsg() {
            contactApi.getMsg(this.$route.query.viewKey).then(res => {
                if(res.code === 200) {
                    this.one = res.data.one
                    this.readed()
                }
            })
        },
        readed() {
            contactApi.readed(this.$route.query.viewKey).then(res => {
                console.log(res)
            })
        },
        backMsgList() {
            this.$router.push('/admin/contact')
        }
    }
}
</script>

<style scoped>
.body-left {
    text-align: left;
    padding: 0 24vw;
}
.item {
    margin: 20px auto;
    display: flex;
}
.label {
    min-width: 104px;
    font-size: 19px;
    font-weight: 700;
}

.inputs {
    width: 100%;
    border: none;
    font-size: 19px;
    color: #39bda7;
    border-bottom: 1px #32b753 solid;
    background: #ffffff00;
}

.btn2 {
  position: relative;
  display: inline-block;
  margin: 11px 4px;
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
  border: 1.2px solid #32b753;
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