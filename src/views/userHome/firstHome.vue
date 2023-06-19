<template>
  <div>
    <div class="img">
      <template>
        <el-carousel indicator-position="outside">
          <el-carousel-item
            class="imgshow"
            v-for="item in imgList"
            :key="item.id"
          >
            <img :src="item.url" alt="" />
          </el-carousel-item>
        </el-carousel>
      </template>
    </div>
    <div
      style="
        height: 200px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
        background-color: rgb(238, 238, 241);
      "
    >
      <template>
        <div class="content">
          <el-row :gutter="20" style="height: 200px">
            <el-col :span="6">
              <div>
                <el-statistic
                  style="line-height: 100px"
                  group-separator=","
                  :precision="2"
                  :value="value2"
                  :title="title"
                ></el-statistic>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <el-statistic title="成功比" style="line-height: 100px">
                  <template slot="formatter"> 456/2 </template>
                </el-statistic>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <el-statistic
                  style="line-height: 100px"
                  group-separator=","
                  :precision="2"
                  decimal-separator="."
                  :value="value1"
                  :title="title"
                >
                  <template slot="prefix">
                    <i class="el-icon-s-flag" style="color: red"></i>
                  </template>
                  <template slot="suffix">
                    <i class="el-icon-s-flag" style="color: blue"></i>
                  </template>
                </el-statistic>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <el-statistic
                  style="line-height: 100px"
                  :value="like ? 521 : 520"
                  title="Feedback"
                >
                  <template slot="suffix">
                    <span @click="like = !like" class="like">
                      <i
                        class="el-icon-star-on"
                        style="color: red"
                        v-show="!!like"
                      ></i>
                      <i class="el-icon-star-off" v-show="!like"></i>
                    </span>
                  </template>
                </el-statistic>
              </div>
            </el-col>
          </el-row>
        </div>
      </template>
      <!-- 卡片 -->
      <div class="cardline">
        <el-row>
          <el-col :span="6" :offset="0">
            <el-card :body-style="{ padding: '0px' }">
              <img src="./../../assets/5.jpg" class="image" />
              <div style="padding: 14px">
                <span>房屋类型：别墅</span>
                <div class="bottom clearfix">
                  <time class="time">{{ currentDate }}</time>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6" :offset="2">
            <el-card :body-style="{ padding: '0px' }">
              <img src="./../../assets/6.jpeg" class="image" />
              <div style="padding: 14px">
                <span>房屋类型：三室两厅</span>
                <div class="bottom clearfix">
                  <time class="time">{{ currentDate }}</time>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6" :offset="2">
            <el-card :body-style="{ padding: '0px' }">
              <img src="./../../assets/7.jpeg" class="image" />
              <div style="padding: 14px">
                <span>房屋类型：一室一卫</span>
                <div class="bottom clearfix">
                  <time class="time">{{ currentDate }}</time>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
    <img src="@/assets/bottom.png" alt="" />
  </div>
</template>

<script>
import dayjs from "dayjs";
import img1 from "@/assets/1.png";
import img2 from "@/assets/2.png";
import img3 from "@/assets/3.png";
export default {
  data() {
    return {
      currentDate: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      imgList: [
        { id: 1, url: img2 },
        { id: 2, url: img3 },
        { id: 0, url: img1 },
      ],
      like: true,
      value1: 4154.564,
      value2: 2222,
      title: "今年的增长",
    };
  },
  methods: {},
};
</script>

<style>
.cardline {
  padding-left: 100px;
  margin-top: 30px;
}
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
  height: 246.31px;
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
.img {
  width: 1500px;
  margin: auto;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.like {
  cursor: pointer;
  font-size: 25px;
  display: inline-block;
}
.content {
  text-align: center;
  line-height: 200px;
}
</style>