<template>
	<view>
		<u-search placeholder="输入设备编号或地址" v-model="keyword" @custom="search"></u-search>
		<view class="page-body">
			<view class="page-section page-section-gap"><map style="width: 100%; height: 400px;" :latitude="latitude" :longitude="longitude" :markers="covers" callout></map></view>
		</view>

		<scroll-view scroll-y="true" :style="{ height: navHeight + 'px' }" class="map" @scrolltolower='scrolltolower'>
			<view class="wapper" v-for="(item, index) in list" :key="index" @click="mapInfo(item)">
				<u-row gutter="16" justify="space-between">
					<u-col span="3">
						<view class="img">
							<image
								:src="
									item.isOnLine == '1'
										? 'http://psy119.cn/early/images/drawable-hdpi/icon_map_address_green.png'
										: 'http://psy119.cn/early/images/drawable-hdpi/icon_map_address_red.png'
								"
								mode=""
								style="width: 70px;height: 90rpx;"
							></image>
							<view :style="{ color: item.isOnLine == '0' ? 'red' : 'green' }">{{ item.isOnLine == '0' ? '离线' : '正常' }}</view>
						</view>
					</u-col>
					<u-col span="8">
						<view class="">{{ item.installLocation }}</view>
						<view style="color: blue;">设备ID：{{ item.productNumber }}</view>
					</u-col>
				</u-row>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import { newcheck_devicetp } from '@/api/api.js';
export default {
	data() {
		return {
			list: [],
			pH: 0, //窗口高度
			navHeight: 0, //元素的所需高度
			id: 0, // 使用 marker点击事件 需要填写id
			title: 'map',
			latitude: 35.909,
			longitude: 116.39742,
			keyword: '',
			number: 100,
			page: 1,

			covers: [
				// {
				// 	latitude: 39.909,
				// 	longitude: 116.39742,
				// 	iconPath: '../../static/yangantanceqi.png'
				// },
				// {
				// 	latitude: 39.9,
				// 	longitude: 116.39,
				// 	iconPath: 'http://psy119.cn/early/images/drawable-hdpi/icon_map_address_red.png'
				// }
			]
		};
	},
	onLoad(option) {
		console.log(option);
		this.type = option.type;
		this.newcheck_devicetpFun();
	},
	methods: {
		newcheck_devicetpFun(user, type, Number, page, obj) {
			newcheck_devicetp(uni.getStorageSync('userName'), this.type, this.number, this.page, uni.getStorageSync('userName'), this.keyword).then(res => {
				console.log(res, 999);
				this.list = res.data.list;
			});
		},
		search() {
			this.newcheck_devicetpFun();
		},
		scrolltolower(){
			this.number+=100
			this.newcheck_devicetpFun()
		},
		mapInfo(item) {
			console.log(item);
			let lat = item.long_lat.split(',');
			if (lat[0] > 60) {
				this.latitude = lat[1] * 1;
				this.longitude = lat[0] * 1;
			} else {
				this.latitude = lat[0] * 1;
				this.longitude = lat[1] * 1;
			}
			this.covers = [
				{
					latitude: this.latitude,
					longitude: this.longitude,
					iconPath: 'http://psy119.cn/early/images/drawable-hdpi/icon_map_address_red.png',
					callout: {
						content: item.installLocation,
						borderRadius: 5,
						display: 'ALWAYS',
						padding: 7,
						bgColor: '#FFFFFF',
						fontSize: 15
					}
				}
			];
		}
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
				let titleH = uni.createSelectorQuery().select('.map'); //想要获取高度的元素名（class/id）

				titleH
					.boundingClientRect(data => {
						console.log(data);
						let pH = that._data.pH;

						that._data.navHeight = pH - data.top; //计算高度：元素高度=窗口高度-元素距离顶部的距离（data.top）
						console.log(that._data, 66);
					})
					.exec();
				// 			console.log(that._data,999)
			}
		});
	}
};
</script>

<style scoped lang="scss">
.map {
}
.wapper {
	border-bottom: 1px solid #333;
	margin-top: 10px;
}
.img {
	text-align: center;
}
</style>
