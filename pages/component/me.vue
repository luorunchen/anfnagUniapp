<template>
	<view class="me">
		<view class="info">
			<view class="img"><image src="../../static/yonghu.png" mode=""></image></view>

			<view class="font">{{ userInfo.realName }}({{ grade }})</view>
			<view class="font">{{ name }}</view>
		</view>
		<u-cell-group>
			<!-- <u-cell-item icon="setting-fill" title="账号" :arrow="false"></u-cell-item> -->
			<u-cell-item icon="integral-fill" title="等级" :value="grade" :arrow="false"></u-cell-item>
			<u-cell-item icon="integral-fill" title="职务" :value="userInfo.post" :arrow="false"></u-cell-item>
			<u-cell-item icon="integral-fill" title="邮箱" :value="userInfo.mobile" :arrow="false"></u-cell-item>
			<u-cell-item icon="integral-fill" title="负责人姓名" :value="userInfo.realName" :arrow="false"></u-cell-item>
			<u-cell-item icon="integral-fill" title="手机号码" :value="userInfo.phone" :arrow="false"></u-cell-item>
			<u-cell-item icon="integral-fill" title="公司名称" :value="userInfo.company" :arrow="false"></u-cell-item>
			<u-cell-item icon="integral-fill" title="公司号码" :value="userInfo.company_phone" :arrow="false"></u-cell-item>
			<u-cell-item icon="integral-fill" title="详细地址" :value="userInfo.address" :arrow="false"></u-cell-item>
			<!-- <u-cell-item icon="integral-fill" title="详细地址" value="新版本" :arrow="false"></u-cell-item> -->
		</u-cell-group>
		<u-button type="warning" @click="passwordEdit = true">修改密码</u-button>
		<u-button type="error" @click="outLogin">退出登录</u-button>
		<u-popup v-model="passwordEdit" mode="center" border-radius="14" width="90%" height="300px">
			<view class="popup">
				<u-form :model="form" ref="uForm" label-width="100px">
					<u-form-item label="旧密码" prop="passwordOdd"><u-input :clearable="false" v-model="form.passwordOdd" :password-icon="true" type="password" /></u-form-item>
					<u-form-item label="新密码" prop="passwordNew"><u-input :clearable="false" v-model="form.passwordNew" :password-icon="true" type="password" /></u-form-item>
					<u-form-item label="确认新密码" prop="passwordNewTrue"><u-input :clearable="false" v-model="form.passwordNewTrue" :password-icon="true" type="password" /></u-form-item>
				</u-form>
				<u-button type="primary" @click="submit">提交</u-button>
			</view>
		</u-popup>
		<u-toast ref="uToast" />
		<u-modal v-model="show" :content="content" @confirm="outTrue" show-cancel-button="true"></u-modal>
	</view>
</template>

<script>
import { checkuser, passwordSSS } from '@/api/api.js';
import md5 from '@/utils/md5.js';
export default {
	data() {
		return {
			userInfo: [],
			passwordEdit: false,
			name: uni.getStorageSync('userName'),
			show: false,
			content: '是否确认退出登录',
			grade: uni.getStorageSync('grade'),
			form: {
				passwordOdd: '',
				passwordNew: '',
				passwordNewTrue: ''
			},
			rules: {
				passwordOdd: [
					{
						required: true,
						message: '请输入旧密码',
						// 可以单个或者同时写两个触发验证方式
						trigger: ['change', 'blur']
					}
				],
				passwordNew: [
					{
						required: true,
						message: '请输入新密码',
						// 可以单个或者同时写两个触发验证方式
						trigger: ['change', 'blur']
					}
				],
				passwordNewTrue: [
					{
						required: true,
						message: '请输入新密码',
						// 可以单个或者同时写两个触发验证方式
						trigger: ['change', 'blur']
					}
				]
			}
		};
	},
	onReady() {
		this.$refs.uForm.setRules(this.rules);
	},
	methods: {
		outLogin() {
			this.show = true;
		},
		outTrue() {
			// console.log(12312);
			uni.redirectTo({
				url: '../login/index'
			});
			uni.clearStorageSync('userName');
		},
		submit() {
			
			this.$refs.uForm.validate(valid => {
				if (valid) {
					console.log('验证通过',this.form.passwordNew === this.form.passwordNewTrue);
					if (this.form.passwordNew === this.form.passwordNewTrue) {
						
						passwordSSS(this.form.passwordNewTrue,md5(this.form.passwordOdd),this.name,this.name).then(res => {
							if(res.data.list[0].status==true){
								this.$refs.uToast.show({
									title: '密码修改成功',
									type: 'success',
									
								});
								uni.redirectTo({
									url: '../login/index'
								});
								uni.clearStorageSync('userName');
							}else{
								this.$refs.uToast.show({
									title:res.data.list[0].err_msg,
									type: 'error'
								});
							}
						});
					} else {
						this.$refs.uToast.show({
							title: '新密码不一致',
							type: 'error'
						});
					}
				} else {
					console.log('验证失败');
				}
			});
		}
	},
	mounted() {
		checkuser(uni.getStorageSync('userName'), uni.getStorageSync('userName')).then(res => {
			this.userInfo = res.data.list[0];
			console.log(this.userInfo, 777);
		});
	}
};
</script>

<style lang="scss" scoped>
.me {
	padding-bottom: 30px;
	.info {
		height: 200px;
		background-color: #0db5ff;
		// margin: 0 auto;
		text-align: center;
		.img {
			padding-top: 20px;
			margin: 0 auto;
			image {
				width: 100px;
				height: 100px;
			}
		}
		.font {
			color: #fff;
			font-size: 20px;
			margin-top: 10px;
		}
	}
	/deep/.u-btn {
		margin-top: 10px;
	}
	.popup {
		padding: 20px;
	}
}
</style>
