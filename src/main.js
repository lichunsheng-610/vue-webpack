// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import routes from './router/router'

import VueRouter from 'vue-router';

import jQuery from 'jquery';
global.$ = global.jQuery = jQuery;
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(ElementUI)

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    if (to.path == '/') {
        next({
            path: '/helloWorld'
        });
    } else {
        next();
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
