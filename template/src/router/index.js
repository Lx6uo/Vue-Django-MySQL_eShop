import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            component: () => import('@/components/customer/login.vue'),
            children: [
                {
                    path: '/login/:loginStatus',
                    meta: {
                        title: 'Login/Register'
                    },
                    component: (resolve) => require(['../components/customer/login.vue'], resolve)
                }
            ]
        },
        {
            path: '/customer',
            component: (resolve) => require(['../components/customer/tmp'], resolve),
            children: [
                {
                    path: '/customerHome',
                    meta: {
                        title: 'Home'
                    },
                    component: (resolve) => require(['../components/customer/customer_Home'], resolve)
                },
                {
                    path: '/list',
                    meta: {
                        title: 'Home'
                    },
                    component: (resolve) => require(['../components/customer/customer_list'], resolve)
                },
                {
                    path: '/product/:id',
                    meta: {
                        title: 'Product Details'
                    },
                    component: (resolve) => require(['../components/customer/customer_product_view.vue'], resolve)
                },
                {
                    path: '/shop/:id',
                    meta: {
                        title: 'Business Details'
                    },
                    component: (resolve) => require(['../components/customer/product_to_business.vue'], resolve)
                },
                {
                    path: '/searchOut',
                    meta: {
                        title: 'Search Results'
                    },
                    component: (resolve) => require(['../components/customer/customer_searchout.vue'], resolve)
                },
                {
                    path: '/test',
                    meta: {
                        title: 'Shopping Cart'
                    },
                    component: (resolve) => require(['../view/manager/data_card.vue'], resolve)
                },
                {
                    path: '/testt',
                    meta: {
                        title: 'Shopping Cart'
                    },
                    component: (resolve) => require(['../view/manager/page_user_log.vue'], resolve)
                },
                {
                    path: '/cart',
                    meta: {
                        title: 'Shopping Cart'
                    },
                    component: (resolve) => require(['../components/customer/customer_cart.vue'], resolve)
                },
                {
                    path: '/login/:loginStatus',
                    meta: {
                        title: 'Login/Register'
                    },
                    component: (resolve) => require(['../components/customer/login.vue'], resolve)
                },
                {
                    path: '/customerPerson',
                    meta: {
                        title: 'Personal Center'
                    },
                    component: (resolve) => require(['../view/business/business_information'], resolve)
                },
                {
                    path: '/customerOrder2',
                    meta: {
                        title: 'My Orders 2'
                    },
                    component: (resolve) => require(['../components/customer/order/customer_order'], resolve)
                },
                {
                    path: '*',
                    redirect: '/login/login',
                    //component: (resolve) => require(['../components/customer/login'], resolve)
                    component: (resolve) => require(['../components/customer/customer_Home.vue'], resolve)
                }
            ]
        },
        {
            path: '/manager',
            component: () => import('@/view/manager/manager'),
            children: [
                {
                    path: '',
                    component: () => import('@/view/manager/manager_check')
                },
                {
                    path: 'check',
                    component: () => import('@/view/manager/manager_check')
                },
                {
                    path: 'log',
                    component: (resolve) => require(['../view/manager/page_user_log.vue'], resolve)
                },
                {
                    path: 'actionlog',
                    component: () => import('@/view/manager/page_user_action')
                },

            ]
        },

        {
            path: '/business',
            component: () => import('@/view/business/business'),
            children: [
                {
                    path: '',
                    component: () => import('@/view/business/business_order')
                },
                {
                    path: 'order',
                    component: () => import('@/view/business/business_order')
                },
                {
                    path: 'commodity',
                    component: () => import('@/view/business/business_commodity'),
                },
                {
                    path: 'commodity/add_commodity',
                    component: () => import('@/view/business/business_add_commodity'),
                },
                {
                    path: 'product/:id',
                    meta: {
                        title: 'Business Product Details'
                    },
                    component: (resolve) => require(['../components/business/business_product_view.vue'], resolve)
                },
                {
                    path: 'business_edit_commodity/:id',
                    meta: {
                        title: 'Edit Product'
                    },
                    component: () => import('@/view/business/business_edit_commodity')
                },

                {
                    path: 'commodity/edit_commodity_stock/:id',
                    meta: {
                        title: 'Edit Stock'
                    },
                    component: (resolve) => require(['../components/business/edit_commodity_stock.vue'], resolve)
                },
                {
                    path: 'saledata',
                    component: () => import('@/view/business/business_saledata')
                },
                {
                    path: 'information',
                    component: () => import('@/view/business/business_information')
                }
            ]
        }
    ],
    mode: "hash" // 去除访问时候带#问题
})

