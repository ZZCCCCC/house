<template>
  <div>
    <el-container>
      <el-header style="background-color: #009688"
        ><div style="position: relative">
          <img
            src="../assets/房子.png"
            width="100px"
            height="32px"
            style="position: absolute; left: 26px; top: 18px"
          />
          <span style="font-weight: bold; font-size: larger"
            >房屋租赁管理系统</span
          >
          <el-button
            type="danger"
            style="float: right; margin-top: 10px"
            @click="returnLogin"
            >退出</el-button
          >
        </div>
      </el-header>
      <el-container>
        <el-row>
          <el-aside width="251px" height="702px"
            ><el-col :span="12">
              <el-menu
                default-active="1"
                class="el-menu-vertical-demo"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
                :router="true"
              >
                <el-menu-item index="/adminHome/firstpage">
                  <i class="el-icon-document"></i>
                  <span slot="title">主页管理</span>
                </el-menu-item>
                <el-menu-item index="/adminHome/userHouse">
                  <i class="el-icon-document"></i>
                  <span slot="title">收藏管理</span>
                </el-menu-item>
                <el-menu-item index="/adminHome/park">
                  <i class="el-icon-document"></i>
                  <span slot="title">车位管理</span>
                </el-menu-item>
                <el-menu-item index="/adminHome/house">
                  <i class="el-icon-document"></i>
                  <span slot="title">房屋管理</span>
                </el-menu-item>
                <el-menu-item index="/adminHome/build">
                  <i class="el-icon-setting"></i>
                  <span slot="title">楼号管理</span>
                </el-menu-item>
                <el-menu-item index="/adminHome/estate">
                  <i class="el-icon-setting"></i>
                  <span slot="title">小区管理</span>
                </el-menu-item>
                <el-menu-item index="/adminHome/cityAdmin">
                  <i class="el-icon-setting"></i>
                  <span slot="title">城市管理</span>
                </el-menu-item>
                <el-menu-item index="/adminHome/userAdmin">
                  <i class="el-icon-setting"></i>
                  <span slot="title">用户管理</span>
                </el-menu-item>
                <el-menu-item index="/adminHome/authorityAdmin">
                  <i class="el-icon-setting"></i>
                  <span slot="title">权限管理</span>
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-aside></el-row
        >
        <el-container class="main-container">
          <!-- main -->
          <el-main><router-view></router-view></el-main>
          <el-footer height="100px">
            <div class="foot_div">
              <span><el-link type="info">关于</el-link></span>
              <span><el-link type="info">博客</el-link></span>
              <span><el-link type="info">网站</el-link></span>
            </div>
            <div class="foot_div">
              <i class="el-icon-s-management"> </i>
              <i class="el-icon-s-platform"> </i>
              <i class="el-icon-message-solid"> </i>
            </div>
            <div class="foot_div">
              <el-link type="info"
                >Copyright © 2023 Wy. All rights reserved</el-link
              >
            </div>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  methods: {
    returnLogin() {
      localStorage.removeItem("token");
      window.location.href = "/";
    },
  },
};
</script>

<style lang="less" scoped>
.el-header,
.el-footer {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 60px;
  .foot_div {
    // background-color: pink;
    line-height: 33px;
    text-align: center;
    /deep/.el-link {
      padding: 0 30px;
    }
    i {
      padding: 0 37px;
    }
  }
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
  width: 251px;
}

.el-main {
  background-color: #fff;
  color: #333;
  text-align: center;
  padding: 0%;
  // height: auto;
  // line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.main-container {
  height: 768px;
}
.el-row {
  width: 250px;
}
.el-menu {
  height: 768px;
  width: 250px;
}
.el-menu-item {
  padding: 0 100px;
}
</style>