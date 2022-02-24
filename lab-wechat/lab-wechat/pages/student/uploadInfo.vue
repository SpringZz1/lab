<template>
	<view class="container" style="margin-left: 10px;">
		<uni-forms ref="form" :modelValue = "formData" :rules="rules">
			<uni-forms-item label="姓名" name="name">
				<uni-easyinput type="text" v-model="formData.name" placeholder="请输入姓名" />
			</uni-forms-item>
			<uni-forms-item label="学号" name="stu_id">
				<uni-easyinput type="text" v-model="formData.stu_id" placeholder="请输入学号" />
			</uni-forms-item>
			<uni-forms-item label="实验室号" name="lab_id">
				<uni-easyinput type="text" v-model="formData.lab_id" placeholder="请输入实验室号" />
			</uni-forms-item>
			<uni-forms-item label="实验台号" name="id">
				<uni-easyinput type="text" v-model="formData.id" placeholder="请输入实验台号" />
			</uni-forms-item>
			<uni-forms-item label="班级" name="class_name">
				<uni-easyinput type="text" v-model="formData.class_name" placeholder="请输入班级" />
			</uni-forms-item>
			<div class="btn">
			<uni-icons type="camera" size="80"></uni-icons>
			</div>
			<button type="default" size="mini" style="width: 40%; margin-right: 15%" >返回</button>
			<button type="primary" size="mini" style="width: 40%;">确认</button>
		</uni-forms>
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
				// 表单数据
				formData:{
					name:'',
					stu_id:'',
					// 实验室号和实验台号从二维码扫码后自动填充，当然学生可以修改
					lab_id: '1',
					id:'001',
					class_name:''
				},
				rules:{
					// 对name字段必须验证
					name:{
						rules:[{
							required: true,
							errorMessage: '请输入姓名',
						}]
					},
					// 对stu_id必须验证
					stu_id:{
						rules:[{
							required: true,
							errorMessage: '请输入学号',
						}]
					},
					// 对class_name字段必须验证
					class_name:{
						rules:[{
							required: true,
							errorMessage: '请输入班级',
						}]
					}
				}
			}
		}
	}
</script>

<style>
	.btn{
		border: 1px solid gray;
		height: 120px;
		width: 120px;
		border-radius: 60px;
		margin-left: 40%;
		margin: 0 auto;
	}
</style>
