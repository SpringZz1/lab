<template>
	<view>
		<div class="container">
			<uni-easyinput v-model="registerList.work_id" placeholder="请输入工号"></uni-easyinput>
			<uni-easyinput v-model="registerList.name" placeholder="请输入姓名"></uni-easyinput>
			<uni-easyinput v-model="registerList.phone" placeholder="请输入手机号"></uni-easyinput>
		</div>
<!-- 	<view class="btn">
		<uni-tag text="提交" @click="bindClick"></uni-tag>
	</view> -->
	<div style="margin-top: 2%;">
		<uni-tag text="返回" type="primary" style="float: left; margin-left: 20%;"></uni-tag>
		<uni-tag text="确认" type="success" style="float: right; margin-right: 20%;" @click="getUserInfo"></uni-tag>
	</div>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			getUserCode(){
				uni.login({
					provider:'weixin',
					success: function(loginRes) {
						// 获得code
						console.log(loginRes.code);
					}
				})
			},
			getUserInfo(){
				// 获得用户信息
				uni.getUserProfile({
					desc:'weixin',
					success:res=>{
						console.log('用户信息',res.userInfo);
					}
				})
			}
			
		},
		onLoad(){
			// 进入页面获取
			this.getUserInfo();
			
		}
	}
		
</script>

<style>
	.container{
		background-color: #fff;
	}
</style>
