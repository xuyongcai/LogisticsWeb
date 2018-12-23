<template>
    <div class="header">
        <div class="logo"><img src="/static/img/logo.png" style="width: 45px; margin: 10px 15px; vertical-align: middle;">TMS管理系统</div>
        <div class="user-info">
            <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                    <img class="user-logo" :src="img">
                    {{username}}
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="loginout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
    import { getInfo } from '@/api/user/customer.js'
    export default {
        data() {
            return {
                name: '未命名',
                username: localStorage.getItem('customer_username'),
                img: '',
                loadingParam: {
                    token: localStorage.getItem('customer_token')
                }
            }
        },
        created(){
            getInfo(this.loadingParam).then(response => {
                this.img = response.data.userInfo.img;
                if(response.data.userInfo.nickname){
                    this.username = response.data.userInfo.nickname;
                }
            });
        },
        methods:{
            handleCommand(command) {
                if(command == 'loginout'){
                    localStorage.removeItem('customer_username')
                    localStorage.removeItem('customer_token')
                    localStorage.removeItem('type')
                    this.$router.push('/login');
                }
            }
        }
    }
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        line-height: 70px;
        color: #fff;
        background: #d35400;
    }
    .header .logo{
        float: left;
        width:220px;
        margin-left: 30px;
        text-align: center;
    }
    .user-info {
        float: right;
        padding-right: 50px;
        font-size: 16px;
        color: #fff;
    }
    .user-info .el-dropdown-link{
        position: relative;
        display: inline-block;
        padding-left: 50px;
        color: #fff;
        cursor: pointer;
        vertical-align: middle;
    }
    .user-info .user-logo{
        position: absolute;
        left:0;
        top:15px;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
</style>
