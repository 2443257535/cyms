<template>
	<view class="pay-success-page content-page">
		<view class="success money">操作成功</view>
		<view class="btns">
			<view class="box">
				<button class="btn" @click="gotoDetail">查看详情</button>
			</view>
			<view class="box">
				<button class="btn" @click="gotoCart">继续点餐</button>
			</view>
		</view>
		<view class="image-text">
			<image class="image" src="http://img.kiwifruits.cn/classify/1/1.jpg"></image>
			<text class="text">图文广告列表</text>
		</view>
	</view>
</template>

<script>
	export default{
		methods:{
			gotoDetail(){
				uni.switchTab({
					url: '../my/my'
				})
			},
			gotoCart(){
				console.log('2')
				uni.switchTab({
					url: 'cart'
				})
				
			}
		}
	}
</script>

<style lang="scss">
	.success{
		line-height: 250upx;
		text-align: center;
		font-size: $uni-font-size-title;
	}
	.btns{
		padding: $pd-all;
		display: flex;
		.box{
			background: #fff;
			padding: $pd-all;
			flex: 1;
			.btn{
				background: $linear-gradient;
				color: $linear-color;
			}
		}
	}
	.image-text{
		padding: $pd-all;
		text-align: center;
		position: relative;
		.image{
			width: 100%;
		}
		.text{
			position: absolute;
			top: 50%;
			left: 50%;
			margin-left: -45px;
			margin-top: -10px;
			
		}
	}
</style>
