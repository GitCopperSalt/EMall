<template>
    <div class="discussion-page">
        <!-- Header -->
        <h1>讨论区</h1>
        <hr class="divider" />
        <!-- Search Bar -->
        <div class="search-bar">
            <input v-model="searchQuery" placeholder="搜索品牌、型号、或者查看评价" />
        </div>
        <div class="comments">
            <div v-for="comment in filteredComments" :key="comment.id" class="comment">
                <img :src="comment.avatar" alt="用户头像" class="avatar" />
                <div style="display: flex; flex-direction: column; justify-content: space-between; ">
                    <h3>{{ comment.user }}</h3>
                    <div style="margin-top: 0px;">(ID名)</div>
                </div>

                <div class="comment-content" style="margin-left: 10px;">
                    <div class="random-product">
                        <p>已购 {{ purchasedProduct.brand }} {{ purchasedProduct.model }} ，128GB，
                            <br />

                        </p>
                        <div class="tags">
                            <span class="tag">高品质</span>
                            <span class="tag">高流畅</span>
                        </div>
                    </div>

                    <p>{{ comment.text }}</p>
                    <img v-for=" item, index in comment.images" :key="index" :src="item" class="comment-image"
                        alt="评论图片" />
                </div>
            </div>
        </div>

        <!-- Floating Button -->
        <button class="post-btn" @click="openPostModal">发布评论</button>

        <!-- Post Comment Modal -->
        <div v-if="showModal" class="modal">
            <div class="modal-content">
                <h2>发布评论</h2>
                <textarea v-model="newCommentText" placeholder="输入您的评论..."></textarea>
                <input type="file" @change="handleImageUpload" />
                <button @click="postComment">发布</button>
                <button @click="closePostModal">取消</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "pingLun",
    data() {
        return {
            searchQuery: "",
            comments: [
                { id: 1, user: "用户A", avatar: "https://img2.baidu.com/it/u=3029837478,1144772205&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500", text: "苹果iPhone 轻薄流畅！轻薄的机身，手感很舒适，操作流畅，系统稳定。安装后体验很好。", brand: "APPLE", images: ["https://wx3.sinaimg.cn/mw690/005JVwV7gy1hr9gyy3bi3j30u016r42k.jpg", 'https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2024%2F1031%2F97b7d928j00sm75ox007bd0020302lnm.jpg&thumbnail=660x2147483647&quality=80&type=jpg'] },
                // { id: 2, user: "用户B", avatar: "https://q3.itc.cn/q_70/images03/20240613/862cf9ebe25b4bbfb95bdf2a1bf1aec0.jpeg", text: "华为手机系统稳健，体验很好。轻薄的机身，手感很舒适，操作流畅，系统稳定。安装后体验很好。", brand: "HUAWEI", images: ['https://img2.baidu.com/it/u=310667764,1604683778&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1067'] },
            ],
            brands: ["VIVO", "OPPO", "APPLE", "XIAOMI", "HUAWEI", "HONOR"],
            purchasedProduct: {},
            showModal: false,
            newCommentText: "",
            newCommentImage: [],
        };
    },
    computed: {
        filteredComments() {
            return this.comments.filter(comment =>
                comment.brand.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        },
    },
    methods: {
        getRandomProduct() {
            const brand = this.brands[Math.floor(Math.random() * this.brands.length)];
            this.purchasedProduct = { brand, model: `Phone ${Math.floor(Math.random() * 20)}` };
        },
        openPostModal() {
            this.showModal = true;
        },
        closePostModal() {
            this.showModal = false;
        },
        handleImageUpload(event) {
            const file = event.target.files[0];
            this.newCommentImage.push(URL.createObjectURL(file))
        },
        postComment() {
            if (this.newCommentText.trim()) {
                const newComment = {
                    id: Date.now(),
                    user: `用户${Math.floor(Math.random() * 1000)}`,
                    avatar: `https://img0.baidu.com/it/u=3489233687,2364672159&fm=253&fmt=auto&app=120&f=JPEG?w=507&h=500`,
                    text: this.newCommentText,
                    brand: this.purchasedProduct.brand,
                    images: this.newCommentImage,
                };
                this.comments.push(newComment);
                this.newCommentText = "";
                this.newCommentImage = [];
                this.showModal = false;
            }
        },
    },
    mounted() {
        this.getRandomProduct();
    },
};
</script>

<style scoped>
.discussion-page {
    font-family: Arial, sans-serif;
    
}

.search-bar input {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.random-product {
    font-size: 16px;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    padding: 15px;
    border-radius: 5px;
    background-color: #f9f9f9;
}

.tags {
    margin-top: 10px;
}

.tag {
    display: inline-block;
    background-color: #e6f7ff;
    color: #0050b3;
    padding: 5px 10px;
    border-radius: 5px;
    margin-right: 5px;
    font-size: 12px;
}

.comments .comment {
    display: flex;
    align-items: start;
    margin-top: 15px;
    padding: 10px;
    border-bottom: 1px solid #ddd;
}

.avatar {
    width: 50px;
    height: 50px;
    margin-top: 20px;
    border-radius: 50%;
    margin-right: 10px;
}

.comment-content h3 {
    margin: 0;
    font-size: 16px;
    color: #333;
}

.comment-content p {
    width: 100%;
    margin: 5px 0;
    color: #666;
}

.comment-image {
    width: 150px;
    /* height: 150px; */
    margin-left: 10px;
    margin-top: 10px;
    border-radius: 5px;
}

.post-btn {
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 10px 20px;
    background: #42b983;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background: #fff;
    padding: 20px;
    border-radius: 5px;
    width: 300px;
}

.modal-content textarea {
    width: 100%;
    height: 100px;
    margin-bottom: 10px;
}
body {
    background-color: #f8f9fa;
   }
   
   .order-container {
    display: flex;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin: 20px;
    min-height: 600px;
   }
   
   .sidebar {
    width: 200px;
    border-right: 1px solid #ddd;
    padding: 10px;
    box-sizing: border-box;
   }
   
   .sidebar h3 {
    font-size: 24px;
    font-weight: bold;
    color: black;
    margin-bottom: 10px;
    padding-bottom: 5px;
    border-bottom: 1px solid #ddd;
   }
   
   .sidebar ul {
    list-style-type: none;
    padding: 0;
   }
   
   .sidebar li {
    margin: 5px 0; /* 调整间距，减少上下间距 */
   }
   
   .sidebar-link {
    text-decoration: none;
    color: inherit;
    display: block; /* 设置为块级元素，使整个区域可点击 */
    padding: 5px 0; /* 调整内边距，增加点击区域但不影响整体高度 */
   }
   
   .content {
    margin-left: 20px;
    padding: 20px;
    flex-grow: 1;
   }
   
   .order-tabs {
    display: flex;
    margin-bottom: 10px;
   }
   
   .order-tabs button {
    margin-right: 10px;
    padding: 5px 10px;
    border: none;
    background-color: #f5f5f5;
    border-radius: 4px;
    transition: background-color 0.3s;
   }
   
   .order-tabs button.active {
    background-color: black;
    color: white;
   }
   
   .order-period {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    font-size: 14px;
   }
   
   .divider {
    border: none;
    border-top: 1px solid #ddd;
    margin: 10px 0;
   }
   
   .order-list {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
   }
   
   .order-list th,
   .order-list td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
    /* 文字水平居中 */
    vertical-align: middle;
    /* 垂直居中 */
   }
   
   .order-list th {
    background-color: #f2f2f2;
   }
   
   .product-info {
    display: flex;
    align-items: center;
   }
   
   img {
    width: 150px;
    margin-right: 10px;
   }
   
   .product-details {
    text-align: left;
    /* 文字左对齐 */
   }
   
   .order-actions a {
    margin-right: 10px;
    text-decoration: none;
    color: blue;
    cursor: pointer;
    /* 添加鼠标指针样式 */
   }
</style>