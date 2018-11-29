<template>
    <div class="user">
        <div class="left">
            <div class="top">
                <div class="headimg">
                    <img :src="one.headImg" alt="">
                </div>
                <div class="main">
                    <h3>{{one.username}}</h3>
                    <p>个性签名：</p>
                    <div class="mainDown" v-if="getUserInfo.username === $route.params.username " >
                        <ButtonGroup>
                            <Button type="primary" ghost @click="tomy">编辑个人资料</Button>
                            <Button type="primary"  @click="out" >退出登录</Button>
                        </ButtonGroup>
                    </div>
                </div>
            </div>
            <div class="nav">
                <Tabs :value="$route.name" @on-click="qwe">
                    <TabPane label="动态" name="user-dongtai" ></TabPane>
                    <TabPane label="喜欢" name="user-xihuan" ></TabPane>
                    <TabPane label="回答" name="user-huida" ></TabPane>
                    <TabPane label="文章" name="user-wenzhang" ></TabPane>
                    <TabPane v-if="getUserInfo.username === $route.params.username " label="设置" name="user-my" ></TabPane>
                </Tabs>
            </div>
            <div class="content">
                <keep-alive>
                    <router-view />
                </keep-alive>
            </div>
        </div>
        <Affix  class="right":offset-top="60">
            <div class="rightTop">
                <div class="topLeft">
                    <p>关注了</p>
                    <h3>78</h3>
                </div>
                <Divider type="vertical" />
                <div class="topRight">
                    <p>收获喜欢</p>
                    <h3>56</h3>
                </div>
            </div>
            <div class="rightDown" v-if="getUserInfo.username === $route.params.username ">
                <Divider />
                <div class="item">
                    <span>设置背景图片</span>
                    <Upload 
                        action="http://www.curtaintan.club/auth/setBg"
                        :format="format"
                        name="bg"
                        :data="dat"
                        :max-size="4096"
                        :on-success="fileSuc"
                        :on-exceeded-size="handleMaxSize"
                        :show-upload-list="showFile"
                        :on-format-error="handleFormatError">
                        <Button type="primary" shape="circle" icon="ios-cloud-upload-outline">设置</Button>
                    </Upload>
                </div>
                <Divider />
                <div class="defaultImg">
                    <img src="http://www.curtaintan.club/bg/1.jpg" alt="">
                    <div class="mask">
                        <Spin fix v-if="bgShow" ></Spin>
                        <h3 v-else @click="showSpin(1)" >设置为背景图片</h3>
                    </div>
                </div>
                <Divider />
                <div class="defaultImg">
                    <img src="http://www.curtaintan.club/bg/4.jpg" alt="">
                    <div class="mask">
                        <Spin fix v-if="bgShow" ></Spin>
                        <h3 v-else @click="showSpin(2)" >设置为背景图片</h3>
                    </div>
                </div>
                <Divider />
            </div>
        </Affix>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    data(){
        return{
            file: null,
            format : ['jpg','jpeg','png','gif'],
            dat : {},
            showFile : false,
            bgShow : false,
            one : {}
        }
    },
    computed: {
        ...mapGetters( ['getUserInfo'] )
    },
    watch: {
        $route( to, from ){
            console.log( '------------------------个人中心路由检测----------------------------')
            console.log( to )
            if( to.params.username === this.getUserInfo.username ){
                this.one = this.getUserInfo
            }
        }
    },
    mounted() {
        console.log( '-----------------组件创建-------------------' )
        console.log( this.getUserInfo )
        if( this.$route.params.username  === this.getUserInfo.username ){
            this.one = this.getUserInfo
            console.log('----------------------我自己----------------------')
            console.log( this.one )
            this.dat = {
                user : this.getUserInfo.username
            }
        }else{
            //发送请求获取其他用户的信息
            var ss = {
                user : this.$route.params.username
            }
            console.log( '----------------其他用户初始化---------------------' )
            this.$api.users.getOne( ss ).then( res => {
                console.log( res )
                this.one.headImg = res.data.headImg
                this.one.username = res.data.user_name
                console.log( this.one )
            } )
        }
    },
    beforeUpdate() {
        console.log('-------------------数据更新了----------------------')
    },
    methods: {
        ...mapActions([ 'logOut' ]),
        qwe( tan ){
            this.$router.push({ name : tan })
        },
        tomy(){
            this.$router.push('/user/my')
        },
        out(){
            this.logOut().then( res => {
                this.$router.push('/')
                let app = document.getElementById('app')
                app.style.backgroundImage = `url("")`
                this.$Message.info({
                    content: '已经退出.....',
                    duration: 3
                });
            })
        },
        handleFormatError (file) {
            this.$Notice.warning({
                title: '提示',
                desc: '文件 ' + file.name + ':文件类型错误，请上传jpg，png，gif格式的图片。'
            });
        },
        handleMaxSize( file ){
            this.$Notice.warning({
                title: '提示',
                desc: '文件 ' + file.name + '过大，请上传4M下的图片。'
            });
        },
        fileSuc( res ){
            console.log( '-=-----------上传成功-------------------' )
            let app = document.getElementById( 'app')
            app.style.backgroundImage = `url("${res.bgImg}")`
        },
        showSpin( index ){
            console.log( index )
            this.bgShow = true
            setTimeout( () => {
                this.bgShow = false
            }, 2000 )
            var sendData = {
                user : this.getUserInfo.username,
                num : index
            }
            this.$api.users.setDefBg( sendData ).then( res => {
                console.log( '-------------------设置默认图片----------------------' )
                console.log( res )
                this.fileSuc( res.data )
            } )
        }
    }
}
</script>

<style scoped>
.user{
    max-width: 1050px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
}
.user .left{
    width: 70%;
}
.user .right{
    width: 28%;
}
.user .left .top{
    display: flex;
    justify-content: center;
    background-color: #ffffff;
    padding: 20px;
    border-radius: 4px;
    box-shadow: 1px 1px 4px rgb(165, 165, 165);
}
.user .left .top .headimg{
    width: 20%;
    margin-right: 10px;
}
.user .left .top .headimg img{
    width: 100%;
}
.user .left .top .main{
    width: 75%;
    height: 100%;
    text-align: left;
}
.user .left .top .headimg img{
    border-radius: 30px;
}
.user .left .top .main h3{
    font-size: 24px;
    padding: 5px 0px 10px 0px;
}
.user .left .top .main p{
    margin: 10px 0px 10px 0px;
    font-size: 16px;
}
.user .left .top .main .mainDown{
    font-size: 14px;
    height: 40px;
    line-height: 40px;
    display: flex;
    justify-content: flex-end;
}
.user .left .top .main .mainDown{
    margin: 20px;
}
.user .left .top .main p span{
    line-height: 40px;
}
.user .left .nav{
    margin-top: 20px;
    border-radius: 4px;
    box-shadow: 1px 1px 4px rgb(165, 165, 165);
}
.user .left .content{
    min-height: 400px;
    border-radius: 5px;
    margin-top: 20px;
    border-radius: 4px;
    box-shadow: 1px 1px 4px rgb(165, 165, 165);
}
.user .right .rightTop{
    display: flex;
    align-items: center;
    border-radius: 5px;
    background-color: #ffffff;
    border-radius: 4px;
    margin-bottom: 20px;
    box-shadow: 1px 1px 4px rgb(165, 165, 165);
}
.user .right .rightTop .topRight,
.user .right .rightTop .topLeft{
    height: 80px;
    width: 48%;
}
.user .right .rightTop p{
    padding: 14px 0 8px 0;
    color: rgb(160, 160, 160);
}
.user .right .ivu-divider-vertical{
    height: 3.9em;
}
.user .right .rightDown .ivu-collapse{
    background-color: transparent;
    border-left: none;
    border-right: none;
    text-align: left;
}
.user .right .rightDown .item{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.user .right .rightDown .item button{
    margin-right: 6px;
}
.user .right .rightDown .defaultImg{
    text-align: center;
    margin: 10px auto; 
    position: relative;
    width: 205px;
    overflow: hidden;
}
.user .right .rightDown .defaultImg img{
    width: 100%;
    transition: all .8s;
}
.user .right .rightDown .defaultImg:hover img{
    transform: scale(1.2, 1.2);
}
.user .right .rightDown .defaultImg:hover .mask{
    transform: translateY(-120px);
}
.user .right .rightDown .defaultImg .mask{
    position: absolute;
    bottom: -120px;
    height: 120px;
    width: 100%;
    background-color: rgba(128, 128, 128, 0.5);
    transition: all .4s ease-out;
}
.user .right .rightDown .defaultImg .mask h3{
    line-height: 115px;
    cursor: pointer;
}
.user .right .rightDown .defaultImg .mask .ivu-spin{
    height: 130px;
    width: 100%;
}
/* .user .right .rightDown .defaultImg .mask .ivu-spin-fix{
    background-color: rgba(238, 238, 238, 0.5);
} */
</style>
<style>
.user .left .nav .ivu-tabs .ivu-tabs-bar{
    margin-bottom: 0!important;
}
.user .left .nav .ivu-tabs .ivu-tabs-bar .ivu-tabs-nav-container{
    font-size: 16px;
}
.user .left .nav .ivu-tabs .ivu-tabs-bar .ivu-tabs-nav-container .ivu-tabs-tab{
    /* padding: 0px;
    margin: 0px; */
}
.user .left .nav .ivu-tabs .ivu-tabs-bar .ivu-tabs-nav-container .ivu-tabs-tab a{
    /* display: block; */
    /* position: absolute;
    padding: 8px 16px;
    margin-right: 16px; */
}
.user .right .rightDown .ivu-collapse .ivu-collapse-item .ivu-collapse-content{
    background-color: transparent;
}
.user .right .rightDown .ivu-collapse .ivu-collapse-item .ivu-collapse-header span{
    float: right;
    padding-right: 30px;
}
.user .right .rightDown .item .ivu-upload{
    display: flex;
    align-items: center;
    justify-content: center;
}
.user .right .rightDown .ivu-divider-horizontal{
    margin: 10px 0px;
}
</style>

