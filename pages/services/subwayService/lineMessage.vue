<template>
	<view class="containner" style="width: 750rpx; height: 750rpx;">
		<image :src="urlBase+imgUrl" mode="" class="img"></image>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'
	const imgUrl = ref()
	const urlBase = 'http://121.9.253.236:10001';
	const lineMessage = () => {
		uni.request({
			url: urlBase + '/prod-api/api/metro/city',
			success(res) {
				console.log(res)
				imgUrl.value = res.data.data.imgUrl
			},
			fail(err) {
				console.log(err)

			}
		})
	}
	lineMessage()
</script>

<style scoped>
.img{
	width: 100%;
	height: 100%;
}
</style>