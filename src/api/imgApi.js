import request from '@/utils/request'

// 常量
const api_name = '/img'

export default {
    getImgList(page, limit, searchObj) {
        return request({
            // 接口路径
            url: `${api_name}/getImgList/${page}/${limit}`,
            method: 'get',      
            // 参数
            params: searchObj
        })
    }
}