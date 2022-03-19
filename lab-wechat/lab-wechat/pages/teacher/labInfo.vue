<template slot-scope="scope">
	<view >
	<!-- <uni-section v-for="course in courseList" :title="course.course_lab_id" type="line"></uni-section> -->
		<!-- 内容通栏 -->
		<uni-card v-for="lab in labList" is-full="true" :title="lab.labName" class="container" >
			<view v-for="list in lab.list" class="seprate">
				<p>课程：{{list.courseName}}</p>
				<p>时间：{{list.week}},{{list.courseTime}}</p>
				<button type="primary" size="mini" @click="goDetail(lab.labId,list.couId)">查看详情</button>
			</view>
		</uni-card>
	</view>
</template>

<script>
	export default {
			data(){
				return{
					// 请求头
					baseURL:'',
					// 获得课程信息，object格式
					labList:{
						// 保存上个页面传送进来的教师id
						id:',',
						// 实验室id
						labId:'',
						// 实验室名字
						labName:'',
						// 这个实验室下面的课程信息，array格式
						list:[]
					},
					id:''
				}
			},
			methods:{
				// 得到教师id向后台发送请求渲染卡片
				getLabList(){
					// let temp = this.baseURL + 'lab/detail/list/' + this.labList.id;
					uni.request({
						url: this.baseURL + 'lab/detail/list/' + this.id,
						method:'GET',
						success: res => {
							// console.log(temp);
							console.log(res);
							// 如果获取失败
							if(res.data.code!==200){
								uni.showToast({
									title:'获取教师实验室失败',
									duration: 2000,
									icon:'none'
								});
							}else{
							// 获取成功
							uni.showToast({
								title:'获取教师实验室成功',
								duration: 2000,
								icon:'none'
							})
							this.labList = res.data.data;
							uni.stopPullDownRefresh();
							console.log('here');
							console.log(this.labList);
							}
						}
					})
				},
				// 查看某个实验室的所有实验桌
				goDetail(labId, couId){
					// 跳转到查看详情页面
					console.log(labId);
					console.log(couId);
					// 得到labId和couId传给下一个页面
					uni.navigateTo({
						url: './detail?labId='+ labId + '&couId=' + couId,
					})
					
				}
			},
			onLoad(e)
			{
				// 获得接口的前缀
				this.baseURL = getApp().globalData.baseURL;
				console.log(e);
				// 保存上个页面传送的教师id
				this.labList.id = e.id;
				this.id = e.id;
				this.getLabList();
			},
			onPullDownRefresh(){
				this.baseURL = getApp().globalData.baseURL;
				this.getLabList();
			}
		}
</script>

<style>
	.container{
		text-align: center;
	}
/* 	.left-part{
		width: 50%;
		/* float: left; */
		/* background-color: red; */
		/* height: 50%; */
/* 	}
	.right-part{
		float: right;
		background-color: red;
	} */ 
	.seprate{
		border-bottom: 1px solid #000000;
	}
</style>
