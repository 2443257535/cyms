<template>
	<view class="content content-page">
		<view class="tabs">
			<uni-segmented-control :current="current" :values="items" @clickItem="clickItem" style-type="text" active-color="#7D6040"></uni-segmented-control>
		</view>
		<view class="mains">
			<view v-if="current == 0">
				<view class="box" v-for="(item,index) in 5" :key="index" @click.stop="gotoOrderDetail">
					<view class="top">
						<text class="odd-numbers">单号：09231820312231231i3</text>
						<text class="status" v-if="index%2==0">待出餐</text>
						<text class="cancel" v-else>取消</text>
					</view>
					<view class="message">
						<view class="name text">
							<text calss="title">台号：501</text>
							<text>用餐人数：10人</text>
						</view>
						<view class="name">基围虾*1</view>
						<view class="name">小炒牛肉*1</view>
						<view class="name">米饭*2</view>
						<view class="sum name">
							<view>菜品数量:<text class="money">1</text>份</view>
							<view>优惠:<text class="money">188.00</text>元</view>
							<view>实付:<text class="money">344.00</text></view>
						</view>
					</view>
					<view class="btns">
						<button type="default" size="mini">再来一单</button>
						<button type="default" size="mini">订单删除</button>
					</view>
				</view>
			</view>
			<view v-if="current == 1">
				<view class="">
					2地个
				</view>
			</view>
			<view v-if="current == 2">
				<view class="">
					3地个
				</view>
			</view>
		</view>
	</view>
</template> 

<script>
	import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue';
export default {
	components:{
		uniSegmentedControl
	},
	data() {
		return {
			items: ['全部','待出餐','取消'],
			current: 0
		};
	},
	onLoad() {},
	onShow() {
		// setTimeout(() => {
		// }, 500);
	},
	onHide() {
	},
	methods: {
		clickItem(index){
			console.log(index)
			if(this.current !== index){
				this.current = index;
			}
		},
		gotoOrderDetail(){
			uni.navigateTo({
				url: 'order-detail'
			})
		}
	}
};
</script>

<style lang="scss" >
	.mains{
		padding: $pd-all;
		.box{
			margin-top: $mr-top;
			padding: $pd-all;
			background: #fff;
			display: flex;
			flex-direction: column;
			border-radius: $uni-border-radius-lg;
			box-shadow: $box-shadow;
			.top{
				display: flex;
				align-items: center;
				justify-content: space-between;
				color: $uni-color-warning;
				border-bottom: 1px solid $uni-border-color;
				height: 60upx;
				.cancel{
					color: $uni-text-color;
				}
			}
			.message{
				margin-top: $mr-top;
				.text{
					display: flex;
					justify-content: space-between;
					.title{
						font-weight: bold;
					}
				}
				.name{
					line-height: 60upx;
				}
				.sum{
					display: flex;
					flex-direction: row-reverse;
				}
			}
			.btns{
				text-align: right;
				button{
					margin-left: $mr-left;
				}
			}
		}
	}
</style>
