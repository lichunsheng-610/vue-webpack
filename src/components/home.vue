<template slot="title">
    <div>
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
.menu-panel {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
}
.content-container {
  position: absolute;
  left: 200px;
  width: 80%;
  top: 0;
  padding: 20px;
}
.el-menu-vertical-demo {
  height: 100%;
  width: 200px;
}

</style>

<script>
import ajax from '../services/ajaxService'

export default {
    data() {
        return {
            isCollapse: true
        };
    },
    created() { },
    methods: {
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
