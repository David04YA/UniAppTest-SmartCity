<template>
  <view class="container">
    <view class="header-bar">
      <view class="back-icon" @click="goBack">
        <text class="uni-icons-back"><</text> </view>
      <view class="title">所有停车场</view>
      <view class="history-icon" @click="goHistory">
        <image src="/static/icons/list-icon.png" class="icon-img"></image>
        <text>列表</text>
      </view>
    </view>

  <view class="parking-list">
    <view class="item-card" v-for="(item, index) in showList" :key="index" @click="goDetail(item.id)">
      <!-- <image :src="item.img" mode="aspectFill" class="park-img"></image> -->
      
      <view class="content-right">
        <view class="main-info">
          <text class="name">{{ item.name }}</text>
          <text class="price">{{ item.price }}元/h</text>
        </view>
        
        <view class="sub-info">
          <text>空位：{{ item.vacancy }}</text>
          <text>距离：{{ item.distance }}m</text>
        </view>
        
        <view class="address">{{ item.address }}</view>
      </view>
    </view>
    
    </view>
  </view>
</template>

<script setup>
import { onMounted,ref,computed } from 'vue';
import request from '@/utils/request.js'
	const ParkingList = ref([]);
	const displayCount = ref(5);
	const baseUrl = 'http://121.9.253.236:10001';
	const getparking = async () => {
	    try {
			
	        const res = await request({ url: '/prod-api/api/park/lot/list' });
	        const sorted = res.rows.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
	        
	        ParkingList.value = sorted.map(item => ({
	            id: item.id,
	            name: item.parkName,
	            vacancy: item.vacancy,
	            address: item.address,
	            price: item.priceCaps,
	            distance: item.distance,
	           
	            img: baseUrl + item.imgUrl 
	        }));
	    } catch (err) { console.error("停车场加载失败", err); }
	}
	const showList=computed(()=>{
		return ParkingList.value.slice(0,displayCount.value);
	})
	const loadMore =() =>{
		displayCount.value +=5;
	}
	const goDetail = (id) =>{
		uni.navigateTo({
			url: '/pages/services/services2/park/park'});
	}
	const goHistory =() =>{
		uni.navigateTo({
			url:'/pages/services/services2/park/history'
		})
	}
	onMounted(()=>{
		getparking();
	})
</script>

<style lang="scss" scoped>
.header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 88rpx;
  padding: 0 30rpx;
  background-color: #ffffff;
  border-bottom: 1rpx solid #eee;
  position: sticky;
  top: 0;
  z-index: 99;

  .title {
    font-size: 34rpx;
    font-weight: bold;
  }
  
  .icon-img {
    width: 40rpx;
    height: 40rpx;
  }
}

.item-card {
  background-color: #fff;
  margin: 20rpx;
  padding: 20rpx;
  border-radius: 16rpx;
  display: flex; // 开启弹性布局
  box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.05);

  .park-img {
    width: 180rpx;
    height: 140rpx;
    border-radius: 8rpx;
    margin-right: 20rpx;
    flex-shrink: 0; // 防止图片被挤压
  }

  .content-right {
    flex: 1; // 占据剩余空间
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .main-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .name { font-size: 30rpx; font-weight: bold; color: #333; }
    .price { color: #e4393c; font-size: 28rpx; font-weight: bold; }
  }

  .sub-info {
    font-size: 24rpx;
    color: #666;
    margin: 8rpx 0;
    text { margin-right: 20rpx; }
  }

  .address {
    font-size: 22rpx;
    color: #999;
    // 超出部分省略号
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 380rpx; 
  }
}
</style>