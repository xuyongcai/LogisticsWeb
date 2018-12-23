<template>
    <el-row>
        <el-row>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '../home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>公司信息</el-breadcrumb-item>
            </el-breadcrumb>
        </el-row>

        <el-row style="margin-top: 30px">
            <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit
                      highlight-current-row style="width: 100%">

                <el-table-column prop="name" label="名称" width="200"/>
                <el-table-column prop="value" label="配置"/>

                <el-table-column label="操作" width="180">
                    <template scope="scope">
                        <el-button type="primary" icon="edit" size="small" @click="config_edit(scope.row)">修改</el-button>
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

        <el-dialog title="修改条目" :visible.sync="dialogFormVisible">
            <el-form label-width="100px" :model="configForm" :rules="configRules" ref="configForm">
                <el-row>
                    <el-col :span="18">
                        <el-form-item label="名称">
                            <el-input v-model="configForm.name" :disabled="true"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="18">
                        <el-form-item label="配置" prop="value">
                            <el-input v-model="configForm.value"/>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="config_submit('configForm')">确 定</el-button>
            </div>
        </el-dialog>
    </el-row>
</template>

<script>
    import { editConfig, getConfigList } from '@/api/system';

    export default {
        data() {
            return {
                list: null,
                total: 0,
                listLoading: true,
                listQuery:{
                    offset: 0,
                    pageSize: 10,
                    token: localStorage.getItem('company_token')
                },
                configForm:{
                    id:'',
                    value:'',
                    name:'',
                    code:'',
                },
                configRules:{
                    value: [
                        {required: true, message: '配置不能为空'},
                    ]
                },
                dialogFormVisible: false,
            }
        },
        created() {
            this.fetchData();
        },
        methods: {
            fetchData() {
                this.listLoading = true;
                getConfigList(this.listQuery).then(response => {
                    this.list = response.data.item;
                    this.total = response.data.total;
                    this.listLoading = false;
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
            config_edit(row){
                this.configForm = row;
                this.dialogFormVisible = true;
            },
            config_submit(formName){
                this.dialogFormVisible = false;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.listLoading = true;
                        editConfig(this.configForm.id,this.configForm).then(response => {
                                this.listLoading = false;
                                this.$message({
                                    type: 'success',
                                    message: '修改成功!'
                                });
                                this.fetchData();
                            },
                            error => {
                                this.listLoading = false;
                            });
                    } else {
                        return false;
                    }
                });
            }
        },
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
