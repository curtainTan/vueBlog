

var userInfo = {
    headImg: '',
    username: '',
    msg: '',
    admin: '',
    signature: '',
    work: '',
    introduce: ''
}


//token
var token = window.localStorage.getItem('token')||""
//展示注册和登录
var showLogin = false

//文章重新编辑标识
var isUpdate = false


var article = {}
//初始化页面，判断vuex内是否有文章，防止多次请求
var articleStatus = false

const state = {
    token,
    userInfo,
    showLogin,
    article,
    articleStatus,
    isUpdate
}


export default({
    state
})




