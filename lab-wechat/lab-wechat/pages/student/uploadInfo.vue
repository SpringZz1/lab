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
				<uni-easyinput type="text" v-model="formData.comment" placeholder="请输入备注" />
			</uni-forms-item>
			<!-- 图片上传 -->
			<view style="margin-top: 20rpx; text-align: center;">
				<view class="img" v-for="(item, i) in upImgGroup" :key='i'>
					<!-- 图片上传回显 -->
						<image style="width: 100%;height: 100%;" :src="item"></image>
						<!-- 删除图片 -->
						<view @click.stop="DelImg(i)" style="display: inline;">
							<uni-icons type="closeempty" class="close" size="20"></uni-icons>
						</view>
				</view>
				<view class="camera" @click="ChooseImage">
					<uni-icons type="camera" size="40"></uni-icons>
				</view>
			</view>
			<div class="btn">
				<button type="default" size="mini" style="margin-right: 15%; " @click="back">返回</button>
				<button type="primary" size="mini" @click="uploadFile">确认</button>
			</div>
		</uni-forms>

	</view>
</template>

<script>
	export default{
		data(){
			return{
				baseURL:'',
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
					// 用来判断学生是不是第一次登录的flag，默认为1，如果找到学生信息则改为0
					firstLogin:1,
					// code换取openId
					openId:''
				},
				// 上传图片路径
				upImgGroup: [],
				// code:'',
				
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
				},
			}
		},
		methods:{
			getCode(){
				let self = this;
				uni.login({
					provider:'weixin',
					success: function(loginRes) {
						// console.log(loginRes);
						// 保存到formData中
						// self.code = loginRes.code;
						self.formData.code = loginRes.code;
						uni.request({
							// url: self.baseURL + 'student/getByOpenId',
							url: self.baseURL +'student/getByOpenId',
							data:{
								code: loginRes.code
							},
							method:'POST',
							success: res => {
								// console.log(res);
								// 如果是未注册的学生
								if(res.data.code==109){
									self.formData.firstLogin = 1;
									console.log('未注册');
								}else if(res.data.code==200){
									// 如果是注册过的学生
									self.formData.firstLogin = 0;
									console.log('已注册');
									// self.formData = res.data.data;
									self.formData.name = res.data.data.name;
									self.formData.stuId = res.data.data.stuId;
									self.formData.className = res.data.data.className;
									console.log(res.data.data);
									// console.log(self.formData);
									// console.log(self.formData.firstLogin);
									// console.log(loginRes.code);
								}
								// console.log(self.formData.firstLogin);
							},
							fail: (res) => {
								// console.log(self.baseURL);
								console.log(res);
							}
						})
					}
				})
			},
			ChooseImage() {
				var self = this;
				uni.chooseImage({
					sourceType: ["camera", "album"],
					sizeType: ['original', 'compressed'],
					// 只允许一张
					count: 1,
					success: (res) => {
						self.upImgGroup = res.tempFilePaths;
						// 点击上传图片后开始发送code请求
					}
				})
			},
			DelImg(i){
				let self = this;
				uni.showModal({
					title:'提示',
					content:'确定删除这张照片吗',
					cancelText:'取消',
					confirmText:'确定',
					success: res => {
						if(res.confirm){
							self.upImgGroup.splice(i,1);
						}
					}
				})
			},
			// 点击确认开始发送请求
			uploadFile(){
				let self = this;
				uni.uploadFile({
					// url: 'http://10.133.64.6:8080/student/check',
					url: self.baseURL + 'student/check',
					header: {
						'content-type': 'multipart/form-data'
					},
					name:'photo',
					// 上传的图片
					filePath: self.upImgGroup[0],
					// 除了图片的其他信息
					formData: self.formData,
					success: res =>{
						console.log('success');
						let info = JSON.parse(res.data);
						// console.log(JSON.parse(res.data));
						if(info.code!==200){
							// 上传信息失败
							uni.showToast({
								title:'提交失败，请填写完整的信息!',
								icon: 'none',
								duration:2000
							})
						}else{
							// 上传信息成功
							uni.showToast({
								title:'提交成功',
								icon:'success',
								duration: 2000
							});
							setTimeout(function(){
								uni.redirectTo({
									url:'./labInfo?labId=' + self.formData.labId + '&benchId=' + self.formData.benchId
								})
							})
						}
						// console.log(res);
					},
					fail: (res) =>{
						console.log(res);
						console.log('0: '+self.upImgGroup[0]);
						console.log('失败了');
					}
				})
			},
			back(){
				uni.navigateBack()
			}
		},
		onLoad(e) {
			this.baseURL = getApp().globalData.baseURL;
			this.getCode();
			this.formData.labName = e.labName;
			this.formData.benchName = e.benchName;
			
		}
	}
</script>

<style>
/* 	.uploadImg{
		border: 2px dotted gray;
		height: 120px;
		width: 100px;
		margin-left: 40%;
		margin: 0 auto;
	} */
	.img {
			position: relative;
			display: inline-block;
			width: 166rpx;
			height: 166rpx;
			vertical-align: top;
			margin-right: 10rpx;
			margin-bottom: 10rpx;
		}
	.close {
		position: absolute;
		right: 0;
		background-color: rgba(0, 0, 0, .4);
		color: #fff;
	}
	.camera {
		display: inline-block;
		width: 166rpx;
		height: 166rpx;
		text-align: center;
		line-height: 166rpx;
		font-size: 46rpx;
		border: 1rpx dotted #8C9697;
		color: #8C9697;
		margin-bottom: 10rpx;
	}
	.btn{
		width: 200%;
		margin-top: 5%;
		margin-left: 20%;
	}

</style>
