<template>
  <div>
    <el-button
      type="primary"
      @click="dialogVisible = true"
      style="margin-top: 10px"
      >新增房间</el-button
    >
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
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="新增房间"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      ><el-form ref="house" :model="house" label-width="80px">
        <el-form-item label="房间号">
          <el-input v-model="house.roomNum"></el-input>
        </el-form-item>
        <el-form-item label="房间面积">
          <el-input v-model="house.roomArea"></el-input>
        </el-form-item>
        <el-form-item label="小区"
          ><el-select
            v-model.number="house.build.estate.estateId"
            placeholder="请选择"
          >
            <el-option
              v-for="item in estateList"
              :key="item.estateId"
              :label="item.estateName"
              :value="item.estateId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="楼号"
          ><el-select v-model.number="house.build.buildId" placeholder="请选择">
            <el-option
              v-for="item in buildList"
              :key="item.buildId"
              :label="item.buildName"
              :value="item.buildId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="房间类型"
          ><el-select
            v-model.number="house.roomType.roomTypeId"
            placeholder="请选择"
          >
            <el-option
              v-for="item in roomTypeList"
              :key="item.roomTypeId"
              :label="item.roomTypeName"
              :value="item.roomTypeId"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </span>
    </el-dialog>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 12, 20, 30]"
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
      dialogVisible: false,
      currentPage: 1,
      pageSize: 12,
      total: 200,
      estateList: [],
      roomTypeList: [],
      buildList: [],
      house: {
        roomId: 1,
        roomNum: null,
        roomArea: "120",
        build: {
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
        roomType: {
          roomTypeId: 1,
          roomTypeName: "三室两厅",
        },
      },
      tableData: [],
    };
  },
  created() {
    this.housePage(this.currentPage, this.pageSize);
    this.selectAllEstate();
    this.RoomTypeAll();
    this.buildAllEstate(this.house.build.estate.estateId);
  },

  watch: {
    "house.build.estate.estateId"(nv, ov) {
      // console.log(nv);
      this.buildAllEstate(nv);
    },
  },
  methods: {
    onSubmit() {
      console.log(this.house);
      request({ url: "insertHouse", method: "post", data: this.house }).then(
        (resp) => {
          this.housePage(this.currentPage, this.pageSize);
          this.$message({
            type: "success",
            message: "新增成功!",
          });
          this.dialogVisible = false;
        }
      );
    },
    selectAllEstate() {
      request({ url: "selectAllEstate", method: "get" }).then((resp) => {
        this.estateList = resp.data.data;
        // console.log(this.estateList);
      });
    },
    buildAllEstate(estateId) {
      request({
        url: "buildAll/" + estateId,
        method: "get",
      }).then((resp) => {
        // console.log(this.house.build.estate.estateId);
        // console.log(resp.data.data);
        this.buildList = resp.data.data;
      });
    },
    RoomTypeAll() {
      request({ url: "RoomTypeAll", method: "get" }).then((resp) => {
        this.roomTypeList = resp.data.data;
        // console.log(this.roomTypeList);
      });
    },
    housePage(currentPage, pageSize) {
      request({
        url: "housePage",
        method: "get",
        params: { currentPage: currentPage, pageSize: pageSize },
      }).then((resp) => {
        this.tableData = resp.data.data.list;
        this.total = resp.data.data.totalNumber;
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
      request({ url: "deleteHouse/" + row.roomId, method: "Delete" }).then(
        (resp) => {
          this.$message({
            type: "success",
            message: "删除成功",
          });
          this.housePage(this.currentPage, this.pageSize);                                        
        }
      );
    },
    //分页尺寸改变
    handleSizeChange(val) {
      this.pageSize = val;
      this.housePage(this.currentPage, this.pageSize);
      // console.log(`每页 ${val} 条`);
    },
    //当前页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.housePage(this.currentPage, this.pageSize);
      // console.log(`当前页: ${val}`);
    },
  },
};
</script>
  
  <style>
</style>