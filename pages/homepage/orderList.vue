<template><!-- 订单列表页 -->
	<view>
		<view class="listAll" @tap="lookList">
			<view class="allcontent">
				{{ allcontent[0] || '全部订单' }}
			</view>
		</view>
		<view class="orderClassify" @tap="lookClassify">
			订单分类
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'
	const allcontent = ref([''])
	const urlBase = 'http://121.9.253.236:10001';
	const token = uni.getStorageSync('token')
	const lookList = () => {
		uni.navigateTo({
			url: '/pages/homepage/orderListContent/listAll'
		})
	}
	const lookClassify = () => {
		uni.navigateTo({
			url: '/pages/homepage/orderListContent/orderClassify'
		})
	}
	const listAll = () => {
		uni.request({
			url: urlBase + '/prod-api/api/allorder/list',
			method: 'GET',
			data:{
				pageNum: 1,
				pageSize: 10,
			},
			header: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Authorization': token ? `Bearer ${token}` : ''
			},
			success(res) {
				console.log(res.data)
			}
		})
	}
	
	listAll()
</script>

<style>

</style>