<template>
	<!-- 标题卡片模式 -->
<!-- 	<uni-card 
		title="Dcloud" 
		mode="title" 
		:is-shadow="true" 
		thumbnail="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png" 
		extra="技术没有上限" 
		note="Tips"
	>
		uni-app 是一个使用 Vue.js 开发所有前端应用的框架，开发者编写一套代码，可编译到iOS、Android、H5、以及各种小程序等多个平台。即使不跨端，uni-app同时也是更好的小程序开发框架。
	</uni-card> -->
	<view>
	<button type="primary" @click="goStudent">学生</button>
	<button type="warn" @click="goTeacher">教师</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			
			}
		},
		methods: {
			// 进入学生操作界面
			goStudent(){
				uni.navigateTo({
					url: '../student/labInfo'
				})
			},
			goTeacher(){
				uni.navigateTo({
					url: '../JudeLoginPage/JudeLoginPage'
				})
			}
			// 进入教师操作界面
			// goTeacher(){
				// uni.navigateTo({
				// 	url: '../JudeLoginPage/JudeLoginPage'
				// })
			// }
		}
	}
</script>

<style>
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
	}
</style>
