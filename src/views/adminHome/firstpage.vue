<template>
  <div>
    <div id="main" style="width: 1000px; height: 800px"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import request from "@/utils/request";
export default {
  data() {
    return {
      aa: [],
      option: {
        title: {
          text: "小区数量统计表统计表",
          subtext: "real Data",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "小区数量",
            type: "pie",
            radius: "50%",
            data: [
              { value: 1048, name: "Search Engine" },
              { value: 735, name: "Direct" },
              { value: 580, name: "Email" },
              { value: 484, name: "Union Ads" },
              { value: 300, name: "Video Ads" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      },
    };
  },
  created() {
    this.cityCountEstate();
  },
  methods: {
    cityCountEstate() {
      request({ url: "count", method: "get" }).then((resp) => {
        this.option.series[0].data = resp.data.data;
        console.log(this.option.series[0].data);
        var myChart = echarts.init(document.getElementById("main"));
        myChart.setOption(this.option, true);
      });
    },
  },
};
</script>

<style>
</style>