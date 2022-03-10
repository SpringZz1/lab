<template>
	
	<view>
		<uni-card  
		title="照片"
		is-full="true" 
		style="text-align: center;"
		>
			<view class= "imagePart" v-if="feedbackList">
				<image :class="feedbackList.status == 1? 'green':'red'" :src="feedbackList.photo" @click="previewImg"></image>
			</view>
			
		</uni-card>
		<uni-card 
		title="信息"
		is-full="true" 
		style="text-align: center;">
			<view class="container" v-if="feedbackList">
				<p>实验室号: {{feedbackList.labName}}</p>
				<p>实验台号: {{feedbackList.benchName}}</p>
				<p>课程名: {{feedbackList.couName}}</p>
				<p>上课时间: {{feedbackList.week}} {{feedbackList.courseTime}}</p>
				<p>教师反馈: {{feedbackList.feedback}}</p>
			</view>
		</uni-card>
		<div class="btn" v-if="feedbackList">
			<button type="primary" @click="back">确认</button>
		</div>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				baseURL:'',
				flag:false,
				feedbackList:{
					// 实验室id
					labId:'',
					// 实验室号
					labName:'',
					// 实验台id
					benchId:'',
					// 实验台号
					benchName:'',
					// 课程名
					couName:'',
					// 课程id
					couId:'',
					// 课程时间
					courseTime:'',
					// 星期
					week:'',
					// 教师反馈
					feedback:'',
					// 保存图片链接
					photo:'',
				},
				imgURL:'',
				inputReceive:{
					
				}
			}
		},
		methods:{
			// 发送请求获得反馈信息
			getFeedbackList(){
				let self = this;
				let pages = getCurrentPages(); // 当前页面
				let beforePage = pages[pages.length - 2]; // 上一页
				uni.request({
					url: this.baseURL + 'student/getFeedback',
					data:{
						labId: this.feedbackList.labId,
						benchId: this.feedbackList.benchId,
						couId: this.feedbackList.couId
						// labId: 1,
						// benchId: 1,
						// couId: 110
					},
					method:'POST',
					success: res => {
						
						console.log('here');
						console.log(res.data);
					// 这个地方卡了我1小时，最终解决，记录一下，原来是res.data.data为null，完全没有photo这个属性，强行访问就一直报错	
						if(res.data.data == null){
							// res.data.data.photo = 'img/df12091d-d27-2022-03-03-19-27-53.png';
							// console.log(res.data.data[i].photo);
							// this.feedbackList.photo = res.data.data.photo;
							self.feedbackList = '';
							uni.stopPullDownRefresh();
							uni.showToast({
								title:'此实验桌暂无拍照信息，请先完成扫码拍照',
								icon:'none',
								duration:2000
							});
							// 设置延迟跳转
							setTimeout(function(){
								uni.navigateBack({
									success: function (){
										// beforePage.onLoad(self.inputReceive);
									}
								})
							},2000);

						}else if(res.data.data.comment == null){
							// 如果教师还没反馈信息
							uni.showToast({
								title:'请等待教师反馈信息后再来查看',
								icon:'none',
								duration:2000
							});
							// 设置延迟跳转
							setTimeout(function(){
								uni.navigateBack({
									success: function(){}
								})
							})
							
						}else{
							// 图片链接格式转换
							res.data.data.photo = res.data.data.photo + '';
							// 替换好之后传给data,得到的格式为: http://124.222.93.17:8080/img/df12091d-d27-2022-03-03-19-27-53.png
							res.data.data.photo = res.data.data.photo.replace('/root/elab/images/', 'img/');
							// console.log(str);
							this.feedbackList = res.data.data;
							
							this.feedbackList.photo = this.baseURL + res.data.data.photo;
							// this.imgURL = this.baseURL + res.data.data.photo;
							this.imgURL = res.data.data.photo;
							uni.stopPullDownRefresh();
							console.log(this.imgURL);
						}
						
					},
					fail: res =>{
						console.log('失败了');
						// console.log(url);
					}
				})
			},
			// 点击确定按钮返回上一个页面
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			// 图片预览功能
			previewImg(){
				let imgArr = [];
				// console.log('here');
				imgArr = this.feedbackList.photo.split(' ');
				console.log(imgArr);
				// console.log(imgArr[0]);
				uni.previewImage({
					current:0,
					urls: imgArr
				});
			}
		},
		onLoad(e) {
			// console.log(e);
			this.baseURL = getApp().globalData.baseURL;
			console.log(e.labId);
			console.log(e.benchId);
			this.inputReceive.labId = e.labId;
			this.inputReceive = e.benchId;
			// this.feedbackList.labId = e.labId;
			// this.feedbackList.benchId = e.benchId;
			// // console.log(e.benchId);
			// this.feedbackList.couId = e.couId;
			// this.feedbackList.labName = e.labName;
			// this.feedbackList.benchName = e.benchName;
			// this.feedbackList.couName = e.couName;
			// this.feedbackList.week = e.week;
			// this.feedbackList.courseTime = e.courseTime;
			this.feedbackList = e;
			// console.log(this.feedbackList.couId);
			// console.log(this.feedbackList.benchId);
			// console.log(this.feedbackList.labId);
			this.getFeedbackList();
		},
		onPullDownRefresh(){
			this.baseURL = getApp().globalData.baseURL;
			this.getFeedbackList();
		}
	}
</script>

<style>
	.imagePart{
/* 		height: 40%;
		width: 80%; */
		/* 设置图片居中显示 */
/* 		 display: flex;
		 justify-content: center;
		 align-items: center; */
		/* background-position:50% 50% ; */
		margin: 0 auto;
		/* border: 1px solid red; */
		/* background-color: red; */
	}
	.btn{
		text-align: center;
	}
	.green{
		border: 3px solid green;
		/* background-position:50% 50% ; */
		margin: 0 auto;
		margin-left: 10rpx;
	}
	.red{
		border: 3px solid red;
		/* background-position:50% 50% ; */
		margin: 0 auto;
		margin-left: 10rpx;
	}
</style>
