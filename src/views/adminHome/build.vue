<template>
  <div class="build-container">
    <!-- 搜索栏 -->
    <div class="search">
      <el-form :inline="true" :model="searchInline" class="demo-form-inline">
        <el-form-item label="小区名称">
          <el-input
            v-model="searchInline.estateInline"
            placeholder="小区名称"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="searchOnSubmit">查询</el-button>
          <el-button id="addBuild" type="success" @click="addBuild"
            >新增</el-button
          >
        </el-form-item>
      </el-form>
      <el-dialog
        title="编辑信息"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <!-- 新增表单 -->
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="楼号">
            <el-input v-model="form.buildName"></el-input>
          </el-form-item>
          <el-form-item label="所属省份">
            <el-select
              v-model.number="cityListValueAdd"
              placeholder="请选择区域"
            >
              <el-option
                v-for="cityitem in cityList"
                :key="cityitem.cityId"
                :label="cityitem.cityName"
                :value="cityitem.cityId"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属小区">
            <el-select v-model.number="estate" placeholder="请选择区域">
              <el-option
                v-for="estateitem in estateList"
                :key="estateitem.estateId"
                :label="estateitem.estateName"
                :value="estateitem.estateId"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editeBuild">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="新增信息"
        :visible.sync="AdddialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <!-- 新增表单 -->
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="楼号">
            <el-input v-model="form.buildName"></el-input>
          </el-form-item>
          <el-form-item label="所属省份">
            <el-select
              v-model.number="cityListValueAdd"
              placeholder="请选择区域"
            >
              <el-option
                v-for="cityitem in cityList"
                :key="cityitem.cityId"
                :label="cityitem.cityName"
                :value="cityitem.cityId"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属小区">
            <el-select v-model.number="estate" placeholder="请选择区域">
              <el-option
                v-for="estateitem in estateList"
                :key="estateitem.estateId"
                :label="estateitem.estateName"
                :value="estateitem.estateId"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="AdddialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addInsertBuild">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 表格 -->
    <div>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column type="index" width="80" align="center">
        </el-table-column>
        <el-table-column prop="buildName" label="楼号" width="180">
        </el-table-column>
        <el-table-column prop="estate.estateName" label="小区名称" width="180">
        </el-table-column>
        <el-table-column prop="estate.estateAddress" label="小区地址">
        </el-table-column>
        <el-table-column prop="estate.city.cityName" label="所属省份">
        </el-table-column
        ><el-table-column prop="estate.city.cityCenter" label="地址">
        </el-table-column>
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
    </div>
    <!-- 分页栏 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 12, 15, 20]"
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
      rowId: 1,
      dialogVisible: false,
      cityList: [],
      estateList: [],
      cityListValueAdd: 1,
      estate: 1,
      form: {
        cityListValueAdd: 1,
        estate: 1,
        buildName: "",
      },
      //新增对话框
      AdddialogVisible: false,
      currentPage: 1,
      pageSize: 12,
      total: 100,
      searchInline: {
        estateInline: "",
      },
      tableData: [],
      buildData: {
        buildId: 1,
        buildName: "一号楼",
        estate: {
          estateId: 1,
          estateName: "盛世花园",
          estateAddress: "和平路100号",
          city: {
            cityId: 3,
            cityName: "上海市",
            cityAbbreviation: "沪",
            cityCenter: "上海",
          },
        },
      },
    };
  },
  created() {
    this.buildAll(this.currentPage, this.pageSize);
    this.selectAllCityList();
    this.selectEstateByCity();
  },
  watch: {
    cityListValueAdd(nv, ov) {
      // console.log("ov", ov);
      // console.log("nv", nv);
      this.form.cityListValueAdd = nv;
      this.selectEstateByCity();
    },
    estate(nv, ov) {
      this.form.estate = nv;
      // console.log("ov", ov);
      // console.log("nv", nv);
    },
  },
  methods: {
    //编辑修改
    handleEdit(row) {
      // console.log(row);
      this.rowId = row.buildId;
      this.form.buildName = row.buildName;
      this.cityListValueAdd = row.estate.city.cityId;
      this.estate = row.estate.estateId;
      this.dialogVisible = true;
    },
    editeBuild() {
      request({
        url: "/editeBuild",
        method: "post",
        data: {
          buildName: this.form.buildName,
          estate: this.estate,
          rowId: this.rowId,
        },
      }).then((resp) => {
        // console.log(resp.data);
        this.dialogVisible = false;
        this.buildAll(this.currentPage, this.pageSize);
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
          request({
            method: "get",
            url: "/deleteBuild/" + row.buildId,
          }).then((resp) => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.buildAll(this.currentPage, this.pageSize);
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //改变pagesize
    handleSizeChange(val) {
      this.pageSize = val;
      this.buildAll(this.currentPage, this.pageSize);
      // console.log(`每页 ${val} 条`);
    },
    //改变currentPage
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.buildAll(this.currentPage, this.pageSize);
    },
    //查询提交
    searchOnSubmit(currentPage, pageSize) {
      (currentPage = 1), (pageSize = 12);
      request({
        url: "buildByCondition",
        method: "get",
        params: {
          estateName: this.searchInline.estateInline,
          currentPage: currentPage,
          pageSize: pageSize,
        },
      }).then((resp) => {
        this.total = resp.data.data.totalNumber;
        this.tableData = resp.data.data.list;
        // console.log(resp.data);
        // console.log("table+++++", this.tableData);
      });
      this.$message({
        showClose: true,
        message: "搜索成功",
        type: "success",
      });
      // console.log("submit!");
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    //新增
    addBuild() {
      // console.log("新增");
      this.AdddialogVisible = true;
    },
    selectAllCityList() {
      request({ method: "get", url: "cityAll" }).then((resp) => {
        this.cityList = resp.data.data;
        // console.log(this.cityList);
      });
    },
    selectEstateByCity() {
      request({
        method: "get",
        url: "cityAllEstate/" + this.cityListValueAdd,
      }).then((resp) => {
        this.estateList = resp.data.data;
        // console.log(this.estateList);
      });
    },
    //TODO
    addInsertBuild() {
      request({
        method: "post",
        url: "insertBuild",
        data: this.form,
      }).then((resp) => {
        this.$message({
          showClose: true,
          message: "新增成功",
          type: "success",
        });
        this.AdddialogVisible = false;
        this.buildAll(this.currentPage, this.pageSize);
      });
    },
    //分页查询所有
    buildAll(currentPage, pageSize) {
      request({
        url: "/buildAll",
        method: "get",
        params: { currentPage: currentPage, pageSize: pageSize },
      }).then((resp) => {
        this.total = resp.data.data.totalNumber;
        this.tableData = resp.data.data.list;
        // console.log(resp.data);
        // console.log("table+++++", this.tableData);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.search {
  margin: 5px 0;
}
</style>