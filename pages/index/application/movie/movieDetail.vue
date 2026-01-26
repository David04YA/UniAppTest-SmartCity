<template>
	<view style="text-align: center;">
		<image :src="getUrl()+MovieList.cover"></image>
		<!-- 介绍返回值带有html标签-->
		<!-- <view>介绍:{{MovieList.introduction}}</view> -->
		<!-- 将html字符串转换 -->
		<rich-text :nodes="MovieList.introduction"></rich-text>
		<view>电影名:{{MovieList.name}}</view>
		<view>语言:{{MovieList.language}}</view>
		<view>想看人数:{{MovieList.likeNum}}</view>
		<view>喜欢人数:{{MovieList.favoriteNum}}</view>
		<view>电影时常:{{MovieList.duration}}分钟</view>
	</view>
</template>

<script setup>
	import {onLoad} from '@dcloudio/uni-app'
import { ref } from 'vue';
import  getRequest ,{ getUrl } from '../../../../utils/request';
	onLoad((options)=>{
		const movieId = options.id
		getMovieDetail(movieId)
	})
	
	const MovieList = ref()
	
	const getMovieDetail = async (id)=>{
		const result = await getRequest({
			url:'/prod-api/api/movie/film/detail/'+id,
			header:{"Context-Type":"application/x-www-form-urlencoded"}
		})
		MovieList.value = result.data
		console.log(MovieList.value)
	}
	
</script>

<style>
	       
</style>
