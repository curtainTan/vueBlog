import state from "./state";


const showLogin = state => {
	return state.state.showLogin;
}
const getUserInfo = state => {
    return state.state.userInfo
}

const getUserName = state => {
    return state.state.userInfo.username
}

const getHeadImg = state => {
    return state.state.userInfo.headImg
}

const getArticleOne = state => {
    return state.state.article
}
const getArticleStatus = state => {
    return state.state.articleStatus
}
const getisUpdate = state => {
    return state.state.isUpdate
}






export default ({
    showLogin,
    getUserInfo,
    getUserName,
    getHeadImg,
    getArticleOne,
    getArticleStatus,
    getisUpdate
})















