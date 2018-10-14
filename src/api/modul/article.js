


import axios from '../http.js'
// import axios from 'axios'
//域名设置
const host = 'http://localhost:3000/article'


// const host = 'http://www.curtaintan.club/article'


const article = {
    //编辑文章的上传图片
    upImage ( params ){
        return axios.post( `${host}/upImage`, params )
    },
    //上传文章
    upArticle ( params ){
        return axios.post( `${host}/upArticle`, params )
    },
    //个人中心获取文章列表
    getArticleByUser ( user, page, caogao ){
        if( !page ){
            page = 1
        }
        return axios.get( `${host}/getArticleByUser/` + user + '/' + page + '/' + caogao )
    },
    //获取文章列表
    getArticleList( label, page ){
        if( !page ){
            page = 1
        }
        return axios.get( `${host}/pageList`+ label + '/' + page )
    },
    //获取单个文章
    getArticle( id ){
        return axios.get( `${host}/article/`+ id )
    },
    //删除文章
    deleteArt( id ){
        return axios.get( `${host}/deleteArt/`+ id )
    },
    //更新文章
    updateArt( params ){
        return axios.post( `${host}/updateArt`, params )
    }
}










export default article




