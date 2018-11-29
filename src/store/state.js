


var userInfo = {
    headImg: '',
    username: '',
    msg: '',
    admin: '',
    signature: '',
    work: '',
    introduce: '',
    likeList: [],
    bgImg : ''
}


//token
var token = window.localStorage.getItem('token')||""
//展示注册和登录
var showLogin = false
//编辑文章的id
var articleId = -8

const state = {
    token,
    userInfo,
    showLogin,
    articleId
}


export default({
    state
})




