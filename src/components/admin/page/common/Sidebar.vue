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
                        index: '/admin/home',
                        title: '首页'
                    },
                    {
                        icon: 'el-icon-share',
                        index: '/admin/home/customer',
                        title: '客户账户管理',
                    },
                    {
                        icon: 'el-icon-share',
                        index: '/admin/home/company',
                        title: '物流公司账户管理',
                    },
                    {
                        icon: 'el-icon-document',
                        index: '/admin/home/order',
                        title: '客户运单查看',
                    },
                    {
                        icon: 'el-icon-star-on',
                        index: '/admin/home/account',
                        title: '个人中心'
                    },
                    {
                        icon: 'el-icon-star-on',
                        index: '/admin/home/admin',
                        title: '管理员账户管理'
                    },
                    {
                        icon: 'el-icon-setting',
                        index: '5',
                        title: '系统设置',
                        subs: [
                            {
                                index: '/admin/home/system/config',
                                title: '公司配置'
                            },
                            {
                                index: '/admin/home/system/defind',
                                title: '条目管理'
                            },
                            {
                                index: '/admin/home/system/version',
                                title: 'App版本配置'
                            }
                        ]
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
