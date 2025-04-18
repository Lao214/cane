import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
    {
        path: '/user',
        component: () => import( '@/views/layout/index.vue'),
        redirect: '/home',
        children: [
            {
                path: '/cs',
                component: () => import( '@/views/resour/cs.vue'),
                title: '抗敏性指标',
            },
            {
                path: '/csDetails',
                component: () => import( '@/views/resour/csDetatils.vue'),
                title: '抗敏性指标详情',
            },
            {
                path: '/home',
                component: () => import( '@/views/home/index.vue'),
                title: '首页',
            },
            // 用户端登录页面
            {
                path: '/login',
                component: () => import('@/views/login/index'),
                hidden: true
            },
            // 用户端新闻详情
            {
                path: '/news',
                component: () => import('@/views/news/viewNew'),
                hidden: true
            },
            // 用户端新闻列表
            {
                path: '/homeNews',
                component: () => import('@/views/news/homeNews'),
                hidden: true
            },
            // 联系我们页面
            {
                path: '/contactUs',
                component: () => import('@/views/feedback/contactUs'),
                hidden: true
            },
            // 更多资源页面
            {
                path: '/resours',
                component: () => import('@/views/resour/resourceList'),
                hidden: true
            },
            {
                path: '/resour',
                component: () => import('@/views/resour/resour'),
                hidden: true
            },
            {
                path: '/qa',
                component: () => import('@/views/resour/qa'),
                hidden: true
            },
            {
                path: '/chat',
                component: () => import('@/views/resour/chat'),
                hidden: true
            },
            {
                path: '/team',
                component: () => import('@/views/home/team'),
                hidden: true
            },
            {
                path: '/background',
                component: () => import('@/views/home/background'),
                hidden: true
            },
            {
                path: '/wuming',
                component: () => import('@/views/resour/wuming'),
                hidden: true
            },
            {
                path: '/fusui',
                component: () => import('@/views/resour/fusui'),
                hidden: true
            },
            {
                path: '/wumingDetails',
                component: () => import('@/views/resour/wumingDetails'),
                hidden: true
            },
            {
                path: '/fusuiDetails',
                component: () => import('@/views/resour/fusuiDetails'),
                hidden: true
            },
            {
                path: '/img',
                component: () => import('@/views/resour/img'),
                hidden: true
            }
        ]
    },
    // 管理端登录页面
    {
        path: '/alogin',
        component: () => import('@/views/login/aindex'),
        hidden: true
    },
    // 管理端路由集
    {
        path: '/admin',
        component: () => import( '@/views/admin/layout/index.vue'),
        redirect: '/dashboard',
        children: [
            {
                path: '/dashboard',
                component: () => import( '@/views/admin/dashboard/index.vue'),
                title: '仪表盘',
            },
            {
                path: '/admin/user',
                component: () => import( '@/views/admin/user/index.vue'),
                title: '用户管理',
            },
            {
                path: '/admin/center',
                component: () => import( '@/views/admin/user/center.vue'),
                title: '个人中心',
            },
            {
                path: '/admin/new',
                component: () => import( '@/views/admin/newCenter/new.vue'),
                title: '新闻中心',
            },
            {
                path: '/admin/newList',
                component: () => import( '@/views/admin/newCenter/newList.vue'),
                title: '新闻列表',
            },
            {
                path: '/admin/view',
                component: () => import( '@/views/admin/contact/view.vue'),
                title: '查看消息',
            },
            {
                path: '/admin/contact',
                component: () => import( '@/views/admin/contact/center.vue'),
                title: '消息列表',
            },
            {
                path: '/admin/question',
                component: () => import( '@/views/admin/contact/question.vue'),
                title: '问答中心',
            },
            {
                path: '/admin/resourList',
                component: () => import( '@/views/admin/resour/resourList.vue'),
                title: '甘蔗列表',
            },
            {
                path: '/admin/category',
                component: () => import( '@/views/admin/resour/category.vue'),
                title: '分类管理',
            },
            {
                path: '/admin/csList',
                component: () => import( '@/views/admin/resour/csList.vue'),
                title: '甘蔗敏抗列表',
            },
            {
                path: '/admin/img',
                component: () => import( '@/views/admin/resour/img.vue'),
                title: '图片上传',
            },
            {
                path: '/admin/wuming',
                component: () => import( '@/views/admin/resour/wuming.vue'),
                title: '武鸣基地数据',
            },
            {
                path: '/admin/fusui',
                component: () => import( '@/views/admin/resour/fusui.vue'),
                title: '扶绥基地数据',
            },
        ]
    },
    // 用户端路由集
    {
        path: '/',
        redirect: '/alogin',
        children: []
    }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
