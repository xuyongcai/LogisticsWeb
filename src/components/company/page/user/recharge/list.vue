<template>
    <el-row>
        <el-row>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '../home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>充值记录</el-breadcrumb-item>
            </el-breadcrumb>
        </el-row>

        <el-row style="margin-top: 10px">
            <el-button style="float: right;" type="warning" @click="addRecharge">充值</el-button>
        </el-row>

        <el-row style="margin-top:30px">
            <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit
                      highlight-current-row style="width: 100%">
                <el-table-column type="index"/>
                <el-table-column prop="money_code" label="汇款识别号"/>
                <el-table-column label="金额">
                    <template scope="scope">
                        <el-tag type="primary">scope.row.money</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="状态">
                    <template scope="scope">
                        <el-tag type="primary">scope.row.status</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                    label="申请时间">
                    <template scope="scope">
                        <p>{{scope.row.time | time}}</p>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>

        <el-row type="flex" justify="space-around" style="margin-top: 30px">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="listQuery.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </el-row>
    </el-row>
</template>

<script>
    import { getMyRechargeList } from '@/api/recharge';
    import { parseTime } from '@/utils/time';

    export default {
        data() {
            return {
                list: null,
                total: 0,
                listLoading: true,
                listQuery:{
                    token: localStorage.getItem('company_token'),
                    offset: 0,
                    pageSize: 10
                }
            }
        },
        created() {
            this.fetchData();
        },
        methods: {
            fetchData() {
                this.listLoading = true;
                getMyRechargeList(this.listQuery).then(response => {
                    this.list = response.data.item;
                    this.total = response.data.total;
                    this.listLoading = false;
                });
            },
            deleteData(index) {
                this.$confirm('此操作将删除该充值申请, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    //this.list[index].orderCustomer.status;
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                });
            },
            handleSizeChange(val) {
                this.listQuery.pageSize = val;
                this.fetchData();
            },
            handleCurrentChange(val) {
                this.listQuery.offset = this.listQuery.pageSize * (val -1);
                this.fetchData();
            },
            addRecharge(){
                this.$router.push('/company/home/recharge/add');
            }
        },
        filters: {
            time: function (value) {
                return parseTime(value,"{y}年{m}月{d}日 {hh}:{mm}:{ss}");
            }
        }
    };
</script>

<style>
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 150px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
    }
</style>
