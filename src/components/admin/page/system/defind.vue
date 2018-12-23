<template>
    <el-row>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '../home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>条目设置</el-breadcrumb-item>
        </el-breadcrumb>

        <el-row style="margin-top: 30px" v-loading.body="listLoading" element-loading-text="拼命加载中" >
            <el-col :span="11" v-for="defind in list" style="margin: 10px">
                <system-manager :mtype="defind.code" :mname="defind.name"></system-manager>
            </el-col>
        </el-row>

    </el-row>
</template>
<script>
    import SystemManager from "../../../public/system/SystemManager.vue";
    import { getDefindTypeAll } from '@/api/system';


    export default {
        components: {
            SystemManager
        },
        data() {
            return {
                list: null,
                listLoading: true,
            }
        },
        created() {
            this.fetchData();
        },
        methods: {
            fetchData() {
                this.listLoading = true;
                getDefindTypeAll(this.listQuery).then(response => {
                    this.list = response.data;
                    this.listLoading = false;
                });
            },
        }
    }
</script>
