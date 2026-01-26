<template>
	<view>
		<swiper duration="2000" circular autoplay="true">
			<swiper-item v-for="item in advList" >
				<image :src="'http://121.9.253.236:10001'+item.advImg" mode="" style="height: 150px; width: 100%;"></image>
			</swiper-item>
		</swiper>
		<input v-model="searchMovie" style="text-align: center;" placeholder="请输入你要搜索的电影"/>
		<view>
		<!-- <view> -->
			<view  v-for="item in showMovieList" style="margin-left: 5%;">
				<image :src="'http://121.9.253.236:10001'+item.cover" style="height: 250px;width: 90%;"></image>
				<view style="text-align: center;font-weight: bold;">{{item.name}}</view>
				<view>上映时间:{{item.playDate}},语言:{{item.language}}</view>
				<button @click="toMovieDetail(item.id)">详情</button>
			</view>
			<button :class="{setNone:searchIsAct}" @click="showMoreList()">点击更多</button>
		</view>
	</view>
</template>

<script setup>
import { ref ,watch  } from 'vue';
import  getRequest  from '../../../../utils/request';

	const searchIsAct = ref(false)
	const advList = ref([])
	const searchMovie = ref('');
	const MovieList = ref([])
	const showMovieList = ref([])
	const showSearchMovieList = ref([])
	const getAdvList = async()=>{
		const result = await getRequest({
			url:'/prod-api/api/movie/rotation/list',
			header:{'Context-Type':'application/x-www-form-urlencoded'},
		})
		if(result.code == 200){
			advList.value = result.rows
		}
	}
	getAdvList()
	
	const getMovieList = async()=>{
		const result = await getRequest({
			url:'/prod-api/api/movie/film/list',
			header:{'Context-Type':'application/x-www-form-urlencoded'},
		})
		if(result.code == 200){
			MovieList.value = result.rows
			// showMovieList.value = MovieList.value
			for(var i = 0; i<5 ; i++){
				showMovieList.value.push(MovieList.value[i])
			}
		}
	}
	getMovieList()
	
	const showMoreList = ()=>{
		showMovieList.value = MovieList.value
		searchIsAct.value = true 
	}
	
	const toMovieDetail = (id)=>{
		uni.navigateTo({
			url:"/pages/index/application/movie/movieDetail?id="+id
		})
	}

let timeoutId = null

	watch(searchMovie, (newValue) => {
		// 清除之前的定时器
		clearTimeout(timeoutId)
		
		// 设置新的定时器，300ms后执行搜索
		timeoutId = setTimeout(() => {
			const searchTerm = newValue.trim().toLowerCase()
			if (searchTerm === '') {
				showMovieList.value = [...MovieList.value]
			} else {
				showMovieList.value = MovieList.value.filter(item => 
					item.name.toLowerCase().includes(searchTerm)
				)
			}
		}, 300) // 延迟300毫秒，避免频繁触发
	})
	

</script>

<style>
   .setNone{
	   display: none;
   }
   
</style>
