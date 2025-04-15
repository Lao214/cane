import request from '@/utils/request'

// 常量
const api_name = '/wumingBase'

export default {
    getPageData(page, limit, searchObj) {
        return request({
            // 接口路径
            url: `${api_name}/getPageData/${page}/${limit}`,
            method: 'get',      
            // 参数
            params: searchObj
        })
    },
    addData(dataForm) {
        return request({
            // 接口路径
            url: `${api_name}/addData`,
            method: 'post',      
            // 参数
            data: dataForm
        })
    },
    updateData(dataForm) {
        return request({
            // 接口路径
            url: `${api_name}/updateData`,
            method: 'post',      
            // 参数
            data: dataForm
        })
    },
    getDataById(id) {
        return request({
            // 接口路径
            url: `${api_name}/getDataById/${id}`,
            method: 'get'
        })
    },
    delData(id) {
        return request({
            // 接口路径
            url: `${api_name}/delData/${id}`,
            method: 'delete'
        })
    }
}