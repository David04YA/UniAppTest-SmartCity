<template>
	<view class="container">
		<view class="messageList">
			<view class="messageItem" v-for="(message, index) in messageAll" :key="index">
				<view class="" >
					<view class="title">{{ message.title }}</view>
					<view class="contractorUnit">{{ message.contractorUnit }}</view>
					<view class="startTime">{{ message.startTime }}</view>
					<view class="sign">
						{{message.sign}}
					</view>
				</view>
				<view class="submit">
					<button class="registerButton" @tap="comfirm">报名</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'
	const messageAll = ref([{
			title: '“温暖夕阳·爱心陪伴”——社区孤寡老人关怀行动',
			contractorUnit: '市青年志愿者协会 & 阳光街道社区服务中心',
			startTime: '2026年2月15日 上午9:00',
			sign: '年满18周岁，身体健康，有责任心和耐心。具备基本沟通与倾听能力，愿意与老人交流。有志愿服务经验者优先，能参与活动前期培训。活动期间需统一穿着志愿者马甲，遵守组织安排。能按时到达活动现场，全程参与，不随意离岗。'
		},
	])
	const comfirm = () => {
		uni.showToast({
			title: '报名成功',
			icon: 'success'
		})
	}
</script>

<style>

</style>