<template>
	<view class="details" >
		<u-cell-group>
			<u-cell-item icon="setting-fill" title="网关ID" :value="portid.devicenoid" :arrow="false"></u-cell-item>
			<u-cell-item icon="setting-fill" title="设备编号" :value="portid.deviceid" :arrow="false"></u-cell-item>
			<u-cell-item icon="map-fill" title="经纬度" :value="portid.long_lat" :arrow="false"></u-cell-item>
			<u-cell-item icon="map-fill" title="所在地址" :value="portid.address" @click="longLat"></u-cell-item>
			<u-cell-item icon="error-circle-fill" title="报警类型" :value-style="{ color: 'red' }" :value="portid.isTrafficname" :arrow="false"></u-cell-item>
			<u-cell-item icon="error-circle-fill" title="报警时间" :value-style="{ color: 'red' }" :value="portid.creationtime" :arrow="false"></u-cell-item>
			<u-cell-item icon="home-fill" title="应用场景" :value="portid.place" :arrow="false"></u-cell-item>
		</u-cell-group>
		<view class="info" v-if="portid.tran!=undefined||portid.tran!=null">
			<view class="electricCurrent">
				<view class="center">
					<image :src="portid.isTrafficname.indexOf('剩余')!=-1?'http://psy119.cn/early/images/drawable-hdpi/s_red.png':'http://psy119.cn/early/images/drawable-hdpi/s.png'" mode=""></image>
					{{ portid.tran.leakageAlarmCurrentValue }}mA
				</view>
				<view class="center">
					<image  :src="portid.isTrafficname.indexOf('A相电流')!=-1?'http://psy119.cn/early/images/drawable-hdpi/s_red.png':'http://psy119.cn/early/images/drawable-hdpi/s.png'" mode=""></image>
					{{ portid.tran.noLeakageAlarmACurrentValue }}A
				</view>
				<view class="center">
					<image  :src="portid.isTrafficname.indexOf('B相电流')!=-1?'http://psy119.cn/early/images/drawable-hdpi/s_red.png':'http://psy119.cn/early/images/drawable-hdpi/s.png'" mode=""></image>
					{{ portid.tran.noLeakageAlarmBCurrentValue }}A
				
				</view>
				<view class="center">
					<image :src="portid.isTrafficname.indexOf('C相电流')!=-1?'http://psy119.cn/early/images/drawable-hdpi/s_red.png':'http://psy119.cn/early/images/drawable-hdpi/s.png'"  mode=""></image>
					{{ portid.tran.noLeakageAlarmCCurrentValue }}A
				</view>
			</view>
			<view class="Voltage">
				<view class="center">
					<image   :src="portid.isTrafficname.indexOf('A相电压')!=-1?'http://psy119.cn/early/images/drawable-hdpi/v_red.png':'http://psy119.cn/early/images/drawable-hdpi/v.png'"   mode=""></image>
					<view class="">{{ portid.tran.noVoltageAlarmAValue }}V</view>
				</view>
				<view class="center">
					<image :src="portid.isTrafficname.indexOf('B相电压')!=-1?'http://psy119.cn/early/images/drawable-hdpi/v_red.png':'http://psy119.cn/early/images/drawable-hdpi/v.png'"  mode=""></image>
					<view class="">{{ portid.tran.noVoltageAlarmBValue }}V</view>
				</view>
				<view class="center">
					<image :src="portid.isTrafficname.indexOf('C相电压')!=-1?'http://psy119.cn/early/images/drawable-hdpi/v_red.png':'http://psy119.cn/early/images/drawable-hdpi/v.png'"  mode=""></image>
					<view class="">{{ portid.tran.noVoltageAlarmCValue }}V</view>
				</view>
			</view>
			<view class="temperature">
				<view class="center">
					<image   :src="portid.isTrafficname.indexOf('A温度')!=-1?'http://psy119.cn/early/images/drawable-hdpi/w_red.png':'http://psy119.cn/early/images/drawable-hdpi/w.png'"  mode=""></image>
					<view>{{ portid.tran.noAlarmATemperatureValue }}℃</view>
					
				</view>
				<view class="center">
					<image :src="portid.isTrafficname.indexOf('B温度')!=-1?'http://psy119.cn/early/images/drawable-hdpi/w_red.png':'http://psy119.cn/early/images/drawable-hdpi/w.png'" mode=""></image>
					<view>{{ portid.tran.noAlarmBTemperatureValue }}℃</view>
					
				</view>
				<view class="center">
					<image :src="portid.isTrafficname.indexOf('C温度')!=-1?'http://psy119.cn/early/images/drawable-hdpi/w_red.png':'http://psy119.cn/early/images/drawable-hdpi/w.png'" mode=""></image>
					<view>{{ portid.tran.noAlarmCTemperatureValue }}℃</view>
					
				</view>
				<view class="center">
					<image :src="portid.isTrafficname.indexOf('N温度')!=-1?'http://psy119.cn/early/images/drawable-hdpi/w_red.png':'http://psy119.cn/early/images/drawable-hdpi/w.png'" mode=""></image>
					<view>{{ portid.tran.noAlarmNTemperatureValue }}℃</view>
					
				</view>
			</view>
		</view>

		<view class="tab" v-if="portid.tran!=undefined||portid.tran!=null">
			<u-table>
				<u-tr class="u-tr">
					<u-th class="u-th">设备箱</u-th>
					<u-th class="u-th">实时值</u-th>
					<u-th class="u-th">报警阀值</u-th>
				</u-tr>
				<u-tr class="u-tr">
					<u-td class="u-td">剩余电流</u-td>
					<u-td class="u-td">{{ portid.tran.leakageAlarmCurrentValue }}mA</u-td>
					<u-td class="u-td">{{ReadParameterApiList.SYdianliu}}mA</u-td>
				</u-tr>
				<u-tr class="u-tr">
					<u-td class="u-td">A相电流</u-td>
					<u-td class="u-td">{{ portid.tran.noLeakageAlarmACurrentValue }}A</u-td>
					<u-td class="u-td">{{ReadParameterApiList.ADianLiu}}A</u-td>
				</u-tr>
				<u-tr class="u-tr">
					<u-td class="u-td">B相电流</u-td>
					<u-td class="u-td">{{ portid.tran.noLeakageAlarmBCurrentValue }}A</u-td>
					<u-td class="u-td">{{ReadParameterApiList.BDianLiu}}A</u-td>
				</u-tr>
				<u-tr class="u-tr">
					<u-td class="u-td">C相电流</u-td>
					<u-td class="u-td">{{ portid.tran.noLeakageAlarmCCurrentValue }}A</u-td>
					<u-td class="u-td">{{ReadParameterApiList.CDianLiu}}A</u-td>
				</u-tr>
				<u-tr class="u-tr">
					<u-td class="u-td">A相电压</u-td>
					<u-td class="u-td">{{ portid.tran.noVoltageAlarmAValue }}V</u-td>
					<u-td class="u-td">{{ReadParameterApiList.ADianYa}}V</u-td>
				</u-tr>
				<u-tr class="u-tr">
					<u-td class="u-td">B相电压</u-td>
					<u-td class="u-td">{{ portid.tran.noVoltageAlarmBValue }}V</u-td>
					<u-td class="u-td">{{ReadParameterApiList.BDianYa}}V</u-td>
				</u-tr>
				<u-tr class="u-tr">
					<u-td class="u-td">C相电压</u-td>
					<u-td class="u-td">{{ portid.tran.noVoltageAlarmCValue }}V</u-td>
					<u-td class="u-td">{{ReadParameterApiList.CDianYa}}V</u-td>
				</u-tr>
				<u-tr class="u-tr">
					<u-td class="u-td">A相温度</u-td>
					<u-td class="u-td">{{ portid.tran.noAlarmATemperatureValue }}℃</u-td>
					<u-td class="u-td">{{ReadParameterApiList.AWenDu}}℃</u-td>
				</u-tr>
				<u-tr class="u-tr">
					<u-td class="u-td">B相温度</u-td>
					<u-td class="u-td">{{ portid.tran.noAlarmBTemperatureValue }}℃</u-td>
					<u-td class="u-td">{{ReadParameterApiList.BWenDu}}℃</u-td>
				</u-tr>
				<u-tr class="u-tr">
					<u-td class="u-td">C相温度</u-td>
					<u-td class="u-td">{{ portid.tran.noAlarmCTemperatureValue }}℃</u-td>
					<u-td class="u-td">{{ReadParameterApiList.CWenDu}}℃</u-td>
				</u-tr>	
				<u-tr class="u-tr">
					<u-td class="u-td">N相温度</u-td>
					<u-td class="u-td">{{ portid.tran.noAlarmNTemperatureValue }}℃</u-td>
					<u-td class="u-td">{{ReadParameterApiList.NWenDu}}℃</u-td>
				</u-tr>
			</u-table>
		</view>
		
		<view class="btn">
			<u-button type="primary" @click="show=true">阀值设置</u-button>
			
			<u-button type="error">解除报警</u-button>
		</view>
		
		<u-popup v-model="show" mode="center"  width="80%" height="90%" :closeable="true">
					<view>出淤泥而不染，濯清涟而不妖</view>
				</u-popup>
	</view >
	
</template>

<script>
import { check_devicereportid,ReadParameterApi } from '@/api/api.js';
export default {
	data() {
		return {
			portid: {},
			pH: 0, //窗口高度
			navHeight: 0 ,//元素的所需高度
			ReadParameterApiList:{},
			show:false,
			
		};
	},
	methods: {
		check_devicereportidFun(id) {
			check_devicereportid(id, 1, uni.getStorageSync('userName')).then(res => {
				console.log(res.data, 'woshioDATA');
				this.portid = res.data.list[0];
				// this.infoList = res.data.list[0]
					this.ReadParameterApiFun(id);
			});
		},
		ReadParameterApiFun(){
			ReadParameterApi(this.portid.deviceid,this.portid.username).then(res=>{
				this.ReadParameterApiList = res.data.row
			})
		},
		longLat() {
			var that = this;
			// let longitude = 113.936457;
			// let latitude = 22.906116;
			uni.getLocation({
				type: 'wgs84',
				success: function(res) {
					// console.log('当前位置的经度：' + that.devStaus.long_lat.split(',')[0]);
					// console.log('当前位置的纬度：' + res.latitude);
					uni.openLocation({
						latitude: that.portid.long_lat.split(',')[0]*1,
						longitude: that.portid.long_lat.split(',')[1]*1,
						success: function() {
							console.log('success');
							
						
		
						}
					});
				}
			});
		}
	},
	onLoad(data) {
		console.log(data);
		this.check_devicereportidFun(data.id);
	
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
				let titleH = uni.createSelectorQuery().select('.details'); //想要获取高度的元素名（class/id）
	
				titleH
					.boundingClientRect(data => {
						console.log(data);
						let pH = that._data.pH;
	
						that._data.navHeight = pH - data.top //计算高度：元素高度=窗口高度-元素距离顶部的距离（data.top）
						console.log(that._data, 66);
					})
					.exec();
				// 			console.log(that._data,999)
			}
		});
	},
};
</script>
<style>
page{
    background-color: #efefef;
}
</style>
<style scoped lang="scss">
		

.details {
	padding: 10px;
	// background-color: #efefef;
	// height: 100%;
	.info {
		padding: 10px 0 10px 0;
		margin-top: 20px;

		background-color: #fff;
		.electricCurrent {
			display: flex;
			justify-content: space-around;
			margin-bottom: 20px;
			.center {
				text-align: center;
				width: 85px;
			}
			image {
				width: 60px;
				height: 60px;
			}
		}
		.Voltage {
			display: flex;
			justify-content: space-around;
			margin-bottom: 10px;
			.center {
				text-align: center;
			}
			image {
				width: 60px;
				height: 60px;
			}
		}
		.temperature {
			display: flex;
			justify-content: space-around;
			margin-bottom: 20px;
			.center {
				text-align: center;
			}
			image {
				width: 80px;
				height: 80px;
			}
		}
	}
	.tab {
		margin-top: 20px;

		// background-color: #fff;
		.u-th {
			width: 33%;
		}
		.u-td {
			width: 33%;
		}
	}
	.btn{
		margin-top: 20px;
		// background-color: #fff;
		height: 100px;
		/deep/.u-btn{
			margin-top: 10px;
		}
	}
}
</style>
