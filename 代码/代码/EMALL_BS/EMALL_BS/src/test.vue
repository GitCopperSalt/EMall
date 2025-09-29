<script setup>
//导入axios npm install axios --save
import axios from 'axios';
import { ref } from 'vue';

//定义一个响应式变量，用来保存服务器数据
const tableData = ref([]);
//发送异步请求，获取数据
axios.get('https://yapi.pro/mock/473536/information').then(result=>{
//把服务器数据保存起来
tableData.value = result.data;
console.log("请求成功");
console.log(tableData.value);
}).catch(error=>{
console.log("请求失败");

});
</script>

<template>
    <div >
        <!-- 表格结构 -->
          <!-- 表格结构 -->
          <table id="table-1" align="center">
            <thead>
            <tr>
                <th>名称</th>
                <th>类型</th>
                <th>时长</th>
                <th>场次</th>
                <th>放映时间</th>
                <th>影厅号</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(information, index) in tableData" :key="index">
                <td>{{information.name}}</td>

                <td>{{information.type}}</td>

                <td>{{information.time}}</td>

                <td>{{information.session}}</td>

                <td>{{information.timeQuantum}}</td>

                <td>{{information.cinemaNumber}}</td>

            </tr>
            </tbody>
        </table>

    </div>
</template>
<style scoped>
/* Border styles */
#table-1 thead, #table-1 tr {
    border-top-width: 1px;
    border-top-style: solid;
    border-top-color: #CCCCCC;
}
#table-1 {
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: #CCCCCC;
}


/* Padding and font style */
#table-1 td, #table-1 th {
    padding: 5px 10px;
    font-size: 12px;
    font-family: Verdana, system-ui;
    color: #12040c;
}


/* Alternating background colors */
#table-1 tr:nth-child(even) {
    background: #CCCCCC;
}
#table-1 tr:nth-child(odd) {
    background: #FFF;
}
</style>>