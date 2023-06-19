<template>
  <div class="estate-container">
    <!-- 搜索表单 -->
    <div class="serch-div">
      <!-- 行内 -->
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="小区名称">
          <el-input
            v-model="formInline.estateName"
            placeholder="小区名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input
            v-model="formInline.city.cityName"
            placeholder="地址"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
        <!-- 新增按钮 -->
        <el-form-item class="add">
          <el-button class="add" type="success" @click="addButton"
            >新增</el-button
          >
        </el-form-item>
      </el-form>
      <!-- 新增对话框 -->
      <el-dialog
        title="新增信息"
        :visible.sync="dialogVisibleAdd"
        width="30%"
        :before-close="handleCloseAdd"
      >
        <el-form ref="estateAdd" :model="estateAdd" label-width="80px">
          <el-form-item label="小区名称"
            ><el-input v-model="estateAdd.estateName"></el-input
          ></el-form-item>
          <el-form-item label="小区地址"
            ><el-input v-model="estateAdd.estateAddress"></el-input
          ></el-form-item>
          <el-form-item label="区域">
            <el-select v-model.number="cityListValueAdd" placeholder="请选择">
              <el-option
                v-for="item in cityList"
                :key="item.cityId"
                :label="item.cityName"
                :value="item.cityId"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleAdd = false">取 消</el-button>
          <el-button type="primary" @click="updateSuccessAdd">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 表格展示 -->
    <div>
      <el-table :data="estateList" stripe style="width: 100%">
        <el-table-column type="index" label="Id" align="center">
        </el-table-column>
        <el-table-column prop="estateName" label="小区名称"> </el-table-column>
        <el-table-column
          prop="estateAddress"
          label="小区地址"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column prop="city.cityName" label="地址"></el-table-column>
        <el-table-column
          prop="city.cityCenter"
          label="行政中心"
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        title="信息修改"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <el-form ref="estate" :model="estate" label-width="80px">
          <el-form-item label="小区名称"
            ><el-input v-model="estate.estateName"></el-input
          ></el-form-item>
          <el-form-item label="小区地址"
            ><el-input v-model="estate.estateAddress"></el-input
          ></el-form-item>
          <el-form-item label="区域">
            <el-select v-model.number="cityListValue" placeholder="请选择">
              <el-option
                v-for="item in cityList"
                :key="item.cityId"
                :label="item.cityName"
                :value="item.cityId"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateSuccess">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 分页栏 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 11, 20, 30]"
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
import deepClone from "@/utils/deepClone";
export default {
  data() {
    return {
      dialogVisibleAdd: false,
      formInline: {
        estateName: "",
        city: {
          cityName: "",
        },
      },
      cityListValueAdd: 1,
      estateList: [],
      currentPage: 1,
      pageSize: 11,
      total: 100,
      estate: {},
      cityList: [],
      cityListValue: 1,
      //对话框是否打开
      dialogVisible: false,
      form: {},
      estateAdd: {
        estateName: "",
        estateAddress: "",
        city: { cityId: 1 },
      },
    };
  },
  created() {
    this.selectAllEstate(this.currentPage, this.pageSize);
    this.selectAllCityList();
  },
  //监听器
  watch: {
    cityListValue(nv, ov) {
      // console.log(nv, ov);
      // console.log(this.cityListValue);
      this.estate.city.cityId = this.cityListValue;
      // console.log(this.estate.city.cityId);
    },
  },
  methods: {
    addButton() {
      this.dialogVisibleAdd = true;
      this.estateAdd = {
        estateName: "",
        estateAddress: "",
        city: { cityId: 1 },
      };
    },
    // 新增提交
    updateSuccessAdd() {
      this.estateAdd.city.cityId = this.cityListValueAdd;
      // console.log(this.estateAdd);
      request({ method: "post", url: "/addEaste", data: this.estateAdd }).then(
        (resp) => {
          // console.log(resp.data.data);

          this.dialogVisibleAdd = false;
          this.selectAllEstate(this.currentPage, this.pageSize);
        }
      );
    },
    //行内表单提交
    onSubmit() {
      (this.currentPage = 1), (this.pageSize = 11);
      if (
        this.formInline.estateName == "" &&
        this.formInline.city.cityName == ""
      ) {
        this.selectAllEstate(this.currentPage, this.pageSize);
        return;
      }

      request({
        method: "post",
        url: "/searchformInline",
        data: this.formInline,
      }).then((resp) => {
        console.log(resp.data.data);
        this.estateList = resp.data.data;
      });
    },

    handleSizeChange(val) {
      this.pageSize = val;
      // console.log(this.pageSize);
      this.selectAllEstate(this.currentPage, this.pageSize);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.selectAllEstate(this.currentPage, this.pageSize);
      // console.log(this.currentPage);
    },
    //修改提交
    updateSuccess() {
      // console.log(this.estate);
      request({ method: "post", url: "/estateUpdate", data: this.estate }).then(
        (resp) => {
          // console.log(resp.data);
          this.dialogVisible = false;
          this.selectAllEstate(this.currentPage, this.pageSize);
          this.$message({
            type: "success",
            message: "修改成功!",
          });
        }
      );
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    handleCloseAdd(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    //编辑
    handleEdit(row) {
      // console.log("row:", row);
      this.estate = deepClone(row);
      this.cityListValue = this.estate.city.cityId;
      // this.estate = row;
      this.dialogVisible = true;
      // console.log("123", this.estate);
    },
    selectAllCityList() {
      request({ method: "get", url: "estateSelectAllCity" }).then((resp) => {
        this.cityList = resp.data.data;
        // console.log(this.cityList);
      });
    },
    //删除
    handleDelete(row) {
      // console.log(row);
      this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log(row.estateId);
          request({
            method: "get",
            url: "/deleteEstate",
            params: { estateId: row.estateId },
          }).then((resp) => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.selectAllEstate(this.currentPage, this.pageSize);
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    selectAllEstate(currentPage, pageSize) {
      // axios({
      //   methods: "get",
      //   URL: "http://localhost:81/estateAll",
      // }).then((resp) => {
      //   this.estateList = resp.data.data;
      // });
      request({
        method: "get",
        url: "/estateAll",
        params: { currentPage: currentPage, pageSize: pageSize },
      }).then((resp) => {
        // console.log(resp.data.data.list);
        this.estateList = resp.data.data.list;
        this.total = resp.data.data.totalNumber;
      });
      // axios({
      //   method: "post",
      //   url: "http://localhost:81/estateAll",
      // }).then((resp) => {
      //   // console.log(this.city);
      //   console.log(resp.data.data);
      //   this.estateList = resp.data.data;
      // });
    },
  },
};
</script>

<style lang="less" scoped>
.serch-div {
  position: relative;
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>