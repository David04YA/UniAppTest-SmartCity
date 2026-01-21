<template>
</template>

<script setup>
	import {onMounted,ref} from 'vue';
	import request from '@/utils/request.js';
	const getlibrary = async () => {
			try {
				const res = await request({ url: '/prod-api/api/digital-library/list' });
				console.log('获取到的图书馆数据：', res);
			} catch (err) {
				console.error('图书馆接口请求失败：', err);
			}
		}
	onMounted(()=>{
		getlibrary();
	})
</script>

<style>
</style>