<template>
    <div class="shangchuan">
        <div class="nav">
            <Button @click="getArticleList">我的文章</Button>
            <Button @click="getCaogao">我的草稿</Button>
        </div>
        <div class="main">
            <div class="a" v-if="list.length">
                <div class="wenzhang" v-for="(item, index) in list" :key="index">
                    <div class="wenzahngLeft">
                        <div class="top">
                            <h2><a @click="setArticle(item.id)" >{{item.title}}</a></h2>
                        </div>
                        <p class="down">
                            <ButtonGroup size="small">
                                <Button><Icon type="ios-pricetags-outline" size='20' />{{item.label}}</Button>
                                <Button><Icon type="ios-eye" size='20' />{{item.click_num||0}}</Button>
                                <Button><Icon type="ios-text-outline"  size='20'/>{{item.disNum||0}}</Button>
                                <Button><Icon type="ios-heart-outline" size='20' />{{item.likenum||0}}</Button>
                            </ButtonGroup>
                            <span>发表于：{{item.time}}</span>
                            <Poptip placement="bottom"  v-if="getUserInfo.username === $route.params.username " >
                                <a><Icon type="ios-more" size='30' color="#ff9900" /></a>
                                <div slot="content" class="handle">
                                    <a  @click="toEditor(item.id) " ><Icon type="md-color-wand"size='25'/></a>
                                    <a><Icon type="ios-trash-outline"size='25' @click="showDelete(item.id)" /> </a>
                                </div>
                            </Poptip>
                        </p>
                    </div>
                </div>
                <Page class="page" :total="num" :current="pageNum" @on-change = "pageChange" :page-size="pageSize" />
            </div>
            <div v-else class="empty">
                <div class="kong">
                    <div class="tu"></div>
                    <p>还没有文章，开始  <router-link style="color: green" to="/editor">写一篇文章</router-link> </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {
    data(){
        return{
            list : [],
            pageSize : 5,
            pageNum : parseInt(this.$route.query.page) || 1,
            num : 0,
            nowPage : 0,
            caogao : 0
        }
    },
    computed : {
        ...mapGetters([ 'getUserName', 'getUserInfo' ])
    },
    methods: {
        ...mapActions([ 'autoLogin', 'deleteArt','setArticleId' ]),
        pageChange( val ){
            this.initList( val )
        },
        initList( page ){
            this.nowPage = page
            var user = this.$route.params.username
            var caogao = this.caogao
            this.$api.article.getArticleByUser(  user,page,caogao ).then( res => {
                console.log( res )
                this.num = res.data.count
                this.list = res.data.result
            })
        },
        setArticle(val){
            if( this.caogao ){
                this.$Modal.info({
                    title: '提示',
                    content: '<p>草稿不能还没发布暂时不能查看</p>'
                });
            }else{
                this.$router.push({ name : 'articleById', params : { id : val } })
            }
        },
        showDelete( id ){
            this.$Modal.confirm({
                title: '提示',
                content: '<p>你确定要删除此文章吗？？</p>',
                onOk: () => {
                    this.deleteArt( id ).then( res => {
                        if( res.data.success ){
                            this.$Message.info('删除成功');
                            this.initList( this.nowPage )
                        }
                    } )
                },
            });
        },
        toEditor(id){
            this.setArticleId( id )
            this.$router.push({ name : 'editor' })
        },
        getArticleList(){
            this.caogao = 0
            this.initList( 1 )
        },
        getCaogao(){
            this.caogao = 1
            this.initList( 1 )
        }
    },
    mounted() {
        // var token = window.localStorage.getItem('token')
        // if( this.getUserName === '' ){
        //     if(token){
        //         this.autoLogin(token).then( res => {
        //             this.initList( 1 )
        //         })
        //     }
        // }else{
             this.initList( 1 )
        // }
    },
}
</script>

<style scoped>
.shangchuan .nav{
    height: 50px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgb(202, 202, 202);
}
.shangchuan .nav button{
    background-color: #eeeeee;
    margin-left: 30px;
    color: black;
}
.shangchuan .main .wenzhang{
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: left;
    height: 120px;
    border-bottom: 1px solid rgb(192, 192, 192);
}
.shangchuan .main .wenzhang .wenzahngLeft{
    width: 95%;
    height: 80px;
}
.shangchuan .main .wenzhang .wenzahngLeft .top{
    height: 60%;
}
.shangchuan .main .wenzhang .wenzahngLeft .down{
    height: 25%;
}
.shangchuan .main .wenzhang .wenzahngLeft .down span{
    margin: 0 15px;
}
.shangchuan .main .wenzhang .wenzahngLeft .down i{
    margin: 0px 4px;
}
.shangchuan .main .wenzhang .wenzahngLeft .down .handle{
    display: flex;
    justify-content: space-around;
}
.page{
    padding: 20px 0px;
}
.shangchuan .main .empty{
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.tu{
    width: 200px;
    height: 100px;
    background-color: #eeeeee;
    margin-bottom: 20px;
}
</style>
