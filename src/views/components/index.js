import Vue from 'vue'
import app from './app.vue'
import VueRouter from 'vue-router'
import cart from './partials/cart.vue'
import sales from './partials/sales.vue'

const routes = [
    {path:'/', component: () => import('./partials/get.vue')},
    {path:'/cart', component: cart},
    {path:'/sales', component: sales}
]

const router = new VueRouter({
    routes
})

Vue.use(VueRouter)

new Vue({
    router,
    render: h => h(app)
}).$mount("#app")