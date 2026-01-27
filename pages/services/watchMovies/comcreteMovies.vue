<!-- 电影具体信息页面 -->
<template>
	<view class="mainContainnner" v-if="content">
		<view>
			<image :src="urlBase+content.cover" mode="" style="width: 100%;"></image>
		</view>
		<view class="filmName">电影名称:{{content.name}}</view>
		<view class="introduction">
			电影简介：{{cleanIntroduction}}
		</view>
		<view class="score">{{content.score}}分</view>
		<view class="startTime">上映时间：{{content.playDate}}</view>
		<view class="num">想看人数：{{content.favoriteNum}}</view>
		<view>
			<button @tap="backMain" class="fix">主页</button>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		computed
	} from 'vue'
	import {
		onLoad
	} from '@dcloudio/uni-app'
	const content = ref()
	const urlBase = 'http://121.9.253.236:10001';
	const getMovieDetail = (id) => {
		uni.request({
			url: urlBase+`/prod-api/api/movie/film/detail/${id}`,
			method: 'GET',
			header: {
				'Content-Type': 'application/json',
			},
			success(res) {
				console.log(res)
				content.value=res.data.data
			}
		})
	}
	onLoad((options) => {
		const movieId = options.id;
		if (movieId) {
			getMovieDetail(movieId); // 页面加载时立即请求数据
			console.log('获取的id');
			console.log(movieId);
		}
	})
	// 使用ai去除span,p标签文本
	const stripHtmlTags = (html) => {
		// 检查输入是否为空（!html），空则返回空字符串
	  if (!html) return '';
	  // 创建一个临时的div元素（不添加到DOM树）
	  const tempDiv = document.createElement('div');
	  // 将输入的HTML字符串赋值给tempDiv.innerHTML
	  tempDiv.innerHTML = html;
	  // 返回纯文本（优先使用textContent，回退到innerText）
	  return tempDiv.textContent || tempDiv.innerText || '';
	};
	const cleanIntroduction = computed(() => {
	  return stripHtmlTags(content.value.introduction);
	});
	///////////////////
	const backMain=()=>{
		uni.navigateBack({
				delta: 1 
			})
	}
</script>

<style>
.filmName{
	text-align: center;
	font-size: 50rpx;
	border:  1px solid black;;
}
.score{
	text-align: center;
	font-size: 50rpx;
	border:  1px solid black;;
}
.startTime{
	text-align: center;
	font-size: 50rpx;
	border:  1px solid black;;
}
.num{
	text-align: center;
	font-size: 50rpx;
	border:  1px solid black;;
}
.fix{
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 100rpx;
	line-height: 100rpx;
	text-align: center;
	background-color: #007AFF;
	color: #FFFFFF;
	font-size: 40rpx;
}
.introduction{
	text-align: center;
	font-size: 50rpx;
	border:  1px solid black;;
}
</style>