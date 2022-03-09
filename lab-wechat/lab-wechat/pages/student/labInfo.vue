<template>
	<view>
		<uni-card v-for="bench in benchList" is-full="false" :title="bench.lab_id" >
			<div style="text-align: center;">
				<p>课程: {{bench.courseName}}</p>
				<p>时间: {{bench.week}},{{bench.courseTime}}</p>
			</div>
			<div class = "btn">
				<span><button type="default" size="mini" style="float: left;" @click="uploadInfo(bench.couId, bench.week, bench.courseTime,bench.courseName)"> 扫码拍照</button></span>
				<span><button type="default" size="mini" style="float: right;" @click="feedback(bench.couId, bench.week, bench.courseTime,bench.courseName)"> 查看反馈</button></span>
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
						// 课程名称
						name:'',
						// 课程时间
						time:'',
						// 课程星期
						week:'',

					},
					// 接受上一个页面传送进来的参数
					inputReceive:{
						// 实验室编号
						labId:'',
						// 实验桌id
						benchId:''
					},
					benchDetail:{
						
					}
				}
			},
			methods:{
				// 获得实验室信息
				getBenchList(){
					uni.request({
						url: this.baseURL + 'student/GetCourseDetailByLabId?labId=' + this.inputReceive.labId + '&benchId=' + this.inputReceive.benchId,
						// url: this.baseURL + 'student/GetCourseDetailByLabId?labId=' + '17' + '&benchId=' + '8',
						method:'POST',
						success: res => {
							console.log(res);
							this.benchList = res.data.data;
							this.benchDetail = res.data.detail;
							// this.benchList.benchId = res.data.detail.benchId;
							// console.log(this.benchList.benchId);
							// console.log(this.benchList.benchId);
							// console.log(res.data.data);
						}
					})
				},
				uploadInfo(couId, week, courseTime, couName){
					// 把必要信息传入拍照页面
					// console.log(this.benchDetail.labId);
					// console.log(this.benchDetail.benchId);
					uni.navigateTo({
						url: './uploadInfo?labId=' + this.inputReceive.labId + '&benchId=' + this.inputReceive.benchId + '&couId=' 
						+ couId + '&benchName=' + this.benchDetail.benchName + '&labName=' + this.benchDetail.labName 
						+ '&week=' + week + '&courseTime=' + courseTime + '&couName=' + couName
					})
				},
				feedback(couId, week, courseTime, couName){
					// 跳转到查看反馈页面，传入应该有的数据
					uni.navigateTo({
						url: './viewFeedback?labId=' + this.inputReceive.labId + '&benchId=' + this.inputReceive.benchId + '&couId='
						+ couId + '&benchName=' + this.benchDetail.benchName + '&labName=' + this.benchDetail.labName 
						+ '&week=' + week + '&courseTime=' + courseTime + '&couName=' + couName
					})
				}
			},
			onLoad(e){
				this.baseURL = getApp().globalData.baseURL;
				// console.log(e);
				// 这里从扫码二维码获得labId, bencId然后发送请求获得这个实验桌的信息, 先写死测试
				this.inputReceive.labId = e.labId;
				this.inputReceive.benchId = e.benchId;
				// this.inputReceive.labId = e.labId;
				// this.inputReceive.bencId = e.bencId;
				this.getBenchList();
			}
		}
</script>

<style>
.btn{
	/* margin-bottom: 10rpx; */
}
</style>
