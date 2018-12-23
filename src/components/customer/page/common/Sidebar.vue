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
                        index: '/customer/home',
                        title: '首页'
                    },
                    {
                        icon: 'el-icon-plus',
                        index: '/customer/home/order/add',
                        title: '创建运单',
                    },
                    {
                        icon: 'el-icon-date',
                        index: '/customer/home/order',
                        title: '我的运单',
                    },
                    {
                        icon: 'el-icon-message',
                        index: '/customer/home/account',
                        title: '个人设置',
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
