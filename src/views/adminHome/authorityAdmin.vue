<template>
  <div class="authority-container">
    <el-table
      ref="singleTable"
      :data="tableData"
      :row-key="tableData.roleId"
      highlight-current-row
      @current-change="handleCurrentChange"
      style="width: 100%"
    >
      <el-table-column type="index" width="100" align="center">
      </el-table-column>
      <el-table-column
        property="roleName"
        label="权限名称"
        width="200"
        align="center"
      >
      </el-table-column>
      <el-table-column property="description" label="权限描述">
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="medium" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-dialog
            title="编辑描述信息"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose"
          >
            <el-form>
              <el-form-item label="描述信息">
                <el-input type="textarea" v-model="describtion"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="submitRole">确 定</el-button>
              <el-button @click="dialogVisible = false">取 消</el-button>
            </span>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页栏 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="aurhorityTotal"
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
      roleId: 1,
      describtion: "",

      // 对话框隐藏
      dialogVisible: false,
      // 当前页
      currentPage: 1,
      // 总条数
      aurhorityTotal: 0,
      // 每页显示条数
      pageSize: 13,

      tableData: [],
      currentRow: null,
    };
  },
  created() {
    this.selectPage();
  },
  methods: {
    // 编辑
    handleEdit(row) {
      this.describtion = row.description;
      this.roleId = row.roleId;
      this.dialogVisible = true;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    submitRole() {
      this.updateRole(this.roleId);
      this.dialogVisible = false;
      this.selectPage();
    },
    //修改
    updateRole(roleId) {
      request({
        method: "get",
        url: "/updateRole?Id=" + roleId + "&description=" + this.describtion,
      }).then((resp) => {
        this.selectPage();
      });
      // axios({
      //   method: "get",
      //   url:
      //     "http://localhost:81/updateRole?Id=" +
      //     roleId +
      //     "&description=" +
      //     this.describtion,
      // }).then((resp) => {
      //   this.selectPage();
      // });
    },
    // 分页查询
    selectPage() {
      request({
        method: "get",
        url:
          "/roleAll?currentPage=" +
          this.currentPage +
          "&pageSize=" +
          this.pageSize,
      }).then((resp) => {
        console.log(resp.data);
        this.tableData = resp.data.data.list;
        this.aurhorityTotal = resp.data.data.totalNumber;
        console.log(this.tableData);
      });
      // axios({
      //   method: "get",
      //   url:
      //     "http://localhost:81/roleAll?currentPage=" +
      //     this.currentPage +
      //     "&pageSize=" +
      //     this.pageSize,
      // }).then((resp) => {
      //   console.log(resp.data);
      //   this.tableData = resp.data.data.list;
      //   this.aurhorityTotal = resp.data.data.totalNumber;
      //   console.log(this.tableData);
      // });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
  },
};
</script>

<style>
.block {
  float: right;
  margin-right: 10px;
}
</style>