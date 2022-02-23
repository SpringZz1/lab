<template>
	<uni-card 
		title="实验室" 
		mode="title" 
		:is-shadow="true" 
		subtitle="001"
		extra="课程" 
		note="Tips"
	>
	<view>
		<image src="../../static/c1.png" style="width: 50px; height: 50px;"></image>
	</view>
		<view>
			<p>学号: {{}}</p>
			<p>姓名: {{}}</p>
			<p>备注: {{}}</p>
			<p>上课时间: {{}}</p>
		</view>
		<view>
			<button type="default" style="float: left;">通过</button>
			<button type="default" style="float: right;" @click="input">不通过</button>
		</view>

	</uni-card>
</template>

<script>
	export default {
		data(){
			return{
				
			}
		},
		methods:{
			input(){
				this.$refs.popup.open('center')
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
</style>
