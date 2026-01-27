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
          <button class="btn enter-btn" @click="launchApp()">进入应用</button>
        </view>
    </swiper-item>
      
    </swiper>
  </view>
</template>

<script setup>
import {onMounted, ref } from 'vue';
import request from '@/utils/request.js'

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
  // ushowmodal: ({})title标题 content内容 
  // showCancel是否显示取消按钮 editable是否显示输入框 placeholderText输入框提示的文字
  // success showmodal调用成功后的回调函数
};

// 3. 进入主页逻辑
const launchApp = () => {
  // 标记已看过引导页
  uni.setStorageSync('has_launched', true);
  // uni.setStorageSync(key,data) 
  
  // 跳转到首页
  uni.switchTab({
	  // 跳转同时清空所有非tab页面
    url: '../index/index'
  });
};

	
const gettoken = async () => {
    try {
        const res = await request({
            url: '/prod-api/api/login',
            method: 'POST',
            header: { 'Authorization': '' },
            data: {
                "username": "test01", 
                "password": "654321" 
            }
        });

        // 核心修改：res 是 request.js 里 resolve(res.data) 出来的结果
        if (res.code === 200) {
            // 1. 将 Token 存入缓存，key 必须叫 'token' (要跟 request.js 保持一致)
            uni.setStorageSync('token', res.token);
            
            console.log('Token 存储成功，新 Token 为:', res.token);
            uni.showToast({ title: '身份验证成功', icon: 'success' });
        } else {
            uni.showToast({ title: res.msg || '登录失败', icon: 'none' });
        }
    } catch (err) {
        console.error('登录请求异常:', err);
    }
}


// const gettoken = async () => {
//     try {
//         const res = await request({
//             url: '/prod-api/api/login',
//             method: 'POST',
//
//             header: {
//                 'Authorization': '' 
//             },
//             data: {
//                 "username": "test01",
//                 "password": "654321" 
//             }
//         });
		
//         // ... 后续逻辑
//     } catch (err) {
//         console.error('登录失败', err);
//     }
// }
onMounted(()=>{
	gettoken()
})
</script>

<style lang="scss" scoped>
	
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