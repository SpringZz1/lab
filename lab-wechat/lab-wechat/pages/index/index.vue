<template>
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
					// url: '../student/labInfo'
					url: '../student/scan'
					// url:'../student/scan'
					// url: '../student/scan'
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
