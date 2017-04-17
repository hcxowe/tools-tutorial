var Vue = require('vue');
var VueRouter = require('vue-router');

Vue.use(VueRouter);

var Home = Vue.extend({
    template: '<h1>Home</h1>'
});

var router = new VueRouter({
    // mode: 'history',
    routes: [
        {
            path: '/home',
            component: Home
        },
        {
            path: '/list',
            component: {
                template: '<h1>List</h1>'
            }
        },
        {
            path: '/user',
            component: {
                template: '<h1>User</h1>'
            }
        },
        {
            path: '/trfes',
            name: 'nameTrfes',
            component: {
                template: '<h1>nameTrfes</h1>'
            }
        },
        {
            path: '/redirect',
            redirect: '/home',
        },
        {
            path: '/user/:id',
            component: {
                template: '<div><h1>User {{ $route.params.id }}</h1><router-view></router-view></div>'
            },
            children: [
                {
                    path: 'profile',
                    component: {
                        template: '<h2>User {{ $route.params.id }} profile</h2>'
                    }
                },
                {
                    path: 'posts',
                    component: {
                        template: '<h2>User {{ $route.params.id }} posts</h2>'
                    }
                },
                {
                    path: 'trfes',
                    component: {
                        template: '<h2>User {{ $route.params.id }} trfes</h2>'
                    }
                }
            ]
        }
    ]
});

var app = new Vue({
    router: router,
    methods: {
        routePush: function() {
            this.$router.push('/user');
        },
        routeReplace: function() {
            this.$router.push('/user/1');
        },
        routeGo: function() {
            this.$router.go(-1);
        }
    }
}).$mount('#app');