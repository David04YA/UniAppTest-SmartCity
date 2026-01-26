<template>
	<view class="container"> <!-- 垂直排列 -->
		<view class="header-bar"> <!-- 水平排列 -->
			<view class="back-btn" @click="goBack">
				<text class="back-icon">&lt;</text>
			</view>
			<view class="title">图书馆评论</view>
			<view class="placeholder"></view>
		</view>
		<view class="comment-list"> <!-- 垂直排列 -->
		<view class="comment-card" v-for="(item,index) in CommentList" :key="index"> <!-- 垂直排列 -->
				<text class="comment-name">用户名:{{item.name}}</text>
				<text class="comment-content">评论:{{item.content}}</text>
				<text class="comment-dianzan">点赞数:{{item.remark}}</text>
				<button @click="dianzan" class="dianzan">给该评论点赞</button>
		</view>
		</view>
	</view>
</template>

<script setup>
import { ref,onMounted } from 'vue';
import request from '@/utils/request.js';

const CommentList=ref([]);

const getComment= async () =>{
	try{
		const res = await request({url:'/prod-api/digital_library/comment/list'})
		console.log(res)
		// const sorted =res.rows.sort((a,b) =>)
		CommentList.value = res.rows.map((item)=>({
			name:item.username || item.userId,
			content:item.content,
			remark:parseFloat(item.remark) || 0, //点赞
			
		}))
	}catch(err){
		console.log(err)
	}
}

function dianzan(x){
	x.remark += 1;
	request({ url: '/prod-api/digital_library/comment/list', method: 'POST', data: { id: x.id,remark:x.remark } })
	CommentList.value.sort((a,b) =>{
		return b.remark-a.remark
	})
}
onMounted(()=>{
	getComment();
})
</script>

<style lang="scss" scoped>
.header-bar{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	height:88rpx;
	background-color: #fff;
	position: sticky;
	top: 0;
	z-index: 10;
	.back-icon { font-size: 40rpx; }
	.title { font-weight: bold; font-size: 30rpx; }
	.placeholder { width: 40rpx; }
}
.comment-list{
	padding: 20rpx;
	.comment-card{
		display: flex;
		flex-direction:column;
		background-color: #f0ffff;
		margin-bottom: 20rpx;
		padding: 20rpx;
		border-radius: 12rpx;
		.comment-name{
			font-weight: bold;
			font-size: 20rpx;
			// width: 200rpx;
		}
		.comment-content{
			font-size: 22rpx;
			color: #000;
		}
		.comment-dianzan{
			font-size: 15rpx;
			color: #666;
			align-self: flex-end; //交叉轴
			//justify 主轴
		}
		.dianzan {
		    // 1. 水平居右：在 column 容器中控制交叉轴对齐
		    align-self: flex-end; 
		    
		    // 2. 修正尺寸：去掉 width: 50rpx，改用 auto 或足够宽度
		    width: auto; 
		    min-width: 200rpx; // 确保 6 个字能显示下
		    height: 60rpx;
		    
		    // 3. 内部对齐：让按钮里的文字居中并完全显示
		    display: flex;
		    align-items: center;
		    justify-content: center;
		    padding: 0 20rpx;
		    
		    // 4. 文字大小：配合按钮高度适当调整
		    font-size: 24rpx; 
		    border-radius: 10rpx;
		    margin-top: 10rpx;
		    background-color: #007aff;
		    color: #fff;
		    
		    // 消除原生按钮默认边距
		    margin-right: 0;
		}
	}
}
</style>