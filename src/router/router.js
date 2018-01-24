import login from '../components/login'
import HelloWorld from '../components/helloWorld'
import home from '../components/home'
import table from '../components/table'
import slider from '../components/slider'
import transfer from '../components/transfer'
import echarts from '../components/echarts'
import form from '../components/form'
import data from '../components/data'
import qrCode from '../components/qrCode'
import video from '../components/video'
import notFound from '../components/404'


let routes = [{
        path: '/login',
        component: login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: notFound,
        name: '',
        hidden: true
    }, {
        path: '/',
        component: home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true, //只有一个节点
        children: [{
            path: '/helloWorld',
            component: HelloWorld,
            name: 'hello-world'
        }]
    },
    {
        path: '/home',
        component: home,
        name: 'home',
        iconCls: 'fa fa-home',
        children: [{
            path: '/table',
            component: table,
            name: 'demo-table'
        }, {
            path: '/slider',
            component: slider,
            name: 'demo-slider'
        }, {
            path: '/transfer',
            component: transfer,
            name: 'demo-transfer'
        }]
    },
    {
        path: '/',
        component: home,
        name: 'demo-echarts',
        iconCls: 'fa fa-bar-chart',
        children: [{
            path: '/echarts',
            component: echarts,
            name: 'echarts'
        }]
    }, {
        path: '/',
        component: home,
        name: 'demo-model',
        iconCls: 'fa fa-weixin',
        children: [{
            path: '/form',
            component: form,
            name: 'form'
        }, {
            path: '/data',
            component: data,
            name: 'data'
        }, {
            path: '/qrCode',
            component: qrCode,
            name: 'qrCode'
        }, {
            path: '/video',
            component: video,
            name: 'video'
        }]
    },
    {
        path: '*',
        hidden: true,
        redirect: {
            path: '/404'
        }
    }
];
export default routes;
