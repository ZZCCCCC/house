<template>
  <div style="width: 1600px; margin: auto">
    <el-container>
      <el-header
        ><el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :router="true"
        >
          <el-menu-item index="/userHome/firstHome">首页</el-menu-item>
          <el-submenu index="/userHome/userHouse">
            <template slot="title">房屋列表</template>
            <el-menu-item index="/userHome/userHouse">房屋展示</el-menu-item>
            <el-menu-item index="/userHome/houseShow">收藏中心</el-menu-item>
          </el-submenu>
          <el-submenu index="/userHome/userPark">
            <template slot="title">停车场列表</template>
            <el-menu-item index="/userHome/userPark">停车位展示</el-menu-item>
            <el-menu-item index="/userHome/parkShow">收藏中心</el-menu-item>
          </el-submenu>
          <el-menu-item index="/userHome/userInfo">个人中心</el-menu-item>
          <el-button
            type="danger"
            style="
              float: right;
              text-align: center;
              height: 50px;
              width: 80px;
              line-height: 25px;
              margin-top: 5px;
            "
            @click="returnLogin"
            >退出</el-button
          >
        </el-menu></el-header
      >
      <el-main> <router-view></router-view></el-main>
    </el-container>
  </div>
</template>

<script>
import img1 from "@/assets/1.png";
import img2 from "@/assets/2.png";
import img3 from "@/assets/3.png";
export default {
  data() {
    return {
      activeIndex: "1",
    };
  },
  methods: {
    returnLogin() {
      localStorage.removeItem("token");
      window.location.href = "/";
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style lang="less" scoped>
</style>
