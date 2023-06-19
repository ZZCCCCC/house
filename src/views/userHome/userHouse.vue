<template>
  <div>
    <!-- <template>
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
              >收藏</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </template> -->
    <el-row>
      <el-col :span="8" v-for="(o, index) in tableData" :key="index">
        <el-card style="margin: 10px 0 0 10px" :body-style="{ padding: '0px' }">
          <img
            v-if="o.roomType.roomTypeId == 4"
            :src="imgList[0]"
            class="image"
          />
          <img
            v-else-if="o.roomType.roomTypeId == 3"
            :src="imgList[2]"
            class="image"
          />
          <img
            v-else-if="o.roomType.roomTypeId == 1"
            :src="imgList[1]"
            class="image"
          />
          <img v-else :src="imgList[1]" class="image" />
          <div style="padding: 14px">
            <el-link type="primary" disabled style="display: block"
              >房间号：{{ o.roomNum }}</el-link
            >
            <el-link type="success" disabled style="display: block"
              >面积：{{ o.roomArea }}</el-link
            >
            <el-link disabled style="display: block"
              >房屋类型：{{ o.roomType.roomTypeName }}</el-link
            >
            <el-link type="info" disabled style="display: block"
              >地址：{{ o.build.estate.city.cityName }}-{{
                o.build.estate.estateName
              }}</el-link
            >
            <!-- <span>面积：{{ o.roomArea }}</span> -->
            <!-- <span>房屋类型：{{ o.roomType.roomTypeName }}</span> -->
            <!-- <span
              >地址：{{ o.build.estate.city.cityName }}-{{
                o.build.estate.estateName
              }}</span
            > -->
            <div class="bottom clearfix">
              <el-button type="text" class="button" @click="handleDelete(o)"
                >收藏</el-button
              >
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import request from "@/utils/request";
import dayjs from "dayjs";
import img5 from "@/assets/5.jpg";
import img6 from "@/assets/6.jpeg";
import img7 from "@/assets/7.jpeg";
export default {
  data() {
    return {
      tableData: [],
      imgList: [img5, img6, img7],
      user: {},
      currentDate: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
    };
  },
  created() {
    this.getToken();
    this.houseAll();
  },
  methods: {
    getToken() {
      const token = localStorage.getItem("token");
      this.user = JSON.parse(token);
      // console.log(this.user);
      //   console.log(this.form);
    },
    houseAll() {
      request({
        url: "houseAll",
        method: "get",
      }).then((resp) => {
        this.tableData = resp.data.data;
        console.log(resp.data.data);
      });
    },
    handleDelete(row) {
      request({
        url: "inserthouseShow",
        method: "get",
        params: { userId: this.user.userId, roomId: row.roomId },
      }).then((resp) => {
        this.$message({
          type: "success",
          message: "收藏成功",
        });
      });
    },
  },
};
</script>

<style>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>