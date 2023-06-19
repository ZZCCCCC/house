<template>
  <div>
    <el-button type="primary" style="margin: 5px" @click="dialogVisible = true"
      >新增</el-button
    >
    <el-table stripe :data="tableData" style="width: 100%">
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column prop="parkNum" label="停车位"> </el-table-column>
      <el-table-column prop="estate.estateName" label="小区"> </el-table-column>
      <el-table-column prop="estate.city.cityName" label="城市">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="停车位号">
          <el-input v-model="form.parkNum"></el-input>
        </el-form-item>
        <el-form-item label="小区">
          <el-select v-model="form.estate.estateId" placeholder="请选择区域">
            <el-option
              v-for="item in estateList"
              :key="item.estateId"
              :label="item.estateName"
              :value="item.estateId"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="insertPark">确 定</el-button>
      </span>
    </el-dialog>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 30]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>
  
  <script>
import request from "@/utils/request";
export default {
  data() {
    return {
      estateList: [],
      form: {
        estate: {
          estateId: 1,
          estateName: "",
        },
        parkNum: 102,
      },
      dialogVisible: false,
      currentPage: 1,
      pageSize: 5,
      total: 200,
      tableData: [],
    };
  },
  created() {
    this.selectAllEstate();
    this.parkAll(this.currentPage, this.pageSize);
  },
  methods: {
    parkAll(currentPage, pageSize) {
      request({
        url: "parkAll",
        method: "get",
        params: { currentPage: currentPage, pageSize: pageSize },
      }).then((resp) => {
        this.tableData = resp.data.data.list;
        this.total = resp.data.data.totalNumber;
        console.log(resp.data.data);
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    //编辑
    handleEdit(row) {
      this.dialogVisible = true;
      console.log(row);
    },
    //删除
    handleDelete(row) {
      this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log(row.parkId);
          request({
            method: "delete",
            url: "/delPark/" + row.parkId,
          }).then((resp) => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.parkAll(this.currentPage, this.pageSize);
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    selectAllEstate() {
      request({ url: "selectAllEstate", method: "get" }).then((resp) => {
        this.estateList = resp.data.data;
        // console.log(this.estateList);
      });
    },
    //分页尺寸改变
    handleSizeChange(val) {
      this.pageSize = val;
      this.parkAll(this.currentPage, this.pageSize);
      // console.log(`每页 ${val} 条`);
    },
    //当前页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.parkAll(this.currentPage, this.pageSize);
      // console.log(`当前页: ${val}`);
    },
    insertPark() {
      request({ url: "insertPark", method: "post", data: this.form }).then(
        (resp) => {
          console.log(this.form);
          this.dialogVisible = false;
        }
      );
    },
  },
};
</script>
  
  <style>
</style>