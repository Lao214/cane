import request from '@/utils/request'

// 常量
const api_name = '/category'

export default {
    getCategory(page, limit, searchObj) {
        return request({
            // 接口路径
            url: `${api_name}/getCategory/${page}/${limit}`,
            method: 'get',      
            // 参数
            params: searchObj
        })
    },
    getCategoryTree(searchObj) {
        return request({
            // 接口路径
            url: `${api_name}/getCategoryTree`,
            method: 'get',      
            // 参数
            params: searchObj
        })
    },
    // 列表
    addCategory(dataForm) {
        return request({
            // 接口路径
            url: `${api_name}/addCategory`,
            method: 'post',
            data: dataForm
        })
    },
    updateCategory(dataForm) {
        return request({
            // 接口路径
            url: `${api_name}/updateCategory`,
            method: 'post',
            data: dataForm
        })
    },
    removeCategoryById(id) {
        return request({
            // 接口路径
            url: `${api_name}/removeCategoryById/${id}`,
            method: 'delete'
        })
    },
}