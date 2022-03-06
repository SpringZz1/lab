<template>
	<view>
	<uni-grid :column="3">
		<uni-grid-item>
			<text class="text">文本</text>
		</uni-grid-item>
		<uni-grid-item>
			<text class="text">文本</text>
		</uni-grid-item>
		<uni-grid-item>
			<text class="text">文本</text>
		</uni-grid-item>
		<uni-grid-item>
			<text class="text">文本</text>
		</uni-grid-item>
		<uni-grid-item>
			<text class="text">文本</text>
		</uni-grid-item>
		<uni-grid-item>
			<text class="text">文本</text>
		</uni-grid-item>
		<uni-grid-item>
			<text class="text">文本</text>
		</uni-grid-item>
		<uni-grid-item>
			<text class="text">文本</text>
		</uni-grid-item>
		<uni-grid-item>
			<text class="text">文本</text>
		</uni-grid-item>
	</uni-grid>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				baseURl:'',
				benchList:{
					// 实验桌id
					id:'',
					//实验桌状态, 0未检查, 1检查通过, 2检查未通过
					status:'',
					// 学生上传图片时间
					updateTime:'',
					// 实验桌备注
					comment:'',
					// 所属的实验室id
					labId:'',
					// 实验桌名，编号类型，例:1
					benchName:'',
					// 这个实验桌的照片
					photo:''
				}
			}
		},
		methods:{
			// 获取这个实验室下面的实验桌信息
			getBenchList(){
				// 发送请求获取信息
				uni.request({
					// 这里先写死数据
					url: this.baseURL + 'bench/searchByLabId/' + '17',
					method:'GET',
					success: res => {
						console.log(res);
						this.benchList = res.data.data;
						console.log(this.benchList);
					}
				})
			}
		},
		onLoad(e){
			this.baseURL = getApp().globalData.baseURL;
			// console.log(e.labId);
			this.benchList.labId = e.labId;
			this.getBenchList();
		}
	}
</script>

<style>
</style>
