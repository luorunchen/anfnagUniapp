<template>
	<view class="addProject">
		<view class="info">
			<u-form :model="form" ref="uForm" label-width="150">
				<u-form-item label="设备编号" prop="number"><u-input v-model="form.number" /></u-form-item>
				<u-form-item label="安装位置" prop="address" right-icon="map-fill"><u-input @click="s" v-model="form.address" /></u-form-item>
				<u-form-item label="设备类型" prop="type">
					<u-input @click="typeShow = true" v-model="form.type" type="select" />
					<u-select v-model="typeShow" :list="shebeiList" @confirm="typeConfirm"></u-select>
					<!-- <u-button @click="show = true">打开</u-button> -->
				</u-form-item>

				<u-form-item label="设备名称" prop="name"><u-input v-model="form.name" /></u-form-item>
				<u-form-item label="应用场所" prop="applicationSite">
					<u-input @click="applicationSiteShow = true" v-model="form.applicationSite" type="select" />
					<u-select v-model="applicationSiteShow" :list="applicationSiteList" @confirm="applicationSiteConfirm"></u-select>
				</u-form-item>
				<u-form-item label="短信推送" prop="push">
					<u-radio-group v-model="pushMessage" @change="pushChange">
						<u-radio v-for="(item, index) in list2" :key="index" :name="item.name" :disabled="item.disabled">{{ item.name }}</u-radio>
					</u-radio-group>
				</u-form-item>
				<u-form-item label="电话推送" prop="phone">
					<u-radio-group v-model="phone" @change="phoneChange">
						<u-radio v-for="(item, index) in list2" :key="index" :name="item.name" :disabled="item.disabled">{{ item.name }}</u-radio>
					</u-radio-group>
				</u-form-item>
				<u-form-item label="备注" prop="remake"><u-input v-model="form.remake" /></u-form-item>
			</u-form>
			<u-button @click="submit" type="primary">提交</u-button>
				<u-modal v-model="show" :content="content" @confirm="addDeviceTrue"></u-modal>
		</view>
	</view>
</template>

<script>
import { addDevice } from '@/api/api.js';
export default {
	data() {
		return {
			typeShow: false,
			applicationSiteShow: false,
show:false,
content:"",
			form: {
				name: '',
				remake: '',
				address: '',
				fireMan: '',
				number: '',
				type: '',
				typeCode: '',
				applicationSite: '',
				applicationSiteCode: '',
				phone: '',
				pushMessage: ''
			},
			shebeiList: [
				{
					label: '网关',
					value: '0'
				},
				{
					label: '烟感',
					value: '2'
				},
				{
					label: '电气',
					value: '3'
				},
				{
					label: '水压',
					value: '4'
				},
				{
					label: '消防主机',
					value: '5'
				},
				{
					label: '无线气感',
					value: '6'
				},
				{
					label: '粉尘设备',
					value: '7'
				},
				{
					label: '液位',
					value: '8'
				},
				{
					label: '录像',
					value: '9'
				},
				{
					label: '消防门磁',
					value: '10'
				},
				{
					label: '工业燃气',
					value: '11'
				},
				{
					label: '电气火灾探测器',
					value: '12'
				},
				{
					label: '声光报警器',
					value: '15'
				},
				{
					label: '手动报警',
					value: '16'
				},
				{
					label: '水浸报警',
					value: '18'
				},
				{
					label: '紧急报警',
					value: '19'
				},
				{
					label: '工业水压',
					value: '42'
				},
				{
					label: '工业液位',
					value: '43'
				}
			],
			rules: {
				number: [
					{
						required: true,
						message: '请输入设备编号',
						// 可以单个或者同时写两个触发验证方式
						trigger: 'change'
					}
				],

				address: [
					{
						required: true,
						message: '请选择安装地址',
						trigger: ['change', 'blur']
					}
				],
				type: [
					{
						required: true,
						message: '请选择设备类型',
						trigger: ['change', 'blur']
					}
				],
				name: [
					{
						required: true,
						message: '请输入设备名称',
						// 可以单个或者同时写两个触发验证方式
						trigger: ['change', 'blur']
					}
				],
				applicationSite: [
					{
						required: true,
						message: '请选择应用场所',
						trigger: ['change', 'blur']
					}
				]
				// phone: [
				// 	{
				// 		required: true,
				// 		message: '请选择短信推送',
				// 		trigger: ['change', 'blur']
				// 	}
				// ],
				// push: [
				// 	{
				// 		required: true,
				// 		message: '请选择短信推送',
				// 		trigger: ['change', 'blur']
				// 	}
				// ]
			},
			list2: [
				{
					name: '开启',
					disabled: false
				},
				{
					name: '关闭',
					disabled: false
				}
			],
			// u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
			value: 'orange',
			applicationSiteList: [
				{
					value: '客运站、火车站、地铁站、机场、码头',
					label: '客运站、火车站、地铁站、机场、码头'
				},
				{
					value: '公共供水单位',
					label: '公共供水单位'
				},
				{
					value: '瓶装燃气储配单位',
					label: '瓶装燃气储配单位'
				},
				{
					value: '瓶装燃气供应站',
					label: '瓶装燃气供应站'
				},
				{
					value: '寄递企业',
					label: '寄递企业'
				},
				{
					value: '物流企业',
					label: '物流企业'
				},
				{
					value: '加油站',
					label: '加油站'
				},
				{
					value: '宾馆、旅馆',
					label: '宾馆、旅馆'
				},
				{
					value: '民宿、农家乐',
					label: '民宿、农家乐'
				},
				{
					value: '商业综合体',
					label: '商业综合体'
				},
				{
					value: '出租房（企业员工集体宿舍）',
					label: '出租房（企业员工集体宿舍）'
				},
				{
					value: '学校、幼儿园',
					label: '学校、幼儿园'
				},
				{
					value: '网吧',
					label: '网吧'
				},
				{
					value: '娱乐场所',
					label: '娱乐场所'
				},
				{
					value: '工矿企业',
					label: '工矿企业'
				},
				{
					value: '劳动密集型企业',
					label: '劳动密集型企业'
				},
				{
					value: '建筑工地',
					label: '建筑工地'
				},
				{
					value: '高层建筑',
					label: '高层建筑'
				},
				{
					value: '住宅小区（老旧小区）、居民楼',
					label: '住宅小区（老旧小区）、居民楼'
				},
				{
					value: '教育培训机构',
					label: '教育培训机构'
				},
				{
					value: '医院、养老院',
					label: '医院、养老院'
				},
				{
					value: '商场、市场',
					label: '商场、市场'
				},
				{
					value: '食品生产加工小作坊',
					label: '食品生产加工小作坊'
				}
			]
		};
	},
	methods: {
		addDeviceTrue(){
			if (this.content == '设备添加成功!') {
				uni.navigateTo({
					url: '/myPagesA/pages/management?pid='+this.pid
				});
			}
		},
		typeConfirm(e, data) {
			console.log(e, data);
			this.form.type = e[0].label;
			this.form.typeCode = e[0].value;
		},
		applicationSiteConfirm(e, data) {
			console.log(e, data);
			this.form.applicationSite = e[0].label;
			this.form.applicationSiteCode = e[0].value;
		},
		phoneChange(e) {
			if (e != '关闭') {
				this.form.phone = 1;
			} else {
				this.form.phone = 0;
			}
		},
		pushChange(e) {
			// console.log(e, 111);
			if (e != '关闭') {
				this.form.pushMessage = 1;
			} else {
				this.form.pushMessage = 0;
			}
		},
		s() {
			let that = this;
			console.log(12123);
			uni.chooseLocation({
				success: function(res) {
					console.log('位置名称：' + res.name);
					console.log('详细地址：' + res.address);
					console.log('纬度：' + res.latitude);
					console.log('经度：' + res.longitude);
					that.form.address = res.address;
					that.form.lanlat = res.longitude + ',' + res.latitude;
					console.log(that.form.address, 22);
				}
			});
		},
		submit() {
			this.show=true
			let superiorEquipme = '';
			let loopNumber = '';
			let devId = '';
			let devRemark = '';
			addDevice(
				this.pid, //项目ID
				this.form.number, //设备编号
				uni.getStorageSync('userName'),
				this.form.address, //安装地址
				this.form.lanlat, //经纬度
				this.form.typeCode, //设备类型
				this.form.name, //设备名称
				this.form.applicationSiteCode, //应用场所
				superiorEquipme,
				loopNumber,
				devId,
				this.form.remake, //备注
				this.form.pushMessage, //短信推送
				this.form.phone //电话推送
			).then(res => {
				this.content = res.data.list[0].mess
			});

			this.$refs.uForm.validate(valid => {
				if (valid) {
					console.log('验证通过');
				} else {
					console.log('验证失败');
				}
			});
		}
	},
	// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
	onReady() {
		this.$refs.uForm.setRules(this.rules);
	},
	onLoad(data) {
		this.pid = data.pid;
	}
};
</script>
<style lang="scss" scoped>
.addProject {
	padding: 10px;
}
</style>
