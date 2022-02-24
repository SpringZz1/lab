<template>
	<view>
	<!-- <uni-section v-for="course in courseList" :title="course.course_lab_id" type="line"></uni-section> -->
		<!-- 内容通栏 -->
		<uni-card v-for="course in courseList" is-full="true" :title="course.course_lab_id" @click=goDetail>
			<p>课程: {{course.course_name}}</p>
			<uni-tag text="查看详情" type="primary" style="float: right;" size="normal"></uni-tag>
			<p>时间: {{course.courese_week}},{{course.course_time}}</p>
		</uni-card>
		
	</view>
</template>

<script>
	export default {
			data(){
				return{
					// 获得课程信息, 这里使用暂时假数据
					courseList:[
						{
						course_id:'1',
						course_lab_id:'001',
						course_name:'护理学',
						course_time:'1-2节',
						courese_week:'周一'
					},
					{
						course_id:'2',
						course_lab_id:'002',
						course_name:'药理学',
						course_time:'3-4节',
						courese_week:'周二'
					}
					]
				}
			},
			methods:{
				goDetail(){
					// 跳转到查看详情页面，此处暂时写死
					uni.navigateTo({
						// url:'./detail'
						url:'../index/index'
					})
				}
			}
		}
</script>

<style>
</style>
