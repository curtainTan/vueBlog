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

const getArticleId = state => {
    return state.state.articleId
}






export default ({
    showLogin,
    getUserInfo,
    getUserName,
    getHeadImg,
    getArticleId
})















