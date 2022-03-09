<template>
	<view>
<!-- 		<view v-for="(pic, index) in localUrls" :key="index">
			<image
			:src="pic"
			mode="aspectFill"
			@click="forDetail(index)"
			></image> -->
			<!-- <view class="photosView "> -->
<!-- 			<view class="" v-for="(item,index) in photos" :key="index" >
			        <image :src="item.src" @click="previewImage(index)" mode=" aspectFill"></image>
			</view> -->
			<!-- <image src="http://124.222.93.17:8080/img/df12091d-d27-2022-03-03-19-27-53.png" mode=""></image> -->
			<!-- <span>test</span> -->
			<!-- <image src="../../static/c1.png" mode=""></image> -->
			<view >
				<view v-for="(img,index) in benchList.photo.urls" :key="index" >
					<view >
						<span>
							<image :src="img" alt="尚未上传图片" mode="widthFix" @click="checkOut(index)" 
						:class="benchList.photo.status[index] ==1? 'green': benchList.photo.status[index]==2?'orange' : 'red'">
						</image>
						</span>
					</view>
					
				</view>
				<!-- <button type="default" style="width: 80%;" @click="detail">查看</button> -->
			</view>
		</view>
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
					// 这个实验桌的照片，和一些必要信息
					photo:{
						urls:'',
						benchId:'',
						status:''
					}
				},
				labId:'',
				// 保存图片的链接
				// imgUrls:{
				// 	urls:'',
				// 	bencId:''
				// },

			}
		},
		methods:{
			// 获取这个实验室下面的实验桌信息
			getBenchList(){
				let self = this;
				// 发送请求获取信息
				uni.request({
					url: self.baseURL + 'bench/searchByLabId/' + self.benchList.labId,
					// url: self.baseURL + 'bench/searchByLabId/' + '1',
					method:'GET',
					success: res => {
						console.log(res);
						// this.benchList = res.data.data;
						// self.labId = res.data.data[0].labId;
						console.log('111');
						console.log(res.data.data);
						// 遍历将图片链接保存进imgUrls中
						const data = [];
						// 保存实验桌id
						const bench = [];
						// 保存实验桌的状态
						const status = [];
						for(var i = 0; i < res.data.data.length; i++){
							// 对null值进行转换，转换成string类型
							// 如果photo为null，则选一张图片作为默认图片使用
							if(res.data.data[i].photo == null){
								res.data.data[i].photo = 'img/df12091d-d27-2022-03-03-19-27-53.png';
								// console.log(res.data.data[i].photo);
							}
							let str = res.data.data[i].photo + '';
							// 替换好之后传给data,得到的格式为: http://124.222.93.17:8080/img/df12091d-d27-2022-03-03-19-27-53.png
							str = str.replace('/root/elab/images/', 'img/');
							// data.push(this.baseURL + str);
							data.push( self.baseURL + str);
							bench.push(res.data.data[i].id);
							status.push(res.data.data[i].status);
							// console.log(res.data.data[i].status);
						}
						// self.imgUrls.urls = data;
						// self.imgUrls.bencId = bench;
						self.benchList.photo.urls = data;
						self.benchList.photo.benchId = bench;
						self.benchList.photo.status = status;
						console.log(self.benchList);
						// console.log('111');
						// console.log(self.benchList.photo.urls);
						// this.imgUrls.push(bench);
						// console.log(this.imgUrls);
					}
				})
			},
			checkOut(index){
				// 点击图片进行相关信息页的跳转, 同时携带数据进入checkOut界面, index指向这个照片所指向的benchId的index
				let benchId = this.benchList.photo.benchId[index];
				uni.navigateTo({
					url: './checkOut?labId=' + this.benchList.labId + '&benchId=' + benchId + '&couId=' + this.benchList.couId,
				})
				// uni.request({
				// 	url: this.baseURL + 'teacher/lab/check',
				// 	data:{
				// 		labId: this.benchList.labId,
				// 		benchId: this.benchList.benchId,
				// 		couId: this.benchList.couId
				// 	},
				// 	method:'POST',
				// 	success: res => {
				// 		console.log(res);
				// 	}
				// })
			},
		},
		onLoad(e){
			this.baseURL = getApp().globalData.baseURL;
			// console.log(e);
			this.benchList.couId = e.couId;
			this.benchList.labId = e.labId;
			// console.log(this.benchList.labId);
			this.getBenchList();
		}
	}
</script>

<style>
	.photoContent{
		/* text-align: center; */
		
	}
/* 	image{
		margin-left: 50rpx;
		margin-top: 50rpx;
		float: left;
		border: 1px solid orange;
		width: 300rpx;
		height: 300rpx;
	} */
	.green{
		margin-left: 50rpx;
		margin-top: 50rpx;
		float: left;
		border: 1.5px solid green;
		width: 300rpx;
		height: 300rpx;
	}
	.red{
		margin-left: 50rpx;
		margin-top: 50rpx;
		float: left;
		border: 1.5px solid red;
		width: 300rpx;
		height: 300rpx;
	}
	.orange{
		margin-left: 50rpx;
		margin-top: 50rpx;
		float: left;
		border: 1.5px solid orange;
		width: 300rpx;
		height: 300rpx;
	}
</style>
