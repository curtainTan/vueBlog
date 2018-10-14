
import allapi from '../api/modul/index'



import {
    AUTO_USERINFO,
    SHOW_LOGIN,
    HIDE_LOGIN,
    SET_TOKEN,
    UPDATA_USERINFO,
    LOGOUT,
    UPHEADIMG,
    SET_ARTICLE,
    SET_ARTICLE_SATUS,
    SET_ISUPDATE_SATUS
} from './mutation-type'



export default {
    getUserInfo ( {commit}, payload ){
        allapi.users.auto_logon( payload )
        then( res => {
            var userInfo = res.data
            commit( AUTO_USERINFO, { userInfo } )
        })
    },
    show ( {commit} ){
        var payload = true
        commit( SHOW_LOGIN,  payload )
    },
    hide ( {commit}){
        var payload = false
        commit( HIDE_LOGIN, payload )
    },



    //自动登录
    autoLogin(  {commit}, payload  ){
        var aa = new Promise((res,rej)=>{
            allapi.users.auto_login( payload ).then(result=>{
                var userInfo = result.data
                res(result)
                commit( AUTO_USERINFO, { userInfo } )
                commit( SET_TOKEN, { userInfo } )
            })
        })
        return aa
    },


    //登录
    login ( {commit}, payload ){
        var aa = new Promise((res,rej)=>{
            allapi.users.login( payload ).then((result) =>{
                if(result.data.success){     //登录成功
                    var userInfo = result.data
                    // console.log("此处是登录")
                    // console.log(userInfo)
                    res(result.data)
                    commit( AUTO_USERINFO, { userInfo } )
                    commit( SET_TOKEN, { userInfo } )
                    window.localStorage.setItem('token', userInfo.token)
                }else{
                    res(result.data)
                }
            })
        })
        return aa
    },
    //注册
    register ( {commit}, payload ){
        var aa = new Promise((res,rej)=>{
            allapi.users.register(payload).then(result => {
                res(result)
            })
        })
        return aa
    },
    //退出登录
    logOut ( {commit} ){
        var aa = new Promise( (res, rej) => {
            var userInfo = {
                token : ''
            }
            commit( SET_TOKEN , { userInfo })
            commit( LOGOUT )
            window.localStorage.removeItem('token')
            res(true)
        })
        return aa
    },
    //更新个人信息
    userUpdata ( {commit}, payload ){
        var aa = new Promise( (res, rej) => {
            allapi.users.updata( payload ).then( result => {
                if(result.data.success){
                    var userInfo = payload
                    commit( UPDATA_USERINFO, { userInfo } )
                }
                res(result.data)
            })
        })
        return aa
    },


    //更新头像
    upHeadImg ( {commit}, payload ){
        commit( UPHEADIMG, { payload } )
    },


    //上传文章
    upArticle( {commit}, payload ){
        var aa = new Promise( (res, rej) => {
            allapi.article.upArticle( payload ).then( result => {
                res(result)
            })
        })
        return aa
    },

    //获取一片文章的所有信息到vuex保存
    getArticle( {commit}, payload ){
        var status = true
        commit( SET_ARTICLE_SATUS, {status} )
        var aa = new Promise( (res, rej) => {
            allapi.article.getArticle(payload).then( result => {
                var data = result.data.result
                console.log('此处是获取文章')
                console.log(result)
                res( result )
                commit( SET_ARTICLE, { data } )
            })
        })
        return aa
    },
    deleteArt( {commit}, payload ){
        var aa = new Promise( (res, rej) => {
            allapi.article.deleteArt(payload).then( result => {
                res( result )
            })
        })
        return aa
    },


    setIsUpdate( {commit}, status ){
        console.log(status)
        commit( SET_ISUPDATE_SATUS, { status } )
    },

    //更新文章
    updateArt( {commit}, payload ){
        var aa = new Promise( (res, rej) => {
            allapi.article.updateArt( payload ).then( result => {
                res(result)
            })
        })
        return aa
    }







}



























