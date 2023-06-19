<template>
  <div>
    <div>
      <el-button style="margin-top: 10px" type="success" @click="addUser"
        >新增</el-button
      >
    </div>
    <el-table stripe :data="tableData" style="width: 100%">
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column prop="username" label="用户名" width="180">
      </el-table-column>
      <el-table-column prop="password" label="密码" width="180">
      </el-table-column>
      <el-table-column prop="nickname" label="昵称"> </el-table-column>
      <el-table-column prop="phoneNumber" label="联系方式"> </el-table-column>
      <el-table-column prop="city.cityName" label="所属城市"> </el-table-column>
      <el-table-column prop="role.roleName" label="身份"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="修改用户"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      ><el-form :model="user" label-width="100px">
        <el-form-item label="密码" prop="password">
          <el-input v-model="user.password"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="user.nickname"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="phoneNumber">
          <el-input v-model.number="user.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="city.cityName">
          <el-select v-model="user.city.cityId" placeholder="请选择地址">
            <el-option
              v-for="item in city"
              :key="item.cityId"
              :label="item.cityName"
              :value="item.cityId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="身份" prop="role.roleName">
          <el-select v-model="user.role.roleId" placeholder="请选择身份">
            <el-option
              v-for="item in role"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updatesubmit">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="新增用户"
      :visible.sync="AdddialogVisible"
      width="30%"
      :before-close="AddhandleClose"
      ><el-form :model="user" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model.lazy="user.username"></el-input>
          {{ message }}
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="user.password"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="user.nickname"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="phoneNumber">
          <el-input v-model.number="user.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="city.cityName">
          <el-select v-model="user.city.cityId" placeholder="请选择地址">
            <el-option
              v-for="item in city"
              :key="item.cityId"
              :label="item.cityName"
              :value="item.cityId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="身份" prop="role.roleName">
          <el-select v-model="user.role.roleId" placeholder="请选择身份">
            <el-option
              v-for="item in role"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="AdddialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addsubmit">确 定</el-button>
      </span>
    </el-dialog>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[2, 5, 10, 20]"
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
import deepClone from "@/utils/deepClone";
export default {
  data() {
    return {
      dialogVisible: false,
      AdddialogVisible: false,
      currentPage: 1,
      pageSize: 5,
      total: 200,
      message: "",
      user: {
        username: "",
        password: "",
        nickname: "",
        phoneNumber: "",
        city: {
          cityId: 1,
          cityName: "北京市",
        },
        role: {
          roleId: 1,
          roleName: "管理员",
        },
      },
      role: [
        { roleId: 1, roleName: "管理员" },
        { roleId: 2, roleName: "普通用户" },
      ],
      city: [],
      tableData: [
        {
          userId: 1,
          username: "zhangsan",
          password: "123456",
          nickname: "张三",
          phoneNumber: 11111111111,
          city: {
            cityId: 1,
            cityName: "北京市",
            cityAbbreviation: "京",
            cityCenter: "北京",
          },
          role: {
            roleId: 1,
            roleName: "管理员",
            description:
              "管理员具有无比巨大的权力，可以管理此系统所有的用户和模块",
          },
        },
      ],
    };
  },
  created() {
    this.userPage(this.currentPage, this.pageSize);
    this.cityAll();
  },
  watch: {
    "user.username"(newval, oldval) {
      request({
        url: "usernameCheck",
        method: "get",
        params: { username: this.user.username },
      }).then((resp) => {
        // console.log(resp.data.message);
        this.message = resp.data.message;
      });
    },
  },
  methods: {
    //修改用户
    updatesubmit() {
      request({ url: "updateUser", method: "post", data: this.user }).then(
        (resp) => {
          this.userPage(this.currentPage, this.pageSize);
        }
      );
      this.dialogVisible = false;
    },
    cityAll() {
      request({ url: "cityAll", method: "get" }).then((resp) => {
        this.city = resp.data.data;
      });
    },
    //新增用户
    addUser() {
      (this.user = {
        username: "",
        password: "",
        nickname: "",
        phoneNumber: "",
        city: {
          cityId: 1,
          cityName: "北京市",
        },
        role: {
          roleId: 1,
          roleName: "管理员",
        },
      }),
        (this.AdddialogVisible = true);
    },
    //新增提交按钮
    addsubmit() {
      request({ url: "insertUser", method: "post", data: this.user }).then(
        (resp) => {
          // console.log(resp.data.data);
          this.AdddialogVisible = false;
          this.userPage(this.currentPage, this.pageSize);
        }
      );
      console.log(this.user);
    },
    userPage(currentPage, pageSize) {
      request({
        url: "userPage",
        method: "get",
        params: { currentPage: currentPage, pageSize: pageSize },
      }).then((resp) => {
        this.total = resp.data.data.totalNumber;
        this.tableData = resp.data.data.list;
        // console.log(resp.data.data);
        console.log(this.tableData);
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    AddhandleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    //编辑
    handleEdit(row) {
      this.dialogVisible = true;
      this.user = deepClone(row);
      // console.log(row);
    },
    //删除
    handleDelete(row) {
      this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          request({
            method: "delete",
            url: "/deleteByID/" + row.userId,
          }).then((resp) => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.userPage(this.currentPage, this.pageSize);
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
      console.log(row);
    },
    //分页尺寸改变
    handleSizeChange(val) {
      this.pageSize = val;
      this.userPage(this.currentPage, this.pageSize);
      // console.log(`每页 ${val} 条`);
    },
    //当前页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.userPage(this.currentPage, this.pageSize);
      // console.log(`当前页: ${val}`);
    },
  },
};
</script>
  
  <style>
</style>