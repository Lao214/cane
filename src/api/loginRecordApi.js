import request from '@/utils/request'

// 常量
const api_name = '/loginRecord'

export default {
    /* 保存 */
    getPageList(page, limit, searchObj) {
        return request({
            // 接口路径
            url: `${api_name}/getPageList/${page}/${limit}`,
            method: 'get', // 提交方式
            // 参数
            params: searchObj
        })
    },
    getThisWeekLoginRecord() {
        return request({
            // 接口路径
            url: `${api_name}/getThisWeekLoginRecord`,
            method: 'get', // 提交方式
        })
    }
}