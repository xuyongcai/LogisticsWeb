import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/admin/home',
            component: resolve => require(['../components/admin/page/common/Home.vue'], resolve),
            children:[
                {
                    path: '',
                    component: resolve => require(['../components/admin/page/Index.vue'], resolve)
                },
                {
                    path: 'order',
                    component: resolve => require(['../components/admin/page/order/list.vue'], resolve)
                },
                {
                    path: 'order/info',
                    component: resolve => require(['../components/admin/page/order/info.vue'], resolve)
                },
                {
                    path: 'customer',
                    component: resolve => require(['../components/admin/page/customer/list.vue'], resolve)
                },
                {
                    path: 'customer/add',
                    component: resolve => require(['../components/admin/page/customer/add.vue'], resolve)
                },
                {
                    path: 'company',
                    component: resolve => require(['../components/admin/page/company/list.vue'], resolve)
                },
                {
                    path: 'company/add',
                    component: resolve => require(['../components/admin/page/company/add.vue'], resolve)
                },
                {
                    path: 'account',
                    component: resolve => require(['../components/admin/page/user/info.vue'], resolve)
                },
                {
                    path: 'admin',
                    component: resolve => require(['../components/admin/page/admin/list.vue'], resolve)
                },
                {
                    path: 'admin/add',
                    component: resolve => require(['../components/admin/page/admin/add.vue'], resolve)
                },
                {
                    path: 'system/defind',
                    component: resolve => require(['../components/admin/page/system/defind.vue'], resolve)
                },
                {
                    path: 'system/config',
                    component: resolve => require(['../components/admin/page/system/config.vue'], resolve)
                },
                {
                    path: 'system/version',
                    component: resolve => require(['../components/admin/page/system/version/list.vue'], resolve)
                },
                {
                    path: 'system/version/add',
                    component: resolve => require(['../components/admin/page/system/version/add.vue'], resolve)
                }
            ]
        },
        {
            path: '/company/home',
            component: resolve => require(['../components/company/page/common/Home.vue'], resolve),
            children:[
                {
                    path: '',
                    component: resolve => require(['../components/company/page/Index.vue'], resolve)
                },
                {
                    path: 'driver',
                    component: resolve => require(['../components/company/page/fleet/driver/list.vue'], resolve)
                },
                {
                    path: 'driver/add',
                    component: resolve => require(['../components/company/page/fleet/driver/add.vue'], resolve)
                },
                {
                    path: 'car',
                    component: resolve => require(['../components/company/page/fleet/car/list.vue'], resolve)
                },
                {
                    path: 'car/add',
                    component: resolve => require(['../components/company/page/fleet/car/add.vue'], resolve)
                },
                {
                    path: 'order/contract',
                    component: resolve => require(['../components/company/page/order/contract/info.vue'], resolve)
                },
                {
                    path: 'order/add',
                    component: resolve => require(['../components/company/page/order/customer/add.vue'], resolve)
                },
                {
                    path: 'order',
                    component: resolve => require(['../components/company/page/order/list.vue'], resolve)
                },
                {
                    path: 'order_open',
                    component: resolve => require(['../components/company/page/order/list_open.vue'], resolve)
                },
                {
                    path: 'order/info',
                    component: resolve => require(['../components/company/page/order/info.vue'], resolve)
                },
                {
                    path: 'order/print',
                    component: resolve => require(['../components/company/page/order/print.vue'], resolve)
                },
                {
                    path: 'order/taking',
                    component: resolve => require(['../components/company/page/order/taking/add.vue'], resolve)
                },
                {
                    path: 'order/taking/print',
                    component: resolve => require(['../components/company/page/order/taking/print.vue'], resolve)
                },
                {
                    path: 'order/taking/print_label',
                    component: resolve => require(['../components/company/page/order/taking/print_label.vue'], resolve)
                },
                {
                    path: 'profit',
                    component: resolve => require(['../components/company/page/profit/list.vue'], resolve)
                },
                {
                    path: 'profit/pay',
                    component: resolve => require(['../components/company/page/profit/pay.vue'], resolve)
                },
                {
                    path: 'system/config',
                    component: resolve => require(['../components/company/page/system/config.vue'], resolve)
                },
                {
                    path: 'account',
                    component: resolve => require(['../components/company/page/user/account/info.vue'], resolve)
                },
                {
                    path: 'recharge',
                    component: resolve => require(['../components/company/page/user/recharge/list.vue'], resolve)
                },
                {
                    path: 'recharge/add',
                    component: resolve => require(['../components/company/page/user/recharge/add.vue'], resolve)
                }
            ]
        },
        {
            path: '/customer/home',
            component: resolve => require(['../components/customer/page/common/Home.vue'], resolve),
            children:[
                {
                    path: '',
                    component: resolve => require(['../components/customer/page/Index.vue'], resolve)
                },
                {
                    path: 'order',
                    component: resolve => require(['../components/customer/page/order/customer/list.vue'], resolve)
                },
                {
                    path: 'order/add',
                    component: resolve => require(['../components/customer/page/order/customer/add.vue'], resolve)
                },
                {
                    path: 'order/info',
                    component: resolve => require(['../components/customer/page/order/customer/info.vue'], resolve)
                },
                {
                    path: 'account',
                    component: resolve => require(['../components/customer/page/user/account/info.vue'], resolve)
                },
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/Login.vue'], resolve)
        },
    ]
})
