<template>
    <el-row>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '../../home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '../order' }">运单管理</el-breadcrumb-item>
            <el-breadcrumb-item>热敏打印单</el-breadcrumb-item>
        </el-breadcrumb>

        <el-col>
            <order-label-print-page :order_id="order_id" ref="refOrderContractPage"></order-label-print-page>
        </el-col>
    </el-row>
</template>
<script>
    import OrderLabelPrintPage from "../../../../public/order/OrderLabelPrintPage.vue";

    export default {
        components: {
            OrderLabelPrintPage
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


