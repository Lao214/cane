import request from '@/utils/request'

// 常量
const api_name = '/minIO'

export default {
    /* 保存 */
    uploadCarousel(form) {
        return request({
            url: '/minIO/uploadCarousel',
            method: 'post',
            data: form,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
        })
    },
    delCarousel(id,bannerImg) {
        return request({
            url: `/minIO/delCarousel/${id}/${bannerImg}`,
            method: 'delete'
        })
    },
     /* 保存 */
    uploadImg(form) {
        return request({
            url: '/minIO/uploadImg',
            method: 'post',
            data: form,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
    },
    delImg(id,imgName) {
        return request({
            url: `/minIO/delImg/${id}/${imgName}`,
            method: 'delete'
        })
    },
    
}