<template>
	<view class="allDevices">
		<u-grid :col="3" index="1">
			<u-grid-item v-for="(item, index) in deciceType" :key="index" @click="mapType(item.type)">
				<image :src="item.url" mode=""></image>
				<view class="grid-text">{{ item.name }}</view>
				<view class="grid-text" style="color: red;">({{ item.value }})</view>
			</u-grid-item>
		</u-grid>
	</view>
</template>

<script>
import { check_device_type } from '@/api/api.js';
export default {
	data() {
		return {
			deciceType: []
		};
	},
	mounted() {
		check_device_type('13076920054', '13076920054').then(res => {
			const data2 = res.data.list[0].values.split(',');

			for (let i = 0; i < data2.length; i++) {
				const data = res.data.list[0].name.split(',');
				const data2 = res.data.list[0].values.split(',');
				const data4 = res.data.list[0].isTraffic.split(',');
				const data3 = [
					'../../static/yunwangguan.png',
					'../../static/ranqi.png',
					'../../static/yangantanceqi.png',
					'../../static/a-guihuatubiaoyuanwenjianFarlim_huaban1fuben11.png',
					'../../static/shuiya.png',
					'../../static/wulitu_zhuji.png',
					'http://psy119.cn/early/images/drawable-hdpi/qigan_wifi.png',
					'../../static/fenchen.png',
					'http://psy119.cn/early/images/drawable-hdpi/yewei_wifi.png',
					'../../static/shipin.png',
					'../../static/menci.png',
					'http://psy119.cn/early/images/drawable-hdpi/nfc_dev.png',
					'../../static/dianqihuozai.png',
					'../../static/shengguangbaojingqi.png',
					'../../static/shoudong.png',
					'../../static/shuijinbaojing.png',
					'../../static/shebeibaojing.png'
				];

				if (i < 17) {
					this.deciceType.push({ name: data[i], value: data2[i], url: data3[i], type: data4[i] });
				}
			}
			console.log(this.deciceType, 'qweqw');
		});
	},
	methods: {
		goToInfo(index) {
			console.log(123, index);
		},
		mapType(type) {
			// console.log(type);
			uni.navigateTo({
				url:`/myPagesA/pages/devicesMap?type=${type}`
			})
		}
	}
};
</script>

<style scoped lang="scss">
.allDevices {
	// padding: 10px;
	image {
		width: 70px;
		height: 70px;
	}
}
.grid-text {
	font-size: 28rpx;
	margin-top: 4rpx;
	color: $u-type-info;
}
/deep/.u-grid-item-box {
	border-bottom: 1px solid #000;
	border-right: 1px solid #000;
	// border-top: none;
	// border-left: none;
}
</style>
