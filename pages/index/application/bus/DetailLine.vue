<template>
	<view class="" hover-class="none" hover-stop-propagation="false">
			<view>
		<view class="">
			创建时间：{{line.createTime}}
		</view>
		<view class="">
			线路名称：{{line.name}}
		</view>
		<view class="">
			起始点：{{line.first}}
		</view>
		<view class="">
			结束点：{{line.end}}
		</view>
		<view class="">
			发车时间：{{line.startTime}}-{{line.endTime}}
		</view>
		<view class="">
			价格：{{line.price}}
		</view>
		<view class="">
			里程：{{line.mileage}}
		</view>
	</view>
	<!-- 某一线路的站点 -->
	<view>
		<view class="" v-for="item in bus" :key="item.stepsId">
			<button :disabled="true">{{item.name}}</button>
		</view>
<!-- 		<view class="">
			当前页码为:{{pageNum}}
		</view>
		<button @click="StopNextPage">下一页</button> -->
		<!-- <view>{{maxPage}}</view> -->
		<view style=" justify-content: center; text-align: center;">
			<button @click="StopNextPage(item)" v-for="item in maxPage" style="height: 30px; width: 30px; display: inline-block; border: 1px solid aquamarine; background-color: aquamarine; margin:10px;" >{{item}}</button>
		</view>
	</view>
	<button @click="createOrder()">就这条线了</button>
	</view>
</template>

<script setup>
import { ref  , reactive } from 'vue';
import {onLoad} from '@dcloudio/uni-app'
import  getRequest  from '../../../../utils/request';

	const line = ref()
	const pageNum =  ref(1)
	let busLines ;
	const maxPage = ref(1)
	const bus = ref()
	const pageSize = ref(4)
	
	const createOrder = () =>{
		uni.navigateTo({
			url:'/pages/index/application/bus/createOrder/createOrder?id='+busLines
		})
	}
	
	const StopNextPage = async (id)=>{
		try{
			pageNum.value = id
			getStopList()
		}catch(error){
			throw error
		}
	}
	
	
	
	
	const getStopList = async()=>{
		try{
			const res = await getRequest({
				// url:getStopListUrl.url,
				url:"/prod-api/api/bus/stop/list?linesId="+busLines+"&pageNum="+pageNum.value+"&pageSize="+pageSize.value,
				header:{"Content-Type":"application/x-www-form-urlencoded"}
			})
			bus.value = res.rows
			console.log(res.total)
			maxPage.value = ( res.total % pageSize.value) ? Math.floor(res.total / pageSize.value) + 1  :  res.total / pageSize.value 
		
			// console.log(res.rows)
		}catch(error){
			throw error
		}
	}


	onLoad((options)=>{
		busLines = options.id
		getLine(options.id)
		console.log(options)
		getStopList()
	})

	
	const getLine = async(id) =>{
		try{
			console.log("get "+ id)
			const res = await getRequest({
				url:'/prod-api/api/bus/line/'+ id,
				header:{"Content-Type":'application/x-www-form-urlencoded'}
			})
			line.value = res.data
			console.log(line.value)
		}catch(error){
			throw error
		}
	}
	
	
	
	const detailStop = (id)=>{
		uni.showToast({
			title:"还没做",
			icon:"none"
		})
	}
	

</script>

<style>
   .active{
	   background: greenyellow;
   }
</style>
