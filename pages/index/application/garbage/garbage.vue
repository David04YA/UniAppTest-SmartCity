<template>
	<view>
		<swiper :autoplay="true" duration="2000" circular="true">
			<swiper-item v-for="item in advList">
				<image :src="getUrl()+item.advImg" style="width: 100%;"></image>
			</swiper-item>
		</swiper>
		
		<view style="font-size: 20px;font-weight: bold;text-align: center;"><image src="/static/images/厨余垃圾.svg" style="height: 100px;width: 100px; display: inline-block;"/></view>
		<view style="display: flex; flex-wrap: wrap;justify-content: center;" >
			<view  :class="{isRead:item.status}" @click="grabageDetail(item)" v-for="item in cookGrabageList" style="display: inline-block; text-align: center;margin: 16px ;border-radius: 50%;">
				<image style="height: 80px;width: 80px; display: inline-block;" :src="item.url" mode="" >{{item.name}}</image>
				<view style="position: absolute;overflow: hidden;">{{item.name}}</view>
			</view>
		</view>
		
		<view style="font-size: 20px;font-weight: bold;text-align: center;"><image src="/static/images/有害垃圾.svg" style="height: 100px;width: 100px; display: inline-block;"/></view>
		<view style="display: flex; flex-wrap: wrap;justify-content: center;">
			<view :class="{isRead:item.status}" @click="grabageDetail(item)" v-for="item in harfulGrabageList" style="display: inline-block; text-align: center;margin: 16px ;border-radius: 50%;">
				<image style="height: 80px;width: 80px; display: inline-block;" :src="item.url" mode="" >{{item.name}}</image>
				<view style="position: absolute;">{{item.name}}</view>
			</view>
		</view>
		
		<view style="font-size: 20px;font-weight: bold;text-align: center;"><image src="/static/images/其他垃圾.svg" style="height: 100px;width: 100px; display: inline-block;"/></view>
		<view style="display: flex; flex-wrap: wrap;justify-content: center;">		
			<view :class="{isRead:item.status}" @click="grabageDetail(item)" v-for="item in otherGrabageList" style="display: inline-block; text-align: center;margin: 16px;border-radius: 100px;">
				<image style="height: 80px;width: 80px; display: inline-block;" :src="item.url" mode="" >{{item.name}}</image>
				<view style="position: absolute;">{{item.name}}</view>
			</view>
		</view>
	</view>
	
	
</template>

<script setup>
import { ref } from 'vue'
import getRequest , {getUrl} from '/utils/request.js'

	const advList = ref()
	
	const getAdvList = async ()=>{
		const result = await getRequest({
			url:'/prod-api/api/living/rotation/list',
			header:{'Content-Type':"application/x-www-form-urlencoded"}
		})
		advList.value = result.rows
		console.log(advList.value)
	}
	getAdvList()


	const grabageDetail = (item)=>{
		item.status = true
		uni.navigateTo({
			url:"/pages/index/application/garbage/grabageDetail?id="+item.id
		})
	}
	const cookGrabageList = ref([
		{url:"/static/images/厨余垃圾-菜梗菜叶.svg",name:"菜梗菜叶",id:1,status:false},
		{url:"/static/images/厨余垃圾-剩菜剩饭.svg",name:"剩菜剩饭",id:2,status:false},
		{url:"/static/images/厨余垃圾-果壳.svg",name:"果壳",id:3,status:false},
		{url:"/static/images/厨余垃圾-残枝落叶.svg",name:"残枝落叶",id:4,status:false},
		{url:"/static/images/厨余垃圾-果皮.svg",name:"果皮",id:5,status:false},
	])
	
	const harfulGrabageList = ref([
		{url:"/static/images/有害垃圾-废旧灯泡.svg",name:"废旧灯泡",id:6,status:false},
		{url:"/static/images/有害垃圾-废旧小家电.svg",name:"废旧小家电",id:7,status:false},
		{url:"/static/images/有害垃圾-过期化妆品.svg",name:"过期化妆品",id:8,status:false},
		{url:"/static/images/有害垃圾-废弃温度计.svg",name:"废弃温度计",id:9,status:false},
		{url:"/static/images/有害垃圾-过期药品.svg",name:"过期药品",id:10},
		{url:"/static/images/有害垃圾-蓄电池.svg",name:"蓄电池",id:11},
	])
	
	const otherGrabageList = ref([
		{url:"/static/images/其他垃圾-烟头.svg",name:"烟头",id:12,status:false},
		{url:"/static/images/其他垃圾-一次性餐具.svg",name:"一次性餐具",id:13,status:false},
		{url:"/static/images/其他垃圾-破旧陶瓷品.svg",name:"破旧陶瓷品",id:14,status:false,status:false},
		{url:"/static/images/其他垃圾-宠物粪便.svg",name:"宠物粪便",id:15,status:false},
	])
</script>

<style>
   .isRead{
	   background-color: palegreen;
   }
</style>
