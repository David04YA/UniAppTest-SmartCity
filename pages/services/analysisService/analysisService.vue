<template>
  <!-- 图表容器：用于包裹canvas元素，提供布局和样式 -->
  <view class="chart-container">
    <!-- 添加canvas元素：用于绘制图表 -->
    <!-- canvas-id: 指定画布ID，必须与JavaScript中的id一致 -->
    <!-- id: DOM元素ID，用于获取画布上下文 -->
    <!-- class: 应用CSS样式 -->
    <canvas canvas-id="myChart" id="myChart" class="chart-canvas"></canvas>
  </view>
</template>

<script setup>
// 导入Vue Composition API函数
import { ref } from 'vue'; // 用于创建响应式变量
import uCharts from '@qiun/ucharts'; // 导入uCharts图表库
import { onReady } from '@dcloudio/uni-app'; // 导入UniApp的onReady生命周期钩子

// 定义响应式数据
const analysis = ref([]); // 存储从接口获取的新闻数据
const baseUrl = 'http://121.9.253.236:10001'; // 后端API基础URL

// 图表相关变量
const uChartsInstance = {}; // 存储图表实例的对象，以canvas ID为键
const cWidth = ref(750); // 图表宽度（单位：rpx），初始值750
const cHeight = ref(600); // 图表高度（单位：rpx），初始值600（增加高度解决标签重叠）
const id = 'myChart'; // canvas元素的ID，用于标识图表

// 获取新闻数据函数
const newsContainner = () => {
  // 使用uni.request发起HTTP GET请求
  uni.request({
    url: baseUrl + '/prod-api/press/press/list', // 完整的API请求地址
    method: 'GET', // 请求方法
    success: (res) => { // 请求成功的回调函数
      console.log(res); // 打印完整响应结果（用于调试）
      // 提取前5条数据：res.data.rows是数据数组，slice(0,5)取前5个元素
      analysis.value = res.data.rows.slice(0, 5);
      drawCharts(); // 获取数据后调用绘图函数
    },
    fail: (err) => { // 请求失败的回调函数
      console.log(err); // 打印错误信息
    }
  });
};

// 绘制图表函数
const drawCharts = () => {
  // 准备数据 - 截断长标题
  const categories = []; // X轴分类标签数组（新闻标题）
  const seriesData = [];  // Y轴数据数组（点赞数）
  
  // 遍历分析数据，处理每个新闻项
  analysis.value.forEach(item => {
    // 获取新闻标题，如果不存在则使用"无标题"作为默认值
    let title = item.title || '无标题';
    // 如果标题长度超过6个字符，则截断并在末尾添加省略号
    if (title.length > 6) {
      title = title.substring(0, 6) + '...';
    }
    categories.push(title); // 将处理后的标题添加到分类数组
    // 获取点赞数，如果不存在则使用0作为默认值
    seriesData.push(item.likeNum || 0);
  });
  
  // 创建画布上下文：获取指定ID的canvas绘图上下文
  const ctx = uni.createCanvasContext(id);
  
  // 如果之前有同ID的图表实例，先销毁它（避免内存泄漏）
  if (uChartsInstance[id]) {
    uChartsInstance[id].dispose();
  }
  
  // 创建新实例 - 添加旋转标签配置
  uChartsInstance[id] = new uCharts({
    type: 'column',          // 图表类型：柱状图
    context: ctx,            // 使用上面创建的画布上下文
    width: cWidth.value,     // 图表宽度（响应式变量的值）
    height: cHeight.value,   // 图表高度（响应式变量的值）
    categories: categories,  // X轴分类标签（处理后的新闻标题）
    series: [{               // 数据系列
      name: '点赞数',         // 系列名称（图例显示）
      data: seriesData        // 系列数据（点赞数数组）
    }],
    // 增加内边距 - 上、右、下、左
    padding: [40, 40, 80, 40], // 显著增加边距，为标签和标题留出空间
    
    // X轴配置
    xAxis: {
      disableGrid: true,     // 禁用X轴网格线
      rotateLabel: true,     // 旋转标签（解决重叠问题）
      labelCount: 5,         // 显示标签数量（最多5个）
      fontSize: 10,          // 标签字体大小（减小字体）
      scrollShow: true,      // 启用横向滚动
      itemCount: 3,          // 每次显示的项目数（3个）
      // 增加X轴边距
      gridColor: 'transparent', // 网格线颜色设为透明
      axisLine: true,         // 显示轴线
      axisLineColor: '#CCCCCC', // 轴线颜色
      axisLineWidth: 1        // 轴线宽度
    },
    
    // Y轴配置
    yAxis: {
      data: [{ min: 0 }],     // Y轴数据范围，最小值设为0
      // 增加Y轴边距
      gridType: 'dash',       // 网格线类型：虚线
      dashLength: 4,          // 虚线线段长度
      splitNumber: 5,         // Y轴分割段数（分成5段）
      format: (val) => val.toFixed(0) // 数值格式化函数（取整）
    },
    
    // 图例配置
    legend: {
      show: true,             // 显示图例
      position: 'top',        // 图例位置：顶部
      float: 'right',         // 图例浮动位置：右侧
      padding: 20,            // 图例内边距
      margin: 15              // 图例外边距
    },
    
    // 标题配置
    title: {
      name: '新闻点赞数统计',  // 图表标题文本
      fontSize: 16,           // 标题字体大小
      color: '#2c3e50',       // 标题颜色
      padding: 20,            // 标题内边距
      margin: 15              // 标题外边距
    },
    
    // 数据标签配置
    dataLabel: true,          // 显示数据标签（在柱子上方显示数值）
    dataLabelPadding: 10,     // 数据标签内边距
    
    // 柱状图额外配置
    extra: {
      column: {
        type: 'group',        // 柱状图类型：分组（多系列并列）
        width: 20,            // 柱宽（像素）
        radius: 4,            // 柱子圆角半径
        spacing: 10,          // 柱子间距（像素）
        fillOpacity: 0.8,     // 填充透明度
        strokeWidth: 0        // 边框宽度（0表示无边框）
      }
    }
  });
};

// 组件挂载后执行的生命周期函数
onReady(() => {
  // 设置图表宽度：将750rpx转换为像素值
  cWidth.value = uni.upx2px(750);
  // 设置图表高度：将600rpx转换为像素值（增加高度解决标签重叠）
  cHeight.value = uni.upx2px(600);
  // 调用函数获取新闻数据
  newsContainner();
});
</script>

<style>
/* 容器样式 - 增加外边距 */
.chart-container {
  display: flex;            /* 使用Flex布局 */
  justify-content: center;  /* 水平居中 */
  align-items: center;      /* 垂直居中 */
  background-color: #f8f9fa; /* 背景颜色（浅灰色） */
  min-height: 100vh;        /* 最小高度为视口高度 */
}

/* 图表画布样式 - 增加外边距 */
.chart-canvas {
  width: 750rpx;            /* 宽度（rpx单位，适应不同屏幕） */
  height: 600rpx;           /* 高度（增加高度解决标签重叠） */
  margin: 10rpx;            /* 外边距（10rpx） */
  background-color: #ffffff; /* 背景颜色（白色） */
  border-radius: 16rpx;      /* 圆角半径（16rpx） */
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1); /* 盒子阴影（轻微阴影效果） */
  border: 1rpx solid #e0e0e0; /* 边框（浅灰色，1rpx宽） */
}
</style>