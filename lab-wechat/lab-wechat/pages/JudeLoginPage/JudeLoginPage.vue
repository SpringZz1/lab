<template>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{},
		onLoad() {
			console.log('App launch');
			// 判断标识, 使用token判断
			let token = uni.getStorageSync('token');
			console.log(token);
			// 如果没有token, 则跳转到注册界面
			if(!token){
				uni.reLaunch({
					url:'/pages/teacher/register'
				})
			}else{
				console.log('有token');
				// 跳转到首页，跳转tabbar页面, 必须使用这个方法
				uni.switchTab({
					url:'/pages/teacher/labInfo'
				})
			}
		}
	}
</script>

<style>
</style>
