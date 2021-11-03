<template>
	<view class="details">
		<view class="info">
			<u-cell-group>
				<u-cell-item icon="file-text-fill" title="项目名称"  :value="appArr.name" :arrow="false"></u-cell-item>
				<u-cell-item icon="account-fill" title="项目负责人" :value="appArr.fname" :arrow="false"></u-cell-item>
				<u-cell-item icon="phone-fill" title="负责人手机" :value="appArr.fphone" :arrow="false"></u-cell-item>
				<u-cell-item icon="account-fill" title="项目防火员" :value="appArr.gridman" :arrow="false"></u-cell-item>
				<u-cell-item icon="phone-fill" title="防火员手机" :value="appArr.gridmanname" :arrow="false"></u-cell-item>
				<u-cell-item icon="map-fill" title="项目地址" :value="appArr.location" :arrow="false"></u-cell-item>
				<u-cell-item icon="map-fill" title="所在社区" :value="appArr.ad_Region" :arrow="false"></u-cell-item>
				<u-cell-item icon="home-fill" title="应用场所" :value="appArr.placetype||'无'" :arrow="false"></u-cell-item>
				<u-cell-item icon="chat-fill" title="项目备注" :value="appArr.remark||'无'" :arrow="false"></u-cell-item>
			</u-cell-group>
		</view>
		<view class="info">
			<u-cell-group><u-cell-item icon="setting-fill" title="管理设备"  :value-style="{color:'red'}"  :value="appArr.num" @click="devicesSet"></u-cell-item></u-cell-group>
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
	import {AppProject} from '@/api/api.js' 
export default {
	data(){
		return{
			appArr:{}
		}
	},
	methods: {
		devicesSet() {
		
			uni.navigateTo({
				url:`/myPagesA/pages/management?pid=${this.appArr.pid}`,
				
			})
		},
		AppProjectFun(pid,userName){
			AppProject(pid,userName).then(res=>{
				console.log(res,'wos')
				this.appArr = res.data.list[0].mess
			})
		},
		
	},
	onLoad(data) {
		console.log(data,68678)
		this.AppProjectFun(data.pid,uni.getStorageSync('userName'))
	}
};
</script>

<style scoped lang="scss">
.details {
	padding: 10px;
	background-color: #efefec;
	.info {
		margin-bottom: 10px;
	}
}
</style>
