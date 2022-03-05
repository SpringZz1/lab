<template>
</template>

<script>
	export default{
		data(){
			return{
				// 请求头的服务器地址
				baseURL:'',
				// 保存临时code，用于换取openId
				loginForm:{
					code:'',
					openId:'123'
				}
			}
		},
		methods:{
			getOpenId(){
				let self = this;
				// 登录获得code，然后给传给后端，换取openId
				uni.login({
					provider: 'weixin',
					success: function(loginRes){
						console.log(loginRes.code);
						uni.request({
							url: 'http://10.133.64.6:8080/teacher/login',
							// method必须大写
							method:'POST',
							 header: {
									'content-type': 'application/json',
									}, 
							data:{
								"code": loginRes.code
								// code: '123'
							},
							success: res => {
								console.log(loginRes.code);
								console.log(res.data.msg);
							}
						})
					},
				});	
				
			}
		},
		
		onLoad() {
			// let self = this;
			this.baseURL = getApp().globalData.baseURL;
			this.getOpenId();

			// console.log(this.loginForm.code);

			console.log('App launch');
			console.log(this.baseURL+ '/teacher/login');
			// 判断标识, 使用token判断
			let token = uni.getStorageSync('token');
			// 如果没有token, 则跳转到注册界面
			if(!token){
				console.log('没有token, 进入注册页面');
				uni.reLaunch({
					url:'/pages/teacher/register'
				})
			}else{
				console.log('有token');
				// 跳转到首页，跳转tabbar页面, 必须使用这个方法
				uni.switchTab({
					url:'/pages/teacher/labInfo'
				})
			}
		}
	}
</script>

<style>
</style>
