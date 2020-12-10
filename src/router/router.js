import login from '../components/login'
import webRTC from '../components/webRTC'
import home from '../components/home'
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
    },
    {
        path: '/webRTC',
        component: home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true, //只有一个节点
        children: [{
            path: '/webRTC',
            component: webRTC,
            name: 'webRTC'
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
