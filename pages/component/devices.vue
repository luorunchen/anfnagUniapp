<template>
	<view class="devices">
		<view class="search"><u-search placeholder="请输入项目名称或地址" v-model="keyword" @custom="searchChange"></u-search></view>
		<view class="infoBox" :style="{ height: navHeight + 'px' }">
			<view class="wrap">
				<u-waterfall v-model="appList" ref="uWaterfall">
					<template v-slot:left="{ leftList }">
						<view class="demo-warter" v-for="(item, index) in leftList" :key="index" @click="box(item.devid,item.productNumber)">
							<!-- 警告：微信小程序中需要hx2.8.11版本才支持在template中结合其他组件，比如下方的lazy-load组件 -->
							<view class="img">
								<image src="../../static/yangan.png" mode="" style="width: 50px;height: 50px"></image>
								<!-- <u-lazy-load threshold="-450" border-radius="10" :image="item.image" :index="index"></u-lazy-load> -->
								<view class="number">{{ item.productNumber }}</view>
								<view>设备:{{ item.dSName }}</view>
								<view>
									状态:
									<text :style="{ color: item.errtype == '0' ? 'red' : item.errtype == '0' ? 'yellow' : 'rgb(19, 214, 28)', fontSize: '20px', fontWeight: '600' }">
										{{ item.errtype == '0' ? '报警' : errtype == '1' ? '故障' : '正常' }}
									</text>
								</view>
								<view>位置:{{ item.installLocation }}</view>
							</view>

							<!-- <u-icon name="close-circle-fill" color="#fa3534" size="34" class="u-close" @click="remove(item.id)"></u-icon> -->
						</view>
					</template>
					<template v-slot:right="{ rightList }">
						<view class="demo-warter" v-for="(item, index) in rightList" :key="index" @click="box(item.devid,item.productNumber)">
							<view class="img">
								<image src="../../static/yangan.png" mode="" style="width: 50px;height: 50px"></image>

								<u-lazy-load threshold="-450" border-radius="10" :image="item.image" :index="index" v-show="pH <= 0"></u-lazy-load>
								<view class="number">{{ item.productNumber }}</view>
								<view>设备:{{ item.dSName }}</view>
								<view>
									状态:
									<text :style="{ color: item.errtype == '0' ? 'red' : item.errtype == '0' ? 'yellow' : 'rgb(19, 214, 28)', fontSize: '20px', fontWeight: '600' }">
										{{ item.errtype == '0' ? '报警' : errtype == '1' ? '故障' : '正常' }}
									</text>
								</view>
								<view>位置:{{ item.installLocation }}</view>
							</view>
						</view>
					</template>
				</u-waterfall>
				<u-loadmore bg-color="rgb(240, 240, 240)" :status="loadStatus"></u-loadmore>
			</view>
		</view>
	</view>
</template>

<script>
import { AppDeviceList } from '@/api/api.js';
export default {
	data() {
		return {
			keyword: '',
			pH: 0, //窗口高度
			navHeight: 0, //元素的所需高度
			loadStatus: 'loadmore',
			flowList: [],
			appList: [
			
			],
			pages: 20,
			obj: ''
		};
	},
	methods: {
		box(devid,productNumber){
			console.log(123123,devid)
			uni.navigateTo({
				url:`/myPagesA/pages/devicesInfo?devId=${devid}&productNumber=${productNumber}`
			})
		},
		searchChange(e) {
			console.log(2222);
			this.$refs.uWaterfall.clear();
			this.obj = e;
			this.AppDeviceListFun();
		},
		addRandomData() {
			// for (let i = 0; i < this.appList.length; i++) {
			// 	let index = this.$u.random(0, this.appList.length - 1);
			// 	// 先转成字符串再转成对象，避免数组对象引用导致数据混乱
			// 	let item = JSON.parse(JSON.stringify(this.appList[index]));
			// 	item.id = this.$u.guid();
			// 	this.flowList.push(item);
			// }
			this.flowList=this.appList
			console.log(this.flowList,654654);
		},
		AppDeviceListFun() {
			AppDeviceList(uni.getStorageSync('userName'), uni.getStorageSync('userName'), 1, this.pages, this.obj).then(res => {
				this.appList = res.data.list[0].mess;
				// this.addRandomData();
			});
		}
		// remove(id) {
		// 	this.$refs.uWaterfall.remove(id);
		// }
	},
	onLoad() {
		this.AppDeviceListFun();
	},
	onReachBottom() {
		this.loadStatus = 'loading';
		// 模拟数据加载
		setTimeout(() => {
			// this.addRandomData();
			this.pages += 10;
			this.AppDeviceListFun();
			this.loadStatus = 'loadmore';
		}, 1000);
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
				let titleH = uni.createSelectorQuery().select('.infoBox'); //想要获取高度的元素名（class/id）

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

<style lang="scss">
.devices {
	.search {
		padding: 10px 20px;
		position: fixed;
		z-index: 999;
		width: 93%;
		background: #fff;
	}
	.infoBox {
		width: 100%;
		// background-color: #bfa;
		// overflow: hidden;
		position: absolute;
		.wrap {
			margin-top: 60px;
		}
	}
}
.demo-warter {
	border-radius: 8px;
	margin: 5px;
	background-color: #ffffff;
	padding: 8px;
	.img {
		text-align: center;
	}
	.number {
		text-align: center;
		color: blue;
	}
}

.u-close {
	position: absolute;
	top: 32rpx;
	right: 32rpx;
}

// .demo-image {
// 	width: 10px;
// 	height: 10px;
// 	border-radius: 4px;
// }

.demo-title {
	font-size: 30rpx;
	margin-top: 5px;
	color: $u-main-color;
}

.demo-tag {
	display: flex;
	margin-top: 5px;
}

.demo-tag-owner {
	background-color: $u-type-error;
	color: #ffffff;
	display: flex;
	align-items: center;
	padding: 4rpx 14rpx;
	border-radius: 50rpx;
	font-size: 20rpx;
	line-height: 1;
}

.demo-tag-text {
	border: 1px solid $u-type-primary;
	color: $u-type-primary;
	margin-left: 10px;
	border-radius: 50rpx;
	line-height: 1;
	padding: 4rpx 14rpx;
	display: flex;
	align-items: center;
	border-radius: 50rpx;
	font-size: 20rpx;
}

.demo-price {
	font-size: 30rpx;
	color: $u-type-error;
	margin-top: 5px;
}

.demo-shop {
	font-size: 22rpx;
	color: $u-tips-color;
	margin-top: 5px;
}
</style>

<style>
/* page不能写带scope的style标签中，否则无效 */
page {
	background-color: rgb(240, 240, 240);
}
</style>
