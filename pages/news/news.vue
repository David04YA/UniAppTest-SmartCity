<template>
	<view class="">
		<view style="background-color: whitesmoke; " v-for="item in new_list">
			<view style="height: 80px; border: 1px dotted gray;overflow: hidden;" @click="newDetail(item.id)">
				<img :src="getUrl()+item.cover"  style=" height: 50px; width: 50px;float: left; overflow: hidden;" ></img>
				<view style="height: 45px ; margin-right: 50;width: calc(100% - 130px); display: inline-block;">{{item.title}}</view>
				<!-- <button style="height: 25px; width: 60px; float: right;font-size: 1px;">点赞</button> -->
				<img src="/static/images/点赞.svg" @click.stop="Like(item.id)" style=" height: 30px;width: 30px; float:right;margin-top: 10px;">
				<view >
					<view style="width: 80px;display: inline-block; font-size: 10px; float: right;">阅读数:{{item.readNum}}</view>
					<view style="width: 100px;display: inline-block; font-size: 10px; float: right;">有{{item.commentNum}}个评论</view>
					<view style="width: 100px;display: inline-block; font-size: 10px; float: right;">有{{item.likeNum}}个赞</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import getRequest ,  { getUrl , getToken } from '../../utils/request';
import {onLoad} from '@dcloudio/uni-app'
	const new_list = ref([])

	const getNewList = async()=>{
		const result = await getRequest({
			url:'/prod-api/press/press/list',
			header:{"Content-Type":"application/x-www-form-urlencoded"}
		})
		new_list.value = result.rows
		console.log(new_list.value)
	}
	getNewList()
	
	const newDetail = (id)=>{
		uni.navigateTo({
			url:'/pages/news/newDetail/newDetail?id='+id
		})
	}
	
	const Like = async(id)=>{
		const result = await getRequest({
			url:'/prod-api/press/press/like/'+id,
			method:'PUT',
			header:{'Content-Type':'application/json',
					"Authorization": await getToken()},			
		})
		// console.log(result)
		if(result.code == 200){
			uni.showToast({
				title:result.msg
			})
		}
	}

	
</script>

<style lang="scss" scoped>

</style>