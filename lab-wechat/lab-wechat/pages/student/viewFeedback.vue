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
</template>

<script>
	export default{
		data(){
			return{
				infoList:{
					// 实验室号
					lab_id:'',
					// 实验台号
					id:'',
					// 课程名
					name:'',
					// 课程时间
					course_iime:'',
					// 星期
					week:'',
					// 教师反馈
					feedback:'',
				}
			}
		},
		methods:{
			
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
</style>
