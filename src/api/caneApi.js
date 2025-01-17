import request from '@/utils/request'

// 常量
const api_name = '/cane'

export default {
    getPageList(page, limit, searchObj) {
        return request({
            // 接口路径
            url: `${api_name}/getCane/${page}/${limit}`,
            method: 'get',      
            // 参数
            params: searchObj
        })
    },
    addCane(dataForm) {
        return request({
            // 接口路径
            url: `${api_name}/addCane`,
            method: 'post',      
            // 参数
            data: dataForm
        })
    },
    updateCane(dataForm) {
        return request({
            // 接口路径
            url: `${api_name}/updateCane`,
            method: 'post',      
            // 参数
            data: dataForm
        })
    },
    getCaneById(id) {
        return request({
            // 接口路径
            url: `${api_name}/getCaneById/${id}`,
            method: 'get'
        })
    },

    getCaneByIdWithQinBen(id) {
        return request({
            // 接口路径
            url: `${api_name}/getCaneByIdWithQinBen/${id}`,
            method: 'get'
        })
    },

    delCane(id) {
        return request({
            // 接口路径
            url: `${api_name}/delCane/${id}`,
            method: 'delete'
        })
    },
    getOptions() {
        return request({
            // 接口路径
            url: `${api_name}/getOptions`,
            method: 'get'
        })
    }
}