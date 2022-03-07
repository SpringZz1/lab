<template>
	<view>
		<uni-card v-for="bench in benchList" is-full="false" :title="bench.lab_id" >
			<div style="text-align: center;">
				<p>课程: {{bench.courseName}}</p>
				<p>时间: {{bench.week}},{{bench.courseTime}}</p>
			</div>
			<div class = "btn">
				<span><button type="default" size="mini" style="float: left;" @click="uploadInfo(bench.couId, bench.week, bench.courseTime)"> 扫码拍照</button></span>
				<span><button type="default" size="mini" style="float: right;" @click="feedback(bench.couId, bench.week, bench.courseTime)"> 查看反馈</button></span>
			</div>
			
			
		</uni-card>
	</view>
		

</template>

<script>
	export default {
			data(){
				return{
					baseURL:'',
					// 获得实验台相关信息, 这里使用暂时假数据
					benchList:
					{
						// 实验桌编号
						id:'',
						// 实验室编号
						labId:'',
						// 课程名称
						name:'',
						// 课程时间
						time:'',
						// 课程星期
						week:''
					},
					benchDetail:{
						
					}
				}
			},
			methods:{
				// 获得实验室信息
				getBenchList(){
					uni.request({
						// url: this.baseURL + 'student/GetCourseDetailByLabId?labId=' + this.benchList.labId + '&benchId=' + this.benchList.benchList,
						url: this.baseURL + 'student/GetCourseDetailByLabId?labId=' + '17' + '&benchId=' + '8',
						method:'POST',
						success: res => {
							// console.log(res);
							this.benchList = res.data.data;
							this.benchDetail = res.data.detail;
							// console.log(this.benchDetail);
							// this.feedbackList = res.data.data;
						}
					})
				},
				uploadInfo(couId, week, courseTime){
					// 把必要信息传入拍照页面
					// console.log(this.benchDetail.labId);
					// console.log(this.benchDetail.benchId);
					uni.navigateTo({
						url: './uploadInfo?labId=' + this.benchDetail.labId + '&benchId=' + this.benchDetail.bencId + '&couId=' 
						+ couId + '&benchName=' + this.benchDetail.benchName + '&labName=' + this.benchDetail.labName 
						+ '&week=' + week + '&courseTime=' + courseTime
					})
				},
				feedback(couId, week, courseTime){
					// 跳转到查看反馈页面，传入应该有的数据
					uni.navigateTo({
						url: './viewFeedback?labId=' + this.benchDetail.labId + '&benchId=' + this.benchDetail.bencId + '&couId='
						+ couId + '&benchName=' + this.benchDetail.benchName + '&labName=' + this.benchDetail.labName 
						+ '&week=' + week + '&courseTime=' + courseTime
					})
				}
			},
			onLoad(e){
				this.baseURL = getApp().globalData.baseURL;
				// 这里从扫码二维码获得labId, bencId然后发送请求获得这个实验桌的信息
				// this.benchList.labId = e.labId;
				// this.benchList.bencId = e.bencId;
				this.getBenchList();
			}
		}
</script>

<style>
.btn{
	/* margin-bottom: 10rpx; */
}
</style>
