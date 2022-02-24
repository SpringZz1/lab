<template>
	<view>
		<uni-card v-for="bench in benchList" is-full="true" :title="bench.lab_id" >
			<div>
				<p>课程: {{bench.name}}</p>
				<p>时间: {{bench.week}},{{bench.time}}</p>
			</div>
			<div style="float: right;">
				<p><button type="default" size="mini" > 扫码拍照</button></p>
				<p><button type="default" size="mini" > 查看教师反馈</button></p>
				<p><button type="default" size="mini" > 再次提交</button></p>
			</div>
			
			
		</uni-card>
	</view>
		

</template>

<script>
	export default {
			data(){
				return{
					// 获得实验台相关信息, 这里使用暂时假数据
					benchList:[
						{
						// 实验桌编号
						id:'1',
						// 实验室编号
						lab_id:'001',
						// 课程名称
						name:'护理学',
						// 课程时间
						time:'1-2节',
						// 课程星期
						week:'周一'
					},
					{
						// 实验桌编号
						id:'1',
						// 实验室编号
						lab_id:'001',
						// 课程名称
						name:'护理学',
						// 课程时间
						time:'1-2节',
						// 课程星期
						week:'周一'
					}
					]
				}
			},
			methods:{
				goDetail(){
					// 跳转到查看详情页面，此处暂时写死
					uni.navigateTo({
						url:'./detail'
					})
				}
			}
		}
</script>

<style>
</style>
