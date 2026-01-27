<template>
<!-- 	<view class="">
		<input v-model="searchText" placeholder="请输入你要搜索的任务" style="text-align: center;"></input>
		<p v-for="(item , key) in  serviceArr" style="display: flow-root;">
			<view class="" style="border-bottom:1px gray solid; text-align: center; font-size: 20px; font-weight: bold; ">
				{{key}}
			</view>
			<p v-for="it in item" style="text-align: center;">
				<p style="float: left;height: 100px; width: 20%; padding: 5px;" @click="onclick(it.id)">
					<image style="height: 60px;width: 80%;" :src="'http://121.9.253.236:10001'+it.imgUrl"/>
					<p style="text-align: center;">{{it.serviceName}}</p>

				</p>
			</p>
		</p>
	</view> -->
	<view class="">
		<input v-model="searchText" placeholder="请输入你要搜索的任务" style="text-align: center;"></input>
		<p v-for="(item , key) in  serviceArr" style="display: flow-root;">
			<view class="" style="border-bottom:1px gray solid; text-align: center; font-size: 20px; font-weight: bold; ">
				{{key}}
			</view>
			<view style="display: flex;flex: 0 1 20%;flex-wrap: wrap;justify-content: center;">
				<view v-for="it in item" style="text-align: center;">
					<view style="display: flex; flex-direction: column; height: 100px; width: 100px; padding: 5px; " @click="handleServiceClick(it)">
						<image style="height: 60px;width: 60px; display: block;"  :src="'http://121.9.253.236:10001'+it.imgUrl"/>
						<view style="display: inline;align-items: center;transform: translateX(-20px);">{{it.serviceName}}</view>
					
					</view>
				</view>
			</view>
		</p>
	</view>
</template>

<script setup>
import { ref ,watch } from 'vue';
import  getRequest  from '../../utils/request';

const serviceArr = ref({})
let list = ref([])
const originList = ref([])
const searchText = ref('')

const serviceRoutes={
		'找工作':'/pages/help/job/job',
		'政府服务热线':'/pages/services/application/govService/govService',
		'找房子':'/pages/services/services-sub/house/house',
		'活动管理':'/pages/services/services-sub/huodong/huodong',
		'数字图书馆':'/pages/services/services-sub/library/library',
		'停哪儿':'/pages/services/services-sub/park/park',
		'智慧巴士':'/pages/services/subwayService/subwayService',
		'志愿服务':'/pages/services/volunteerService/volunteerService',
		'看电影':'/pages/services/watchMovies/main',
		'垃圾分类':'/pages/index/application/garbage/garbage',
		'智慧交管':'/pages/index/application/reserveCheckCar/reserveCheckCar',
		
	};
	
	const handleServiceClick = (item, index) => {
	    const url = serviceRoutes[item.serviceName];
	        
	        if (url) {
	            console.log(`正在跳转至：${item.name}`, url);
	            uni.navigateTo({ url });
	        } else {
	            // 如果这个服务你还没写页面，可以给个提示
	            console.warn(`服务 [${item.name}] 暂未配置跳转路径`);
	            uni.showToast({
	                title: '该服务开发中...',
	                icon: 'none'
	            });
	        }
	    };
	
		const searchService = ()=>{
			uni.navigateTo({
				url:'/pages/services/searchService/searchService'
			})
		}

		const Type = (list)=>{
			serviceArr.value = {}
			for(let i = 0;i<list.length;i++){
				if(serviceArr.value[list[i].serviceType] == undefined){
					serviceArr.value[list[i].serviceType]=[]
				}
				serviceArr.value[list[i].serviceType].push(list[i])
			}
		}

		const serviceList = async ()=>{
			const result = await getRequest({
				url:'/prod-api/api/service/list',
				header:{'Context-Type':'application/x-www-form-urlencoded'}
			})
			console.log(result.rows)
			originList.value = result.rows
			list.value = result.rows
			Type(list.value)
		}
		
		serviceList()

		watch(searchText , (newValue)=>{
			// console.log(newValue)
			if (searchText.value.trim() == ''){
				Type(originList.value)
			}else{
				list.value = originList.value.filter(item => item.serviceName == searchText.value)
				Type(list.value)
				// console.log(serviceArr.value)
			}
		},50)
		
		// const onclick = (id)=>{
		// 	if(id == 3){
		// 		uni.navigateTo({
		// 			url:'/pages/index/application/bus/bus'
		// 		})
		// 	}
		// 	if(id == 35){
		// 		uni.navigateTo({
		// 			url:'/pages/services/application/govService/govService'
		// 		})
		// 	}
		// 	if(id == 36){
		// 		uni.navigateTo({
		// 			url:'/pages/index/application/garbage/garbage'
		// 		})
		// 	}
		// }

		
		
</script>

<style lang="scss" scoped>
.container{
		display: flex;
		// justify-content: center;
		flex-direction: column;
		align-items: center;
		//display justify-content align-items flex-direction
		min-height: 100vh;
		// min-height vh
	}
	.allservice{
		width: 100%;
		height: 100%;
		display: flex;
		flex-wrap: wrap;
		padding: 20rpx 0;
		background-color: #fff;
		padding: 30rpx 0; 
		// flex:1;
		// flex默认水平 wrap换行 flex1 扩张完剩下的画面
			
			.service-item{
				width: 20%;
				// height: 20%;
				display: flex;
				flex-direction: column;
				//width20%每行5个 direciton 子元素垂直排列
				margin-bottom: 40rpx;
				// /下边距
			}
			
			.serviceimg{
				width: 80rpx;
				height: 80rpx;
				border-radius: 20rpx;
				margin-bottom: 10rpx;
			}
			.servicename{
				font-size: 24rpx;
				color: #333;
			}
	}

</style>