<template>
  <div>
    <el-table stripe :data="tableData" style="width: 100%">
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column prop="parkNum" label="停车位"> </el-table-column>
      <el-table-column prop="estate.estateName" label="小区"> </el-table-column>
      <el-table-column prop="estate.city.cityName" label="城市">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
            >取消收藏</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import request from "@/utils/request";
export default {
  data() {
    return {
      tableData: [],
      user: {},
    };
  },
  created() {
    this.getToken();
    this.parkShow();
  },
  methods: {
    getToken() {
      const token = localStorage.getItem("token");
      this.user = JSON.parse(token);
      //   console.log(this.form);
    },
    parkShow() {
      request({ url: "parkShow/" + this.user.userId, method: "get" }).then(
        (resp) => {
          this.tableData = resp.data.data;
        }
      );
    },
    handleDelete(row) {
      request({
        url: "delParkShow",
        method: "get",
        params: { userId: this.user.userId, parkId: row.parkId },
      }).then((resp) => {
        this.$message({
          type: "success",
          message: "取消成功",
        });
        this.parkShow();
      });
    },
  },
};
</script>

<style>
</style>