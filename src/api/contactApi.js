import request from '@/utils/request'
import { del } from 'vue'

// 常量
const api_name = '/contact'

export default {
    /* 保存 */
    addContact(newData) {
        return request({
            url: `${api_name}/addContact`,
            method: 'post',
            data: newData
        })
    },
    getMsg(id) {
        return request({
            url: `${api_name}/getMsg/${id}`,
            method: 'get'
        })
    },
    readed(id) {
        return request({
            url: `${api_name}/readed/${id}`,
            method: 'get'
        })
    },
    delContact(id) {
        return request({
            url: `${api_name}/delContact/${id}`,
            method: 'delete'
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
}