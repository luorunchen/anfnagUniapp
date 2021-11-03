<template>
	<view class="">
		<u-search placeholder="请输入安装地址或项目名称(关键词3位及以上)" v-model="keyword" @custom="search"></u-search>
		<view style="text-align: center;">共{{ total }}条，已加载({{ addDecives.length }})条</view>

		<scroll-view class="news" :style="{ height: navHeight + 'px' }" scroll-y="true" @scrolltolower="scrolltolower">
			<view style="margin-top: 100px;" v-if="loadingShow"><u-loading :show="loadingShow" size="100" color="red"></u-loading></view>

			<view class="box" v-for="(item, index) in addDecives" :key="index" @click="detailsInfo(item.id)">
				<view class="boxTime">{{ item.creationtime }}</view>
				<view class="boxInfo">
					<u-row gutter="16">
						<u-col span="3" text-align="center">
							<view class="wap">
								<image
									:src="
										item.type == '2'
											? '../../static/yangantanceqi.png'
											: item.type == '3'
											? '../../static/a-guihuatubiaoyuanwenjianFarlim_huaban1fuben11.png'
											: item.type == '4'
											?'../../static/shuiya.png'
											:item.type=='5'
											?'../../static/wulitu_zhuji.png'
											:item.type=='6'
											?'../../static/ranqi.png'
											:item.type=='7'
											?'../../static/fenchen.png'
											:item.type=='9'
											?'../../static/shipin.png'
											:item.type=='10'
											?'../../static/menci.png'
											:item.type=='11'
											?'../../static/ranqi.png'
											:item.type=='12'
											?'../../static/dianqihuozai.png'
											:item.type=='15'
											?'../../static/shengguangbaojingqi.png'
											:item.type=='16'
											?'../../static/shoudong.png'
											:item.type=='18'
											?'../../static/shuijinbaojing.png'
											:item.type=='19'
											?'../../static/shebeibaojing.png'
											: item.type=='21'
											?'../../static/miehuoqi.png'
											: item.type=='44'
											?'../../static/chongheza.png' 
											:item.type=='47'
											?'../../static/duanluqi'
											:ite.type=='0'
											?'../../static/yunwangguan.png'
											:'../../static/nfc_dev.png'
									"
									mode=""
								></image>
							</view>
						</u-col>
						<!-- <image src="../../static/yunwangguan.png" mode=""></image> -->
						<u-col span="8">
							<view>
								<ul>
									<li>{{ item.isTrafficname }}</li>
									<li>安装地址:{{ item.address }}</li>
									<li>项目名称:{{ item.name }}</li>
								</ul>
							</view>
						</u-col>
					</u-row>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import { check_alldevice } from '@/api/api.js';
export default {
	data() {
		return {
			pH: 0, //窗口高度
			navHeight: 0, //元素的所需高度
			addDecives: [],
			total: '',
			keyword: '',
			loadingShow: true
		};
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
				let titleH = uni.createSelectorQuery().select('.news'); //想要获取高度的元素名（class/id）

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
	},
	onLoad() {
		this.check_alldeviceFun();
	},
	methods: {
		check_alldeviceFun() {
			check_alldevice(uni.getStorageSync('userName'), uni.getStorageSync('userName')).then(res => {
				this.allArr = res.data.list.reverse();
				// console.log(res.data.list,'wosho',this.allArr)
				this.addDecives = this.allArr.splice(0, 50);
				this.total = res.data.list.length;
				this.loadingShow = false;
			});
		},
		search() {
			console.log(this.keyword.length, 7777);
			if (this.keyword.length >= 3) {
				this.addDecives = this.allArr.filter(item => {
					return item.address.toLowerCase().indexOf(this.keyword.toLowerCase()) > -1 || item.name.toLowerCase().indexOf(this.keyword.toLowerCase()) > -1;
				});
				this.total = this.addDecives.length;
			} else {
				this.loadingShow = true;
				this.addDecives = [];
				this.check_alldeviceFun();
			}
		},
		detailsInfo(id) {
			uni.navigateTo({
				url: `/myPagesB/pages/electricalDetails?id=${id}`
			});
		},
		scrolltolower() {
			if (this.keyword == '') {
				this.addDecives.push(...this.allArr.splice(50, 50));
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.news {
	background-color: #efefec;
	// padding-top:1px;
	// padding-top: 1px;
	text-align: center;
	padding-bottom: 30px;
	.box {
		// width: 100%;
		// postion:absolute;
		// position: absolute;
		// margin-top: 20px;
		.boxTime {
			width: 80%;
			background: #fff;
			text-align: center;
			margin: 0 auto;
			margin-top: 20px;

			font-size: 20px;
			color: #de9293;
		}
		.boxInfo {
			background-color: #fff;
			margin-top: 10px;
			padding-top: 10px;
			// position: relative;
			height: 130px;
			// position: relative;
			margin-bottom: 20px;
			.wap {
				// position: absolute;

				image {
					margin-top: 25px;
					width: 80px;
					height: 80px;
				}
			}

			ul {
				li {
					font-size: 20px;
					margin-bottom: 10px;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					&:nth-child(1) {
						font-size: 30px;
						font-weight: 900;
						color: red;
					}
				}
			}
		}
	}
}
</style>
