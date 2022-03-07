<template>
<!-- 	<div class="imagePart">
		<image src="../../static/c1.png" mode=""></image>
	</div>
	<div>
		<div class="container" v-for="info in infoList">
			<div class="left">
				<p>实验室号: {{info.lab_id}}</p>
				<p>课程名: {{info.name}}</p>
			</div>
			<div class="right">
				<p>实验台号: {{info.id}}</p>
				<p>上课时间: {{info.week}} {{info.course_iime}}</p>
			</div>
			<div class="footer">
				<p>教师反馈: {{info.feedback}}</p>
			</div>
		</div>
	</div> -->
	<view>
<!-- 		<uni-card  is-full="true" mode="feedbackList">
			<div class= "imagePart">
				<image src="../../static/c1.png" mode=""></image>
			</div>
			<div class="infoDetail">
				<p>实验室号: {{feedbackList.lab_id}}</p>
				<p>实验台号: {{feedbackList.id}}</p>
				<p>课程名: {{feedbackList.name}}</p>
				<p>上课时间: {{feedbackList.week}} {{feedbackList.course_iime}}</p>
				<p>教师反馈: {{feedbackList.feedback}}</p>
			</div>
			<div class="btn">
				<button type="primary">确认</button>
			</div>
		</uni-card> -->
	</view>
</template>

<script>
	export default{
		data(){
			return{
				feedbackList:{
					// 实验室号
					labName:'',
					// 实验台号
					benchName:'',
					// 课程名
					couName:'',
					// 课程时间
					courseTime:'',
					// 星期
					week:'',
					// 教师反馈
					feedback:'',
				}
			}
		},
		methods:{
			
		},
		onLoad(e) {
			// console.log(e.labName);
			this.feedbackList.labName = e.labName;
			console.log(this.feedbackList.labName);
			this.feedbackList.benchName = e.benchName;
			this.feedbackList.couName = e.couName;
			this.feedbackList.week = e.week;
			// console.log(e.week);
			this.feedbackList.courseTime = e.courseTime;
			// console.log(this.feedbackList.courseTime);
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
	.infoDetail{}
	.btn{
		text-align: center;
	}
</style>
