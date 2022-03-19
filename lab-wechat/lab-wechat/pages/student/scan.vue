<template>
	<view>
	<!-- <button type="primary" @click="goStudent">学生</button> -->
	<!-- <button type="warn" @click="goTeacher">教师</button> -->
	<button type="primary" @click="jump">直接进入</button>
	<button type="default" @click="scan1">扫码</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			// 保存扫描二维码后的数据, 应该有labId和benchId
			result:{
				labId:'',
				benchId:''
			}
			}
		},
		methods: {
			jump(){
				uni.navigateTo({
					// url: '../student/labInfo?labId=' + '1' + '&benchId=' + '1'
					url: './labInfo?labId=' + '106' + '&benchId=' + '44'
				})
			},
			
			scan1() {
						 let that = this;
						 // 允许从相机和相册扫码
						 uni.scanCode({
							 success: function(res) {
								 that.result1 = res.result;
							 }
						 });
					 }
	},
	onLoad() {
		
	}
	}
</script>

<style>
</style>
