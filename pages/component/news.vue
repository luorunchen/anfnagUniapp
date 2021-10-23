<template>
	
		<scroll-view class="news"  :style="{ height: navHeight + 'px' }" scroll-y="true" >
			<view class="box" v-for="(item,index) in addDecives" :key='index' @click="detailsInfo(item.id)">
				<view class="boxTime">{{item.creationtime}}</view>
				<view class="boxInfo">
					<u-row gutter="16">
						<u-col span="3" text-align="center" >
							<view class="wap"><image src="http://psy119.cn/early/images/drawable-hdpi/dianqi.png" mode=""></image></view>
						</u-col>
						<u-col span="8">
							<view>
								<ul>
									<li>{{item.isTrafficname}}</li>
									<li>安装地址:{{item.address}}</li>
									<li>项目名称:{{item.name}}</li>
								</ul>
							</view>
						</u-col>
					</u-row>
				</view>
			</view>
	
			
		</scroll-view>
	

</template>

<script>
	import{check_alldevice} from '@/api/api.js'
export default {
	data() {
		return {
			pH: 0, //窗口高度
			navHeight: 0 ,//元素的所需高度
			addDecives:[]
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

						that._data.navHeight = pH - data.top //计算高度：元素高度=窗口高度-元素距离顶部的距离（data.top）
						console.log(that._data, 66);
					})
					.exec();
				// 			console.log(that._data,999)
			}
		});
	},
	onLoad() {
		check_alldevice(uni.getStorageSync('userName'),uni.getStorageSync('userName')).then(res=>{
			this.addDecives=res.data.list.reverse().splice(0,50) 
		})
	},
	methods:{
		detailsInfo(id){
			
			uni.navigateTo({
				url:`/myPagesB/pages/electricalDetails?id=${id}`
			})
		}
	}
	
};
</script>

<style lang="scss" scoped>
.news {
	background-color: #efefec;
	// padding-top:1px;
	// padding-top: 1px;
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
			.wap{
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
