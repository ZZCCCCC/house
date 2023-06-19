<template>
  <div>
    <template>
      <el-table stripe :data="tableData" style="width: 100%">
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column prop="roomNum" label="房间号" width="180">
        </el-table-column>
        <el-table-column prop="roomArea" label="面积" width="180">
        </el-table-column>
        <el-table-column prop="roomType.roomTypeName" label="房间类型">
        </el-table-column>
        <el-table-column prop="build.estate.estateName" label="小区">
        </el-table-column>
        <el-table-column prop="build.estate.city.cityName" label="所属城市">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
              >取消收藏</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </template>
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
    this.userOfHouse(this.user.userId);
  },
  methods: {
    getToken() {
      const token = localStorage.getItem("token");
      this.user = JSON.parse(token);
    },
    handleDelete(row) {
      request({
        url: "userOfHouseCancel",
        method: "get",
        params: { id: this.user.userId, roomId: row.roomId },
      }).then((resp) => {
        this.$message({
          type: "success",
          message: "删除成功",
        });
        this.userOfHouse(this.user.userId);
      });
    },

    userOfHouse(id) {
      request({
        url: "userOfHouse",
        method: "get",
        params: { id: this.user.userId },
      }).then((resp) => {
        this.tableData = resp.data.data;
      });
    },
  },
};
</script>

<style>
</style>