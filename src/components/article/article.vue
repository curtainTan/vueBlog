<template>
    <div class="tan">
        <div class="articleLeft">
            <Affix :offset-top="80">
                <ButtonGroup vertical>
                    <Button size="large" @click="like" :loading="loading" >
                        <Badge :count="likeNum" type="primary" >
                            <Icon :type='getUserInfo.likeList.indexOf( $route.params.id ) < 0 ? "ios-heart-outline" : "ios-heart"' />
                        </Badge>
                    </Button>
                    <Button size="large" ><Badge :count="num"><Icon type="ios-chatbubbles-outline" /></Badge></Button>
                    <Button size="large" ><Icon type="ios-git-branch" /></Button>
                    <Button size="large" ><Badge><Icon type="ios-more" /></Badge></Button>
                </ButtonGroup>
            </Affix>
        </div>
        <div class="articleRight">
            <h1>{{article.title}}</h1>
            <div class="about">
                <span>作者：<router-link :to="{ path : '/user/' + article.user_name }">{{article.user_name}}</router-link></span>
                <span>发表于：{{article.time}}</span>
            </div>
            <div class="content" v-html="article.content" ></div>
            <div class="about">
                <Tag type="dot" color="warning">{{article.label}}</Tag>
            </div>
            <Divider>评论</Divider>
            <div class="discuss">
                <div class="to">
                    <img :src="getUserInfo.headImg||headImg" alt="">
                    <Input v-model="value" style="width: 60%; margin-right: 15px" placeholder="输入评论..." />
                    <Button type="primary" shape="circle" @click="send" >发表</Button>
                </div>
                <div class="discuss-item" v-for="(item, index) in items" :key="index">
                    <div class="item-left">
                        <img :src="item.headimg" alt="">
                    </div>
                    <div class="item-right">
                        <p><router-link :to="{ path : '/user/' + item.username }">{{item.username}}</router-link></p>
                        <p class="dis_content">{{item.content}}</p>
                        <p class="p_time">{{item.p_time}}</p>
                    </div>
                </div>
                <Page v-if="items.length > 0" class="page" :total="num" :current="pageNum" @on-change = "pageChange" :page-size="pageSize" />
            </div>
        </div>
    </div>
</template>

<script>

import { mapActions,mapGetters } from 'vuex'


export default {
    data(){
        return{
            value: '',
            article: {},
            items: [],
            num : 3,
            loading : false,
            pageNum : 1,
            likeNum : 0,            
            likeIcon : 'ios-heart-outline',
            pageSize : 10,
            headImg: 'https://user-gold-cdn.xitu.io/2018/10/30/166c4098ac89c64a?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1'
        }
    },
    computed: {
        ...mapGetters([ 'getUserInfo' ])
    },
    methods: {
        ...mapActions([ 'show', 'setLikeList' ]),
        send(){
            console.log('----------------发送----------------------')
            if( this.getUserInfo.username ){
                if( this.value === '' ){

                }else{
                    var data = {
                        content : this.value,
                        id : this.$route.params.id,
                        user : this.getUserInfo.username
                    }
                    this.$api.article.postDiscuss( data ).then( res => {
                        this.value = ""
                        this.items = res.data.result
                        this.num = res.data.count
                    } )
                }
            }else{
                this.$Notice.open({
                    title: '温馨提示',
                    desc: '只有登录后，才能发表评论.',
                    duration: 3
                });
                this.show()
            }
        },
        pageChange( num ){
            var ss = {
                id : this.$route.params.id,
                page : num
            }
            this.$api.article.disPage( ss ).then( res => {
                console.log( res )
                this.items = res.data.result
                this.num = res.data.count
            } )
        },
        like(){
            if( this.getUserInfo.username ){
                this.loading = true
                let data = {
                    user : this.getUserInfo.username,
                    id : this.$route.params.id
                }
                this.$api.article.like( data ).then( res => {
                    console.log('-------------喜欢---------------------')
                    console.log( res )
                    this.setLikeList( res.data.result )
                    setTimeout( () => {
                        this.loading = false
                        this.likeNum = res.data.like
                    }, 500 )
                })
            }else{
                this.$Notice.open({
                    title: '温馨提示',
                    desc: '只有登录后，才能发表评论.',
                    duration: 3
                });
                this.show()
            }
        }
    },
    mounted() {
        var params = this.$route
        this.$api.article.getArticle( params.params.id ).then( res => {
            console.log('-----------------获取一片文章的信息---------------------')
            console.log( res )
            this.article = res.data.result
            this.items = res.data.discuss
            this.num = res.data.count
            this.likeNum = res.data.like
        } )
    },
}
</script>

<style scoped>
.tan{
    padding: 20px;
    display: flex;
    justify-content: space-between;
}
.about{
    margin: 40px 0px;
}
.about span{
    margin-right: 15px;
}
.tan .articleRight{
    min-width: calc( 100% - 70px );
}
.content{
    font-size: 18px; 
}
.discuss .to{
    display: flex;
    align-items: center;
    margin-bottom: 30px;
}
.discuss .to img,
.discuss .discuss-item .item-left img{
    width: 40px;
    border-radius: 20px;
    margin-right: 15px;
}
.discuss .discuss-item .item-right{
    width: 100%;
    border-bottom: 1px solid #dadada;
}
.discuss .discuss-item .item-right .dis_content{
    padding: 10px 0px;
}
.discuss .discuss-item{
    display: flex;
    padding: 15px 0px;
    width: 90%;
    padding: 0px 20px;
    margin-bottom: 20px;
}
.discuss .discuss-item .p_time{
    margin-top: 10px;
    margin-bottom: 15px;
    color: #999;
}


.articleLeft .ivu-btn span i{
    font-size: 20px;
}
.articleLeft .ivu-btn{
    padding: 8px 0px;
    width: 55px;
}

</style>

<style>
.tan .articleLeft .ivu-btn-group .ivu-btn-icon-only .ivu-icon{
    font-size : 22px;
}
.ivu-icon-ios-heart{
    color: red;
}
.articleLeft .ivu-btn span sup{
    transform: scale(.7,.7) translateX(20px);
}
/* 设置转动图标的大小 */
/* .tan .articleLeft .ivu-btn-group .ivu-btn .ivu-load-loop{
    font-size : 18px;
} */
</style>






