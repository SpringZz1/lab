<template slot-scope="scope">
	<view >
	<!-- <uni-section v-for="course in courseList" :title="course.course_lab_id" type="line"></uni-section> -->
		<!-- 内容通栏 -->
		<uni-card v-for="lab in labList" is-full="true" :title="lab.labName" extra="点击卡片即可查看详情" @click="goDetail(lab.labId)">
			<view v-for="list in lab.list">
				<p>课程：{{list.courseName}}</p>
				<p class='seprate'>时间：{{list.week}},{{list.courseTime}}</p>
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
						id:'',
						// 实验室id
						labId:'',
						// 实验室名字
						labName:'',
						// 这个实验室下面的课程信息，array格式
						list:[]
					},
				}
			},
			methods:{
				// 得到教师id向后台发送请求渲染卡片
				getLabList(){
					uni.request({
						// 根据教师id进入这个教师的具体信息界面, 这里先写死数据
						url: this.baseURL + 'lab/detail/list/' + '11',
						method:'GET',
						success: res => {
							// console.log(res);
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
							console.log('here');
							console.log(this.labList);
							}
						}
					})
				},
				// 查看某个实验室的所有实验桌
				goDetail(labId){
					// 跳转到查看详情页面
					if(!labId)
					{
						console.log('获得labId失败');
					}else{
						console.log('成功获得labId:',labId);
						// 获得labId进行跳转
						uni.navigateTo({
							url: 'detail?labId=' + labId
						})
					}
					
				}
			},
			onLoad(e)
			{
				// 获得接口的前缀
				this.baseURL = getApp().globalData.baseURL;
				// 保存上个页面传送的教师id
				this.labList.id = e.id;
				this.getLabList();
			}
		}
</script>

<style>
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
		border-bottom: 1px dotted #000000;
	}
</style>
