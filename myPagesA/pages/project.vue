<template>
	<view class="inspection">
		<view class="subsection"><u-subsection :list="list" @change="currentChange" :current="current" mode="subsection" active-color="#cc300d" height="100"></u-subsection></view>
		<view v-if="!ProjectStatus">
			<u-row gutter="16">
				<u-col span="4"><u-button type="success" @click="addProject">新增</u-button></u-col>
				<u-col span="4"><u-button type="error" @click="Project('delete')">删除</u-button></u-col>
				<u-col span="3"><u-button type="success" @click="Project('share')">分享</u-button></u-col>
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
		<view class="search"><u-search placeholder="请输入项目名称或地址" v-model="keyword" @custom="searchChange"></u-search></view>
		<view class="text">共有{{ ProjectList.total || 0 }}条项目(已加载{{ ProjectList.mess.length || 0 }})</view>
		<scroll-view class="content" :style="{ height: navHeight + 'px' }" scroll-y="true" v-if="!ProjectStatus" @scrolltolower="scrolltolower">
			<u-loading :show="loadStaus" color="red"></u-loading>
			<view class="box" @click="projectDetails(item.pid)" v-for="(item, index2) in ProjectList.mess" :key="index2">
				<!-- <u-checkbox-group @change="checkboxGroupChange">
					<u-checkbox @change="checkboxChange" v-model="item.checked" :name="item.name"> -->
				<u-row gutter="16">
					<u-col span="3"><image src="../../static/communication.png" mode=""></image></u-col>
					<u-col span="8">
						<ul>
							<li>
								项目名称:
								<text>{{ item.name }}</text>
							</li>
							<li>
								项目位置:
								<text>{{ item.location }}</text>
							</li>
							<li>
								项目设备数量:
								<text>{{ item.num }}</text>
							</li>
						</ul>
					</u-col>
				</u-row>
				<!-- </u-checkbox>
				</u-checkbox-group> -->
			</view>
			<!-- <u-loadmore :status="status" loadmore='loadmore'/> -->
		</scroll-view>

		<!-- 删除项目 -->

		<scroll-view class="content" :style="{ height: navHeight + 'px' }" scroll-y="true" v-else @scrolltolower="scrolltolower">
			<view class="deleteProject">
				<u-checkbox-group @change="checkboxGroupChange" wrap="true" size="50" icon-size="30" width="500rpx">
					<u-checkbox @change="checkboxChange" v-model="item.checked" :name="item.pid" v-for="(item, index) in ProjectListMess2" :key="index">
						<view class="box">
							<u-row gutter="16">
								<u-col span="2"><image src="../../static/communication.png" mode=""></image></u-col>
								<u-col span="9">
									<ul>
										<li>
											项目名称:
											<text>{{ item.name }}</text>
										</li>
										<li>
											项目位置:
											<text>{{ item.location }}</text>
										</li>
										<li>
											项目设备数量:
											<text>{{ item.num }}</text>
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
		<u-modal v-model="show" :content="content" @confirm="ProjectTrue"></u-modal>
		<u-toast ref="uToast" />
		<u-modal v-model="showShare" :content="content" @confirm="shareTrue" title="请输入分享的账号"><u-input :border="true" v-model="shaerNumber" /></u-modal>
	</view>
</template>

<script>
import { AppProjectList, getDeviceByPid, deleProject, addRegisterProject } from '@/api/api.js';
export default {
	data() {
		return {
			status: 'loadmore',
			list: [
				{
					name: '自建项目'
				},
				{
					name: '代管项目'
				}
			],
			show: false,
			showShare: false,
			loadStaus: true,
			checked: [],
			keyword: '',
			current: 0,
			pH: 0, //窗口高度
			navHeight: 0, //元素的所需高度
			ProjectStatus: false,
			status: '',
			ProjectList: [],
			ProjectListMess2: [],
			pages: 10,
			content: '',
			shaerNumber: ''
		};
	},

	mounted() {
		this.AppProjectListFun();
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
		ProjectTrue() {
			this.AppProjectListFun();
			this.ProjectStatus = false;
		},
		shareTrue() {
			addRegisterProject(this.shaerNumber, this.checkBoxChange, uni.getStorageSync('userName')).then(res => {
				this.content = res.data.list[0].mess;

				if (res.data.list[0].status =="true") {
					this.$refs.uToast.show({
						title: res.data.list[0].mess,
						type: 'success',
						url: '/pages/user/index'
					});
				}
			});
			this.ProjectStatus = false;
		},
		currentChange(e) {
			console.log(e, 'dsa');
			this.current = e;
			this.AppProjectListFun();
		},
		scrolltolower() {
			console.log(123123123);
			this.pages += 10;
			this.AppProjectListFun();
		},
		AppProjectListFun() {
			AppProjectList(uni.getStorageSync('userName'), '', 1, this.keyword, this.pages, this.current, uni.getStorageSync('userName')).then(res => {
				this.ProjectList = res.data.list[0];
				this.loadStaus = false;
				this.ProjectListMess2 = res.data.list[0].mess;
				this.ProjectListMess2.map((item, index) => {
					item.checked = false;
				});
			});
		},
		addProject() {
			uni.navigateTo({
				url: '/myPagesA/pages/addProject'
			});
		},

		//删除确定，确定分享共同按钮
		deleteProjectOn() {
			//删除项目

			if (this.status == 'delete') {
				this.show = true;
				deleProject(uni.getStorageSync('userName'), this.checkBoxChange).then(res => {
					this.content = res.data.list[0].mess;
				});
			} else {
				this.showShare = true;
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
			console.log(e, 'ddddd');
			// let flag = this.ProjectListMess2.includes(e.name)
			// console.log(flag,1231321)
			//    if(flag){
			//     this.ProjectListMess2.forEach((v,i)=>{
			//      if(v.pid == e.name){
			//       this.ProjectListMess2.splice(i,1)
			//      }
			//     })
			//    }
			this.$forceUpdate();
		},
		// 选中任一checkbox时，由checkbox-group触发
		checkboxGroupChange(e) {
			console.log(e, 'sss');
			this.checkBoxChange = e.toString();
			this.$forceUpdate();
		},

		searchChange(e) {
			this.AppProjectListFun();
		},
		//项目详情
		projectDetails(pid) {
			uni.navigateTo({
				url: `/myPagesA/pages/projectDetails?pid=${pid}`
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.inspection {
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
		text-align: center;
		background-color: #f5f5f1;
		// border-radius: 10px;
		// width: 95%;
		padding-top: 10px;
		.box {
			width: 100%;
			padding: 5px 0 10px 0;
			// height: 105px;
			background-color: #fff;
			border-radius: 20px;
			margin-bottom: 10px;
			// position: relative;
			image {
				width: 100px;
				height: 70px;
				// position: absolute;
				// top: 50%;
				margin-top: 15px;
			}
			ul {
				li {
					margin-top: 10px;
					text {
						color: #0000ff;
						// font-weight: bold;
					}
				}
			}
		}
		.deleteProject {
			text-align: center;
			.box {
				width: 145%;
				padding: 5px 0 10px 0;
				background-color: #fff;
				border-radius: 20px;
				margin-bottom: 10px;
				// position: relative;
				image {
					width: 100px;
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
