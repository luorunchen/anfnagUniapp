<template>
	<view class="addProject">
		<u-row gutter="16">
			<u-col span="5"><u-button type="primary" @click="addPerpo('0')">新增防火员</u-button></u-col>
			<u-col span="5"><u-button type="primary" @click="addPerpo('1')">新增责任人</u-button></u-col>
		</u-row>

		<u-form :model="form" ref="uForm" label-width="150">
			<u-form-item label="项目名称" prop="name"><u-input v-model="form.name" placeholder="请输入项目名称" /></u-form-item>
			<u-form-item label="项目地址" prop="address" right-icon="map-fill"><u-input @click="s" v-model="form.address" placeholder="点击输入框选择地址" /></u-form-item>
			<u-form-item label="防火员" prop="fireMan">
				<view slot="right"><u-icon size="50" name="search" color="#2979ff" @click="fireManSearch('fireMan')" /></view>
				<u-input v-model="form.fireMan" type="input" @focus="personLiableFocus('0')" placeholder="输入姓名或电话点击右侧搜索(电话输入4位)" />
				<u-select v-model="fireManShow" :list="fireManList" @confirm="fireManChange" :mask-close-able="false"></u-select>
				<!-- <u-button @click="show = true">打开</u-button> -->
			</u-form-item>
			<u-form-item label="责任人" prop="personLiable">
				<view slot="right"><u-icon size="50" name="search" color="#2979ff" @click="fireManSearch('person')" /></view>
				<u-input v-model="form.personLiable" type="input" @focus="personLiableFocus('1')" placeholder="输入姓名或电话点击右侧搜索(电话输入4位)" />
				<u-select v-model="personLiableShow" :list="personLiableList" @confirm="personLiableChange" :mask-close-able="false"></u-select>
			</u-form-item>
			<u-form-item label="所在街道" prop="street">
				<u-input @click="streetListShow = true" v-model="form.street" type="select" placeholder="请先选择项目地址" />
				<u-select v-model="streetListShow" :list="streetList" @confirm="streetChange" :mask-close-able="false"></u-select>
			</u-form-item>
			<u-form-item label="所在社区" prop="community">
				<u-input @click="communityListShow = true" v-model="form.community" type="select" placeholder="请先选择所在街道" />
				<u-select v-model="communityListShow" :list="communityList" @confirm="communityListChange" :mask-close-able="false"></u-select>
			</u-form-item>
			<u-form-item label="项目介绍" prop="intro"><u-input v-model="form.intro" /></u-form-item>
			<u-form-item label="应用场所" prop="applicationSite">
				<u-input @click="applicationSiteShow = true" v-model="form.applicationSite" type="select" />
				<u-select v-model="applicationSiteShow" :list="applicationSiteList" @confirm="applicationSiteChange" :mask-close-able="false"></u-select>
			</u-form-item>
			<u-form-item label="备注" prop="intro"><u-input v-model="form.intro" /></u-form-item>
		</u-form>
		<u-button @click="submit" type="primary">提交</u-button>
		<u-modal v-model="show" :content="content" @confirm="addProjpxectTrue"></u-modal>

		<u-popup v-model="popupShow" mode="center" border-radius="14" width="90%">
			<view class="popup">
				<u-form :model="form" ref="uForm" label-width="100">
					<u-form-item label="用户名" prop="user"><u-input v-model="form.user" /></u-form-item>
					<u-form-item label="手机号" prop="phone"><u-input v-model="form.phone" /></u-form-item>
					<u-form-item label="备注" prop="remake"><u-input v-model="form.remake" /></u-form-item>
				</u-form>
				<u-button @click="addTrue">提交</u-button>
			</view>
		</u-popup>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
var QQMapWX = require('@/pages/index/qqmap-wx-jssdk.js');
var qqmapsdk;
import { regionList, getLegalFireMan, addProject, addLegalFireMan } from '@/api/api.js';
export default {
	data() {
		return {
			show: false,
			popupShow: false,
			fireManShow: false,
			streetListShow: false,
			personLiableShow: false,
			communityListShow: false,
			applicationSiteShow: false,
			streetList: [],
			fireManList: [],
			personLiableList: [],
			communityList: [],
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
			],
			form: {
				name: '',
				user: '',
				phone: '',
				address: '',
				//防火员
				fireMan: '',
				fireManCode: '',
				//应用场所
				applicationSite: '',
				applicationSiteCode: '',
				//所在街道
				street: '',
				streetCode: '',
				// 责任人
				personLiable: '',
				personLiableCode: '',
				//所在社区
				community: '',
				communityCode: '',
				// 项目经纬度
				lanlat: ''
			},
			adcode: '',
			content: '',
			rules: {
				name: [
					{
						required: true,
						message: '请输入姓名',
						// 可以单个或者同时写两个触发验证方式
						trigger: ['change', 'blur']
					}
				],
				address: [
					{
						required: true,
						message: '请选择地址',
						// 可以单个或者同时写两个触发验证方式
						trigger: ['change', 'blur']
					}
				],
				fireMan: [
					{
						required: true,
						message: '请选择防火员',
						// 可以单个或者同时写两个触发验证方式
						trigger: 'change'
					}
				],
				personLiable: [
					{
						required: true,
						message: '请选择责任人',
						// 可以单个或者同时写两个触发验证方式
						trigger: 'change'
					}
				],
				street: [
					{
						required: true,
						message: '请选择所在街道',
						// 可以单个或者同时写两个触发验证方式
						trigger: ['change', 'blur']
					}
				],
				community: [
					{
						required: true,
						message: '请选择所在社区',
						// 可以单个或者同时写两个触发验证方式
						trigger: ['change', 'blur']
					}
				],
				applicationSite: [
					{
						required: true,
						message: '请选择应用场所',
						// 可以单个或者同时写两个触发验证方式
						trigger: ['change', 'blur']
					}
				],
				phone: [
					{
						min: 11,
						max: 11,
						pattern: /^\d{11,11}$/,
						message: '手机号不超过11位或小于',
						trigger: 'change'
					}
				],
				user: [
					{
						required: true,
						message: '请输入姓名',
						trigger: 'change'
					}
				]
				// fireMan: [
				// 	{
				// 		min: 5,
				// 		message: '简介不能少于5个字',
				// 		trigger: ['change', 'blur']
				// 	}
				// ]
			}
		};
	},
	methods: {
		addTrue() {
			let long_lat;
			let long_latbai;
			let ftelephone;
			addLegalFireMan(this.addPerpoState, this.form.user, uni.getStorageSync('userName'), this.form.phone, this.form.remake, long_lat, long_latbai, ftelephone).then(res => {
				if (res.data.list[0].status == 'true') {
					this.$refs.uToast.show({
						title: '添加成功',
						type: 'success'
					});
					this.popupShow = false;
				} else {
					this.$refs.uToast.show({
						title: res.data.list[0].mess,
						type: 'error'
					});
				}
			});
		},
		addPerpo(state) {
			this.popupShow = true;
			this.addPerpoState = state;
		},
		addProjectTrue() {
			if (this.content == '项目添加成功!') {
				uni.navigateTo({
					url: '/myPagesA/pages/project'
				})();
			}
		},
		fireManSearch(state) {
			let obj;
			if (state == 'fireMan' && this.form.fireMan != '') {
				this.fireManShow = true;
				obj = this.form.fireMan;
			} else if (state == 'person' && this.form.personLiable != '') {
				this.personLiableShow = true;
				obj = this.form.personLiable;
			}

			let arr = [];
			if (/^\d{4,11}$/.test(obj)) {
				this.options = this.arr.filter(item => {
					return item.user_name.toLowerCase().indexOf(obj.toLowerCase()) > -1 || item.phone.toLowerCase().indexOf(obj.toLowerCase()) > -1;
				});
			} else if (isNaN(obj)) {
				this.options = this.arr.filter(item => {
					return item.user_name.toLowerCase().indexOf(obj.toLowerCase()) > -1 || item.phone.toLowerCase().indexOf(obj.toLowerCase()) > -1;
				});
			}
			if (obj != '') {
				this.options.forEach(element => {
					arr.push({ value: element.pid, label: `${element.user_name}${element.phone}` });
				});
				if (state == 'fireMan') {
					this.fireManList = arr;
				} else {
					this.personLiableList = arr;
				}
			}
		},
		//责任人，防火人获取焦点
		personLiableFocus(state) {
			console.log(state);

			getLegalFireMan(state, '').then(res => {
				this.arr = JSON.parse(res.data.mess);
				// this.arr.map(element => {
				// 	String(element.pid);
				// });
				this.arr.forEach(element => {
					if (state == 0) {
						this.fireManList.push({ value: element.pid, label: `${element.user_name}${element.phone}` });
						this.fireManList = this.fireManList.slice(0, 30);
					} else {
						this.personLiableList.push({ value: element.pid, label: `${element.user_name}${element.phone}` });
						this.personLiableList = this.personLiableList.slice(0, 30);
					}
				});

				// this.fireManList = arr

				// console.log(this.fireManList);
				this.$forceUpdate();
			});
		},
		//应用场所
		applicationSiteChange(e, data) {
			console.log(e, data);
			this.form.applicationSite = e[0].label;
			this.form.applicationSiteCode = e[0].value;
		},
		//责任人
		personLiableChange(e, data) {
			console.log(e, data);
			this.form.personLiable = e[0].label;
			this.form.personLiableCode = e[0].value;
		},
		//所在社区
		communityListChange(e, data) {
			console.log(e, data);
			this.form.community = e[0].label;
			this.form.communityCode = e[0].value;
		},
		//所在街道
		streetChange(e, data) {
			console.log(e, data);
			this.form.street = e[0].label;
			this.form.streetCode = e[0].value;
			this.regionListFun(e[0].value.substring(0, 9), 2);
		},
		//防火员
		fireManChange(e, data) {
			console.log(e, data);
			this.form.fireMan = e[0].label;
			this.form.fireManCode = e[0].value;
		},
		regionListFun(code, status) {
			regionList(code).then(res => {
				console.log(res, 'woshiresresresre');

				res.data.mess.forEach((item, index) => {
					if (status == 1) {
						this.streetList.push({ value: item.ad_Code, label: item.ad_Region });
					} else {
						this.communityList.push({ value: item.ad_Code, label: item.ad_Region });
					}
				});
			});
		},
		s() {
			let that = this;
			// console.log(12123);
			uni.chooseLocation({
				success: function(res) {
					console.log('位置名称：' + res.name);
					console.log('详细地址：' + res.address);
					console.log('纬度：' + res.latitude);
					console.log('经度：' + res.longitude);
					console.log(res);
					that.form.address = res.address;
					that.form.lanlat = res.longitude + ',' + res.latitude;
					console.log(that.form.address, 22);

					// qqmapsdk.search({
					// 	keyword: res.address,
					// 	success: function(res) {
					// 		console.log(res);
					// 	},
					// 	fail: function(res) {
					// 		console.log(res);
					// 	},
					// 	complete: function(res) {
					// 		console.log(res);
					// 	}
					// });
					qqmapsdk.geocoder({
						address: res.address,

						success(res) {
							console.log(res, 222222221111);
							if (res.status == 0 && res.message == 'query ok') {
								// 	let city = res.result.address_component.city;
								that.adcode = res.result.ad_info.adcode;
								console.log(that.adcode);
								that.regionListFun(res.result.ad_info.adcode, 1);
							}
						}
					});
				}
			});
		},
		submit() {
			console.log(this.form, 'ssss');

			this.$refs.uForm.validate(valid => {
				if (valid) {
					this.show = true;

					addProject(
						uni.getStorageSync('userName'),
						this.form.name, //项目名称
						this.form.address, //项目地址
						this.form.fireManCode, //防火员
						this.form.personLiableCode, //责任人
						this.form.remak, //备注
						this.form.lanlat, //项目经纬度
						this.form.applicationSiteCode, //应用场所
						this.form.communityCode, //社区CODE
						'', //网格员
						'' //街道负责人
					).then(res => {
						console.log(res.data.list[0].status, 'ssqqq');
						this.content = res.data.list[0].mess;
					});
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
	onLoad() {
		qqmapsdk = new QQMapWX({
			key: 'N4PBZ-HR433-DBT3H-YGIXH-XR5ZQ-ULFKW'
		});
	}
};
</script>
<style lang="scss" scoped>
.addProject {
	padding: 10px;
	.popup {
		padding: 10px;
	}
}
</style>
