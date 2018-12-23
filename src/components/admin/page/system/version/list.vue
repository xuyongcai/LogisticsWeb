<template>
    <el-row>
        <el-row>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '../home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>版本管理</el-breadcrumb-item>
            </el-breadcrumb>
        </el-row>

        <el-row style="margin-top: 10px">
            <el-button style="float: right;" type="primary" @click="createData()">添加新版本</el-button>
        </el-row>

        <el-row style="margin-top: 10px">
            <el-button-group style="float: right;">
                <el-button type="danger" icon="setting" size="small" @click="">查看客户端最新版本</el-button>
                <el-button type="warning"  icon="setting" size="small" @click="">查看司机端最新版本</el-button>
            </el-button-group>
        </el-row>

        <el-row style="margin-top:30px">
            <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit
                      highlight-current-row style="width: 100%">
                <el-table-column type="index"/>
                <el-table-column label="APP类型">
                    <template scope="scope">
                        <el-tag type="danger" v-if="scope.row.type == 'customer_android'">客户端</el-tag>
                        <el-tag type="primary" v-if="scope.row.type == 'driver_android'">司机端</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="version" label="版本名称"/>
                <el-table-column prop="version_number" label="版本号"/>
                <el-table-column prop="changelog" label="版本更新日志" width="400"/>
                <el-table-column
                    label="添加时间" width="200">
                    <template scope="scope">
                        <p>{{scope.row.time | time}}</p>
                    </template>
                </el-table-column>

                <el-table-column label="操作" width="200">
                    <template scope="scope">
                            <el-button-group>
                                <el-button type="warning" icon="setting" size="small" @click="showDialog(scope.row.id)">修改</el-button>
                                <el-button type="danger" @click="deleteData(scope.row.id)" icon="delete" size="small">删除</el-button>
                            </el-button-group>
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

        <el-dialog title="最新版本" :visible.sync="dialogVisible">
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </el-row>
</template>

<script>
    import { getVersionList,deleteVersion,getVersionNewest } from '@/api/system';
    import { parseTime } from '@/utils/time';

    export default {
        data() {
            return {
                list: null,
                total: 0,
                listLoading: true,
                listQuery:{
                    offset: 0,
                    pageSize: 10
                },
                dialogVisible: false,
            }
        },
        created() {
            this.fetchData();
        },
        methods: {
            fetchData() {
                this.listLoading = true;
                getVersionList(this.listQuery).then(response => {
                    this.list = response.data.item;
                    this.total = response.data.total;
                    this.listLoading = false;
                });
            },
            showVersionDialog(id){
                this.dialogVisible = true;
            },
            deleteData(id) {
                this.$confirm('此操作将删除该版本, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteVersion(id).then(response => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.fetchData();
                    });
                    this.fetchData();
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
            createData() {
                this.$router.push('/admin/home/system/version/add');
            }
        },
        filters: {
            time: function (value) {
                return parseTime(value);
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
