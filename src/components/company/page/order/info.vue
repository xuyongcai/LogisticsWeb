<template>
    <el-row>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '../../home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '../order' }">我的运单</el-breadcrumb-item>
            <el-breadcrumb-item>订单详情</el-breadcrumb-item>
        </el-breadcrumb>

        <el-row style="margin-top: 30px" >
            <order-info-page :order_id="order_id"></order-info-page>
        </el-row>

    </el-row>
</template>
<script>
    import OrderInfoPage from "../../../public/order/OrderInfoPage.vue"

    export default {
        components: {
            OrderInfoPage
        },
        data() {
            return {
                order_id: this.$route.query.id
            };
        },
        created(){
            this.fetchData();
        },
        methods: {
            fetchData() {
            },
        },
    }
</script>
