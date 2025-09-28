import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/Layout/index.vue'
import Login from '@/views/Login/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'
import Main from '@/views/Main/index.vue'
import Product from '@/views/Product/index.vue'
import Order from '@/views/order/index.vue'
import Register from '@/views/Register/index.vue'
import Personal from '@/views/Personal/index.vue'
import PaymentMethod from '@/views/order/components/PaymentMethod.vue'
import Search from '@/views/Search/index.vue'
import UserCenter from '@/views/UserCenter/index.vue'
import AfterSalesView from '@/views/AfterSales/index.vue'
import AfterSalesApplication from '@/views/AfterSales/components/AfterSalesApplication.vue'
import AfterSalesRecord from '@/views/AfterSales/components/AfterSalesRecord.vue'
import comment from '@/views/Comment/index.vue'
import Refund from '@/views/Refund/index.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path:'',
          component: Home
        },
        {
          path: 'category/:id',
          component: Category
        },
        {
          path: 'myorder',
          component: Main
        },
        {
          path: 'Personal',
          component: Personal
        },
       {
        path: '/product/:productId',
        component:Product
       },

       {
        path: '/paymentMethod',
        component: PaymentMethod
      },
       {
        path: '/order',
        component: Order
      },
      {
        path: '/search',
        component: Search
      },
      {
        path: '/comment',
        component: comment
      },
      {
        path: '/refund',
        component: Refund
      },
    
      {
        path: '/afterSalesView',
        name: 'AfterSalesView',
        component: AfterSalesView,
        children: [
          {
            path: '/afterSalesView/application',  // 默认子路由
            name: 'AfterSalesApplication',
            component: AfterSalesApplication
          },
          {
            path: '/afterSalesView/record',
            name: 'AfterSalesRecord',
            component: AfterSalesRecord
          },
        
        ]
      }
      ]
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/userCenter',
      component: UserCenter
    },
    
  ]
})

export default router
