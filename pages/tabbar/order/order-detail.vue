<template>
	<view class="order-detail-page content-page">
		<view class="header">
			<view class="pd-left">
				<view class="box row">
					<text class="label">台号：</text>
					<input class="input" type="text" disabled placeholder="5A台">
				</view>
				<view class="box row">
					<text class="label">用餐人数：</text>
					<input class="input" type="text" disabled placeholder="8人">
				</view>
			</view>
		</view>
		<view class="mains">
			<view class="cart-list">
				<view class="cart-list-item" v-for="(item,index) in 5" :key="index">
					<view class="img">
						<image src="http://img.kiwifruits.cn/classify/1/1.jpg" />
					</view>
					<view class="msg" >
						<view class="title">按格式牛皮</view>
						<view class="describe">好吃的冒泡</view>
						<view class="add-number">
							<text class="money">￥188.00</text>
						</view>
					</view>
				</view>
			</view>
			<view class="coupon">
				<view class="box row">
					<text class="label">优惠券</text>
					<text class="">-10</text>
				</view>
				<view class="box row">
					<text class="label">优惠券</text>
					<text class="money">￥688.00</text>
				</view>
			</view>
		</view>
		<view class="order-msg">
			<view class="box row">
				<text class="label">订单编号</text>
				<input class="input" type="text" placeholder="12839812381932">
			</view>
			<view class="box row">
				<text class="label">支付时间</text>
				<input class="input" type="text" placeholder="2019-09-01 12:52">
			</view>
			<view class="box row">
				<text class="label">订单备注</text>
				<input class="input" type="text" placeholder="加辣">
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			base: ''
		}
	}
</script>

<style lang="scss">
	.header{
		padding-top: $pd-top;
		.pd-left{
			padding: 0 $pd-left;
			background: #fff;
			.box{
				display: flex;
				align-items: center;
				border-bottom: 1px solid $uni-border-color;
				&:last-child{
					border-bottom: 0;
				}
			}
			.input{
				flex: 2;
			}
		}
	}
	.mains{
		margin-top: $mr-top;
		.cart-list{
			.cart-list-item {
				/* height: 220upx; */
				/* float: left; */
				/* text-align: center; */
				padding: $pd-all;
				font-size: $uni-font-size-sm;
				background: #fff;
				display: flex;
			}
			.msg{
				display: flex;
				flex-direction: column;
				position: relative;
				flex:2;
				margin-left: $mr-left;
				.title{
					font-size: $uni-font-size-base;
				}
				.describe{
					font-size: $uni-font-size-sm;
					color: $uni-color-paragraph;
				}
				.add-number{
					display: flex;
					vertacil-align: bottom;
					justify-content: space-between;
					align-items: flex-end;
					position: absolute;
					bottom: 0;
					width: 100%;
					.money{
						color: $money;
					}
					.number{
						margin-right: 1px;
					}
				}
			}
			.cart-list-item image {
				width: 135upx;
				height: 135upx;
			}
			.cart-list-item .img{
				width: 135upx;
				height: 135upx;
			}
		}
		.coupon{
			padding: $pd-all;
			margin-bottom: $mr-top;
			background: #fff;
			.box{
				border-bottom: 1px solid $uni-border-color;
				display: flex;
				align-items: center;
				justify-content: space-between;
				&:last-child{
					border-bottom: 0;
				}
			}
		}
	}
	.order-msg{
		margin-top: $mr-top;
		padding: $pd-all;
		background: #fff;
		.box{
			border-bottom: 1px solid $uni-border-color;
			display: flex;
			align-items: center;
			justify-content: space-between;
			&:last-child{
				border-bottom: 0;
			}
			.input{
				flex: 2;
			}
		}
	}
</style>
