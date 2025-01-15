import request from '@/utils/request'

// 常量
const api_name = '/qa'

export default {
    addCaneQa(dataForm) {
        return request({
            // 接口路径
            url: `${api_name}/addCaneQa`,
            method: 'post',      
            // 参数
            data: dataForm
        })
    },
    getPageList(page, limit, searchObj) {
        return request({
            // 接口路径
            url: `${api_name}/getCaneQa/${page}/${limit}`,
            method: 'get',      
            // 参数
            params: searchObj
        })
    },
}