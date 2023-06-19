<template>
  <div
    style="
      width: 900px;
      margin: auto;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
      padding: 30px;
    "
  >
    <el-form ref="user" :model="user" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="user.username" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="user.password"></el-input>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="user.nickname"></el-input>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input v-model="user.phoneNumber"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-select v-model="user.city.cityId" placeholder="请选择">
          <el-option
            v-for="item in cityList"
            :key="item.cityId"
            :label="item.cityName"
            :value="item.cityId"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="角色">
        <el-input v-model="user.role.roleName" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import request from "@/utils/request";
import router from "@/router";
export default {
  data() {
    return {
      cityList: [],
      user: {
        username: "",
        password: "",
        nickname: "",
        phoneNumber: "",
        city: {},
        role: {},
      },
    };
  },
  created() {
    this.getToken();
    this.cityAll();
  },
  methods: {
    getToken() {
      const token = localStorage.getItem("token");
      this.user = JSON.parse(token);
      //   console.log(this.form);
    },
    cityAll() {
      request({ url: "cityAll", method: "get" }).then((resp) => {
        this.cityList = resp.data.data;
        // console.log(resp.data.data);
      });
    },
    onSubmit() {
      console.log(this.form);
      request({ url: "updateUser", method: "post", data: this.user }).then(
        (resp) => {
          //   console.log(resp.data);
          this.$message({
            showClose: true,
            message: "恭喜你，修改成功",
            type: "success",
          });
          router.push("/");
        }
      );
    },
  },
};
</script>

<style>
</style>