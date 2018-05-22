<template slot="title">
    <div class="home">
        <div class="header_panel">
            <el-dropdown trigger="hover">
                <span class="el-dropdown-link userinfo-inner">
                    <span>{{uesrName}}</span>
                    <img :src="userImg" />
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="myInfo">我的消息</el-dropdown-item>
                    <el-dropdown-item @click.native="setting">设置</el-dropdown-item>
                    <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <aside class="menu-panel">
            <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect" unique-opened router>
                <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
                    <el-submenu :index="index+''" v-if="!item.leaf">
                        <template slot="title">
                            <i :class="item.iconCls"></i>{{item.name}}</template>
                        <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
                    </el-submenu>
                    <el-menu-item v-if="item.leaf && item.children.length>0" :index="item.children[0].path">
                        <i :class="item.iconCls"></i>{{item.children[0].name}}
                    </el-menu-item>
                </template>
            </el-menu>
        </aside>

        <section class="content-container">
            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>
        </section>
    </div>
</template>

<style>
.header_panel {
    z-index: 2;
    width: 100%;
    height: 60px;
    position: absolute;
    left: 0;
    top: 0;
    background-color: #409eff;
}
.header_panel .el-dropdown {
    float: right;
    width: 150px;
    height: 60px;
    line-height: 60px;
}
.header_panel .el-dropdown-link span {
    display: block;
    float: left;
    height: 60px;
    line-height: 60px;
    margin-right: 10px;
    color: #fff;
}
.header_panel img {
    width: 40px;
    margin-top: 5px;
    border-radius: 20px;
}
.menu-panel {
    z-index: 1;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    min-height: 660px;
    border-right: 1px solid #e6e6e6;
}
.content-container {
    position: absolute;
    left: 200px;
    width: 80%;
    top: 60px;
    padding: 20px;
}
.home .el-menu {
    border: 0;
}
.home .el-menu-vertical-demo {
    margin-top: 60px !important;
    width: 200px;
}
</style>

<script>
import ajax from '../services/ajaxService'
import storage from '../services/storageService'

export default {
    data() {
        return {
            uesrName: "",
            userImg: "../../static/file/userImg.jpg",
            isCollapse: true
        };
    },
    created() {
        // this.uesrName = storage.getItem("userLoginInfo").account;
        this.uesrName = storage.getItem("userLoginInfo") ? storage.getItem("userLoginInfo").account : "";
    },
    methods: {
        myInfo() {
            this.$confirm('我是消息', '提示', {
                //type: 'warning'
            }).then(() => {
            }).catch(() => {

            });
        },
        setting() {
            this.$confirm('我是设置', '提示', {
                //type: 'warning'
            }).then(() => {
            }).catch(() => {

            });
        },
        logout() {
            var _this = this;
            this.$confirm('确认退出吗?', '提示', {
                //type: 'warning'
            }).then(() => {
                storage.clearAll();
                setTimeout(function () {
                    _this.$router.push('/login');
                }, 200);
            }).catch(() => {

            });

        },
        handleopen(key, keyPath) {
            //console.log('handleopen');
        },
        handleclose(key, keyPath) {
            //console.log('handleclose');
        },
        handleselect: function (key, keyPath) {
        }
    }
}
//获取当前时间戳
function getTimestamp() {
    return Math.round(new Date().getTime() / 1000);
    //getTime()返回数值的单位是毫秒
}

</script>
