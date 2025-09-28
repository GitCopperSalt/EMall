<script>
export default {
  data() {
    return {
      fixedCategoryList: [
        {
          id: 1,
          name: '手机',
        
          goods: [
            {
              id: 1,
              name: 'HUAWEI 系列',
            
              picture: 'http://example.com/image2.jpg'
            },
            {
              id: 2,
              name: 'APPLE 系列',
              
              picture: 'http://example.com/image2.jpg'
            },
            {
              id: 3,
              name: 'XIAOMI 系列',
             
              picture: 'http://example.com/image1.jpg'
            },
            {
              id: 4,
              name: 'OPPO 系列',
             
              picture: 'http://example.com/image1.jpg'
            },
            {
              id: 1,
              name: 'vivo 系列',
             
              picture: 'http://example.com/image1.jpg'
            },
            {
              id: 1,
              name: 'HONOR 系列',
             
              picture: 'http://example.com/image1.jpg'
            },
          ]
        },
        {
          id: 2,
          name: '穿戴',
         
          goods: [
            {
              id: 3,
              name: '商品三',
              desc: '商品描述三',
              price: 300,
              picture: 'http://example.com/image3.jpg'
            }
          ]
        },
        {
          id: 3,
          name: '平板',
         
          goods: [
            {
              id: 3,
              name: '商品三',
              desc: '商品描述三',
              price: 300,
              picture: 'http://example.com/image3.jpg'
            }
          ]
        },
        {
          id: 2,
          name: '电脑',
         
          goods: [
            {
              id: 3,
              name: '商品三',
              desc: '商品描述三',
              price: 300,
              picture: 'http://example.com/image3.jpg'
            }
          ]
        },
        {
          id: 2,
          name: '耳机音箱',
         
          goods: [
            {
              id: 3,
              name: '商品三',
              desc: '商品描述三',
              price: 300,
              picture: 'http://example.com/image3.jpg'
            }
          ]
        },
        {
          id: 2,
          name: '智慧屏',
         
          goods: [
            {
              id: 3,
              name: '商品三',
              desc: '商品描述三',
              price: 300,
              picture: 'http://example.com/image3.jpg'
            }
          ]
        },
        {
          id: 2,
          name: '智能家居',
         
          goods: [
            {
              id: 3,
              name: '商品三',
              desc: '商品描述三',
              price: 300,
              picture: 'http://example.com/image3.jpg'
            }
          ]
        },
        {
          id: 2,
          name: '鸿蒙智行',
         
          goods: [
            {
              id: 3,
              name: '商品三',
              desc: '商品描述三',
              price: 300,
              picture: 'http://example.com/image3.jpg'
            }
          ]
        },
        {
          id: 2,
          name: '增值服务',
         
          goods: [
            {
              id: 3,
              name: '商品三',
              desc: '商品描述三',
              price: 300,
              picture: 'http://example.com/image3.jpg'
            }
          ]
        }
      ]
    }
  }
}
</script>

<template>
  <div class="home-category">
    <ul class="menu">
      <li >
        <RouterLink to="/">手机</RouterLink>
        
        <!-- 弹层layer位置 -->
        <div class="layer">
          <ul>
            <li >
              <RouterLink to="/category/2">
                <!-- <img src="C:\Users\32006\Documents\EMALL\src\resources\img\HUAWEI\HUAWEIlogo-01.png" alt="" /> -->
                <img src="#" alt="" />
                <div class="info">
                  <p class="name ellipsis-2">HUAWEI 系列</p>
                </div>
              </RouterLink>
            </li>
            <li >
              <RouterLink to="/category/3">
                <img src="#" alt="" />
                <div class="info">
                  <p class="name ellipsis-2">VIVO 系列</p>
                </div>
              </RouterLink>
            </li>
            <li >
              <RouterLink to="/category/4">
                <img src="#" alt="" />
                <div class="info">
                  <p class="name ellipsis-2">HONOR 系列</p>
                </div>
              </RouterLink>
            </li>
            <li >
              <RouterLink to="/category/5">
                <img src="#" alt="" />
                <div class="info">
                  <p class="name ellipsis-2">XIAOMI 系列</p>
                </div>
              </RouterLink>
            </li>
            <li >
              <RouterLink to="/category/6">
                <img src="#" alt="" />
                <div class="info">
                  <p class="name ellipsis-2">OPPO 系列</p>
                </div>
              </RouterLink>
            </li>
            <li >
              <RouterLink to="/category/7">
                <img src="#" alt="" />
                <div class="info">
                  <p class="name ellipsis-2">APPLE 系列</p>
                </div>
              </RouterLink>
            </li>
            
          </ul>
        </div>
      </li>
      <li >
        <RouterLink to="/">穿戴</RouterLink>
        
        <!-- 弹层layer位置 -->
        <div class="layer">
          <ul>
            <li >
              <RouterLink to="/">
                <img src="#" alt="" />
                <div class="info">
                  <p class="name ellipsis-2">HUAWEI 系列</p>
                </div>
              </RouterLink>
            </li>
            <li >
              <RouterLink to="/">
                <img src="#" alt="" />
                <div class="info">
                  <p class="name ellipsis-2">VIVO 系列</p>
                </div>
              </RouterLink>
            </li>
            <li >
              <RouterLink to="/">
                <img src="#" alt="" />
                <div class="info">
                  <p class="name ellipsis-2">HONOR 系列</p>
                </div>
              </RouterLink>
            </li>
            <li >
              <RouterLink to="/">
                <img src="#" alt="" />
                <div class="info">
                  <p class="name ellipsis-2">XIAOMI 系列</p>
                </div>
              </RouterLink>
            </li>
            <li >
              <RouterLink to="/">
                <img src="#" alt="" />
                <div class="info">
                  <p class="name ellipsis-2">OPPO 系列</p>
                </div>
              </RouterLink>
            </li>
            <li >
              <RouterLink to="/">
                <img src="#" alt="" />
                <div class="info">
                  <p class="name ellipsis-2">APPLE 系列</p>
                </div>
              </RouterLink>
            </li>
            
          </ul>
        </div>
      </li><li >
        <RouterLink to="/">电脑</RouterLink>
        
        <!-- 弹层layer位置 -->
        <div class="layer">
          <ul>
            <li >
              <RouterLink to="/">
                <img src="#" alt="" />
                <div class="info">
                  <p class="name ellipsis-2">HUAWEI 系列</p>
                </div>
              </RouterLink>
            </li>
            <li >
              <RouterLink to="/">
                <img src="#" alt="" />
                <div class="info">
                  <p class="name ellipsis-2">VIVO 系列</p>
                </div>
              </RouterLink>
            </li>
            <li >
              <RouterLink to="/">
                <img src="#" alt="" />
                <div class="info">
                  <p class="name ellipsis-2">HONOR 系列</p>
                </div>
              </RouterLink>
            </li>
            <li >
              <RouterLink to="/">
                <img src="#" alt="" />
                <div class="info">
                  <p class="name ellipsis-2">XIAOMI 系列</p>
                </div>
              </RouterLink>
            </li>
            <li >
              <RouterLink to="/">
                <img src="#" alt="" />
                <div class="info">
                  <p class="name ellipsis-2">OPPO 系列</p>
                </div>
              </RouterLink>
            </li>
            <li >
              <RouterLink to="/">
                <img src="#" alt="" />
                <div class="info">
                  <p class="name ellipsis-2">APPLE 系列</p>
                </div>
              </RouterLink>
            </li>
            
          </ul>
        </div>
      </li><li >
        <RouterLink to="/">平板</RouterLink>
        
        <!-- 弹层layer位置 -->
        <div class="layer">
          <ul>
            <li >
              <RouterLink to="/">
                <!-- <img src="C:\Users\32006\Documents\EMALL\src\resources\img\HUAWEI\HUAWEIlogo-01.png" alt="" /> -->
                <img src="#" alt="" />
                <div class="info">
                  <p class="name ellipsis-2">HUAWEI 系列</p>
                </div>
              </RouterLink>
            </li>
            <li >
              <RouterLink to="/">
                <!-- <img src="C:\Users\32006\Documents\EMALL\src\resources\img\Logo\VIVOLogo.png" alt="" /> -->
                <img src="#" alt="" />
                <div class="info">
                  <p class="name ellipsis-2">VIVO 系列</p>
                </div>
              </RouterLink>
            </li>
            <li >
              <RouterLink to="/">
                <img src="#" alt="" />
                <div class="info">
                  <p class="name ellipsis-2">HONOR 系列</p>
                </div>
              </RouterLink>
            </li>
            <li >
              <RouterLink to="/">
                <img src="#" alt="" />
                <div class="info">
                  <p class="name ellipsis-2">XIAOMI 系列</p>
                </div>
              </RouterLink>
            </li>
            <li >
              <RouterLink to="/">
                <img src="#" alt="" />
                <div class="info">
                  <p class="name ellipsis-2">OPPO 系列</p>
                </div>
              </RouterLink>
            </li>
            <li >
              <RouterLink to="/">
                <img src="#" alt="" />
                <div class="info">
                  <p class="name ellipsis-2">APPLE 系列</p>
                </div>
              </RouterLink>
            </li>
            
          </ul>
        </div>
      </li><li >
        <RouterLink to="/">耳机音箱</RouterLink>
        
        <!-- 弹层layer位置 -->
        <div class="layer">
          <ul>
            <li >
              <RouterLink to="/">
                <img src="#" alt="" />
                <div class="info">
                  <p class="name ellipsis-2">HUAWEI 系列</p>
                </div>
              </RouterLink>
            </li>
            <li >
              <RouterLink to="/">
                <img src="#" alt="" />
                <div class="info">
                  <p class="name ellipsis-2">VIVO 系列</p>
                </div>
              </RouterLink>
            </li>
            <li >
              <RouterLink to="/">
                <img src="#" alt="" />
                <div class="info">
                  <p class="name ellipsis-2">HONOR 系列</p>
                </div>
              </RouterLink>
            </li>
            <li >
              <RouterLink to="/">
                <img src="#" alt="" />
                <div class="info">
                  <p class="name ellipsis-2">XIAOMI 系列</p>
                </div>
              </RouterLink>
            </li>
            <li >
              <RouterLink to="/">
                <img src="#" alt="" />
                <div class="info">
                  <p class="name ellipsis-2">OPPO 系列</p>
                </div>
              </RouterLink>
            </li>
            <li >
              <RouterLink to="/">
                <img src="#" alt="" />
                <div class="info">
                  <p class="name ellipsis-2">APPLE 系列</p>
                </div>
              </RouterLink>
            </li>
            
          </ul>
        </div>
      </li><li >
        <RouterLink to="/">智慧屏</RouterLink>
        
        <!-- 弹层layer位置 -->
        <div class="layer">
          <ul>
            <li >
              <RouterLink to="/">
                <img src="#" alt="" />
                <div class="info">
                  <p class="name ellipsis-2">HUAWEI 系列</p>
                </div>
              </RouterLink>
            </li>
           
       
            <li >
              <RouterLink to="/">
                <img src="#" alt="" />
                <div class="info">
                  <p class="name ellipsis-2">XIAOMI 系列</p>
                </div>
              </RouterLink>
            </li>
          
            <li >
              <RouterLink to="/">
                <img src="#" alt="" />
                <div class="info">
                  <p class="name ellipsis-2">APPLE 系列</p>
                </div>
              </RouterLink>
            </li>
            
          </ul>
        </div>
      </li><li >
        <RouterLink to="/">智能家居</RouterLink>
        
        <!-- 弹层layer位置 -->
        <div class="layer">
          <ul>
            <li >
              <RouterLink to="/">
                <img src="#" alt="" />
                <div class="info">
                  <p class="name ellipsis-2">HUAWEI 系列</p>
                </div>
              </RouterLink>
            </li>
           
          
            <li >
              <RouterLink to="/">
                <img src="#" alt="" />
                <div class="info">
                  <p class="name ellipsis-2">XIAOMI 系列</p>
                </div>
              </RouterLink>
            </li>
          </ul>
        </div>
      </li>
     
    </ul>
  </div>
</template>


<style scoped lang='scss'>
.home-category {
  width: 200px;
  height: 400px;
  background: #FFFFFFE6;
  position: relative;
  z-index: 99;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px; // 添加边框阴影效果

  .menu {

    li {
      width: 80X;
      list-style: none;
      height: 55px;
      line-height: 55px;



      &:hover {
        background: $xtxColor;
      }

      a {
        margin-right: 4px;
        color: #000000;

        &:first-child {
          font-size: 16px;
        }
      }

      .layer {
        height: 400px;
        width: 550px;
        background: rgba(255, 255, 255, 1);
        position: absolute;
        left: 160px;
        top: 0;
        display: none;
        padding: 0 15px;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            width: 210px;
            height: 120px;
            margin-right: 15px;
            margin-bottom: 15px;
            border: 1px solid #eee;
            border-radius: 4px;
            background: #fff;
            list-style: none;

            &:nth-child(3n) {
              margin-right: 0;
            }

            a {
              display: flex;
              width: 100%;
              height: 100%;
              align-items: center;
              padding: 10px;

              &:hover {
                background: #e3f9f4;
              }

              img {
                width: 95px;
                height: 95px;
              }

              .info {
                padding-left: 10px;
                line-height: 24px;
                overflow: hidden;

                .name {
                  font-size: 16px;
                  color: #666;
                }

                .desc {
                  color: #999;
                }

                .price {
                  font-size: 22px;
                  color: $priceColor;

                  i {
                    font-size: 16px;
                  }
                }
              }
            }
          }
        }
      }

      // 关键样式  hover状态下的layer盒子变成block
      &:hover {
        .layer {
          display: block;
        }
      }
    }
  }
}
</style>