
import axios from '../http.js'
// import axios from 'axios'
//域名设置
// const host = 'http://localhost:3000/auth'

const host = 'http://www.curtaintan.club/auth'

const users = {
    //登录
    login( params ){
        return axios.post( `${host}/login`, params )
    },
    //注册
    register( params ){
        return axios.post( `${host}/register`, params )
    },
    //自动登录
    auto_login( params ){
        return axios.post( `${host}/autoLogin`, params )
    },
    //更新信息
    updata( params ){
        return axios.post( `${host}/updata`, params )
    },
    //设置背景图片
    setBg( params ){
        return axios.post( `${host}/setBg`, params )
    },
    setDefBg( params ){
        return axios.post( `${host}/setDefBg`, params )
    },
    //获取所有的喜欢
    getAllLike( params ){
        return axios.post( `${host}/getAllLike`, params )
    },
    //获取一个用户的基本信息
    getOne( params ){
        return axios.post( `${host}/getOne`, params )
    }
}




export default users
























