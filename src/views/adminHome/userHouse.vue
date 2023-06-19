<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column prop="user.nickname" label="昵称" width="180">
      </el-table-column>
      <el-table-column prop="user.nickname" label="联系方式" width="180">
      </el-table-column>
      <el-table-column prop="house.roomNum" label="房间号" width="180">
      </el-table-column>
      <el-table-column prop="house.roomArea" label="面积" width="180">
      </el-table-column>
      <el-table-column prop="house.build.buildName" label="楼号" width="180">
      </el-table-column>
      <el-table-column
        prop="house.build.estate.estateName"
        label="小区名称"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="house.build.estate.estateAddress"
        label="小区地址"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="house.build.estate.city.cityName"
        label="所属城市"
        width="180"
      >
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
    };
  },
  mounted() {
    this.selectAll();
  },
  methods: {
    selectAll() {
      request({ url: "/selectUserHouse", method: "get" }).then((resp) => {
        this.tableData = resp.data.data;
        // console.log(resp.data);
      });
    },
  },
};
</script>

<style>
</style>