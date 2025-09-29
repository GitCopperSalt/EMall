<script setup>
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

// 从 localStorage 中读取用户信息并设置到 userStore
userStore.setUserInfo(JSON.parse(localStorage.getItem('userInfo')));

const confirm = () => {
  console.log('用户要退出登录了');
  // 退出登录业务逻辑实现
  // 1.清除用户信息 触发action
  userStore.clearUserInfo();
  // 2.跳转到登录页
  router.push('/login');
};
</script>

<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <template v-if="userStore.userInfo">
          <li><a href="javascript:;" @click="$router.push('/userCenter')" ><i class="iconfont icon-user"></i>{{ userStore.userInfo.username }}</a></li>
          <li>
            <el-popconfirm @confirm="confirm" title="确认退出吗?" confirm-button-text="确认" cancel-button-text="取消">
              <template #reference>
                <a href="javascript:;">退出登录</a>
              </template>
            </el-popconfirm>
          </li>
          <li>
            <a href="javascript:;" @click="$router.push('/personal')">个人中心</a>
          </li>
          <li>
            <el-tooltip effect="dark" placement="top">
              <template #content>
                <img src="@/resources/img/LOGO/wu.png" alt="二维码" style="width: 100px; height: 100px;"/>
              </template>
              <a href="javascript:;">
                下载APP 
                <i class="iconfont icon-arrow-down" style="font-size: 12px; margin-left: 5px;"></i>
              </a>
            </el-tooltip>
          </li>
          <span class="line" style="width:10%"></span>
        </template>
        <template v-else>
          <li><a href="javascript:;" @click="$router.push('/login')">请先登录</a></li>
          <li><a href="javascript:;" @click="$router.push('/register')">注册</a></li>
          <li><a href="javascript:;">帮助中心</a></li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<style scoped lang="scss">
.app-topnav {
  background: #000000;
  width: 100%;

  ul {
    display: flex;
    height: 35px;
    justify-content: flex-end;
    align-items: center;
    list-style: none; /* 取消小圆点 */

    li {
      a {
        padding: 0 10px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;

        i {
          font-size: 10px;
          margin-right: 2px;
        }

        &:hover {
          color: $xtxColor;
        }
      }

      ~li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>

