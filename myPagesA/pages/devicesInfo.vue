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
		<view>
			<u-cell-group>
				<u-cell-item icon="photo-fill" title="设备安装位置示意图" :arrow="false"></u-cell-item>
				<!-- <u-cell-item icon="setting-fill" title="管理设备" value="8"></u-cell-item> -->
				<u-upload :action="action" :file-list="fileList"></u-upload>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
import { getDeviceByDevId, getHistAlarm } from '@/api/api.js';
export default {
	data() {
		return {
			devStaus: {},
			alarmList: [],
			circles: [],
		};
	},
	onLoad(data) {
		console.log(data, 'woshidata');
		this.getDeviceByDevIdFun(data.devId, uni.getStorageSync('userName'));
		this.getHistAlarmFun(data.devId, data.productNumber, uni.getStorageSync('userName'));
	},
	methods: {
		getDeviceByDevIdFun(devId, user) {
			getDeviceByDevId(devId, user).then(res => {
				this.devStaus = res.data.list[0].mess[0];
			});
		},
		getHistAlarmFun(devId, productNumber, my_username) {
			getHistAlarm(devId, productNumber, my_username).then(res => {
				this.alarmList = res.data.list[0].mess;
			});
		},
		longLat() {
			var that = this;
			let longitude = 113.936457;
			let latitude = 22.906116;
			uni.getLocation({
				type: 'wgs84',
				success: function(res) {
					console.log('当前位置的经度：' + that.devStaus.long_lat.split(',')[0]);
					console.log('当前位置的纬度：' + res.latitude);
					uni.openLocation({
						latitude: that.devStaus.long_lat.split(',')[0]*1,
						longitude: that.devStaus.long_lat.split(',')[1]*1,
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

<style scoped lang="scss">
.devicesInfo {
	height: calc(100vh);
	padding: 10px;
	background-color: #efefec;
}
.info {
	margin-bottom: 10px;
}
// .u-tr{
// 	width: 25%;
// }
.u-th {
	width: 33%;
}
.u-td {
	width: 33%;
}
</style>
