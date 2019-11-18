<template>
	<view class="cashier-desk-page content-page">
		<view class="people">
			<view class="num">
				<text class="label">用餐人数</text>
				<input class="input" type="text" disabled v-model="peopleNum" placeholder="请填写用餐人数" @focus="bindPickerChange" @click="toggleTab">
			</view>
		</view>
		<view class="select-menu">
			<view class="box row" v-for="(iten,index) in 8" :key="index">
				<text class="title">辣椒炒肉</text>
				<text class="num">48*00*1</text>
			</view>
			<view class="box subtotal">
				<text class="describe">以优惠￥44.00</text>
				<text class="money">￥188</text>
			</view>
		</view>
		<view class="message">
			<view class="box row">
				<text class="label">备注</text>
				<input class="input" type="text" placeholder="口味/偏好等要求">
			</view>
			<view class="box row">
				<text class="label">发票信息</text>
				<input class="input" type="text" placeholder="填写发票信息">
			</view>
		</view>
		<view class="payment">
			<view class="box row">
				<text>支付方式</text>
			</view>
			<radio-group @change="radioChange">
				<label class="box row" v-for="(item, index) in items" :key="item.value">
					<view>{{item.name}}</view>
					<view class="radio">
						<radio :value="item.value" :checked="index === current" />
					</view>
				</label>
			</radio-group>
		</view>
		<view class="fixed-bottom">
			<view class="num box">{{ nums }}</view>
			<view class="pay-count box">
				<text class="text">优惠：￥100.00</text>
				<text class="text">实付：￥188.00</text>
			</view>
			<view class="account box" @click="gotoPaySuccess">付款</view>
		</view>
		<view style="height: 90upx;"></view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				peopleNum:'',
				current: 0,
				nums: this.$store.getters.cartNumber,
				items:[
					{
						value: 'weixin',
						name: '微信'
					}, {
						value: 'zhifubao',
						name: '储值卡(可用余额：￥100.00)'
					}
				]
			}
		},
		onLoad(data) {
			this.peopleNum = data.people;
		},
		methods:{
			radioChange: function(evt) {
				console.log(evt)
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.target.value) {
						this.current = i;
						break;
					}
				}
			},
			gotoPaySuccess(){
				uni.navigateTo({
					url: 'pay-success'
				})
			}
		}
	}
</script>

<style lang="scss">
	.people{
		padding: $pd-top 0;
		.num{
			padding: $pd-all;
			background: #fff;
			display: flex;
			align-items: center;
			.label{
				width: $label-width;
			}
			.input{
				flex: 2;
			}
		}
	}
	.select-menu{
		padding: $pd-all;
		background: #fff;
		.box{
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: $rows;
			border-bottom: 1px solid $uni-border-color;
			&:last-child{
				border-bottom: none;
			}
			.title{
				flex: 2;
			}
			
		}
		.subtotal{
			display: flex;
			justify-content: flex-end;
			.describe{
				color: $uni-text-color-grey;
				margin-right: $mr-right;
			}
			
		}
	}
	.message{
		margin-top: $mr-top;
		padding: $pd-all;
		background: #fff;
		.box{
			display: flex;
			align-items: center;
			border-bottom: 1px solid $uni-border-color;
			.input{
				flex: 2;
			}
			&:last-child{
				border-bottom: none;
			}
		}
	}
	.payment{
		margin-top: $mr-top;
		padding: $pd-all;
		background: #fff;
		.box{
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1px solid $uni-border-color;
			.radio{
				text-align: right;
				flex: 1;
			}
			&:last-child{
				border-bottom: none;
			}
		}
	}
	.fixed-bottom{
		display: flex;
		text-align: center;
		align-items: stretch;
		position: fixed;
		bottom: 0;
		width: 100%;
		background-color: #fff;
		height: $fixed-bottom;
		line-height: $fixed-bottom;
		.box{
			flex: 1;
		}
		.pay-count{
			flex: 3;
			color: $money;
			.text{
				margin-right: $mr-right;
			}
		}
		.account{
			flex: 1;
			background: $linear-gradient;
			color: $linear-color;
		}
	}
</style>
