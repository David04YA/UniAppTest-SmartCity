<template>
	<view>
<!-- 		<view style="position: absolute; right: 0; top: 50%; ;  transform: translate(-50%, -50%);  ">
			<img src="/static/images/top.svg" style="height: 20px; width: 20px; border: 1px solid black;" alt="" />
		</view> -->
		<view style="text-align: center;font-weight: bold;" class="">
			{{newDetail.title}}
		</view>
		<img style="" :src="getUrl() + newDetail.cover" alt="" />
		<view>
			<button  @click="like(newDetail.id)">点赞</button>
		</view>
		<rich-text :class="{rich_text:rich_act}" style="" :nodes="newDetail.content"></rich-text>
		<button :class="{setNone:!rich_act}" @click="moreStatus()">查看更多</button>
		<input v-model="commentText" placeholder="请和谐评论" style="text-align: center;height: 40px;"/>
		<button @click="publicCommentList(newDetail.id)">发布</button>
		<view v-for="item in commentList" style="overflow: auto; border:1px dotted;">
			<image :url="getUrl+avatarImgUrl" style="height: 25px; float: left;width: 25px; border: 1px dotted black;border-radius: 50%;"></image>
			<view style="float: left; font-size: 8px;">{{item.userName}}</view>
			<view style="float: right;font-size: 32px; right: 50%; ">{{item.content}}</view>
		</view>
		<view style="font-size: 8px; text-align: center;">总计{{commentListLength}}条评论</view>
	</view>
</template>

<script setup>
	
	import {onLoad} from '@dcloudio/uni-app'
	import { ref } from 'vue';
	import  getRequest , { getToken, getUrl } from '../../../utils/request';
	const newDetail = ref()
	const rich_act = ref(true)
	const commentList = ref([])
	const commentText = ref('')
	const avatarImgUrl = ref('')
	const commentListLength = ref()
	
	const moreStatus = ()=>{
		rich_act.value = false
	}
	
	const getNewDetail = async(id)=>{
		const result = await getRequest({
			url:'/prod-api/press/press/'+id,
			header:{'Content-Type':'application/x-www-form-urlencoded'}
		})
		newDetail.value = result.data
		// console.log(newDetail.value)
	}
	
	const like = async (id) =>{
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
	
	const getCommentList = async (id)=>{
		const result = await getRequest({
			url:'/prod-api/press/comments/list',
			header:'application/x-www-form-urlencoded',
		})
		// commentList.value = 
		console.log(result)
		if(result.code == 200){
			for(let i =0 ; i<result.rows.length; i++){
				if(result.rows[i].newsId == id){
					commentList.value.push(result.rows[i])
				}
			}
			commentListLength.value = commentList.value.length
			console.log(commentList.value)
		}
	}
	
	const getUserImage = async(id) => {
		const result = await getRequest({
			url:'/prod-api/api/common/user/getInfo',
			header:{"Content-Type":"application/x-www-form-urlencoded",
			"Authorization": await getToken()},
		})
		// console.log()
		// if(result.avatar != )
		avatarImgUrl.value = result.avatar
	}
	
	const publicCommentList = async(id)=>{
		if(commentText.value.trim() == ''){
			uni.showToast({
				icon:'none',
				title:"请输入内容"
			})
			return -1;
		}
		const result = await getRequest({
			url:'/prod-api/press/pressComment',
			method:'POST',
			header:{'Context-Type':'application/json',
				"Authorization": await getToken()},
			data:{"newsId":id,
				"content":commentText.value}
		})
		// console.log(result)
		if (result.code == 200){
			uni.showToast({
				title:result.msg,
			})
		}
	}
	
	onLoad((options)=>{
		getNewDetail(options.id)
		// console.log(options)
		getCommentList(options.id)
		getUserImage()
	})
</script>

<style>
	img{
		width: 100%;
	}
   .rich_text{
	   height: 500px ; 
	   float: left; 
	   overflow: hidden;
   }
   .setNone{
	   display: none;
   }
</style>
