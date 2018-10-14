<template>
    <div class="tan">
        <div class="articleLeft">
            <Affix :offset-top="100">
                <ButtonGroup vertical>
                    <Button icon="ios-heart-outline"></Button>
                    <Button icon="ios-chatbubbles-outline"  ></Button>
                    <Button icon="ios-git-branch"></Button>
                    <Button icon="ios-more"></Button>
                </ButtonGroup>
            </Affix>
        </div>
        <div class="articleRight">
            <h1>{{getArticleOne.title}}</h1>
            <div class="about">
                <span>作者：{{getArticleOne.user_name}}</span><span>发表于：{{getArticleOne.time}}</span>
            </div>
            <div class="content" v-html="getArticleOne.content" ></div>
        </div>
        
    </div>
</template>

<script>

import { mapActions,mapGetters } from 'vuex'


export default {
    data(){
        return{
            article: {}
        }
    },
    computed: {
        ...mapGetters([ 'getArticleOne', 'getArticleStatus' ])
    },
    methods: {
        ...mapActions([ 'getArticle' ])
    },
    mounted() {
        if( this.getArticleStatus ){
            console.log('vuex里面有文章')
        }else{
            var params = this.$route
            this.getArticle( params.params.id )
        }
    },
}
</script>

<style scoped>
.tan{
    padding: 20px;
    display: flex;
}
.tan .articleLeft{
    margin-right: 25px;
}
.about{
    margin: 20px 0px;
}
.about span{
    margin-right: 15px;
}
.tan .articleRight{
    width: 80%;
}
.content{
    font-size: 18px; 
}
</style>

<style>
.tan .articleLeft .ivu-btn-group .ivu-btn-icon-only .ivu-icon{
    font-size : 22px;
}
</style>






