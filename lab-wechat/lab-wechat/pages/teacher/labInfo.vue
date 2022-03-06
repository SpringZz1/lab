<template>
	<view>
	<!-- <uni-section v-for="course in courseList" :title="course.course_lab_id" type="line"></uni-section> -->
		<!-- 内容通栏 -->
<!-- 		<uni-card v-for="lab in labList" is-full="true" :title="lab.course_lab_id" @click=goDetail>
			<p>课程: {{lab.course_name}}</p>
			<uni-tag text="查看详情" type="primary" style="float: right;" size="normal"></uni-tag>
			<p>时间: {{lab.courese_week}},{{lab.course_time}}</p>
		</uni-card> -->
		
	</view>
</template>

<script>
	export default {
			data(){
				return{
					// 请求头
					baseURL:'',
					// 获得课程信息, 这里使用暂时假数据
					labList:{
						
					},
					// 上个页面接受的教师id
					id:'',
				}
			},
			methods:{
				// 得到教师id向后台发送请求渲染卡片
				getLabList(){
					uni.request({
						url: this.baseURL + 'lab/detail/list/' + this.id,
						method:'GET',
						success: res => {
							console.log(this.id);
							console.log(res);
						}
					})
				},
				goDetail(){
					// 跳转到查看详情页面，此处暂时写死
				}
			},
			onLoad(id)
			{
				this.baseURL = getApp().globalData.baseURL;
				// 保存上个页面传送的教师id
				this.id = id.id;
				this.getLabList();
			}
		}
</script>

<style>
</style>
