<template>
	<view class="inspection">
		<!-- <view class="subsection"><u-subsection :list="list" :current="1" mode="subsection" active-color="#cc300d" height="100"></u-subsection></view> -->
		<view v-if="!ProjectStatus">
			<u-row gutter="16">
				<u-col span="5"><u-button type="success" @click="addProject">新增</u-button></u-col>
				<u-col span="5"><u-button type="error" @click="Project('delete')">删除</u-button></u-col>
				<!-- <u-col span="3"><u-button type="success" @click="Project('share')">分享</u-button></u-col> -->
			</u-row>
		</view>
		<view v-else>
			<u-row gutter="16">
				<u-col span="4">
					<u-button type="error" @click="deleteProjectOn">确定{{ status == 'delete' ? '删除' : '分享' }}</u-button>
				</u-col>
				<u-col span="4">
					<u-button type="success" @click="deleteProjectOff">取消{{ status == 'delete' ? '删除' : '分享' }}</u-button>
				</u-col>
			</u-row>
		</view>
		<view class="search"><u-search placeholder="请输入设备ID或地址" v-model="keyword" @custom="searchChange"></u-search></view>
		<!-- <view class="text">共有X条记录</view> -->
		<scroll-view class="content" :style="{ height: navHeight + 'px' }" scroll-y="true" v-if="!ProjectStatus">
			<view class="box" @click="projectDetails(item.devId, item.productNumber)" v-for="(item, index2) in deviceByPidList" :key="index2">
				<!-- <u-checkbox-group @change="checkboxGroupChange">
					<u-checkbox @change="checkboxChange" v-model="item.checked" :name="item.name"> -->
				<u-row gutter="16">
					<u-col span="3" text-align="center">
						<image
							:src="
								item.type == '2'
									? '../../static/yangantanceqi.png'
									: item.type == '3'
									? '../../static/a-guihuatubiaoyuanwenjianFarlim_huaban1fuben11.png'
									: item.type == '4'
									? '../../static/shuiya.png'
									: item.type == '5'
									? '../../static/wulitu_zhuji.png'
									: item.type == '6'
									? '../../static/ranqi.png'
									: item.type == '7'
									? '../../static/fenchen.png'
									: item.type == '9'
									? '../../static/shipin.png'
									: item.type == '10'
									? '../../static/menci.png'
									: item.type == '11'
									? '../../static/ranqi.png'
									: item.type == '12'
									? '../../static/dianqihuozai.png'
									: item.type == '15'
									? '../../static/shengguangbaojingqi.png'
									: item.type == '16'
									? '../../static/shoudong.png'
									: item.type == '18'
									? '../../static/shuijinbaojing.png'
									: item.type == '19'
									? '../../static/shebeibaojing.png'
									: item.type == '21'
									? '../../static/miehuoqi.png'
									: item.type == '22'
									? '../../static/chongheza.png'
									: item.type == '23'
									? '../../static/duanluqi'
									: ite.type == '0'
									? '../../static/yunwangguan.png'
									: '../../static/nfc_dev.png'
							"
						></image>
					</u-col>
					<u-col span="8">
						<ul>
							<li>设备ID:{{ item.productNumber }}</li>
							<li>设备位置:{{ item.installLocation }}</li>
							<li>
								设备状态:
								<text :style="{ color: item.errtype == '0' ? 'red' : item.errtype == '0' ? 'yellow' : 'green' }">
									{{ item.errtype == '0' ? '报警' : errtype == '1' ? '故障' : '正常' }}
								</text>
							</li>
						</ul>
					</u-col>
				</u-row>
				<!-- </u-checkbox>
				</u-checkbox-group> -->
			</view>
		</scroll-view>

		<scroll-view v-else class="content" :style="{ height: navHeight + 'px' }" scroll-y="true">
			<!-- 删除项目 -->
			<view class="deleteProject">
				<u-checkbox-group @change="checkboxGroupChange" wrap="true" size="50" icon-size="30" width="500rpx">
					<u-checkbox @change="checkboxChange" v-model="item.checked" v-for="(item, index) in deviceByPidList" :key="index" :name="item.devId">
						<view class="box">
							<u-row gutter="16">
								<u-col span="3" text-align="center">
									<image
										:src="
											item.type == '2'
												? '../../static/yangantanceqi.png'
												: item.type == '3'
												? '../../static/a-guihuatubiaoyuanwenjianFarlim_huaban1fuben11.png'
												: item.type == '4'
												? '../../static/shuiya.png'
												: item.type == '5'
												? '../../static/wulitu_zhuji.png'
												: item.type == '6'
												? '../../static/ranqi.png'
												: item.type == '7'
												? '../../static/fenchen.png'
												: item.type == '9'
												? '../../static/shipin.png'
												: item.type == '10'
												? '../../static/menci.png'
												: item.type == '11'
												? '../../static/ranqi.png'
												: item.type == '12'
												? '../../static/dianqihuozai.png'
												: item.type == '15'
												? '../../static/shengguangbaojingqi.png'
												: item.type == '16'
												? '../../static/shoudong.png'
												: item.type == '18'
												? '../../static/shuijinbaojing.png'
												: item.type == '19'
												? '../../static/shebeibaojing.png'
												: item.type == '21'
												? '../../static/miehuoqi.png'
												: item.type == '22'
												? '../../static/chongheza.png'
												: item.type == '23'
												? '../../static/duanluqi'
												: ite.type == '0'
												? '../../static/yunwangguan.png'
												: '../../static/nfc_dev.png'
										"
									></image>
								</u-col>
								<u-col span="8">
									<ul>
										<li>设备ID:{{ item.productNumber }}</li>
										<li>设备位置:{{ item.installLocation }}</li>
										<li>
											设备状态:
											<text :style="{ color: item.errtype == '0' ? 'red' : item.errtype == '0' ? 'yellow' : 'green' }">
												{{ item.errtype == '0' ? '报警' : errtype == '1' ? '故障' : '正常' }}
											</text>
										</li>
									</ul>
								</u-col>
							</u-row>
						</view>
					</u-checkbox>
				</u-checkbox-group>
			</view>
		</scroll-view>
		<!-- <view class="empty">
			<u-empty text="暂无历史数据" iconSize="300"></u-empty>
		</view> -->

		<u-modal v-model="show" :content="content" @confirm="deleteTrue"></u-modal>
	</view>
</template>

<script>
import { getDeviceByPid, deleDevice } from '@/api/api.js';
export default {
	data() {
		return {
			list: [
				{
					name: '自建项目'
				},
				{
					name: '代管项目'
				}
			],
			content: '',
			show: false,
			keyword: '',
			current: 1,
			pH: 0, //窗口高度
			navHeight: 0, //元素的所需高度
			ProjectStatus: false,
			status: '',
			deviceByPidList: [],
			deviceByPidListCopy: []
		};
	},
	onLoad(data) {
		this.getDeviceByPidFun(uni.getStorageSync('userName'), data.pid);
		this.pid = data.pid;
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
	},
	methods: {
		deleteTrue() {
			if (this.content == '设备删除成功！') {
				this.getDeviceByPidFun(uni.getStorageSync('userName'), this.pid);
			}
		},
		addProject() {
			uni.navigateTo({
				url: `/myPagesA/pages/addDevices?pid=${this.pid}`
			});
		},
		getDeviceByPidFun(user, pid) {
			getDeviceByPid(user, pid, user).then(res => {
				console.log(res, 'woshires');
				this.deviceByPidList = res.data.list[0].mess;
				this.deviceByPidListCopy = res.data.list[0].mess;
				this.deviceByPidList.map((item, index) => {
					item.checked = false;
				});
			});
		},

		//删除确定
		deleteProjectOn() {
			//确定删除
			if (this.status == 'delete') {
				this.show = true;
				deleDevice(this.checkBoxValue, uni.getStorageSync('userName'), uni.getStorageSync('userName')).then(res => {
					this.content = res.data.list[0].mess;
					if (res.data.list[0].status == 'true') {
						this.ProjectStatus = false;
					}
				});
			}
		},
		//删除取消
		deleteProjectOff() {
			this.ProjectStatus = false;
		},
		//点击删除,//点击分享
		Project(status) {
			this.status = status;
			this.ProjectStatus = true;
		},
		// 选中某个复选框时，由checkbox时触发
		checkboxChange(e) {
			console.log(e);
			this.$forceUpdate();
		},
		// 选中任一checkbox时，由checkbox-group触发
		checkboxGroupChange(e) {
			console.log(e);
			this.checkBoxValue = e.toString();
			this.$forceUpdate();
		},

		searchChange(e) {
			console.log(e, 'woshieeeee');
			let c = {};
			// console.log(JSON.stringify(this.deviceByPidList),1231)
			// console.log(JSON.stringify(this.deviceByPidList).indexOf(e)!= -1,121111131)
			if (JSON.stringify(this.deviceByPidList).indexOf(e) != -1) {
				this.deviceByPidList.map((value, indiex) => {
					console.log(value.productNumber, 'sa');
					if (value.productNumber.indexOf(e) != -1 || value.installLocation.indexOf(e) != -1) {
						this.deviceByPidList = [value];
					}
				});
			}
			if (e == '') {
				this.deviceByPidList = this.deviceByPidListCopy;
			}
		},
		//项目详情
		projectDetails(devId, productNumber) {
			console.log(123123);
			uni.navigateTo({
				url: `/myPagesA/pages/devicesInfo?devId=${devId}&productNumber=${productNumber}`
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.inspection {
	// padding: 10px;
	margin-top: 10px;
	.subsection {
		border: 1px solid #cc300d;
		margin-bottom: 10px;
	}
	.text {
		text-align: center;
		// background-color: #eae9e8;
	}
	.search {
		margin-top: 10px;
	}

	.content {
		margin-top: 10px;
		background-color: #f5f5f1;
		// border-radius: 10px;
		// width: 95%;
		padding-top: 10px;
		.box {
			padding: 5px 0 15px 0;
			width: 100%;

			background-color: #fff;
			border-radius: 20px;
			margin-bottom: 10px;
			// position: relative;

			image {
				width: 70px;
				height: 70px;
				// position: absolute;
				// top: 50%;
				margin-top: 15px;
			}
			ul {
				li {
					margin-top: 10px;
				}
			}
		}
		.deleteProject {
			.box {
				width: 145%;
				padding: 5px 0 15px 0;
				background-color: #fff;
				border-radius: 20px;
				margin-bottom: 10px;
				// position: relative;
				image {
					width: 70px;
					height: 70px;
					// position: absolute;
					// top: 50%;
					margin-top: 15px;
				}
				ul {
					li {
						margin-top: 10px;
					}
				}
			}
		}
	}

	.empty {
		margin-top: 100px;
	}
}
</style>
