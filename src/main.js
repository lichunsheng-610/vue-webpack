// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import routes from './router/router'

import VueRouter from 'vue-router';

import jQuery from 'jquery';
global.$ = global.jQuery = jQuery;

import ajax from './services/ajaxService';
global.$ajax = ajax;

import moment from 'moment';
global.moment = moment;

global.configService = window.configService;

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
import './components/common.css'
import VueResource from 'vue-resource';
import storage from '../src/services/storageService';

Vue.config.productionTip = false;

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(ElementUI);

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    if (to.path == '/login') {
        storage.removeItem("userLoginInfo");
    }
    if (!storage.getItem("userLoginInfo") && to.path != '/login') {
        next({
            path: '/login'
        });
    } else {
        if (to.path == "/")
            next({
                path: '/helloWorld'
            });
        else {
            if (storage.getItem("userLoginInfo")) {
                let time = Math.round(new Date().getTime()) - storage.getItem("userLoginInfo").curTimestamp;
                if (time > configService.login_deadline * 3600000) { //3600000为一小时对应的毫秒数，登录超过一小时之后，需要重新登录
                    storage.clearAll();
                    setTimeout(function () {
                        next({
                            path: '/login'
                        });
                    }, 200);
                }
            }
            next();
        }
    }
})

new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {
        App
    }
})
