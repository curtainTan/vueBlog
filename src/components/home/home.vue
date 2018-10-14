<template>
    <div class="home">
        <Affix>
            <div class="homeHeader">
                <div class="header">
                    <Menu class="left" mode="horizontal" :theme="theme1" :active-name="this.$route.path" @on-select="select">
                        <MenuItem name="/">
                            <Icon type="ios-home-outline":size= size />
                                home
                        </MenuItem>
                        <MenuItem name="/css">
                            <Icon type="ios-color-palette-outline" :size= size />
                                ss小点
                        </MenuItem>
                        <MenuItem name="/js">
                            <Icon type="logo-nodejs" :size= size />
                                js算法
                        </MenuItem>
                        <MenuItem name="/discuss">
                            <Icon type="ios-chatbubbles-outline" :size= size />
                                讨论区
                        </MenuItem>
                        <MenuItem name="/editor" v-if="this.$store.state.state.userInfo.username" >
                            <Icon type="ios-create-outline" :size= size />
                                写文章
                        </MenuItem>
                    </Menu>
                    <div class="right">
                        <login v-if="!state.userInfo.username" />
                        <div class="userImg" v-else >
                            <a @click="toUser" class="touxiang"><img width="35px" :src="this.getHeadImg||'http://i2.hdslb.com/bfs/face/ea61f3ace77785b5820a50522d54a257a54e498b.jpg'" alt=""></a>
                            <Badge :count="$store.state.state.userInfo.msg" ><a href=""><Icon type="ios-notifications-outline" size="26"/></a></Badge>
                        </div>
                    </div>
                </div>
            </div>
        </Affix>
        <div class="down">
            <!-- <keep-alive> -->
                <router-view />
            <!-- </keep-alive> -->
            <div class="footer"></div>
        </div>
    </div>
</template>

<script>
import login from './login.vue'


import { mapGetters, mapState } from 'vuex'

export default {
    data(){
        return{
            theme1: 'light',
            size: '25',
        }
    },
    computed: {
        ...mapGetters([ 'getHeadImg' ]),
        ...mapState([ 'state' ])
    },
    components: {
        login
    },
    methods: {
        select(s){
            this.$router.push(s)
        },
        toUser(){
            this.$router.push('/user')
        }
    },
    watch: {
        // '$route'( to, from ){
        //     console.log( to.path )
        //     console.log( to, from )
        // }
    }
}
</script>

<style scoped>
.homeHeader{
    width: 100%;
    box-shadow: 0 2px 3px hsla(0,0%,4%,.1);
    background-color: rgb(255, 255, 255);
    z-index: 999;
}
.down{
    max-width: 960px;
    margin: 0 auto;
    margin-top: 40px;
    min-height: 400px;
    text-align: left;
    border-radius: 5px;
    background-color: rgb(255, 255, 255);
    box-shadow: 2px 2px 3px hsla(0,0%,4%,.1);
}
.header{
    max-width: 960px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

}
.userImg .touxiang{
    width: 35px;
    height: 35px;
    border-radius: 13px;
    overflow: hidden;
    margin-right: 10px;
}
.userImg .头像 img{
    width: 35px;
}
.right .userImg{
    display: flex;
    align-items: center;
}
.footer{
    height: 200px;
}
</style>
<style>
.header .ivu-menu-horizontal.ivu-menu-light::after{
    height: 0!important;
}
</style>






