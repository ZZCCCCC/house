<template>
  <div class="body-all">
    <el-link type="primary" :underline="false">
      <h1>{{ sday }}</h1>
    </el-link>
    <br />
    <img src="./../assets/8.jpeg" alt="" />
    <img
      src="./../assets/房子.png"
      alt=""
      style="
        position: absolute;
        width: 10%;
        margin-left: 800px;
        margin-top: -50px;
      "
    />
    <div class="login_contianer">
      <h1>登陆页面</h1>
      <el-form :label-position="labelPosition" label-width="80px" :model="user">
        <el-form-item label="用户名">
          <el-input type="text" v-model.trim="user.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model.trim="user.password"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-radio v-model="radio" :label="1">管理员</el-radio>
          <el-radio v-model="radio" :label="2">普通用户</el-radio>
        </el-form-item>
        <div class="password">
          <el-link :underline="false" type="info">忘记密码?</el-link>
        </div>
        <el-form-item class="button-two">
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";
import request from "../utils/request";
export default {
  data() {
    return {
      labelPosition: "right",
      radio: 1,
      user: {
        username: "",
        password: "",
        role: {
          roleId: 1,
        },
      },
      sday: "2023-2-1",
    };
  },
  methods: {
    // 重置按钮的方法
    resetForm() {
      (this.user.username = ""), (this.user.password = "");
      this.$message({
        message: "重置成功",
        type: "success",
      });
    },
    // 提交方法
    submitForm() {
      this.user.role.roleId = this.radio;

      // console.log(this.user);
      request({ method: "post", url: "/login", data: this.user }).then(
        (resp) => {
          if (resp.data.status == 101 && this.radio == 1) {
            this.user = resp.data.data;
            this.$router.push("/adminHome");
            this.$message({ message: "登陆成功", type: "success" });
            const userJson = JSON.stringify(this.user);
            localStorage.setItem("token", userJson);
          } else if (resp.data.status == 101 && this.radio == 2) {
            this.user = resp.data.data;
            const userJson = JSON.stringify(this.user);
            this.$router.push("/userHome");
            this.$message({ message: "登陆成功", type: "success" });
            localStorage.setItem("token", userJson);
          } else {
            this.$message({ message: "登陆失败", type: "error" });
            this.user.username = "";
            this.user.password = "";
            // localStorage.removeItem("token");
          }
        }
      );
      // axios({
      //   method: "post",
      //   url: "http://localhost:81/login",
      //   data: this.user,
      // }).then((resp) => {
      //   // console.log(resp.data.data.userId);
      //   this.user = resp.data.data;
      //   // console.log(this.user);
      //   // 登陆成功
      // if (resp.data.status == 101 && this.radio == 1) {
      //   this.$router.push("/adminHome");
      //   this.$message({ message: "登陆成功", type: "success" });
      //   localStorage.setItem("token", this.user.userId);
      // } else if (resp.data.status == 101 && this.radio == 2) {
      //   this.$router.push("/userHome");
      //   this.$message({ message: "登陆成功", type: "success" });
      //   localStorage.setItem("token", this.user.userId);
      // } else {
      //   this.$message({ message: "登陆失败", type: "error" });
      //   this.user.username = "";
      //   this.user.password = "";
      //   // localStorage.removeItem("token");
      // }
      // });
    },
  },
  created() {
    this.timeId = setInterval(() => {
      this.sday = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");
    }, 1000);
  },
};
</script>initWeather

<style lang="less" scoped>
.body-all {
  position: relative;
  width: 1703px;
  height: 825px;
  background-color: rgb(246, 246, 246);
}
.login_contianer {
  border: 1px solid black;
  padding: 10px 20px 10px 20px;
  margin: -500px 100px 100px 675px;
  width: 500px;
  > h1 {
    padding-left: 200px;
  }
  .password {
    // border: 1px solid red;
    padding-left: 400px;
    // margin-top: 10px;
  }
  .button-two {
    margin-top: -10px;
    .el-button {
      margin-right: 50px;
    }
  }
}
</style>