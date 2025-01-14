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
