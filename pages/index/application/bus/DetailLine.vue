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
			<button @click="detailStop(item.stepsId)">{{item.name}}站</button>
		</view>
		<view class="">
			当前页码为:{{pageNum}}
		</view>
		<button @click="StopNextPage">下一页</button>
	</view>
	</view>
</template>

<script setup>
import { ref  , reactive } from 'vue';
import {onLoad} from '@dcloudio/uni-app'
import { getRequest } from '../../../../utils/request';

	const line = ref()
	const pageNum =  ref(1)
	// 获取的路线一直为1 error
	const busLines = ref(1)
	const bus = ref()
	// 响应式获取页码，页码发生变化时重新获得站点信息
	// const getStopListUrl = reactive({
	// 	url:"/prod-api/api/bus/stop/list?linesId="+busLines.value+"&pageNum="+pageNum.value+"&pageSize=8",
	// })
	
	
	const StopNextPage = async ()=>{
		try{
			pageNum.value++
			getStopList()
		}catch(error){
			throw error
		}
	}
	
	const getStopList = async()=>{
		try{
			const res = await getRequest({
				// url:getStopListUrl.url,
				url:"/prod-api/api/bus/stop/list?linesId="+busLines.value+"&pageNum="+pageNum.value+"&pageSize=8",
				header:{"Content-Type":"application/x-www-form-urlencoded"}
			})
			bus.value = res.rows
			console.log(res.rows)
		}catch(error){
			throw error
		}
	}
	getStopList()

	onLoad((options)=>{
		busLines.value=options.id
		// uni.setStorageSync("BusLineId", options.id)
		// setLineId(options.id)
		console.log(busLines.value),
		getLine(options.id)
		console.log(options)
	})
	
	const setLineId = (id)=>{
		busLines.value = id
	}

	
	
	
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
		// uni.navigateTo({
		// 	url:'/pages/index/application/bus/DetailLine?id='+id,
		// })
	}
	

</script>

<style>
	       
</style>
