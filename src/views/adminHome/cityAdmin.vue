<template>
  <div class="city-container">
    <!-- 搜索表单 -->
    <div style="margin-top: 15px">
      <el-form :inline="true" :model="city" class="demo-form-inline">
        <el-form-item label="省份名称">
          <el-input v-model="city.cityName" placeholder="省份名称"></el-input>
        </el-form-item>
        <el-form-item label="省份简称">
          <el-input
            v-model="city.cityAbbreviation"
            placeholder="省份简称"
          ></el-input>
        </el-form-item>
        <el-form-item label="行政中心">
          <el-input v-model="city.cityCenter" placeholder="行政中心"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-table :data="cityList" stripe style="width: 100%">
        <el-table-column type="index" label="Id" align="center">
        </el-table-column>
        <el-table-column prop="cityName" label="地址名称"> </el-table-column>
        <el-table-column prop="cityAbbreviation" label="地址简称">
        </el-table-column>
        <el-table-column prop="cityCenter" label="行政中心"> </el-table-column>
      </el-table>
    </div>
    <div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 13, 20, 30]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import request from "@/utils/request";
export default {
  data() {
    return {
      // 总数
      total: 100,
      // 当前页
      currentPage: 1,
      pageSize: 13,
      city: {
        cityName: "",
        cityAbbreviation: "",
        cityCenter: "",
      },
      cityList: [],
    };
  },
  created() {
    this.selectCity(this.currentPage, this.pageSize);
  },
  methods: {
    // 表单提交
    onSubmit() {
      // console.log("submit!");
      if (
        this.city.cityName == "" &&
        this.city.cityCenter == "" &&
        this.city.cityAbbreviation == ""
      ) {
        this.selectCity(this.currentPage, this.pageSize);
        return;
      }
      request({
        method: "post",
        url: "/selectByCondition",
        // data: this.city,
        data: this.city,
      }).then((resp) => {
        (this.currentPage = 1), (this.cityList = resp.data.data);
      });
      // axios({
      //   method: "post",
      //   url: "http://localhost:81/selectByCondition",
      //   data: this.city,
      // }).then((resp) => {
      //   // console.log(this.city);
      //   // console.log(resp.data.data);
      //   (this.currentPage = 1), (this.cityList = resp.data.data);
      // });
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.selectCity(this.currentPage, this.pageSize);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.selectCity(this.currentPage, this.pageSize);
    },
    selectCity(currentPage, pageSize) {
      request({
        method: "get",
        url: "/selectAllCity",
        params: { currentPage: currentPage, pageSize: pageSize },
      }).then((resp) => {
        console.log(resp.data.data);
        this.total = resp.data.data.totalNumber;
        this.cityList = resp.data.data.list;
      });
      // axios({
      //   method: "get",
      //   url: "http://localhost:81/selectAllCity",
      //   params: { currentPage: currentPage, pageSize: pageSize },
      // }).then((resp) => {
      //   console.log(resp.data.data);
      //   this.total = resp.data.data.totalNumber;
      //   this.cityList = resp.data.data.list;
      // });
    },
  },
};
</script>

<style>
</style>