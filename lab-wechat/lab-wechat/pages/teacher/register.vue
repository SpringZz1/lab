<template>
	<view>
		<div class="container">
			<uni-easyinput v-model="registerInput.workId" placeholder="请输入工号"></uni-easyinput>
			<uni-easyinput v-model="registerInput.name" placeholder="请输入姓名"></uni-easyinput>
			<uni-easyinput v-model="registerInput.phone" placeholder="请输入手机号"></uni-easyinput>
		</div>
<!-- 	<view class="btn">
		<uni-tag text="提交" @click="bindClick"></uni-tag>
	</view> -->
	<div style="margin-top: 2%;">
		<uni-tag text="返回" type="primary" style="float: left; margin-left: 20%;"></uni-tag>
		<uni-tag text="确认" type="success" size="default"style="float: right; margin-right: 20%;" @click="getUserInfo"></uni-tag>
	</div>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				// 请求链接头
				baseURL:'',
				registerInput:{
					// 教师姓名，教师自己输入获得
					name:'',
					// 教师电话，通过uni.授权获得
					phone:'',
					// 教师工号，教师自己输入获得
					workId:'',
					// code号, 通过uni.login()获得
					code:'',
					// 教师昵称,，通过uni.getUserProfile()授权获得
					nickName:'',
					// 教师头像，通过uni.getUserProfile()授权获得
					avatarUrl:''
				},
				
			}
		},
		methods:{
			// 登录先获得code
			getUserCode(){
				let self = this
				uni.login({
					
					provider:'weixin',
					success: function(loginRes) {
						// 获得code
						// console.log(loginRes.code);
						self.registerInput.code = loginRes.code;
						console.log(self.registerInput.code);
					}
				})
			},
			getUserInfo(){
				// 获得用户信息
				uni.getUserProfile({
					desc:'weixin',
					success:res=>{
						console.log('用户信息',res.userInfo);
						// 保存用户信息
						this.registerInput.nickName = res.userInfo.nickName;
						this.registerInput.avatarUrl = res.userInfo.avatarUrl;
						// console.log(this.registerInput.nickName);
						// console.log(this.registerInput.name);
						// console.log(this.registerInput.phone);
						// console.log(this.registerInput.workId);
						// 获得到需要的信息之后发送请求
						uni.request({
							url: this.baseURL + 'teacher/register',
							method: 'POST',
							data:{
								name: this.registerInput.name,
								phone: this.registerInput.phone,
								workId: this.registerInput.workId,
								code: this.registerInput.code,
								nickname: this.registerInput.nickName,
								avatarUrl: this.registerInput.avatarUrl
							},
							success: res=>{
								console.log(res);
								// 注册失败
								if(res.data.code!==200){
									uni.showToast({
										title: '注册失败',
										duration:2000,
										icon: 'error'
									})
								}else{
									// 登录成功
									uni.showToast({
										title: '注册成功，请等待管理员审核',
										duration: 2000,
										icon: 'none'
									})
								}
							}
						})
					}
				})
			}
			
		},
		onLoad(){
			// 进入页面获取
			this.getUserCode();
			this.baseURL = getApp().globalData.baseURL;
		}
	}
		
</script>

<style>
	.container{
		background-color: #fff;
	}
</style>
