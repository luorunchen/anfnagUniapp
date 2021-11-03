<template>
	<view class="details">
		<u-cell-group>
			<u-cell-item icon="setting-fill" title="网关ID" :value="portid.devicenoid" :arrow="false"></u-cell-item>
			<u-cell-item icon="setting-fill" title="设备编号" :value="portid.deviceid" :arrow="false"></u-cell-item>
			<u-cell-item icon="map-fill" title="经纬度" :value="portid.long_lat" :arrow="false"></u-cell-item>
			<u-cell-item icon="map-fill" title="所在地址" :value="portid.address" @click="longLat"></u-cell-item>
			<u-cell-item icon="error-circle-fill" title="报警类型" :value-style="{ color: 'red' }" :value="portid.isTrafficname" :arrow="false"></u-cell-item>
			<u-cell-item icon="error-circle-fill" title="报警时间" :value-style="{ color: 'red' }" :value="portid.creationtime" :arrow="false"></u-cell-item>
			<u-cell-item icon="home-fill" title="应用场景" :value="portid.place" :arrow="false"></u-cell-item>
		</u-cell-group>
		<view class="info" v-if="portid.tran != undefined || portid.tran != null">
			<view class="electricCurrent">
				<view class="center">
					<image
						:src="portid.isTrafficname.indexOf('剩余') != -1 ? 'http://psy119.cn/early/images/drawable-hdpi/s_red.png' : 'http://psy119.cn/early/images/drawable-hdpi/s.png'"
						mode=""
					></image>
					<view style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{ portid.tran.leakageAlarmCurrentValue }}mA</view>
				</view>
				<view class="center">
					<image
						:src="portid.isTrafficname.indexOf('A相电流') != -1 ? 'http://psy119.cn/early/images/drawable-hdpi/s_red.png' : 'http://psy119.cn/early/images/drawable-hdpi/s.png'"
						mode=""
					></image>
					{{ portid.tran.noLeakageAlarmACurrentValue }}A
				</view>
				<view class="center">
					<image
						:src="portid.isTrafficname.indexOf('B相电流') != -1 ? 'http://psy119.cn/early/images/drawable-hdpi/s_red.png' : 'http://psy119.cn/early/images/drawable-hdpi/s.png'"
						mode=""
					></image>
					{{ portid.tran.noLeakageAlarmBCurrentValue }}A
				</view>
				<view class="center">
					<image
						:src="portid.isTrafficname.indexOf('C相电流') != -1 ? 'http://psy119.cn/early/images/drawable-hdpi/s_red.png' : 'http://psy119.cn/early/images/drawable-hdpi/s.png'"
						mode=""
					></image>
					<view class="">{{ portid.tran.noLeakageAlarmCCurrentValue }}A</view>
				</view>
			</view>
			<view class="Voltage">
				<view class="center">
					<image
						:src="portid.isTrafficname.indexOf('A相电压') != -1 ? 'http://psy119.cn/early/images/drawable-hdpi/v_red.png' : 'http://psy119.cn/early/images/drawable-hdpi/v.png'"
						mode=""
					></image>
					<view class="">{{ portid.tran.noVoltageAlarmAValue }}V</view>
				</view>
				<view class="center">
					<image
						:src="portid.isTrafficname.indexOf('B相电压') != -1 ? 'http://psy119.cn/early/images/drawable-hdpi/v_red.png' : 'http://psy119.cn/early/images/drawable-hdpi/v.png'"
						mode=""
					></image>
					<view class="">{{ portid.tran.noVoltageAlarmBValue }}V</view>
				</view>
				<view class="center">
					<image
						:src="portid.isTrafficname.indexOf('C相电压') != -1 ? 'http://psy119.cn/early/images/drawable-hdpi/v_red.png' : 'http://psy119.cn/early/images/drawable-hdpi/v.png'"
						mode=""
					></image>
					<view class="">{{ portid.tran.noVoltageAlarmCValue }}V</view>
				</view>
			</view>
			<view class="temperature">
				<view class="center">
					<image
						:src="portid.isTrafficname.indexOf('A温度') != -1 ? 'http://psy119.cn/early/images/drawable-hdpi/w_red.png' : 'http://psy119.cn/early/images/drawable-hdpi/w.png'"
						mode=""
					></image>
					<view>{{ portid.tran.noAlarmATemperatureValue }}℃</view>
				</view>
				<view class="center">
					<image
						:src="portid.isTrafficname.indexOf('B温度') != -1 ? 'http://psy119.cn/early/images/drawable-hdpi/w_red.png' : 'http://psy119.cn/early/images/drawable-hdpi/w.png'"
						mode=""
					></image>
					<view>{{ portid.tran.noAlarmBTemperatureValue }}℃</view>
				</view>
				<view class="center">
					<image
						:src="portid.isTrafficname.indexOf('C温度') != -1 ? 'http://psy119.cn/early/images/drawable-hdpi/w_red.png' : 'http://psy119.cn/early/images/drawable-hdpi/w.png'"
						mode=""
					></image>
					<view>{{ portid.tran.noAlarmCTemperatureValue }}℃</view>
				</view>
				<view class="center">
					<image
						:src="portid.isTrafficname.indexOf('N温度') != -1 ? 'http://psy119.cn/early/images/drawable-hdpi/w_red.png' : 'http://psy119.cn/early/images/drawable-hdpi/w.png'"
						mode=""
					></image>
					<view>{{ portid.tran.noAlarmNTemperatureValue }}℃</view>
				</view>
			</view>
		</view>

		<view class="tab" v-if="portid.tran != undefined || portid.tran != null">
			<u-table>
				<u-tr class="u-tr">
					<u-th class="u-th">设备箱</u-th>
					<u-th class="u-th">实时值</u-th>
					<u-th class="u-th">报警阀值</u-th>
				</u-tr>
				<u-tr class="u-tr">
					<u-td class="u-td">剩余电流</u-td>
					<u-td class="u-td">{{ portid.tran.leakageAlarmCurrentValue }}mA</u-td>
					<u-td class="u-td">{{ ReadParameterApiList.SYdianliu }}mA</u-td>
				</u-tr>
				<u-tr class="u-tr">
					<u-td class="u-td">A相电流</u-td>
					<u-td class="u-td">{{ portid.tran.noLeakageAlarmACurrentValue }}A</u-td>
					<u-td class="u-td">{{ ReadParameterApiList.ADianLiu }}A</u-td>
				</u-tr>
				<u-tr class="u-tr">
					<u-td class="u-td">B相电流</u-td>
					<u-td class="u-td">{{ portid.tran.noLeakageAlarmBCurrentValue }}A</u-td>
					<u-td class="u-td">{{ ReadParameterApiList.BDianLiu }}A</u-td>
				</u-tr>
				<u-tr class="u-tr">
					<u-td class="u-td">C相电流</u-td>
					<u-td class="u-td">{{ portid.tran.noLeakageAlarmCCurrentValue }}A</u-td>
					<u-td class="u-td">{{ ReadParameterApiList.CDianLiu }}A</u-td>
				</u-tr>
				<u-tr class="u-tr">
					<u-td class="u-td">A相电压</u-td>
					<u-td class="u-td">{{ portid.tran.noVoltageAlarmAValue }}V</u-td>
					<u-td class="u-td">{{ ReadParameterApiList.ADianYa }}V</u-td>
				</u-tr>
				<u-tr class="u-tr">
					<u-td class="u-td">B相电压</u-td>
					<u-td class="u-td">{{ portid.tran.noVoltageAlarmBValue }}V</u-td>
					<u-td class="u-td">{{ ReadParameterApiList.BDianYa }}V</u-td>
				</u-tr>
				<u-tr class="u-tr">
					<u-td class="u-td">C相电压</u-td>
					<u-td class="u-td">{{ portid.tran.noVoltageAlarmCValue }}V</u-td>
					<u-td class="u-td">{{ ReadParameterApiList.CDianYa }}V</u-td>
				</u-tr>
				<u-tr class="u-tr">
					<u-td class="u-td">A相温度</u-td>
					<u-td class="u-td">{{ portid.tran.noAlarmATemperatureValue }}℃</u-td>
					<u-td class="u-td">{{ ReadParameterApiList.AWenDu }}℃</u-td>
				</u-tr>
				<u-tr class="u-tr">
					<u-td class="u-td">B相温度</u-td>
					<u-td class="u-td">{{ portid.tran.noAlarmBTemperatureValue }}℃</u-td>
					<u-td class="u-td">{{ ReadParameterApiList.BWenDu }}℃</u-td>
				</u-tr>
				<u-tr class="u-tr">
					<u-td class="u-td">C相温度</u-td>
					<u-td class="u-td">{{ portid.tran.noAlarmCTemperatureValue }}℃</u-td>
					<u-td class="u-td">{{ ReadParameterApiList.CWenDu }}℃</u-td>
				</u-tr>
				<u-tr class="u-tr">
					<u-td class="u-td">N相温度</u-td>
					<u-td class="u-td">{{ portid.tran.noAlarmNTemperatureValue }}℃</u-td>
					<u-td class="u-td">{{ ReadParameterApiList.NWenDu }}℃</u-td>
				</u-tr>
			</u-table>
		</view>

		<view class="btn" v-if="portid.tran != undefined || portid.tran != null">
			<view class="flex">
				<u-button type="primary" @click="devType('1')">远程分闸</u-button>
				<u-button type="primary" @click="devType('2')">远程合闸</u-button>
				<u-button type="primary" @click="devType('3')">远程复位</u-button>
			</view>
			<view class="flex">
				<u-button type="primary" @click="devType('4')">开启蜂鸣器</u-button>
				<u-button type="primary" @click="devType('5')">关闭蜂鸣器</u-button>
				<u-button type="primary" @click="devType('6')">远程消音</u-button>
			</view>
			<u-button type="primary" @click="setting">阀值设置</u-button>
		</view>
		
		
		<view class="close" v-if="portid.elem == '2'">
			<u-button type="primary" @click="devState('1')">远程消音</u-button>
			<u-button type="primary" @click="devState('2')">远程复位</u-button>
		</view>
		<view class="close" v-if="portid.elem == '2'">
			<u-button type="primary" @click="devState('3')">正常模式</u-button>
			<u-button type="primary" @click="devState('4')">防误报模式</u-button>
		</view>
		<view class="btn"><u-button type="error" @click="relieve">解除报警</u-button></view>

		<u-popup v-model="relieveShow" mode="center" width="90%" height="200px" border-radius="14">
			<view class="relieve">
				<u-form :model="form" label-width="100px" label-position="top">
					<u-form-item label="解除报警备注:" prop="name"><u-input v-model="relieveInfo" :border="true" /></u-form-item>
				</u-form>
				<u-button @click="relieveSubmit" type="primary">提交</u-button>
			</view>
		</u-popup>
		<u-popup v-model="show" mode="center" width="90%" height="90%" :closeable="true">
			<view class="form">
				<u-form :model="form" ref="uForm" label-width="100px">
					<u-form-item label="剩余电流/mA" prop="shenyu"><u-input v-model="form.shenyu" :border="true" /></u-form-item>
					<u-form-item label="A相温度/℃" prop="Awendu"><u-input v-model="form.Awendu" :border="true" /></u-form-item>
					<u-form-item label="B相温度/℃" prop="Bwendu"><u-input v-model="form.Bwendu" :border="true" /></u-form-item>
					<u-form-item label="C相温度/℃" prop="Cwendu"><u-input v-model="form.Cwendu" :border="true" /></u-form-item>
					<u-form-item label="N相温度/℃" prop="Nwendu"><u-input v-model="form.Nwendu" :border="true" /></u-form-item>
					<u-form-item label="A相电流/A" prop="Adianliu"><u-input v-model="form.Adianliu" :border="true" /></u-form-item>
					<u-form-item label="B相电流/A" prop="Bdianliu"><u-input v-model="form.Bdianliu" :border="true" /></u-form-item>
					<u-form-item label="C相电流/A" prop="Cdianliu"><u-input v-model="form.Cdianliu" :border="true" /></u-form-item>
					<u-form-item label="A相电压/V" prop="Adianya"><u-input v-model="form.Adianya" :border="true" /></u-form-item>
					<u-form-item label="B相电压/V" prop="Bdianya"><u-input v-model="form.Bdianya" :border="true" /></u-form-item>
					<u-form-item label="C相电压/V" prop="Cdianya"><u-input v-model="form.Cdianya" :border="true" /></u-form-item>
				</u-form>
				<u-button @click="submit" type="primary">提交</u-button>
			</view>
		</u-popup>
		
	
		<u-toast ref="uToast" />
	</view>
</template>

<script>
import { check_devicereportid, ReadParameterApi, SetParameterApi, ElecData, putMessToDevice, WebeditFileimageServlet,closeVoice,setDepoly } from '@/api/api.js';
export default {
	data() {
		return {
			relieveInfo: '',
			relieveShow: false,
			action: 'http://edog-online.com/earlyWarn/editFileimageServlet.action',
			fileList: [
				// {
				// 	url: 'http://pics.sc.chinaz.com/files/pic/pic9/201912/hpic1886.jpg'
				// }
			],
			portid: {},
			pH: 0, //窗口高度
			navHeight: 0, //元素的所需高度
			ReadParameterApiList: {},
			show: false,
			form: {
				shenyu: '',
				Awendu: '',
				Bwendu: '',
				Cwendu: '',
				Nwendu: '',
				Adianliu: '',
				Bdianliu: '',
				Cdianliu: '',
				Adianya: '',
				Bdianya: '',
				Cdianya: ''
			},
			rules: {
				shenyu: [
					{
						required: true,
						message: '请输入剩余电流阀值',
						// 可以单个或者同时写两个触发验证方式
						trigger: ['change', 'blur']
					}
				],
				Awendu: [
					{
						required: true,
						message: '请输入A相温度阀值',
						trigger: 'blur'
					}
				],
				Bwendu: [
					{
						required: true,
						message: '请输入B相温度阀值',
						trigger: 'blur'
					}
				],
				Cwendu: [
					{
						required: true,
						message: '请输入C相温度阀值',
						trigger: 'change'
					}
				],
				Nwendu: [
					{
						required: true,
						message: '请输入N相温度阀值',
						trigger: 'change'
					}
				],
				Adianliu: [
					{
						required: true,
						message: '请输入A相电流阀值',
						trigger: 'change'
					}
				],
				Bdianliu: [
					{
						required: true,
						message: '请输入B相电流阀值',
						trigger: 'change'
					}
				],
				Cdianliu: [
					{
						required: true,
						message: '请输入C相电流阀值',
						trigger: 'change'
					}
				],
				Adianya: [
					{
						required: true,
						message: '请输入A相电压阀值',
						trigger: 'change'
					}
				],
				Bdianya: [
					{
						required: true,
						message: '请输入B相电压阀值',
						trigger: 'change'
					}
				],
				Cdianya: [
					{
						required: true,
						message: '请输入C相电压阀值',
						trigger: 'change'
					}
				]
			}
		};
	},
	methods: {
		devState(state) {
			switch (state) {
				case '1':
					closeVoice(uni.getStorageSync('userName'), this.portid.deviceid || this.portid.devicenoid, 1, '').then(res => {
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
					closeVoice(uni.getStorageSync('userName'), this.portid.deviceid || this.portid.devicenoid, 2, '').then(res => {
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
					setDepoly(uni.getStorageSync('userName'),1, this.portid.deviceid || this.portid.devicenoid).then(res=>{
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
					setDepoly(uni.getStorageSync('userName'),0,this.portid.deviceid || this.portid.devicenoid).then(res=>{
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
		devType(state) {
			switch (state) {
				case '1':
					putMessToDevice(uni.getStorageSync('userName'), this.portid.deviceid || this.portid.devicenoid, 'poweroff').then(res => {
						if (res.data.message == '请求成功') {
							this.$refs.uToast.show({
								title: res.data.message,
								type: 'success'
							});
						} else {
							this.$refs.uToast.show({
								title: res.data.message,
								type: 'error'
							});
						}
					});
					break;
				case '2':
					putMessToDevice(uni.getStorageSync('userName'), this.portid.deviceid || this.portid.devicenoid, 'poweron').then(res => {
						if (res.data.message == '请求成功') {
							this.$refs.uToast.show({
								title: res.data.message,
								type: 'success'
							});
						} else {
							this.$refs.uToast.show({
								title: res.data.message,
								type: 'error'
							});
						}
					});
					break;
				case '3':
					putMessToDevice(uni.getStorageSync('userName'), this.portid.deviceid || this.portid.devicenoid, 'reset').then(res => {
						if (res.data.message == '请求成功') {
							this.$refs.uToast.show({
								title: res.data.message,
								type: 'success'
							});
						} else {
							this.$refs.uToast.show({
								title: res.data.message,
								type: 'error'
							});
						}
					});
					break;
				case '4':
					putMessToDevice(uni.getStorageSync('userName'), this.portid.deviceid || this.portid.devicenoid, 'voiceon').then(res => {
						if (res.data.message == '请求成功') {
							this.$refs.uToast.show({
								title: res.data.message,
								type: 'success'
							});
						} else {
							this.$refs.uToast.show({
								title: res.data.message,
								type: 'error'
							});
						}
					});
					break;
				case '5':
					putMessToDevice(uni.getStorageSync('userName'), this.portid.deviceid || this.portid.devicenoid, 'voiceoff').then(res => {
						if (res.data.message == '请求成功') {
							this.$refs.uToast.show({
								title: res.data.message,
								type: 'success'
							});
						} else {
							this.$refs.uToast.show({
								title: res.data.message,
								type: 'error'
							});
						}
					});
					break;
				case '6':
					putMessToDevice(uni.getStorageSync('userName'), this.portid.deviceid || this.portid.devicenoid, 'mute').then(res => {
						if (res.data.message == '请求成功') {
							this.$refs.uToast.show({
								title: res.data.message,
								type: 'success'
							});
						} else {
							this.$refs.uToast.show({
								title: res.data.message,
								type: 'error'
							});
						}
					});
					break;
			}
		},
		setting() {
			let arr = this.ReadParameterApiList;
			this.show = true;
			this.form = {
				shenyu: arr.SYdianliu,
				Awendu: arr.AWenDu,
				Bwendu: arr.BWenDu,
				Cwendu: arr.CWenDu,
				Nwendu: arr.NWenDu,
				Adianliu: arr.ADianLiu,
				Bdianliu: arr.BDianLiu,
				Cdianliu: arr.CDianLiu,
				Adianya: arr.ADianYa,
				Bdianya: arr.BDianYa,
				Cdianya: arr.CDianYa
			};

			// this.form.shenyu = arr.SYdianliu
			// this.form.Awendu = arr.AWenDu
			// this.form.Bdianliu = arr.BDianLiu
		},
		submit() {
			this.$refs.uForm.validate(valid => {
				if (valid) {
					// console.log('验证通过', valid);
					SetParameterApi(
						this.portid.deviceid, //设备编号
						this.form.shenyu,
						this.form.Awendu,
						this.form.Bwendu,
						this.form.Cwendu,
						this.form.Nwendu,
						this.form.Adianliu,
						this.form.Bdianliu,
						this.form.Cdianliu,
						this.form.Adianya,
						this.form.Bdianya,
						this.form.Cdianya
					).then(res => {
						if (res.data.status == 1) {
							this.$refs.uToast.show({
								title: res.data.message,
								type: 'success'
							});
							this.ReadParameterApiFun();
							this.show = false;
							this.form = {};
						} else {
							this.$refs.uToast.show({
								title: res.data.message,
								type: 'error'
							});
						}
					});
				} else {
					console.log('验证失败');
				}
			});
		},
		check_devicereportidFun(id) {
			check_devicereportid(id, 1, uni.getStorageSync('userName')).then(res => {
				console.log(res.data, 'woshioDATA');
				this.portid = res.data.list[0];
				// this.infoList = res.data.list[0]
				this.ReadParameterApiFun(id);
			});
		},
		ReadParameterApiFun() {
			ReadParameterApi(this.portid.deviceid, this.portid.username).then(res => {
				this.ReadParameterApiList = res.data.row;
			});
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
						latitude: that.portid.long_lat.split(',')[0] * 1,
						longitude: that.portid.long_lat.split(',')[1] * 1,
						success: function() {
							console.log('success');
						}
					});
				}
			});
		},

		relieve() {
			this.relieveShow = true;
		},
		relieveSubmit() {
			let name = uni.getStorageSync('userName');
			WebeditFileimageServlet(`${name},${this.portid.id}`, this.relieveInfo).then(res => {
				if (res.data.list[0].status == true) {
					this.relieveShow = false;
					this.$refs.uToast.show({
						
						title: res.data.list[0].err_msg,
						type: 'success',
						
					});
					setTimeout(()=>{
						uni.reLaunch({
							url:'/pages/component/news'
						})
					},2000)
					
				}
			});
		}
	},
	onLoad(data) {
		
		
		this.check_devicereportidFun(data.id);
	},
	onReady() {
		this.$refs.uForm.setRules(this.rules);
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
<style>
page {
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
	.btn {
		margin-top: 20px;
		margin-bottom: 100px;
		// background-color: #fff;
		height: 100px;
		/deep/.u-btn {
			margin-top: 10px;
		}
		.flex {
			display: flex;
			justify-content: space-between;
			// flex-wrap:warp;
			width: 100%;
			/deep/.u-btn {
				width: calc(30vw);
			}
		}
	}

	.form {
		padding: 30px 35px 30px 10px;
		// margin-top: 20px;
	}
	.relieve {
		padding: 10px;
	}
	.close {
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
}
</style>
