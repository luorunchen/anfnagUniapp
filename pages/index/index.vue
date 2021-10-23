<template>
	<view class="content">
		<!-- <u-input v-model="value" :type="type" :border="border" /> -->
		<view class="wrap"><u-swiper :list="list" :effect3d="true"></u-swiper></view>
		<view class="box" :style="{ height: navHeight + 'px' }">
			<view class="boxWapper">
				<view class="boxContainer" @click="goToProject">
					<image src="../../static/xiangmuguanli.png" mode=""></image>
					<view>项目管理</view>
				</view>
				<view class="boxContainer" @click="goToAllDevices">
					<image src="../../static/shebeiguanli.png" mode=""></image>
					<view>所有设备</view>
				</view>
			</view>
			<view class="dot">
				<!-- <image src="../../static/8.gif" mode=""></image> -->
				<view class="textInfo">报警信息</view>
				<text>13211</text>
			</view>
			<view class="boxWapper">
				<view class="boxContainer">
					<image src="../../static/iconkuozhan_xiaoxipre.png" mode="" style="margin-top: 70px;"></image>
					<view>报警消息</view>
				</view>
				<view class="boxContainer">
					<image src="../../static/yonghu.png" mode="" style="margin-top: 70px;"></image>
					<view>用户信息</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			value: '',
			type: 'text',
			border: true,
			pH: 0, //窗口高度
			navHeight: 0, //元素的所需高度
			list: [
				{
					image: 'http://112.74.126.51/ctx/lindo3.jpg',
					title: '昨夜星辰昨夜风，画楼西畔桂堂东'
				},
				{
					image: 'http://112.74.126.51/ctx/lindo1.jpg',
					title: '身无彩凤双飞翼，心有灵犀一点通'
				},
				{
					image: 'http://112.74.126.51/ctx/lindo2.jpg',
					title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
				}
			]
		};
	},
	mounted() {
		let that = this;
		uni.getSystemInfo({
			//调用uni-app接口获取屏幕高度
			success(res) {
				//成功回调函数
				//console.log(res);
				that._data.pH = res.windowHeight; //windoHeight为窗口高度，主要使用的是这个
				console.log(that._data, 665);
				let titleH = uni.createSelectorQuery().select('.box'); //想要获取高度的元素名（class/id）

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
	},
	methods: {
		goToProject(e) {
			
			uni.navigateTo({
				url: '/myPagesA/pages/project'
			});
		},
		goToAllDevices(){
			console.log(123);
			uni.navigateTo({
				url: '/myPagesA/pages/allDevices'
			});
		}
	}
};
</script>

<style lang="scss">
.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	.box {
		width: 92%;

		// padding: 10px;

		// border-radius: 10px;
		.boxWapper {
			display: flex;
			height: 50%;
			.boxContainer {
				width: 50%;
				height: 100%;
				box-shadow: 0px 0px 29px 0px rgba(0, 0, 0, 0.1);
				border-radius: 10px;
				margin: 0 5px 10px 0;
				text-align: center;
				font-size: 20px;
				image {
					margin-top: 10px;
					width: 50%;
					height: 50%;
				}
			}
		}
		.dot {
			width: 150px;
			height: 150px;
			background-image: url(../../static/8.gif);
			background-size: 100% 100%;
			position: absolute;
			border-radius: 50%;
			text-align: center;
			left: 50%;
			margin-left: -75px;
			top: 50%;
			box-shadow: 0px 0px 29px 0px rgba(0, 0, 0, 0.1);
			// line-height: 220px;
			color: #ffffff;
			font-size: 20px;
			.textInfo {
				margin-top: 90px;
			}
			// image {
			// 	margin-top: 10px;
			// 	width: 50%;
			// 	height: 50%;
			// }
		}
	}
}
.wrap {
	width: 100%;
	// height: 100px;
	padding: 30rpx;
}

.text-area {
	display: flex;
	justify-content: center;
}

.title {
	font-size: 36rpx;
	color: #8f8f94;
}
</style>
