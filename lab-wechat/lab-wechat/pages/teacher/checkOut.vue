<template>
	<view class="container">
	<uni-card 
		title="实验室" 
		mode="title" 
		:is-shadow="true" 
		subtitle="001"
		extra="课程" 
		note="Tips"
	>
	<view class="image-box">
		<image src="../../static/c1.png" mode=""></image>
	</view>
		<view>
			<p>学号: {{}}</p>
			<p>姓名: {{}}</p>
			<p>备注: {{}}</p>
			<p>上课时间: {{}}</p>
		</view>
		<view>
			<button type="default" style="float: left;">通过</button>
			<button type="default" style="float: right;" @click="feedback">不通过</button>
			<uni-popup ref="popup" type="dialog">
				<uni-popup-dialog mode="input" title="信息反馈" placeholder="请输入反馈信息" :before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
			</uni-popup>
		</view>

	</uni-card>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				
			}
		},
		methods:{
			feedback(){
				this.$refs.popup.open('center')
			},
			close(){
				this.$refs.popup.close()
			},
			confirm(value){
				// 输入框的值
				console.log(value)
				// TODO 做一些其他的事情，手动执行 close 才会关闭对话框
				// ...
				this.$refs.popup.close()
			}
		}
	}
</script>

<style>
	button{
		display: inline-block;
		width: 100px;
		height: auto;
	}
	.container{
		width: 100%;
		height: 100%;
	}
	.image-box{
		background-position: center center;
		 background-size: cover;
		 background-repeat: no-repeat;
	}
</style>
