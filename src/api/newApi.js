import request from '@/utils/request'

// 常量
const api_name = '/news'

export default {
    /* 保存 */
    save(newData) {
        return request({
            url: `${api_name}/addNew`,
            method: 'post',
            data: newData
        })
    },
    update(newData) {
        return request({
            url: `${api_name}/updateNew`,
            method: 'post',
            data: newData
        })
    },
    viewNew(formData) {
        return request({
            url: `${api_name}/viewNew`,
            method: 'post',
            data: formData
        })
    },
    // 列表
    getPageList(page, limit, searchObj) {
        return request({
            // 接口路径
            url: `${api_name}/getPageList/${page}/${limit}`,
            method: 'get', // 提交方式
            // 参数
            params: searchObj
        })
    },
    getNewByKey(newKey) {
        return request({
            // 接口路径
            url: `${api_name}/getNewByKey/${newKey}`,
            method: 'get' // 提交方式
        })
    },
    getHomeNews() {
        return request({
            // 接口路径
            url: `${api_name}/getHomeNews`,
            method: 'get' // 提交方式
        })
    }
}