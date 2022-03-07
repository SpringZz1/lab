<template>
	<view class="container">
	<uni-card 
		title="实验室信息"
		:is-shadow="true" 
	>
		<view>
			<p>实验室: {{feedbackList.labName}}</p>
			<p>实验台号: {{feedbackList.benchName}}</p>
			<p>课程: {{feedbackList.couName}}</p>
		</view>
		<view class="image-box">
			<image src="../../static/c1.png" mode=""></image>
		</view>
	</uni-card>
	
	<uni-card
	title="学生信息"
	>
	<view>
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
				uni.request({
					url: this.baseURL + 'teacher/lab/check/',
					data:{
						// 单元测试，先写死进行测试
						labId: 1,
						benchId: 1,
						couId: 110
						// labId: this.inputReceive.labId,
						// benchId: this.inputReceive.benchId,
						// couId: this.inputReceive.couId
					},
					method:'POST',
					success: res => {
						console.log(res);
						this.feedbackList = res.data.data;
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
				// 输入框的值
				console.log(value)
				// TODO 做一些其他的事情，手动执行 close 才会关闭对话框
				// 不通过则发送请求
				uni.request({
					url: this.baseURL + 'teacher/lab/checkFeedback',
					data:{
						// 这里进行单元测试，先写死进行测试
						labId: 1,
						benchId: 1,
						couId: 110,
						status: 0,
						comment: value
						// labId: this.inputReceive.labId,
						// benchId: this.inputReceive.benchId,
						// couId: this.inputReceive.couId
						// status: 0
						// comment: value
					},
					method:'POST',
					success: res => {
						console.log(res);
						// 点击按钮后跳转到上一个页面
						uni.navigateBack({
							// 回到上一个页面
							delta: 1
						})
					}
				})
				// ...
				this.$refs.popup.close()
			},
			passCheck(){
				// 点击通过按钮直接将status改变为1，即通过, 并且成功不需要写回复，点击通过即可
				uni.request({
					url: this.baseURL + 'teacher/lab/checkFeedback',
					data:{
						// 这里进行单元测试，先写死进行测试
						labId: 1,
						benchId: 1,
						couId: 110,
						status: 1,
						// labId: this.inputReceive.labId,
						// benchId: this.inputReceive.benchId,
						// couId: this.inputReceive.couId
						// status: 1
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
							uni.navigateBack({
								// 回到上一个页面
								delta: 1
							})
						}
						
					}
				})
			}
		},
		onLoad(e) {
			this.baseURL = getApp().globalData.baseURL;
			// 上个页面传给这个页面查看详情，上个页面传进来三个参数,labId,benchId,couId
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
