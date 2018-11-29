<template>
    <div>
        <div class="editorTop">
            <Select v-model="model1" size="large" style="width:100px" class="topa" >
                <Option v-for="item in labelList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
             <ButtonGroup class="topa">
                <Button type="primary" @click="caogao">保存为草稿</Button>
                <Button type="primary" @click="fabiao" >发表</Button>
            </ButtonGroup>
        </div>
        <div class="editor">
            <Affix :offset-top="55" class="left">
            <div id="toolbar">
                <!-- <Tooltip content="字体大小" placement="right" :delay='400'>
                    <span class="ql-formats"><select class="ql-size">
                        <option value="small"></option>
                        <option selected></option>
                        <option value="large"></option>
                        <option value="huge"></option>
                    </select></span>
                </Tooltip> -->
                <Tooltip content="对齐" placement="right" :delay='400'>
                    <span class="ql-formats">
                        <select class="ql-align">
                            <option selected="selected"></option>
                            <option value="center"></option>
                            <option value="right"></option>
                            <option value="justify"></option>
                        </select>
                    </span>
                </Tooltip>
                <!-- <Tooltip v-for="(item,index) in iconList"  :content=item.content placement="right" :delay='400'>
                    <Button :class="item.class" />
                </Tooltip> -->
                 <Tooltip content="加粗" placement="right" :delay='400'>
                    <Button class="ql-bold" />
                </Tooltip>
                <Tooltip content="斜体" placement="right" :delay='400'>
                    <Button class="ql-italic" />
                </Tooltip>
                <Tooltip content="下划线" placement="right" :delay='400'>
                    <Button class="ql-underline" />
                </Tooltip>
                <Tooltip content="删除线" placement="right" :delay='400'>
                    <Button class="ql-strike" />
                </Tooltip>
                <Tooltip content="引用" placement="right" :delay='400'>
                    <Button class="ql-blockquote" />
                </Tooltip>
                <Tooltip content="代码块" placement="right" :delay='400'>
                    <Button class="ql-code-block" />
                </Tooltip>
                <Tooltip content="清除文本格式" placement="right" :delay='400'>
                    <Button class="ql-clean" />
                </Tooltip>
                <Tooltip content="链接" placement="right" :delay='400'>
                    <Button class="ql-link" />
                </Tooltip>
                <Tooltip content="插入图片" placement="right" :delay='400'>
                    <Button class="ql-image" />
                </Tooltip>
                <!-- <Tooltip v-for="(item,index) in hasValue"  :content=item.content placement="right" :delay='400'>
                    <Button :class="item.class" :value="item.value" />
                </Tooltip> -->
                <Tooltip content="标题一" placement="right" :delay='400'>
                    <Button class="ql-header" value="1" />
                </Tooltip>
                <Tooltip content="标题二" placement="right" :delay='400'>
                    <Button class="ql-header" value="2" />
                </Tooltip>
                <Tooltip content="有序列表" placement="right" :delay='400'>
                    <Button class="ql-list" value="ordered" />
                </Tooltip>
                <Tooltip content="无序列表" placement="right" :delay='400'>
                    <Button class="ql-list" value="bullet" />
                </Tooltip>
                <Tooltip content="下标" placement="right" :delay='400'>
                    <Button class="ql-script" value="sub" />
                </Tooltip>
                <Tooltip content="上标" placement="right" :delay='400'>
                    <Button class="ql-script" value="super" />
                </Tooltip>
                <Tooltip content="字体颜色" placement="right" :delay='400'>
                    <span class="ql-formats"><select class="ql-color">
                            <option selected="selected"></option>
                            <option value="#e60000"></option>
                            <option value="#ff9900"></option>
                            <option value="#ffff00"></option>
                            <option value="#008a00"></option>
                            <option value="#0066cc"></option>
                            <option value="#9933ff"></option>
                            <option value="#ffffff"></option>
                            <option value="#facccc"></option>
                            <option value="#ffebcc"></option>
                            <option value="#ffffcc"></option>
                            <option value="#cce8cc"></option>
                            <option value="#cce0f5"></option>
                            <option value="#ebd6ff"></option>
                            <option value="#bbbbbb"></option>
                            <option value="#f06666"></option>
                            <option value="#ffc266"></option>
                            <option value="#ffff66"></option>
                            <option value="#66b966"></option>
                            <option value="#66a3e0"></option>
                            <option value="#c285ff"></option>
                            <option value="#888888"></option>
                            <option value="#a10000"></option>
                            <option value="#b26b00"></option>
                            <option value="#b2b200"></option>
                            <option value="#006100"></option>
                            <option value="#0047b2"></option>
                            <option value="#6b24b2"></option>
                            <option value="#444444"></option>
                            <option value="#5c0000"></option>
                            <option value="#663d00"></option>
                            <option value="#666600"></option>
                            <option value="#003700"></option>
                            <option value="#002966"></option>
                            <option value="#3d1466"></option>
                        </select></span>
                </Tooltip>
                <Tooltip content="字体背景颜色" placement="right" :delay='400'>
                        <span class="ql-formats"> <select class="ql-background">
                            <option value="#000000"></option>
                            <option value="#e60000"></option>
                            <option value="#ff9900"></option>
                            <option value="#ffff00"></option>
                            <option value="#008a00"></option>
                            <option value="#0066cc"></option>
                            <option value="#9933ff"></option>
                            <option selected="selected"></option>
                            <option value="#facccc"></option>
                            <option value="#ffebcc"></option>
                            <option value="#ffffcc"></option>
                            <option value="#cce8cc"></option>
                            <option value="#cce0f5"></option>
                            <option value="#ebd6ff"></option>
                            <option value="#bbbbbb"></option>
                            <option value="#f06666"></option>
                            <option value="#ffc266"></option>
                            <option value="#ffff66"></option>
                            <option value="#66b966"></option>
                            <option value="#66a3e0"></option>
                            <option value="#c285ff"></option>
                            <option value="#888888"></option>
                            <option value="#a10000"></option>
                            <option value="#b26b00"></option>
                            <option value="#b2b200"></option>
                            <option value="#006100"></option>
                            <option value="#0047b2"></option>
                            <option value="#6b24b2"></option>
                            <option value="#444444"></option>
                            <option value="#5c0000"></option>
                            <option value="#663d00"></option>
                            <option value="#666600"></option>
                            <option value="#003700"></option>
                            <option value="#002966"></option>
                            <option value="#3d1466"></option>
                    </select></span>
                </Tooltip>
                <Tooltip content="回退" placement="right" :delay='400'>
                    <Icon type="ios-undo" @click="undo" size='18' />
                </Tooltip>
                <Tooltip content="前进" placement="right" :delay='400' class="redo">
                    <Icon type="ios-redo" @click="redo" size='18' />
                </Tooltip>
            </div>
            </Affix>
            <div class="right">
                <input type="text" v-model="title" class="title" placeholder="标题..." />
                <vue-editor
                    v-model="content"
                    ref="ee"
                    :customModules="customModulesForEditor"
                    :editorOptions="editorSettings"
                    useCustomImageHandler
                    @imageAdded="handleImageAdded"
                    />
            </div>
        </div>
    </div>
</template>

<script>

const iconList = [
    {
        content : '加粗',
        class : 'ql-bold'
    },
    {
        content : '斜体',
        class : 'ql-italic'
    },
    {
        content : '下划线',
        class : 'ql-underline'
    },
    {
        content : '删除线',
        class : 'ql-strike'
    },
    {
        content : '引用',
        class : 'ql-blockquote'
    },
    {
        content : '代码块',
        class : 'ql-code-block'
    },
    {
        content : '清除文本格式',
        class : 'ql-clean'
    },
    {
        content : '链接',
        class : 'ql-link'
    },
    {
        content : '插入图片',
        class : 'ql-image'
    },
]

const hasValue = [
    {
        content : '标题1',
        class : 'ql-header',
        value : '1'
    },
    {
        content : '标题2',
        class : 'ql-header',
        value : '2'
    },
    {
        content : '有序列表',
        class : 'ql-list',
        value : 'ordered'
    },
    {
        content : '无序列表',
        class : 'ql-list',
        value : 'bullet'
    },
    {
        content : '下标',
        class : 'ql-script',
        value : 'sub'
    },
    {
        content : '上标',
        class : 'ql-script',
        value : 'super'
    },
    // {
    //     content : '左缩进',
    //     class : 'ql-indent',
    //     value : '-1'
    // },
    // {
    //     content : '右缩进',
    //     class : 'ql-indent',
    //     value : '+1'
    // },
    // {
    //     content : '左右对齐',
    //     class : 'ql-direction',
    //     value : 'rtl'
    // }
]


import axios from 'axios'
import { VueEditor , Quill} from 'vue2-editor'
import ImageResize from 'quill-image-resize-module'
import ImageCompressor from 'image-compressor.js'

import { mapActions, mapGetters } from 'vuex'

var timerId = {}


export default {
    components: {
        VueEditor
    },
    data(){
        return{
            labelList : [
                {
                    value: "新闻",
                    label: "新闻"
                },
                {
                    value: "css小点",
                    label: "css小点"
                },
                {
                    value: "js",
                    label: "js"
                },
                {
                    value: "讨论区",
                    label: "讨论区"
                }
            ],
            model1: '讨论区',
            iconList,
            hasValue,
            title: '',
            content: '正文......',
            originArt : {},
            customModulesForEditor: [
                { alias: 'imageResize', module: ImageResize },
            ],
            editorSettings: {
                theme: 'snow',
                modules: {
                    toolbar: '#toolbar',
                    imageResize: true,
                    history: {
                        delay: 2000,
                        maxStack: 500,
                        userOnly: true
                    }
                }
            }
        }
    },
    computed: {
        ...mapGetters([ 'getArticleId' ])
    },
    mounted() {
        if(this.getArticleId > 0 ){
            this.$api.article.getArticle( this.getArticleId ).then( res => {
                console.log('-------------------修改的文章----------------------')
                console.log( res )
                this.content = res.data.result.content
                this.title = res.data.result.title
                this.model1 = res.data.result.label
                this.originArt = res.data.result
            } )
            //  = this.getArticleOne.content
            //  = this.getArticleOne.title
            // this.model1 = this.getArticleOne.label
        }
    },
    methods:{
        ...mapActions([ 'upArticle', 'setArticleId', 'updateArt' ]),
        handleImageAdded: function(file, Editor, cursorLocation, resetUploader) {
        if(file.size > 1024*1024*2){
            new ImageCompressor(file,{
                quality : .7,
                success(result){
                    var formData = new FormData();
                    formData.append('file', result, result.name);
                    console.log(result)
                }
            })
        }else{
            var formData = new FormData();
            formData.append('image', file)
        }
        this.$api.article.upImage( formData )
        .then((result) => {
            let url = result.data.imgUrl // Get url from response
            Editor.insertEmbed(cursorLocation, 'image', url)
            //   resetUploader();
        })
        .catch((err) => {
            console.log(err);
        })
      },
      undo(){
        this.$refs.ee.quill.history.undo()
      },
      redo(){
        this.$refs.ee.quill.history.redo()
      },
      verify(){
          if(!this.title){
              this.$Message.info({
                  duration: 6,
                  content: "请输入标题......"
              })
              return false
          }
        if(!this.content){
            this.$Message.info({
                duration: 6,
                content: "请输入正文......"
            })
            return false
        }
        if( this.$store.state.state.userInfo.admin !== 1 ){
            if( this.model1 !== '讨论区' ){
                this.$Message.info({
                    duration: 6,
                    content: "您现在还不是会员，只能在讨论区发表文章......"
                })
                return false
            }else{
                return true
        }}
        return true
      },
      //修改文章时，发表和保存草稿的方法
      caogao(){
            var ss = this.verify()
            if(ss){
                //判断是否是重新编辑文章
                if( this.getArticleId ){
                    var formData = {
                        id : this.originArt.id,
                        title : this.title,
                        content : this.content,
                        caogao : 1,
                        label : this.model1
                    }
                    this.updateArt(formData).then( res => { 
                        if( res.data.success ){
                            this.$Message.info({
                                    content : "保存成功.....",
                                    duration: 5,
                                })
                                this.title = '',
                                this.content = "正文......"
                                var artId = -4
                                this.setArticleId( artId )
                                return true
                            }else{
                                return false
                            }
                    } )
                }else{
                    var formData = {
                        user : this.$store.state.state.userInfo.username,
                        title : this.title,
                        content : this.content,
                        caogao : 1,
                        label : this.model1
                    }
                    this.upArticle(formData).then( res => {
                        if( res.data.success ){
                            this.$Message.info({
                                content : "保存成功.....",
                                duration: 5,
                            })
                            this.title = '',
                            this.content = "正文......"
                            return true
                        }else{
                            return false
                        }
                    } )
                }
          }
      },
      fabiao(){
            var ss = this.verify()
            if(ss){
                //判断是否是重新编辑文章
                if( this.getArticleId > 0 ){
                    var formData = {
                        id : this.originArt.id,
                        title : this.title,
                        content : this.content,
                        caogao : 0,
                        label : this.model1
                    }
                    console.log('此处要发送请求')
                    this.updateArt(formData).then( res => {
                        if( res.data.success ){
                            this.$Message.info({
                                    content : "保存成功.....",
                                    duration: 5,
                                })
                                this.title = '',
                                this.content = "正文......"
                                var artId = -4
                                this.setArticleId( artId )
                            }
                    })
                }else{
                    var formData = {
                        user : this.$store.state.state.userInfo.username,
                        title : this.title,
                        content : this.content,
                        caogao : 0,
                        label : this.model1
                    }
                    this.upArticle( formData ).then( res => {
                        console.log(res)
                        if( res.data.success ){
                            this.$Message.info({
                                content : res.data.info,
                                duration: 5,
                            })
                            this.title = '',
                            this.content = "正文......"
                        }
                    })
                }
            }
      }
    },
    beforeRouteLeave (to, from, next) {
        if( (this.title === this.originArt.title) && (this.model1 === this.originArt.label) && (this.content === this.originArt.content) ){
            var artId = -4
            this.setArticleId( artId )
            next()
        }else{
            if( this.title !== "" ){
                this.$Modal.confirm({
                    title: '你即将离开编辑页面...',
                    content: '<p>是否放弃修改？？？</p>',
                    onOk: () => {
                        this.title = '',
                        this.content = "正文......"
                        var artId = -4
                        this.setArticleId( artId )
                        next()
                    },
                    onCancel: () => {
                    }
                });
            }else{
                next()
            }
        }
    }
}
</script>

<style scoped>
#toolbar{
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    border: none!important;
    z-index: 99;
    text-align: left;
}
.left{
    width: 40px;
    position: relative;
}
.editor{
    max-width: 1050px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
}
.redo{
    padding-left: 12px;
}
.right{
    width: 90%;
}
.title{
    border: none;
    width: 100%;
    height: 80px;
    font-size: 40px;
}
.title:focus{
    outline: none;

}
.editorTop{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 10px;
}
.topa{
    margin-right: 30px;
}
</style>
<style>
.ql-picker{
    top: -3px!important;
}
.ql-editor{
    max-width: 1050px;
    margin: 0 auto;
    border: none!important;
}
.ql-snow{
    border: none!important;
}
</style>

