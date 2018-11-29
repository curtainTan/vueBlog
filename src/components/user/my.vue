<template>
    <div class="tan">
        <h1>我的资料</h1>
        <Divider />
        <div class="item touxiang">
            <span>头像</span>
            <img class="headImg" :src="getUserInfo.headImg" alt="" srcset="" >
            <Button type="success" ghost @click="change" >更改头像</Button>
        </div>
        <Divider />
        <div class="item">
            <span>职位</span>
            <input v-model="work" placeholder="Enter something..." />
        </div>
        <Divider />
        <div class="item">
            <span>城市</span>
            <input v-model="work" placeholder="Enter something..." />
        </div>
        <Divider />
        <div class="item">
            <span>人介绍</span>
            <Input class="geren" v-model="introduce" type="textarea" :rows="4" placeholder="Enter something..." />
        </div>
        <Button type="primary" :loading="loading" @click="updata">保存</Button>
        <vue-crop  @crop-upload-success="uploadSuccess"
            v-model="show"
            :width="width"
            :height="height"
            :url="uploadUrl"
            :field="fileName"
            :params="userData"
            img-format="png"></vue-crop>
    </div>
</template>

<script>
import VueCrop from './upload-2.vue';

import { mapActions, mapGetters } from 'vuex'

export default {
    data(){
        return{
            loading: false,
            work: this.$store.state.state.userInfo.work,
            introduce: this.$store.state.state.userInfo.introduce,
            show: false,
            width: 200,
            height: 200,
            uploadUrl: 'http://www.curtaintan.club/auth/headImg',
            // uploadUrl: 'http://localhost:3000/auth/headImg',
            fileName: 'headImg', 
            userData: {
                user : this.$store.state.state.userInfo.username,
                token: window.localStorage.getItem('token')
            }
        }
    },
    components: {
        VueCrop
    },
    computed: {
        ...mapGetters([ 'getUserInfo', 'getUserName' ])
    },
    methods: {
        ...mapActions([ 'userUpdata', 'upHeadImg' ]),
        change(){
            this.show = !this.show
        },
        updata(){
            this.loading = true
            var data = {
                name : this.$store.state.state.userInfo.username,
                work : this.work,
                introduce : this.introduce,
            }
            this.userUpdata(data).then(res => {
                this.loading = false
                if(res.success){
                    this.$Message.info({
                        content: '修改成功.....',
                        duration: 3
                    });
                }else{
                    this.$Message.info({
                        content: '修改失败.....',
                        duration: 3
                    });
                }
            })
        },
        uploadSuccess( res ){
            //修改头像成功
            console.log(res)
            if(res.success){
                this.$Message.info({
                    content: '修改成功.....',
                    duration: 3
                });
                this.upHeadImg( res.headImg )
            }else{
                this.$Message.info({
                    content: '修改失败.....',
                    duration: 3
                });
            }
        }
    },
}
</script>

<style scoped>
.tan{
    padding: 30px;
}
.tan .headImg{
    width: 80px;
    height: 80px;
    border-radius: 10px;
    margin-right: 50px;
}
.tan .touxiang{
    display: flex;
    align-items: center;
}
.tan .item span{
    /* margin-right: 50px; */
    display: inline-block;
    width: 70px;
}
.tan .item input{
    font-size: 16px;
    width: 70%;
}
.tan .item input:focus{
    outline: none;
}
.tan .item .geren{
    margin: 20px 0px;
}
</style>





