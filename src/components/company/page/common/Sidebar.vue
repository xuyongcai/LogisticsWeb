<template>
    <div class="sidebar">
        <el-menu class="el-menu-vertical-demo" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index">
                        <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index">
                        <i :class="item.icon"></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                items: [
                    {
                        icon: 'el-icon-menu',
                        index: '/company/home',
                        title: '首页'
                    },
                    {
                        icon: 'el-icon-date',
                        index: '2',
                        title: '车队管理',
                        subs: [
                            {
                                index: '/company/home/driver',
                                title: '司机管理'
                            },
                            {
                                index: '/company/home/car',
                                title: '车辆管理'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-star-off',
                        index: '/company/home/order/add',
                        title: '创建运单',
                    },
                    {
                        icon: 'el-icon-star-off',
                        index: '/company/home/order_open',
                        title: '抢单市场',
                    },
                    {
                        icon: 'el-icon-star-on',
                        index: '/company/home/order',
                        title: '我的运单',
                    },
                    {
                        icon: 'el-icon-share',
                        index: '/company/home/profit',
                        title: '财务管理'
                    },
                    {
                        icon: 'el-icon-menu',
                        title: '账户管理',
                        index: '3',
                        subs: [
                            {
                                icon: 'el-icon-star-on',
                                index: '/company/home/account',
                                title: '个人中心'
                            },
                            {
                                icon: 'el-icon-plus',
                                index: '/company/home/recharge',
                                title: '账户充值'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-setting',
                        index: '/company/home/system/config',
                        title: '系统设置'
                    }
                ]
            }
        },
        computed:{
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 220px;
        left: 0;
        top: 70px;
        bottom:0;
        background: #2E363F;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
