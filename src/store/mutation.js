


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
    [LOGOUT] ( state ){
        state.state.userInfo.username = ''
        state.state.userInfo.signature = ''
        state.state.userInfo.msg = ''
        state.state.userInfo.work = ''
        state.state.userInfo.introduce = ''
    },
    [AUTO_USERINFO] ( state, { userInfo } ){
        state.state.userInfo.username = userInfo.user_name
        state.state.userInfo.signature = userInfo.sign
        state.state.userInfo.msg = userInfo.msg
        state.state.userInfo.admin = userInfo.admin
        state.state.userInfo.work = userInfo.work
        state.state.userInfo.introduce = userInfo.introduce
        state.state.userInfo.headImg = userInfo.headImg
    },
    [UPDATA_USERINFO] ( state, { userInfo } ){
        state.state.userInfo.work = userInfo.work
        state.state.userInfo.introduce = userInfo.introduce
    },
    [SHOW_LOGIN] ( state, payload ){
        state.state.showLogin = payload
    },
    [HIDE_LOGIN] ( state, { payload } ){
        state.state.showLogin = payload
    },
    [SET_TOKEN] ( state, { userInfo } ){
        state.state.token = userInfo.token
    },
    [UPHEADIMG] ( state, { payload } ){
        state.state.userInfo.headImg = payload
    },
    [SET_ARTICLE]( state, { data } ){
        state.state.article = data
    },
    [SET_ARTICLE_SATUS]( state, { status } ){
        state.state.articleStatus = status
    },
    [SET_ISUPDATE_SATUS]( state, { status } ){
        state.state.isUpdate = status
    }
}


















