import HelloWorld from '@/components/HelloWorld'
import login from '../apps/login/login'

let routes = [{
        path: '/HelloWorld',
        name: 'HelloWorld',
        component: HelloWorld
    },
    {
        path: '/login',
        name: 'login',
        component: login
    }
];
export default routes;
