<template>
    <el-row>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '../../home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '../order' }">运单管理</el-breadcrumb-item>
            <el-breadcrumb-item>托运单</el-breadcrumb-item>
        </el-breadcrumb>

        <el-col>
            <order-taking-print-page :order_id="order_id" ref="refOrderContractPage"></order-taking-print-page>
        </el-col>
    </el-row>
</template>
<script>
    import OrderTakingPrintPage from "../../../public/order/OrderPrintCoverPage.vue";

    export default {
        components: {
            OrderTakingPrintPage
        },
        data() {
            return {
                order_id: this.$route.query.id
            };
        },
        created(){
        },
    }
</script>


