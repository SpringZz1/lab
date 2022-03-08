<template>
	<view class="container" style="margin-left: 10px;">
		<uni-forms ref="form" :modelValue = "formData" :rules="rules">
			<uni-forms-item label="姓名" name="name">
				<uni-easyinput type="text" v-model="formData.name" placeholder="请输入姓名" />
			</uni-forms-item>
			<uni-forms-item label="学号" name="stuId">
				<uni-easyinput type="text" v-model="formData.stuId" placeholder="请输入学号" />
			</uni-forms-item>
			<uni-forms-item label="实验室号" name="labName">
				<uni-easyinput type="text" v-model="formData.labName" placeholder="请输入实验室号" />
			</uni-forms-item>
			<uni-forms-item label="实验台号" name="benchName">
				<uni-easyinput type="text" v-model="formData.benchName" placeholder="请输入实验台号" />
			</uni-forms-item>
			<uni-forms-item label="班级" name="className">
				<uni-easyinput type="text" v-model="formData.className" placeholder="请输入班级" />
			</uni-forms-item>
			<uni-forms-item label="备注" name="comment">
				<uni-easyinput type="text" v-model="formData.comment" placeholder="请输入班级" />
			</uni-forms-item>
			<div class="uploadImg" @click="uploadImage">
			<!-- <uni-icons type="camera" size="80" style="padding: 16%;"></uni-icons> -->
			</div>
			<div class="btn">
				<button type="default" size="mini" style="margin-right: 15%; ">返回</button>
				<button type="primary" size="mini" >确认</button>
			</div>
		</uni-forms>
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
				// 保存图片临时地址
				imgURL:{},
				// 表单数据
				formData:{
					name:'',
					stuId:'',
					// 实验室号和实验台号从二维码扫码后自动填充，当然学生可以修改
					labId: '',
					id:'',
					className:'',
					comment:'',
					benchId:'',
					benchName:'',
					week:'',
					courseTime:'',
					img:''
				},
				rules:{
					// 对name字段必须验证
					name:{
						rules:[{
							required: true,
							errorMessage: '请输入姓名',
						}]
					},
					// 对stuId必须验证
					stu_id:{
						rules:[{
							required: true,
							errorMessage: '请输入学号',
						}]
					},
					// 对className字段必须验证
					class_name:{
						rules:[{
							required: true,
							errorMessage: '请输入班级',
						}]
					}
				}
			}
		},
		methods:{
			uploadImage(){
				let that = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album','camera'], //从相册选择、摄像头
					success:function(res){
						that.formData.img = res.tempFilePaths;
						console.log(that.formData.img);
						// console.log(this.formData.img);
						// console.log(JSON.stringify(res.tempFilePaths));
					}
				})
			}
		},
		onLoad(e) {
			this.formData.labName = e.labName;
			this.formData.stuId = e.stuId;
			this.formData.labId = e.labId;
			this.formData.id = e.id;
			this.formData.benchId = e.benchId;
			this.formData.benchName = e.benchName;
			this.formData.week = e.week;
			this.formData.courseTime = e.courseTime;
			console.log(this.formData.labId);
			// console.log(e.labName);
			// this.formData.labId = e.labId;
			// console.log(formData);
			// console.log(this.formData.labId);
		}
	}
</script>

<style>
	.uploadImg{
		border: 2px dotted gray;
		height: 120px;
		width: 100px;
		margin-left: 40%;
		margin: 0 auto;
	}
	.btn{
		width: 200%;
		margin-top: 5%;
		margin-left: 20%;
	}
</style>
