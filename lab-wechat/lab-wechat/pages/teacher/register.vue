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
	<div></div>
	<uni-tag text="标签"></uni-tag>
	<uni-tag text="标签"></uni-tag>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				// 注册信息入口
				registerList:{
					work_id:'',
					name:'',
					phone:''
				}
			}
		}
	}
</script>

<style>
	.container{
		background-color: #fff;
	}
</style>
