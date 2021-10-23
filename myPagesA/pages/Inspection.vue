<template>
	<view class="inspection">
		<view class="subsection"><u-subsection :list="list" :current="1" mode="subsection" active-color="#cc300d" height="100"></u-subsection></view>
		<view class="text">共有X条记录</view>
		<scroll-view class="content" :style="{ height: navHeight + 'px' }" scroll-y="true">
			<view class="box">
				<u-row gutter="16">
					<u-col span="4"><image src="../../static/nfc_dev.png" mode=""></image></u-col>
					<u-col span="7">
						<ul>
							<li>归属项目:XXXX</li>
							<li>安装位置:XXXX</li>
							<li>巡检编号:XXXX</li>
							<li>设备状态</li>
							<li>巡检时间:XXXXX</li>
						</ul>
					</u-col>
				</u-row>
			</view>
		</scroll-view>
		<!-- <view class="empty">
			<u-empty text="暂无历史数据" iconSize="300"></u-empty>
		</view> -->
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: [
				{
					name: '巡检正常'
				},
				{
					name: '巡检隐患'
				}
			],
			current: 1,
			pH: 0, //窗口高度
			navHeight: 0 //元素的所需高度
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
				let titleH = uni.createSelectorQuery().select('.content'); //想要获取高度的元素名（class/id）

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
	}
};
</script>

<style lang="scss" scoped>
.inspection {
	.subsection {
		border: 1px solid #cc300d;
	}
	.text {
		text-align: center;
		// background-color: #eae9e8;
	}
	.content {
		background-color: #f5f5f1;
		// border-radius: 10px;
		// width: 95%;
		padding-top: 10px;
		.box {
			width: 100%;
			height: 170px;
			background-color: #fff;
			border-radius: 20px;
			margin-bottom: 10px;
			// position: relative;
			image {
				width: 100px;
				height: 100px;
				// position: absolute;
				// top: 50%;
				margin-top: 30px;
			}
			ul {
				li {
					margin-top: 10px;
				}
			}
		}
	}
	.empty {
		margin-top: 100px;
	}
}
</style>
