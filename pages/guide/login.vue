<template>
	<view style="padding: 10px; border: 1px solid black; margin: 20px;border-radius: 30px;">
		<input v-model="username" placeholder="请输入账号" maxlength="20" style="text-align: center; border: 1px solid; border-radius: 15px;margin: 50px; height: 40px;"/>
		<input v-model="password" placeholder="请输入密码" maxlength="20" style="text-align: center; border: 1px solid; border-radius: 15px;margin: 50px; height: 40px;"/>
		<label>
			<checkbox-group @change="onAgreeChange">
				<checkbox style="" value="agree" :checked="agreed" >同意上述条款</checkbox>
			</checkbox-group>
		</label>
		<button @click="clear" style="margin: 80px;position: absolute; right: 0px; top:165px;height:30px;font-size: 10px;">清空</button>
		<button style="margin: 50px; " @click="loading"  :disabled="!canLogin">登录</button>
	</view>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { getRequest, getToken } from '../../utils/request';

	const username = ref('')
	const password = ref('')
	const agreed = ref(false)
	
	const clear = ()=>{
		username.value = ''
		password.value = ''
		agreed.value = false
	}
	
	const canLogin = computed(()=>{
		if(!agreed.value) return false;
		if(username.value.trim() != '' && password.value.trim() != ''){
			return true
		}
	})
	
	const onAgreeChange = (e)=>{
		agreed.value = e.detail.value.includes('agree')
	}
	
	const loading = async ()=>{
		const res = getToken(username.value , password.value)
		const token = await uni.getStorageSync('token')
		if(token){
			uni.showToast({
				title:'登录成功'
			})
		}
		const result = getRequest({
			url:"/prod-api/api/common/user/getInfo",
			header:{"Content-Type":"application/x-www-form-urlencoded",
					"Authorization": await getToken()}
		})
		console.log(result)
	}
	
</script>

<style>
	       
</style>
0