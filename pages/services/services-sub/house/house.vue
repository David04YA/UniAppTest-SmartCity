<template>
	<view class="container"> <!-- 垂直 -->
		<view class="serach">
			<input placeholder="请输入要搜索的房源" v-model="searchKeyword"></input>
		</view>
		<view class="houseshow1">
			<view v-for="(item,index) in filteredHouseList" :key="index">
				<text>{{item.name}}</text>
			</view>
		</view>
		<view class="navigation">
			<swiper  autoplay="ture" circular="true" :indicator-dots="true">
				<swiper-item class="navigation-vfor" v-for="(item,index) in houselist">
					<image :src="item.img" mode="aspectFill" class="navigation-img"></image>
					<view class="text-tag">
						<text class="img-name">{{item.name}}</text></view>
				</swiper-item>
			</swiper>
		</view>
		
		<view class="funclist"><!-- 垂直 -->
			<view >功能分类</view><!-- 垂直 -->
			<view class="list-img" ><!-- 水平 -->
			<view class="list-card"v-for="(item,index) in listimg"> <!-- 垂直 -->
				<image :src="item.url"></image>
				<text>{{item.name}}</text>
				</view>
			</view>
		</view>
		<view class="houseshow2">
			<view class="2-house">
				
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref,onMounted,computed } from 'vue';
import request from '@/utils/request.js';
const baseUrl='http://121.9.253.236:10001'
const houselist=ref([]);
const listimg=[{name:'二手房',url:'/static/images/二手房.svg'},
{name:'租房',url:'/static/images/租房.svg'},
{name:'楼盘',url:'/static/images/楼盘.svg'},
{name:'中介',url:'/static/images/房屋中介.svg'}]

const searchKeyword=ref('')
// const houselist=ref([]);

const filteredHouseList=computed(()=>{
	if(!searchKeyword.value){
		return null;
	}
	return houselist.value.filter(item => item.name.includes(searchKeyword.value))
})
const gethouse =async()=>{
	try{
		const res = await request({url:'/prod-api/api/house/housing/list'})
		// console.log(res)
		houselist.value=res.rows.map((item)=>{
			return{
				address:item.address,
				areasize:item.areasize,
				description:item.description,
				housetype:item.houseType,
				name:item.sourceName,
				tel:item.tel,
				img:baseUrl+item.pic,
				price:item.price
			}
		}
		)
		// console.log(houselist.value)
	}catch(err){
		console.log(err)
	}
}
onMounted(()=>{
	gethouse()
})
</script>

<style lang="scss" scoped>
.container{
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 100%;
	height: 100%;
	.navigation{
		display: flex;
		flex-direction: column;
		padding: 0 30rpx;
		border-bottom: 1rpx solid #eee;
		height: 100%;
		// margin-bottom: 10rpx;
		.navigation-vfor{
			position: relative;
			display: flex;
			flex-direction: column;
			width: 100%;
			height: 100%;
			
			.navigation-img{
				width: 100%;
				height: 100%;
				
			}
			.text-tag{
				// position: absolute;
				// bottom: -10px;
				flex: 1;
				display: flex;
				// align-items: center;
				justify-content: center;
			}
		}
	}
	.funclist{
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		.list-img{
			display: flex;
			flex-direction: row;
			// align-items: center;
			// justify-content: center;
			width: 100%;
			height: 100%;
			.list-card{
				display: flex;
				flex-direction: column;
				width: 100%;
				height: 100%;
				image{
					width: 100%;
					height: 100rpx;
				}
				text{
					text-align: center;
					font-size: 20rpx;
				}
			}
		}
	}
}
</style>