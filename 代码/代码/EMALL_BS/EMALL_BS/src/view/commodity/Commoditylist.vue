<template>
  <div>
    <h1>商品列表</h1>
    <div>
      <input type="text" v-model="searchQuery" placeholder="请输入商品名称、型号、品牌名称等" @input="searchCommodities" />
    </div>
    <table>
      <thead>
        <tr>
          <th>商品ID</th>
          <th>图片</th>
          <th>商品名称</th>
          <th>商品型号</th>
          <th>品牌名称</th>
          <th>内存配置</th>
          <th>价格</th>
          <th>电池容量</th>
          <th>CPU型号</th>
          <th>机身尺寸</th>
          <th>屏幕刷新率</th>
          <th>屏幕尺寸</th>
          <th>重量</th>
          <th>颜色</th>
          <th>发布日期</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="commodity in paginatedCommodities" :key="commodity.productId">
          <td>{{ commodity.productId }}</td>
          <td><img :src="commodity.productImage" alt="商品图片" style="width: 50px; height: 50px;"></td>
          <td>{{ commodity.productName }}</td>
          <td>{{ commodity.productModel }}</td>
          <td>{{ commodity.brandName }}</td>
          <td>{{ commodity.configurationMemory }}</td>
          <td>{{ commodity.configurationPrice }}</td>
          <td>{{ commodity.parameterBatteryCapacity }}</td>
          <td>{{ commodity.parameterCPUModel }}</td>
          <td>{{ commodity.parameterFuselageSize }}</td>
          <td>{{ commodity.parameterScreenRefresh }}</td>
          <td>{{ commodity.parameterScreenSize }}</td>
          <td>{{ commodity.parameterWeight }}</td>
          <td>{{ commodity.productColor }}</td>
          <td>{{ commodity.releaseDate }}</td>
          <td>
            <button @click="openEditForm(commodity)">修改</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div>
      <button @click="prevPage" :disabled="currentPage === 1">上一页</button>
      <span>第 {{ currentPage }} 页</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">下一页</button>
    </div>
    <!-- 编辑表单 -->
    <div v-if="showEditForm">
      <h2>修改商品信息</h2>
      <form @submit.prevent="submitEditForm">
        <input type="hidden" v-model="editingCommodity.productId" />
        <div>
          <label for="editProductName">商品名称:</label>
          <input type="text" id="editProductName" v-model="editingCommodity.productName" />
        </div>
        <div>
          <label for="editProductModel">商品型号:</label>
          <input type="text" id="editProductModel" v-model="editingCommodity.productModel" />
        </div>
        <div>
          <label for="editProductNetworkModel">网络型号:</label>
          <input type="text" id="editProductNetworkModel" v-model="editingCommodity.productNetworkModel" />
        </div>
        <div>
          <label for="editProductColor">颜色:</label>
          <input type="text" id="editProductColor" v-model="editingCommodity.productColor" />
        </div>
        <div>
          <label for="editProductImage">图片:</label>
          <input type="text" id="editProductImage" v-model="editingCommodity.productImage" />
        </div>
        <div>
          <label for="editReleaseDate">发布日期:</label>
          <input type="date" id="editReleaseDate" v-model="editingCommodity.releaseDate" />
        </div>
        <div>
          <label for="editCategoryId">类别ID:</label>
          <input type="text" id="editCategoryId" v-model="editingCommodity.categoryId" />
        </div>
        <div>
          <label for="editBrandId">品牌ID:</label>
          <input type="text" id="editBrandId" v-model="editingCommodity.brandId" />
        </div>
        <div>
          <label for="editConfigurationId">配置ID:</label>
          <input type="text" id="editConfigurationId" v-model="editingCommodity.configurationId" />
        </div>
        <div>
          <label for="editParameterId">参数ID:</label>
          <input type="text" id="editParameterId" v-model="editingCommodity.parameterId" />
        </div>
       
        <button type="button" @click="closeEditForm">取消</button>
        <button type="submit">提交</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      commodities: [],
      searchQuery: '',
      currentPage: 1,
      perPage: 10,
      showEditForm: false,
      editingCommodity: {
        productId: '',
        productName: '',
        productModel: '',
        productNetworkModel: '',
        productColor: '',
        productImage: '',
        releaseDate: '',
        categoryId: '',
        brandId: '',
        configurationId: '',
        parameterId: '',
     
      }
    };
  },
  computed: {
    filteredCommodities() {
      return this.commodities.filter(commodity => {
        const searchLowerCase = this.searchQuery.toLowerCase();
        return (
          commodity.productName.toLowerCase().includes(searchLowerCase) ||
          commodity.productModel.toLowerCase().includes(searchLowerCase) ||
          commodity.brandName.toLowerCase().includes(searchLowerCase) ||
          commodity.configurationMemory.toLowerCase().includes(searchLowerCase) ||
          commodity.configurationPrice.toString().includes(searchLowerCase) ||
          commodity.parameterBatteryCapacity.toLowerCase().includes(searchLowerCase) ||
          commodity.parameterCPUModel.toLowerCase().includes(searchLowerCase) ||
          commodity.parameterFuselageSize.toLowerCase().includes(searchLowerCase) ||
          commodity.parameterScreenRefresh.toLowerCase().includes(searchLowerCase) ||
          commodity.parameterScreenSize.toLowerCase().includes(searchLowerCase) ||
          commodity.parameterWeight.toString().includes(searchLowerCase) ||
          commodity.productColor.toLowerCase().includes(searchLowerCase) ||
          commodity.releaseDate.toLowerCase().includes(searchLowerCase)
        );
      });
    },
    totalPages() {
      return Math.ceil(this.filteredCommodities.length / this.perPage);
    },
    paginatedCommodities() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.filteredCommodities.slice(start, end);
    }
  },
  methods: {
    async fetchCommodities() {
      try {
        // 假设这里是从后端获取商品数据的API地址
        const response = await axios.get('http://localhost:8080/api/products');
        this.commodities = response.data;
      } catch (error) {
        console.error('获取商品数据失败:', error);
      }
    },
    searchCommodities() {
      // 每次输入框内容变化时都会调用此方法
      this.currentPage = 1; // 搜索时重置到第一页
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    openEditForm(commodity) {
      console.log('打开编辑表单:', commodity); // 添加日志以确保方法被调用
      this.editingCommodity = { ...commodity }; // 复制商品信息到编辑对象
      this.showEditForm = true;
    },
    closeEditForm() {
      console.log('关闭编辑表单'); // 添加日志以确保方法被调用
      this.showEditForm = false;
      this.editingCommodity = {}; // 清空编辑对象
    },
    async submitEditForm() {
      try {
        console.log('提交编辑表单:', this.editingCommodity); // 添加日志以确保方法被调用
        // 使用PUT方法并包含商品ID在URL路径中
        const response = await axios.put(
          `http://localhost:8080/api/products/${this.editingCommodity.productId}`,
          this.editingCommodity
        );
        if (response.data === 'success') {
          alert('修改成功!');
          // 刷新商品列表
          this.fetchCommodities();
        } else {
          alert('修改失败!');
        }
        this.closeEditForm();
      } catch (error) {
        console.error('修改商品数据失败:', error);
        alert('修改失败!');
        this.closeEditForm();
      }
    }
  },
  created() {
    this.fetchCommodities();
  }
};
</script>

<style>
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
}
th {
  background-color: #f2f2f2;
}
input {
  padding: 5px;
  margin-bottom: 10px;
  width: 300px;
}
button {
  padding: 5px 10px;
  margin: 0 5px;
}
</style>
