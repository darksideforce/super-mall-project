import Vue from 'vue'
import VueRouter from 'vue-router'

const Home  =() => import("../views/home/home")
const Cart  =() => import("../views/cart/Cart")
const Category  =() => import("../views/category/Category")
const Profile  =() => import("../views/profile/profile")
const Detail =() => import('../views/detail/detail')

Vue.use(VueRouter)

const routes = [
    {
        path:'',
        redirect:'/home'
    },
    {
        path:'/home',
        component: Home
    },
    {
        path:'/cart',
        component: Cart
    },
    {
        path:'/category',
        component: Category
    },
    {
        path:'/profile',
        component: Profile
    },
    {
        path:'/detail/:iid',
        component:Detail
    }
]

const router = new VueRouter({
    mode:'history',
    routes,
})

export default router
