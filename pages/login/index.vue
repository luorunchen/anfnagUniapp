<template>
	<view class="login" :style="{ height: navHeight + 'px' }">
		<view class="title">
			<image src="http://psy119.cn/early/images/drawable-hdpi/ic_launcherlogin.png" mode=""></image>
			<view>安全预警应急平台</view>
		</view>
		<view class="user">
			<u-form :model="form" ref="uForm" border-bottom>
				<u-form-item label="姓名" prop="name"><u-input v-model="form.name" /></u-form-item>
				<u-form-item label="密码"  prop="intro"><u-input type='password' v-model="form.intro" /></u-form-item>
			</u-form>
		</view>
		<u-button @click="submit" type="primary">登录</u-button>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
import { APPlogin } from '@/api/api.js';
import md5 from '@/utils/md5.js';
export default {
	data() {
		return {
			pH: 0, //窗口高度
			navHeight: 0, //元素的所需高度
			form: {
				name: '',
				intro: ''
			},
			rules: {
				name: [
					{
						required: true,
						message: '请输入账号',
						// 可以单个或者同时写两个触发验证方式
						trigger: 'change'
					}
				],
				intro: [
					{
						required: true,
						message: '请输入密码',
						trigger: 'change'
					}
				]
			}
		};
	},
	mounted() {
		this.$refs.uForm.setRules(this.rules);
		let that = this;
		uni.getSystemInfo({
			//调用uni-app接口获取屏幕高度
			success(res) {
				//成功回调函数
				//console.log(res);
				that._data.pH = res.windowHeight; //windoHeight为窗口高度，主要使用的是这个
				console.log(that._data, 665);
				let titleH = uni.createSelectorQuery().select('.login'); //想要获取高度的元素名（class/id）

				titleH
					.boundingClientRect(data => {
						console.log(data);
						let pH = that._data.pH;

						that._data.navHeight = pH - data.top - 10; //计算高度：元素高度=窗口高度-元素距离顶部的距离（data.top）
						console.log(that._data, 66);
					})
					.exec();
				// 			console.log(that._data,999)
			}
		});
		
		console.log(uni.getStorageSync('userName'),1111)
		if(uni.getStorageSync('userName')!=""){
			uni.reLaunch({
				url:"/pages/index/index"
			})
		}
	},
	methods: {
		submit() {
			this.$refs.uForm.validate(valid => {
				if (valid) {
					console.log('验证通过');

					APPlogin(this.form.name, md5(this.form.intro), '').then(res => {
						if (res.data.list[0].status == false) {
							this.$refs.uToast.show({
								title: res.data.list[0].err_msg,
								type: 'error'
								// url: '/pages/user/index'
							});
						} else {
							this.$refs.uToast.show({
								title: '登录成功,正在进入主页',
								type: 'success',
								url: '/pages/index/index',
								isTab: true
							});

							switch (res.data.list[0].grade) {
								case 1:
									uni.setStorageSync('grade', '超级管理员');
									break;
								case 2:
									uni.setStorageSync('grade', '高级管理员');
									break;
								case 3:
									uni.setStorageSync('grade', '普通管理员');
									break;

								default:
									uni.setStorageSync('grade', '普通用户');
									break;
							}
							uni.setStorageSync('userName', this.form.name);
						}
					});
				} else {
					console.log('验证失败');
				}
			});
		}
	}
};
</script>

<style scoped lang="scss">
.login {
	text-align: center;
	padding: 30px;
	background-color: #ddd;
	.title {
		color: #3cf;
		font-weight: bold;
		font-size: 30px;
		margin-top: 70px;
		image {
			width: 100px;
			height: 100px;
		}
	}
	.user {
		border: 1px solid #8b8b8b;
		margin-bottom: 10px;
		margin-top: 20px;
		// width: 80%;
		padding: 10px;
		background-color: #fff;
	}
}
</style>
