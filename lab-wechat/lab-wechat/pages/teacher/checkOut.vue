<template>
	<view class="container">
	<uni-card 
		title="实验室信息"
		:is-shadow="true" 
		style="margin: 0 auto; text-align: center;"
	>
		<view v-if="feedbackList">
			<p>实验室: {{feedbackList.labName}}</p>
			<p>实验台号: {{feedbackList.benchName}}</p>
			<p>课程: {{feedbackList.couName}}</p>
		</view>
		<view class="image-box">
			<image :src="feedbackList.photo" class="img-box" @click="previewImg"></image>
		</view>
	</uni-card>
	
	<uni-card
	title="学生信息"
	style="text-align: center;"
	>
	<view v-if="feedbackList">
		<p>学号: {{feedbackList.stuId}}</p>
		<p>姓名: {{feedbackList.stuName}}</p>
		<p>备注: {{feedbackList.comment}}</p>
		<p>上课时间: {{feedbackList.week}}, {{feedbackList.courseTime}}</p>
	</view>
		
	</uni-card>
	<uni-card
	title="反馈区"
	:is-shadow="true"
	>
		<view>
			<button type="warn" style="float: left;" @click="feedback" size="mini">不通过</button>
			<button type="primary" style="float: right;" @click="passCheck" size="mini">通过</button>
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
				baseURL:'',
				// 介绍上个页面传输的数据
				inputReceive:{
					labId:'',
					benchId:'',
					couId:''
				},
				// 学生反馈信息
				feedbackList:{
					// 学生id
					id:'',
					// 学生学号
					stuId:'',
					// 实验桌id
					benchId:'',
					// 实验室id
					labId:'',
					// 学生上传的图片
					photo:'',
					// 学生反馈的备注
					comment:'',
					// 还不知道是干什么的
					feedback:'',
					// 提交时间
					commitTime:'',
					// 反馈时间
					feedbackTime: '',
					// 课程id
					couId:'',
					// 学生姓名
					stuName:'',
					// 课程名
					couName:'',
					// 实验室编号
					labName:'',
					// 实验桌名字
					benchName:'',
					// 哪天上课
					week:'',
					// 具体上课时间
					courseTime:'',
					// 实验桌的审核状态
					status:''
				}
			}
		},
		methods:{
			// 发送请求获得数据
			getFeedbackList(){
				let pages = getCurrentPages(); // 当前页面
				let beforePage = pages[pages.length - 2]; // 上一页
				let self = this;
				uni.request({
					url: self.baseURL + 'teacher/lab/check/',
					data:{
						// 单元测试，先写死进行测试
						// labId: 1,
						// benchId: 1,
						// couId: 110
						labId: self.inputReceive.labId,
						benchId: self.inputReceive.benchId,
						couId: self.inputReceive.couId
					},
					method:'POST',
					success: res => {
						const data = [];
						// console.log(res.data.data.photo);
						// 对null值进行转换，转换成string类型
						// 如果photo为null，则选一张图片作为默认图片使用
						if(res.data.data == null){
							self.feedbackList = '';
							uni.showToast({
								title:'学生还未完成扫码拍照',
								icon:'none',
								duration:2000
							});
							setTimeout(function(){
								uni.navigateBack({
								    success: function() {
										beforePage.onLoad(self.inputReceive);
								        // beforePage.onLoad(); // 执行上一页的onLoad方法
								    }
								});

								// // 跳转到上一个页面
								// uni.navigateBack({
								// 	delta: 1
								// })
							},2000)
							// res.data.data.photo = 'img/df12091d-d27-2022-03-03-19-27-53.png';
							// console.log(res.data.data[i].photo);
						}else{
						let str = res.data.data.photo + '';
						// console.log(str);
						// // 替换好之后传给data,得到的格式为: http://124.222.93.17:8080/img/df12091d-d27-2022-03-03-19-27-53.png
						str = str.replace('/root/elab/images/', 'img/');
						// console.log(str);
						data.push(self.baseURL + str);
						// data.push( self.baseURL + str);
						self.feedbackList = res.data.data;
						self.feedbackList.photo = data;
						}
					}
				})
			},
			feedback(){
				this.$refs.popup.open('center')
			},
			close(){
				this.$refs.popup.close()
			},
			confirm(value){
				let self = this;
				let pages = getCurrentPages(); // 当前页面
				let beforePage = pages[pages.length - 2]; // 上一页
				// 输入框的值
				// console.log(value)
				// TODO 做一些其他的事情，手动执行 close 才会关闭对话框
				// 不通过则发送请求
				uni.request({
					url: self.baseURL + 'teacher/lab/checkFeedback',
					data:{
						// 这里进行单元测试，先写死进行测试
						// labId: 1,
						// benchId: 1,
						// couId: 110,
						// status: 0,
						// comment: value
						labId: self.inputReceive.labId,
						benchId: self.inputReceive.benchId,
						couId: self.inputReceive.couId,
						status: 0,
						comment: value
					},
					method:'POST',
					success: res => {
						console.log(res);
						// 点击按钮后跳转到上一个页面
						if(res.data.code!==200){
							uni.showToast({
								title:'验收操作失败!',
								icon:'error',
								duration:2000
							})
						}else{
							// 请求成功
							uni.showToast({
								title:'验收成功',
								icon:'none',
								duration:2000
							});
							setTimeout(function(){
								// 跳转到上一个页面
								uni.navigateBack({
									success: function (){
										beforePage.onLoad(self.inputReceive);
									}
								})
							},2000)
						}
					}
				})
				// ...
				this.$refs.popup.close()
			},
			passCheck(){
				let self = this;
				let pages = getCurrentPages(); // 当前页面
				let beforePage = pages[pages.length - 2]; // 上一页
				// 点击通过按钮直接将status改变为1，即通过, 并且成功不需要写回复，点击通过即可
				uni.request({
					url: self.baseURL + 'teacher/lab/checkFeedback',
					data:{
						// 这里进行单元测试，先写死进行测试
						// labId: 1,
						// benchId: 1,
						// couId: 110,
						// status: 1,
						labId: self.inputReceive.labId,
						benchId: self.inputReceive.benchId,
						couId: self.inputReceive.couId,
						status: 1,
						comment: '通过'
					},
					method: 'POST',
					success: res => {
						console.log(res);
						// 请求失败
						if(res.data.code!==200){
							uni.showToast({
								title:'验收操作失败!',
								icon:'error',
								duration:2000
							})
						}else{
							// 请求成功
							uni.showToast({
								title:'验收成功',
								icon:'none',
								duration:2000
							})
							// 跳转到上一个页面
							setTimeout(function(){
								uni.navigateBack({
									// 回到上一个页面
									success: function(){
										beforePage.onLoad(self.inputReceive);
									}
								})
							},2000)

						}
						
					}
				})
			},
			// 图片预览功能
			previewImg(){
				let imgArr = [];
				console.log('here');
				imgArr = this.feedbackList.photo;
				console.log(imgArr[0]);
				uni.previewImage({
					current:0,
					urls: imgArr
				});
			}
		},
		onLoad(e) {
			// this.feedbackList = {};
			this.baseURL = getApp().globalData.baseURL;
			// 上个页面传给这个页面查看详情，上个页面传进来三个参数,labId,benchId,couId
			console.log(e);
			this.inputReceive.labId = e.labId;
			this.inputReceive.benchId = e.benchId;
			this.inputReceive.couId = e.couId;
			this.getFeedbackList();
			
		}
	}
</script>

<style>
	button{
		display: inline-block;
		width: 100px;
		height: auto;
		margin-bottom: 5%;
	}
/* 	.container{
		width: 100%;
		height: 100%;
	} */
	.image-box{
		/* background-position: center center; */
		 /* background-size: cover; */
		 /* background-repeat: no-repeat; */
		 margin: 0 auto;
	}
</style>
