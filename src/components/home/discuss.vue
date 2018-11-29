<template>
    <div class="news">
        <div class="newsTitle">讨论区</div>
        <div class="newsMain">
            <Card v-for="(item, index) in list" :key="index">
                <div class="card">
                    <div class="left">
                        <Icon type="ios-images" />
                    </div>
                    <div class="right">
                        <a >
                            <span @click="setArticle(item.id)" class="title">{{item.title}}</span>
                        </a>
                        <div class="down">
                            <span>{{item.time}}</span>
                            <span><Icon type="md-eye" />浏览量：{{item.click_num}}</span>
                            <span>#作者：<router-link :to="{ path : '/user/' + item.user_name }">{{item.user_name}}</router-link></span>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
        <Page v-if="num > 5" :total="num" :current="pageNum" @on-change = "pageChange" :page-size="pageSize" />
        <Spin size="large" fix v-if="spinShow" ></Spin>
    </div>
</template>

<script>

import { mapActions } from 'vuex'
export default {
    data(){
        return {
            list : [],
            pageNum: parseInt(this.$route.query.page) || 1,
            num: 0,
            pageSize: 5,
            spinShow: true
        }
    },
    methods: {
        ...mapActions([ 'getArticle' ]),
        pageChange( val ){
            this.$router.push({ path: '/discuss', query: { page: val } })
            this.initList( '/discuss', val )
        },
        initList( path, page ){
            this.spinShow = true
            this.$api.article.getArticleList( path, page ).then( res => {
                console.log('此处是主页的数据')
                console.log(res)
                this.num = res.data.count
                this.list = res.data.result
                this.spinShow = false
            })
        },
        setArticle(val){
            this.$router.push({ name : 'articleById', params : { id : val } })
        }
    },
    mounted() {
        var params = this.$route
        this.initList( params.path, params.query.page )
    },
}
</script>

<style scoped>
.newsTitle{
    font-size: 40px;
    margin-bottom: 20px;
}
.news{
    padding: 20px;
}
.card{
    display: flex;
}
.card .left{
    width: 80px;
    height: 80px;
    text-align: center;
    line-height: 90px;
    font-size: 40px;
}
.card .right .down span{
    margin-right: 15px;
}
.right .title{
    display: block;
    margin: 10px 0px 20px;
    font-size: 18px;
}
.ivu-card{
    margin-bottom: 20px;
}
</style>
