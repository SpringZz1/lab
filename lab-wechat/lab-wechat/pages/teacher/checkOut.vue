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
						labId: this.inputReceive.labId,
						benchId: this.inputReceive.benchId,
						couId: this.inputReceive.couId
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
				// ...
				this.$refs.popup.close()
			}
		},
		onLoad(e) {
			this.baseURL = getApp().globalData.baseURL;
			// 上个页面传给这个页面查看详情，上个页面传进来三个参数,labId,benchId,couId
			this.inputReceive.labId = e.labId;
			this.inputReceive.benchId = e.benchId;
			this.inputReceive.couId = e.couId;
			
			
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
