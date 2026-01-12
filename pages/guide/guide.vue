<template>
  <view class="guide-container">
    <swiper class="guide-swiper" 
      :indicator-dots="true" 
      indicator-color="rgba(0, 0, 0, .3)" 
      indicator-active-color="#007aff">
      
	  <!-- vfor循环 -->
      <swiper-item v-for="(img, index) in guideImages" :key="index">
        <image :src="img" mode="aspectFill" class="guide-img"></image>
        
		
		<!-- vif实现显示隐藏 -->
        <view v-if="index === guideImages.length - 1" class="button-group">
          <button class="btn setting-btn" @click="openNetworkSetting">网络设置</button>
          <button class="btn enter-btn" @click="launchApp">进入应用</button>
        </view>
      </swiper-item>
      
    </swiper>
  </view>
</template>

<script setup>
import { ref } from 'vue';

// 定义数组,数组里每个元素是一个url
const guideImages = ref([
  '/static/images/test1.png',
  '/static/images/test2.png',
  '/static/images/test3.png',
  '/static/images/test4.png',
  '/static/images/test5.png'
]);

// 2. 网络设置逻辑
const openNetworkSetting = () => {
  uni.showModal({
    title: '网络设置',
    editable: true,
    placeholderText: '请输入服务器IP:端口',
    success: (res) => {
      if (res.confirm && res.content) {
        uni.setStorageSync('server_ip_port', res.content);
        uni.showToast({ title: '设置成功' });
      }
    }
  });
};

// 3. 进入主页逻辑
const launchApp = () => {
  // 标记已看过引导页
  uni.setStorageSync('has_launched', true);
  // 跳转到首页
  uni.switchTab({
    url: '/pages/index/index'
  });
};
</script>

<style scoped>
/* 样式部分保持不变 */
.guide-container, .guide-swiper, .guide-img {
  width: 100%;
  height: 100vh;
}
.button-group {
  position: absolute;
  bottom: 100rpx;
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.btn {
  width: 280rpx;
  height: 80rpx;
  line-height: 80rpx;
  font-size: 28rpx;
  border-radius: 40rpx;
}
.setting-btn {
  background-color: #f8f8f8;
  color: #333;
}
.enter-btn {
  background-color: #007aff;
  color: white;
}
</style>