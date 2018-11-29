<template>
    <div class="like">
        <Timeline v-if=" likeList.length > 0 ">
            <TimelineItem v-for="(item, index) in likeList" :key="index" :color="color[index]" >
                <Icon :type="iconType[index]" slot="dot" />
                <p class="time">{{item.addtime}}</p>
                <p class="mid"><Icon type='ios-heart' /> {{text}}喜欢了：</p>
                <h4 class="content" @click="toArt( item.id )">{{item.title}}</h4>
            </TimelineItem>
            <Page class="page" :total="num" :current="pageNum" @on-change = "pageChange" :page-size="pageSize" />
        </Timeline>
        <div class="empty" v-else>
            <h1>还没有喜欢的文章</h1>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data(){
        return {
            color : [ '#8e24aa', '#5e35b1', '#26c6da', '#388e3c', '#fbc02d' ],
            likeList : [],
            num : 3,
            pageNum : 1,
            pageSize : 5,
            iconType: [ "ios-color-fill", "ios-egg", "ios-flame", "ios-water", "ios-umbrella" ],
            text : "你"
        }
    },
    computed: {
        ...mapGetters( ['getUserInfo'] )
    },
    watch: {
        $route( to, from ){
            if( to.params.username === this.getUserInfo.username ){
                this.text = "你"
            }
        }
    },
    mounted() {
        console.log( '---------------------路由------------------------' )
        console.log( this.$route )
        let ss = {
            user : this.$route.params.username,
            page : 1
        }
        this.$api.users.getAllLike( ss ).then( res => {
            console.log( '------------------喜欢--------------------' )
            console.log( res )
            this.likeList = res.data.result
            this.num = res.data.likeCount.length
        } )
        this.text = this.$route.params.username === this.getUserInfo.username ? "你" : this.$route.params.username
    },
    methods: {
        pageChange( pages ){
            let ss = {
                user : this.$route.params.username,
                page : pages
            }
            this.$api.users.getAllLike( ss ).then( res => {
                this.likeList = res.data.result
                this.num = res.data.likeCount.length
            } )
        },
        toArt( art ){
            this.$router.push({ name : 'articleById', params : { id : art } })
        }
    }
}
</script>

<style scoped>
    .like{
        padding: 10px 0px 20px 30px;
        
    }
    .mid{
        margin-top: 8px;
        font-size: 14px;
        color: rgb(255, 0, 0);
    }
    .page{
        margin: 20px 0px;
    }
    .like .ivu-icon{
        font-size: 20px;
    }
</style>
<style>
    .like .ivu-timeline .ivu-timeline-item-content{
        margin: 10px;
        font-size: 16px;
    }
    .like .ivu-timeline .ivu-timeline-item-content .content{
        margin-top: 10px;
        padding-left: 50px;
        color: rgb(83, 83, 83);
        cursor: pointer;
    }
    .like .ivu-timeline .ivu-timeline-item-head{
        background-color: transparent;
    }
    
</style>
