<template>
  <footer class="app_footer">
    <!-- 联系我们 -->
    <div class="contact">
      <div class="container">
        <dl>
          <dt>客户服务</dt>
          <dd><i class="iconfont icon-kefu"></i> 在线客服</dd>
          <dd><i class="iconfont icon-question"></i> 问题反馈</dd>
        </dl>
        <dl>
          <dt>关注我们</dt>
          <dd><i class="iconfont icon-weixin"></i> 公众号</dd>
          <dd><i class="iconfont icon-weibo"></i> 微博</dd>
        </dl>
        <dl>
          <dt>下载APP</dt>
          <dd class="qrcode"><img src="" /></dd>
          <dd class="download">
            <span>扫描二维码</span>
            <span>立马下载APP</span>
            <a href="javascript:;">下载页面</a>
          </dd>
        </dl>
        <dl>
          <dt>服务热线</dt>
          <dd class="hotline">400-0000-000 <small>周一至周日 8:00-18:00</small></dd>
        </dl>
      </div>
    </div>
    <!-- 其它 -->
    <div class="extra">
      <div class="container">
        <div class="slogan">
  <a href="javascript:;">
    <i class="iconfont "></i>
    <img alt="" draggable="false" src="https://res.vmallres.com/uomcdn/CN/cms/202203/35029C2650265248A5C45BC46E0D7578.png" class="css-9pa8cd">
    <span>百强企业 品质保证</span>
  </a>
  <a href="javascript:;">
    <i class="iconfont "></i>
    <img alt="" draggable="false" src="https://res.vmallres.com/uomcdn/CN/cms/202203/848285C26D6B91405D84D71CC8D738F2.png" class="css-9pa8cd">
    <span>官方售后 全国联保</span>
  </a>
  <a href="javascript:;">
    <i class="iconfont "></i>
    <img alt="" draggable="false" src="https://res.vmallres.com/uomcdn/CN/cms/202203/09CE412E94E10830D00A2487756EBEE4.png" class="css-9pa8cd">
    <span>7天退货 15天换货</span>
  </a>
  <a href="javascript:;">
    <i class="iconfont "></i>
    <img alt="" draggable="false" src="https://res.vmallres.com/uomcdn/CN/cms/202203/EABCAA990C477793FB6F09658BF80B82.png" class="css-9pa8cd">
    <span>官方售后 全国联保</span>
  </a>
</div>

        <!-- 版权信息 -->
        <div class="copyright">
          <p>
            <a href="javascript:;">关于我们</a>
            <a href="javascript:;">帮助中心</a>
            <a href="javascript:;">售后服务</a>
            <a href="javascript:;">隐私政策</a>
            <a href="javascript:;">商务合作</a>
            <a href="javascript:;">使用条款</a>
            <a href="javascript:;">友情链接</a>
          </p>
          <p>CopyRight © 2024 乐享商城EMALL</p>
          <p>隐私声明 服务协议 | 经营资质 | 豫ICP备 无 号|豫公网安备 无 号
            增值电信业务经营许可证：豫 无 |备案主体编号：无 |豫新出网备（2024）无号|（豫）网械平台备字[2024]第0000号
            
            网信算备 无 号  </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped lang='scss'>
.app_footer {
  overflow: hidden;
  width: 100%;

  .contact {
    background: #fff;

    .container {

      padding: 30px 0 20px 25px;
      display: flex;
      justify-content: center;
      width: 100%;
    }

    dl {
      height: 100px;
      text-align: center;
      padding: 0 72px;
      border-right: 1px solid #f2f2f2;
      color: #999;

      &:first-child {
        padding-left: 0;
      }

      &:last-child {
        border-right: none;
        padding-right: 0;
      }
    }

    dt {
      line-height: 1;
      font-size: 18px;
    }

    dd {
      margin: 36px 12px 0 0;
      float: left;
      width: 72px;
      height: 72px;
      padding-top: 10px;
     

      .iconfont {
        font-size: 24px;
        display: block;
        color: #666;
      }

      &:hover {
        .iconfont {
          color: $xtxColor;
        }
      }

      &:last-child {
        margin-right: 0;
      }
    }

    .qrcode {
      width: 72px;
      height: 72px;
      padding: 7px;
      border: 1px solid #ededed;
    }

    .download {
      padding-top: 5px;
      font-size: 14px;
      width: auto;
      height: auto;
      border: none;

      span {
        display: block;
      }

      a {
        display: block;
        line-height: 1;
        padding: 10px 25px;
        margin-top: 5px;
        color: #fff;
        border-radius: 2px;
        background-color: rgb(207, 10, 44);
      }
    }

    .hotline {
      padding-top: 20px;
      font-size: 22px;
      color: #666;
      width: auto;
      height: auto;
      border: none;

      small {
        display: block;
        font-size: 15px;
        color: #999;
      }
    }
  }

  .extra {
    background-color: #FFFFFF;
  }

  .slogan {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 100px;
  width: 100%;
  border-bottom: 1px solid #434343;
}

.slogan a {
  display: flex;
  align-items: center;
  white-space: nowrap;
  font-size: 28px;
}

.slogan a i {
  font-size: 25px;
  margin-right: 10px;
  vertical-align: middle;
}

.slogan a img {
  height: 25px; /* 确保图片高度一致 */
  margin-right: 5px;
}

.slogan a span {
  vertical-align: middle;
}



  .copyright {
    height: 120px;
    padding-top: 10px;
    text-align: center;
    color: #999;
    font-size: 15px;

    p {
      line-height: 1;
      margin-bottom: 20px;
    }

    a {
      color: #999;
      line-height: 1;
      padding: 0 10px;
      border-right: 1px solid #999;

      &:last-child {
        border-right: none;
      }
    }
  }
}
</style>