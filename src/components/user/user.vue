<template>
    <div class="user">
        <div class="left">
            <div class="top">
                <div class="headimg">
                    <img :src="$store.state.state.userInfo.headImg" alt="">
                </div>
                <div class="main">
                    <h3>{{$store.state.state.userInfo.username}}</h3>
                    <p>个性签名：</p>
                    <div class="mainDown">
                        <ButtonGroup>
                            <Button type="primary" ghost @click="tomy">编辑个人资料</Button>
                            <Button type="primary"  @click="out" >退出登录</Button>
                        </ButtonGroup>
                    </div>
                </div>
            </div>
            <div class="nav">
                <Tabs :value="$route.path" @on-click="qwe">
                    <TabPane label="动态" name="/user" ></TabPane>
                    <TabPane label="喜欢" name="/user/xihuan" ></TabPane>
                    <TabPane label="回答" name="/user/huida" ></TabPane>
                    <TabPane label="文章" name="/user/wenzhang" ></TabPane>
                    <TabPane label="设置" name="/user/my" ></TabPane>
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
            <div class="rightDown">
                <Collapse>
                    <Panel name="1">
                        关注的文件<span>23</span>
                        <p slot="content">史蒂夫·乔布斯（Steve Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。</p>
                    </Panel>
                    <Panel name="2">
                        关注的问题<span>23</span>
                        <p slot="content">斯蒂夫·盖瑞·沃兹尼亚克（Stephen Gary Wozniak），美国电脑工程师，曾与史蒂夫·乔布斯合伙创立苹果电脑（今之苹果公司）。斯蒂夫·盖瑞·沃兹尼亚克曾就读于美国科罗拉多大学，后转学入美国著名高等学府加州大学伯克利分校（UC Berkeley）并获得电机工程及计算机（EECS）本科学位（1987年）。</p>
                    </Panel>
                    <Panel name="3">
                        关注的话题<span>23</span>
                        <p slot="content">乔纳森·伊夫是一位工业设计师，现任Apple公司设计师兼资深副总裁，英国爵士。他曾参与设计了iPod，iMac，iPhone，iPad等众多苹果产品。除了乔布斯，他是对苹果那些著名的产品最有影响力的人。</p>
                    </Panel>
                </Collapse>
            </div>
        </Affix>
    </div>
</template>

<script>
import shangchuan from './shangchuan.vue'
import { mapActions } from 'vuex'

export default {
    data(){
        return{
            // value: '/user'
        }
    },
    components: {
        shangchuan
    },
    methods: {
        ...mapActions([ 'logOut' ]),
        qwe( tan ){
            this.$router.push(tan)
        },
        tomy(){
            this.$router.push('/user/my')
            // this.value = '/user/my'
            // console.log(this.$route.path)
        },
        out(){
            this.logOut().then( res => {
                this.$router.push('/')
                this.$Message.info({
                    content: '已经退出.....',
                    duration: 3
                });
            })
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
    background-color: #ffffff;
    margin-top: 20px;
    border-radius: 4px;
    box-shadow: 1px 1px 4px rgb(165, 165, 165);
}
.user .left .content{
    min-height: 400px;
    border-radius: 5px;
    background-color: #ffffff;
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
</style>

