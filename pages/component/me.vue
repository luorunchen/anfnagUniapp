<template>
	<view class="me">
		<view class="info">
			<view class="img"><image src="../../static/yonghu.png" mode=""></image></view>

			<view class="font">{{ userInfo.realName }}({{grade}})</view>
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
		<u-button type="warning">修改密码</u-button>
		<u-button type="error" @click="outLogin">退出登录</u-button>

		<u-modal v-model="show" :content="content" @confirm="outTrue" show-cancel-button="true"></u-modal>
	</view>
</template>

<script>
import { checkuser } from '@/api/api.js';
export default {
	data() {
		return {
			userInfo: [],
			name: uni.getStorageSync('userName'),
			show: false,
			content: '是否确认退出登录',
			grade:uni.getStorageSync('grade')
		};
	},
	methods: {
		outLogin() {
			this.show = true;
			
		},
		outTrue() {
			// console.log(12312);
			uni.redirectTo({
				url:'../login/index'
			})
			uni.clearStorageSync('userName')
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
}
</style>
