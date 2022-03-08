<template>
	
	<view>
<!-- 	<div class="imagePart">
		<image src="../../static/c1.png" mode=""></image>
	</div> -->
<!-- 	<div>
		<div class="container" v-for="info in feedbackList">
			<div class="left">
				<p>实验室号: {{info.labName}}</p>
				<p>课程名: {{info.couName}}</p>
			</div>
			<div class="right">
				<p>实验台号: {{info.benchName}}</p>
				<p>上课时间: {{info.week}} {{info.courseTime}}</p>
			</div>
			<div class="footer">
				<p>教师反馈: {{info.feedback}}</p>
			</div>
		</div>
	</div> -->
		<uni-card  
		title="照片"
		is-full="true" 
		>
			<view class= "imagePart" v-if="feedbackList">
				<image :src="feedbackList.photo" ></image>
			</view>
			
		</uni-card>
		<uni-card 
		title="信息"
		is-full="true" >
			<view class="container" v-if="feedbackList">
				<p>实验室号: {{feedbackList.labName}}</p>
				<p>实验台号: {{feedbackList.benchName}}</p>
				<p>课程名: {{feedbackList.couName}}</p>
				<p>上课时间: {{feedbackList.week}} {{feedbackList.courseTime}}</p>
				<p>教师反馈: {{feedbackList.feedback}}</p>
			</view>
		</uni-card>
		<div class="btn">
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
			}
		},
		methods:{
			// 发送请求获得反馈信息
			getFeedbackList(){
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
							this.feedbackList = '';
							console.log(this.feedbackList);
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
			}
		},
		onLoad(e) {
			// console.log(e);
			this.baseURL = getApp().globalData.baseURL;
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
		}
	}
</script>

<style>
	.imagePart{
		height: 40%;
		width: 100%;
		border: 1px solid red;
		/* background-color: red; */
	}
	.btn{
		text-align: center;
	}
</style>
