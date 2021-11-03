<template>
	<view class="devicesInfo">
		<view class="info">
			<u-cell-group>
				<u-cell-item icon="file-text-fill" title="项目分组" :value="devStaus.name" :arrow="false"></u-cell-item>
				<u-cell-item icon="account-fill" title="设备类型" :value="devStaus.dMName" :arrow="false"></u-cell-item>
				<u-cell-item icon="phone-fill" title="产品编号" :value="devStaus.productNumber" :arrow="false"></u-cell-item>
				<u-cell-item icon="account-fill" title="设备系统" :value="devStaus.dSName" :arrow="false"></u-cell-item>
				<u-cell-item icon="phone-fill" title="设备厂商" :value="devStaus.dVName" :arrow="false"></u-cell-item>
				<u-cell-item icon="map-fill" title="回路号" :value="devStaus.loopNumber" :arrow="false"></u-cell-item>
				<u-cell-item icon="map-fill" title="设备定位" :value="devStaus.long_lat" :arrow="true" @click="longLat"></u-cell-item>
				<u-cell-item icon="home-fill" title="安装位置" :value="devStaus.installLocation" :arrow="false"></u-cell-item>
			</u-cell-group>
		</view>
		<view class="info">
			<u-table>
				<u-tr class="u-tr">
					<u-th class="u-th">报警时间</u-th>
					<u-th class="u-th">报警类型</u-th>
					<u-th class="u-th">报警位置</u-th>
				</u-tr>
				<u-tr class="u-tr" v-for="(item, index) in alarmList" :key="index">
					<u-td class="u-td">{{ item.alarmFaultDate }}</u-td>
					<u-td class="u-td">{{ item.latitude }}</u-td>
					<u-td class="u-td">{{ item.installLocation }}</u-td>
				</u-tr>
			</u-table>
		</view>
		<view class="electricQuantity">
			<image
				:src="
					devStausMess8.rssi == '1'
						? 'http://psy119.cn/early/images/drawable-hdpi/one.png'
						: devStausMess8.rssi == '2'
						? 'http://psy119.cn/early/images/drawable-hdpi/two.png'
						: devStausMess8.rssi == '3'
						? 'http://psy119.cn/early/images/drawable-hdpi/three.png'
						: 'http://psy119.cn/early/images/drawable-hdpi/four.png'
				"
				mode=""
			></image>
			<image
				:src="
					devStausMess8.voltage == '1'
						? 'http://psy119.cn/early/images/drawable-hdpi/battery1.png'
						: devStausMess8.voltage == '2'
						? 'http://psy119.cn/early/images/drawable-hdpi/battery2.png'
						: devStausMess8.voltage == '3'
						? 'http://psy119.cn/early/images/drawable-hdpi/battery3.png'
						: 'http://psy119.cn/early/images/drawable-hdpi/battery4.png'
				"
				mode=""
			></image>
		</view>
		<view>
			<u-cell-group>
				<u-cell-item icon="photo-fill" title="设备安装位置示意图" :arrow="false"></u-cell-item>
				<!-- <u-cell-item icon="setting-fill" title="管理设备" value="8"></u-cell-item> -->
				<u-upload :action="action" :file-list="fileList"></u-upload>
			</u-cell-group>
		</view>

		<view class="btn" v-if="devStaus.devType == '2'">
			<u-button type="primary" @click="devState('1')">远程消音</u-button>
			<u-button type="primary" @click="devState('2')">远程复位</u-button>
		</view>
		<view class="btn" v-if="devStaus.devType == '2'">
			<u-button type="primary" @click="devState('3')">正常模式</u-button>
			<u-button type="primary" style="margin-bottom: 100px;" @click="devState('4')">防误报模式</u-button>
		</view>
		<!-- <u-button>解除报警</u-button> -->

		<u-toast ref="uToast" />
	</view>
</template>

<script>
import { getDeviceByDevId, getHistAlarm, closeVoice,setDepoly } from '@/api/api.js';
export default {
	data() {
		return {
			devStaus: {},
			alarmList: [],
			circles: [],
			devStausMess8: {}
		};
	},
	onLoad(data) {
		console.log(data, 'woshidata');
		this.getDeviceByDevIdFun(data.devId, uni.getStorageSync('userName'));
		this.getHistAlarmFun(data.devId, data.productNumber, uni.getStorageSync('userName'));
	},
	methods: {
		devState(state) {
			switch (state) {
				case '1':
					closeVoice(uni.getStorageSync('userName'), this.devStaus.productNumber, 1, '').then(res => {
						if (res.data.code == 200) {
							this.$refs.uToast.show({
								title: '请求成功',
								type: 'success'
							});
						}else{
							this.$refs.uToast.show({
								title: '请求失败',
								type: 'error'
							});
						}
					});
					break;
					case '2':
					closeVoice(uni.getStorageSync('userName'), this.devStaus.productNumber, 2, '').then(res => {
						if (res.data.code == 200) {
							this.$refs.uToast.show({
								title: '请求成功',
								type: 'success'
							});
						}else{
							this.$refs.uToast.show({
								title: '请求失败',
								type: 'error'
							});
						}
					});
					break
					case '3':
					setDepoly(uni.getStorageSync('userName'),1, this.devStaus.productNumber).then(res=>{
						if (res.data.code == 200) {
							this.$refs.uToast.show({
								title: '请求成功',
								type: 'success'
							});
						}else{
							this.$refs.uToast.show({
								title: '请求失败',
								type: 'error'
							});
						}
					})
					break
					case '4':
					setDepoly(uni.getStorageSync('userName'),0, this.devStaus.productNumber).then(res=>{
						if (res.data.code == 200) {
							this.$refs.uToast.show({
								title: '请求成功',
								type: 'success'
							});
						}else{
							this.$refs.uToast.show({
								title: '请求失败',
								type: 'error'
							});
						}
					})
					break
			}
		},
		getDeviceByDevIdFun(devId, user) {
			getDeviceByDevId(devId, user).then(res => {
				this.devStaus = res.data.list[0].mess[0];
				this.devStausMess8 = res.data.list[0].mess8;
			});
		},
		getHistAlarmFun(devId, productNumber, my_username) {
			getHistAlarm(devId, productNumber, my_username).then(res => {
				this.alarmList = res.data.list[0].mess.splice(0, 5);
			});
		},
		longLat() {
			var that = this;
			let longitude = 113.936457;
			let latitude = 22.906116;
			if (that.devStaus.long_lat.split(',')[0] > 60) {
				longitude = that.devStaus.long_lat.split(',')[0];
				latitude = that.devStaus.long_lat.split(',')[1];
			} else {
				longitude = that.devStaus.long_lat.split(',')[1];
				latitude = that.devStaus.long_lat.split(',')[0];
			}

			uni.getLocation({
				type: 'wgs84',
				success: function(res) {
					console.log('当前位置的经度：' + that.devStaus.long_lat.split(',')[0]);
					console.log('当前位置的纬度：' + res.latitude);
					uni.openLocation({
						latitude: latitude * 1,
						longitude: longitude * 1,
						success: function() {
							console.log('success');
						}
					});
				}
			});
		}
	}
};
</script>
<style>
page {
	background-color: #efefec;
}
</style>

<style scoped lang="scss">
.devicesInfo {
	height: calc(100vh);
	padding: 10px;
	// /deep/.u-btn {
	// 	margin-top: 20px;
	// 	margin-bottom: 100px;
	// }
}
.btn {
	display: flex;
	width: 100%;
	justify-content: space-around;

	/deep/.u-btn {
		width: calc(45vw);
		margin-top: 10px;
		// &:nth-child(4){
		// 	margin-bottom: 100px;
		// }
	}
}
.info {
	margin-bottom: 10px;
	margin-bottom: 30px;
}
// .u-tr{
// 	width: 25%;
// }
.u-th {
	width: 33.33%;
}
.u-td {
	width: 33.33%;
}

.electricQuantity {
	background-color: #fff;
	display: flex;
	border-radius: 4px;
	justify-content: space-around;
	margin-bottom: 20px;
	padding: 10px;
	image {
		width: 120px;
		height: 120px;
	}
}
</style>
