<template>
	<view class="content-page">
		<view class="people">
			<view class="num" @click="toggleTab">
				<text class="label" >用餐人数</text>
				<!-- @focus="bindPickerChange" -->
				<input class="input" type="text" disabled v-model="peopleNum" placeholder="请填写用餐人数" />
			</view>
		</view>
		<view class="cart-list">
			<view class="cart-list-item" v-for="(item,index) in classifyData" :key="index">
				<view class="img">
					<image :src="item.icon" />
				</view>
				<view class="msg" >
					<view class="title">按格式牛皮</view>
					<view class="describe">好吃的冒泡</view>
					<view class="add-number">
						<text class="money">￥188.00</text>
						<view class="number">
							<uni-number-box :value="item.value" :min="0" :max="9" @change="bindChange($event,item)"></uni-number-box> <!--  @change="bindChange($event,item)"-->
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="fixed-bottom">
			<view class="num box">{{ nums }}</view>
			<view class="pay-count box">
				<text class="text">优惠：￥100.00</text>
				<text class="text">实付：￥188.00</text>
			</view>
			<view class="account box" @click="gotoCashierDesk">
				去结算
			</view>
		</view>
		<view style="height: 180upx;"></view>
		
		<mpvue-picker 
			ref="mpvuePicker"
			mode="selector"
			:pickerValueDefault="pickerValueDefault"
			@onConfirm="onConfirm"
			:pickerValueArray="selectList"
		>
		</mpvue-picker>
	</view>
</template>

<script>
	import classifyData from '@/common/classify.data.js';
	import uniNumberBox from '@/components/uni-number-box/uni-number-box.vue';
	import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue';
	export default {
		components:{
			uniNumberBox,
			mpvuePicker
		},
		data() {
			return {
				nums: this.$store.getters.cartNumber,
				peopleNum: '',
				pickerValueDefault: [1],
				selectList:[{
					label:'8人',
					value:1
				},{
					label:'9人',
					value:2
				},{
					label:'10人',
					value:3
				},{
					label:'11人',
					value:4
				}],
				classifyData:classifyData[0].foods,
			}
		},
		onLoad() {
			this.hehe()
			for(let i in this.classifyData){
				for(let j in this.classifyData[i]){
					this.classifyData[i].value = 0;
				}
			}
		},
		methods: {
			toggleTab(){
				this.$refs.mpvuePicker.show();
			},
			onConfirm(val){
				console.log(val);
				//如果页面需要调用多个mode类型，可以根据mode处理结果渲染到哪里;
				// switch(this.mode){
				// 	case "date":
				// 		break;
				// }
				this.peopleNum=val.label;
			},
			bindChange(value,e){
				this.nums = 0;
				e.value = value;
				for(let i in this.classifyData){
					this.nums += this.classifyData[i].value;
				}
				this.$store.commit('cartNumberChange',this.nums);
				if(this.$store.getters.cartNumber == 0){
					uni.removeTabBarBadge({
						index: 1
					})
				}else{					
					uni.setTabBarBadge({
						index: 1,
						text: ''+this.$store.getters.cartNumber+''
					});
				}
				console.log(e,this.$store.getters.cartNumber)
			},
			gotoCashierDesk(){
				console.log('123456789')
				uni.navigateTo({
					url: 'cashier-desk?people='+this.peopleNum
				})
			}
		}
	}
</script>

<style lang="scss" >
	.content-page {
		height: 100%;
		background: $uni-bg-color-grey;
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
		.fixed-bottom{
			display: flex;
			text-align: center;
			align-items: stretch;
			position: fixed;
			bottom: var(--window-bottom);
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
	}
</style>
