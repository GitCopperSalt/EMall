<template> 
  <div class="order-container">
   <div class="sidebar">
     <h3>订单中心</h3>
     <ul>
       <RouterLink to="/myorder" class="sidebar-link">
       <li>我的订单</li>
     </RouterLink>
       <RouterLink to="/afterSalesView/application" class="sidebar-link">
         <li>我的售后申请</li>
       </RouterLink>
       
       <RouterLink to="/refund" class="sidebar-link">
         <li>我的退款</li>
       </RouterLink>
       
       <RouterLink to="/afterSalesView/comment" class="sidebar-link">
         <li><span style="color:#cc0c2d;">商品评价/追评</span></li>
       </RouterLink>
     </ul>
     <h3>购买支持</h3>
     <ul>
       <RouterLink to="#" class="sidebar-link">
         <li>收货地址管理</li>
       </RouterLink>
     </ul>
     <h3>设置</h3>
   </div>
   <div class="content">
   <comment></comment>
   
   <div class="tab-content">
     <router-view></router-view>
   </div>
 </div>
</div>
  
 </template>
 
 <script setup>
 import comment from './components/comment.vue';

 </script>
 <style scoped>
 body {background-color: #f8f9fa;font-size: 14px;}
 
 .order-container {display: flex;background-color: #fff;border-radius: 8px;box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);padding: 16px;margin: 16px;min-height: 600px;}
 
 .sidebar {width: 180px;border-right: 1px solid #ddd;padding: 10px;box-sizing: border-box;}
 
 .sidebar h3 {font-size: 18px;font-weight: bold;color: black;margin-bottom: 8px;padding-bottom: 4px;border-bottom: 1px solid #ddd;}
 
 .sidebar ul {list-style-type: none;padding: 0;}
 
 .sidebar li {margin: 3px 0;}
 
 .sidebar-link {text-decoration: none;color: inherit;display: block;padding: 3px 0;}
 
 .content {margin-left: 20px;padding: 16px;flex-grow: 1;}
 
 .order-tabs {display: flex;margin-bottom: 8px;}
 
 .order-tabs button {margin-right: 8px;padding: 4px 8px;border: none;background-color: #f5f5f5;border-radius: 4px;transition: background-color .3s;font-size: 12px;}
 
 .order-tabs button.active {background-color: black;color: white;}
 
 .order-period {display: flex;justify-content: space-between;margin-top: 8px;font-size: 12px;}
 
 .divider {border: none;border-top: 1px solid #ddd;margin: 8px 0;}
 
 .order-list {width: 100%;border-collapse: collapse;margin-top: 16px;}
 
 .order-list th,.order-list td {border: 1px solid #ddd;padding: 6px;text-align: center;vertical-align: middle;font-size: 12px;}
 
 .order-list th {background-color: #f2f2f2;}
 
 .product-info {display: flex;align-items: center;}
 
 img {width: 80px;margin-right: 6px;}
 
 .product-details {text-align: left;font-size: 12px;}
 
 .order-actions a {margin-right: 8px;text-decoration: none;color: blue;cursor: pointer;font-size: 12px;}
 
 .dialog-footer {text-align: right;font-size: 12px;}
 </style>
 
 