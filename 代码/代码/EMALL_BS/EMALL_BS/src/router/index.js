import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/index",
      name: "index",
      component: () => import("../view/index.vue"),
      children:[
      {
        path:"/instrumentPanel",
        name:"instrumentPanel",
        component:()=>import("../view/Instrumentpanel/index.vue")
      },
      
        {
          path: "/user-manage",
          name: "user-manage",
          component: () => import("../view/User/UserManagement.vue"),
        },
        {
          path: "/order-list",
          name: "order-list",
          component: () => import("../view/Order/OrderList.vue"),
        },
        {
          path: "/com-list",
          name: "com-list",
          component: () => import("../view/commodity/Commoditylist.vue"),
        },
        {
          path: "/com-add",
          name: "com-add",
          component: () => import("../view/commodity/Addcommodity.vue"),
        },
        {
          path: "/change-account",
          name: "change-account",
          component: () => import("../view/admin/ChangeAccount.vue"),
        },
       
      ]
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../view/login.vue"),
    },
    {
      path: "/",
      name: "login",
      component: () => import("../view/login.vue"),
      
    },
   
   
  ],
});

export default router;
