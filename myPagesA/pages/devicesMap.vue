<template>
	<view>
		<view class="page-body">
			<view class="page-section page-section-gap"><map style="width: 100%; height: 300px;" :latitude="latitude" :longitude="longitude" :markers="covers"></map></view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			id: 0, // 使用 marker点击事件 需要填写id
			title: 'map',
			latitude: 39.909,
			longitude: 116.39742,
			covers: [
				{
					latitude: 39.909,
					longitude: 116.39742,
					iconPath: 'http://psy119.cn/early/images/drawable-hdpi/icon_map_address_red.png'
				},
				{
					latitude: 39.9,
					longitude: 116.39,
					iconPath: 'http://psy119.cn/early/images/drawable-hdpi/icon_map_address_red.png'
				}
			]
		};
	},
	onLoad(option) {
		console.log(option);
	}
};
</script>

<style></style>
