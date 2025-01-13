<template>
    <div class="contact-body">
        <p style="position: absolute;top: 65px;left: 19px;"> <a class="homeback" @click="goHome">首页</a> > <a>联系我们</a></p>
        <h1>CONTACT US</h1>
        <div style="width: 30%;min-width: 447px;margin: 0 auto;">
            <input class="contact-input" placeholder="您的联系方式(分机或邮箱)" v-model="contactForm.contactWay">
            <textarea class="contact-area" style="resize: none;margin-top: 30px;min-height: 270px;" placeholder="请输入您想对我们说的话（不超过200字）" v-model="contactForm.contactText"></textarea>
            <button class="btn2" style="width: 100%;min-width: 483px;margin-top: 27px;border: 1px solid;" @click="addContact"><i class="el-icon-s-promotion"></i> 发送</button>    
        </div>
        <div style="margin-top: 77px;">
            <el-divider></el-divider>
            <div style="text-align: left;margin-left: 15vw;">
                <p>其他联系方式</p>
                <h5>分机：</h5>
                <h5>邮箱：</h5>
                <h5>地址：</h5>
            </div>
        </div>
    </div>
</template>

<script>
import contactApi from '@/api/contactApi'

export default {
    data() {
        return {
            contactForm: {
                contactWay: '',
                contactText: ''
            }
        }
    },
    methods: {
        goHome() {
            this.$router.push('/home')
        },
        addContact() {
            if(!this.contactForm.contactWay) {
                this.$message({
                    type: 'info',
                    message: '请填一下您的联系方式'
                })
                return
            }
            if(!this.contactForm.contactText) {
                this.$message({
                    type: 'info',
                    message: '请填一下您想说的话'
                })
                return
            }
            contactApi.addContact(this.contactForm).then(res => {
                if(res.code === 200) {
                    this.$message({
                        type: 'success',
                        message: '操作成功'
                    })
                }
            })
        }
    }
}
</script>

<style scoped>
.contact-body {
    padding: 90px 19vw;
}
.contact-input {
    width: 100%;
    height: 30px;
    min-width: 447px;
    padding: 4px 17px;
}

.contact-area {
    width: 100%;
    height: 30px;
    min-width: 447px;
    padding: 14px 17px;
}

.btn2 {
  position: relative;
  display: inline-block;
  /* margin: 11px; */
  padding: 7px 40px;
  text-align: center;
  font-size: 18px;
  letter-spacing: 1px;
  text-decoration: none;
  /* color: #0e79b7; */
  color: #326bb7;
  background: transparent;
  cursor: pointer;
  transition: ease-out 0.5s;
  border: 2px solid #326bb7;
  /* border-radius: 10px; */
  box-shadow: inset 0 0 0 0 #326bb7;
}

.btn2:hover {
  color: white;
  box-shadow: inset 0 -100px 0 0 #326bb7;
}

.btn2:active {
  transform: scale(0.9);
}

.homeback:hover {
    color: #326bb7;
    border-bottom: 1px solid #326bb7;
    cursor: pointer;
}
</style>