<template>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span style="line-height: 36px;">{{mname}}</span>
                <el-button style="float: right;" type="primary" @click="add()">添加内容</el-button>
            </div>

        <el-row style="margin-top: 10px">
            <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit height="250"
                      highlight-current-row style="width: 100%">
                <el-table-column type="index" label="编号" width="80"/>
                <el-table-column prop="name" label="名称" :autofocus="true"/>

                <el-table-column label="操作" width="180">
                    <template scope="scope">
                            <el-button-group>
                                <el-button type="primary" @click="edit(scope.row)" icon="edit" size="small">编辑</el-button>
                                <el-button type="danger" @click="deletes(scope.row.id)" icon="delete" size="small">删除</el-button>
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

        <el-dialog title="编辑" :visible.sync="dialogFormVisible">
            <el-form :model="defindForm">
                <el-input type="hidden" v-model="defindForm.id"></el-input>
                <el-input type="hidden" v-model="defindForm.type"></el-input>
                <el-form-item label="名称">
                    <el-input v-model="defindForm.name"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </div>
        </el-dialog>

        </el-card>
</template>

<script>
    import { getDefindList, deleteDefind, addDefind, editDefind } from '@/api/system';

    export default {
        props:{
            mtype: {
                type: String,
                default: ''
            },
            mname: {
                type: String,
                default: ''
            },
        },
        data() {
            return {
                list: null,
                total: 0,
                listLoading: true,
                listQuery:{
                    offset: 0,
                    pageSize: 10,
                    type_code: this.mtype,
                },
                defindForm:{
                    id: '',
                    name: '',
                    type_code: this.mtype,
                },
                dialogFormVisible:false,
            }
        },
        created() {
            this.fetchData();
        },
        methods: {
            fetchData() {
                this.listLoading = true;
                getDefindList(this.listQuery).then(response => {
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
            deletes(id) {
                this.$confirm('此操作将删除该条目, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteDefind(id).then(response => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.fetchData();
                    });
                });
            },
            edit(row){
                this.dialogFormVisible = true;
                this.defindForm = {
                    id: row.id,
                    name: row.name,
                    type_code: row.type_code
                };
            },
            add(){
                this.dialogFormVisible = true;
                this.defindForm = {
                    id: -1,
                    name: '',
                    type_code: this.mtype
                };
            },
            submit(){
                this.dialogFormVisible = false;
                if(this.defindForm.id == -1){
                    addDefind(this.defindForm).then(response => {
                        this.$message({
                            type: 'success',
                            message: '添加成功!'
                        });
                        this.fetchData();
                    });
                }else{
                    editDefind(this.defindForm.id,this.defindForm).then(response => {
                        this.$message({
                            type: 'success',
                            message: '修改成功!'
                        });
                        this.fetchData();
                    });
                }
                this.fetchData();
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
