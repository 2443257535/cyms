<template>
	<view class="page-body content-page" :style="'height:'+height+'px'">
		<scroll-view class="nav-left" scroll-y :style="'height:'+height+'px'" :scroll-top="scrollLeftTop" scroll-with-animation>
			<view class="nav-left-item" @click="categoryClickMain(index)" :key="index" :class="index==categoryActive?'active':''"
				v-for="(item,index) in classifyData">
				{{item.name}}
			</view>
		</scroll-view>
		<scroll-view class="nav-right" scroll-y :scroll-top="scrollTop" @scroll="scroll" :style="'height:'+height+'px'" scroll-with-animation>
			<view v-for="(foods,index) in classifyData" :key="index" class="box">
				<view :id="i==0?'first':''" class="nav-right-item" v-for="(item,i) in foods.foods" :key="i">
					<view class="img">
						<image class="image" :src="item.icon"  @click.stop="cart(item.name)" />
					</view>
					<!-- <view>{{item.name}}</view> -->
					<view class="msg">
						<view class="title">{{ item.name }}</view>
						<view class="describe">{{ item.describe }}</view>
						<view class="add-number">
							<text class="money">￥{{ item.price }}</text>
							<view class="number">
								<uni-number-box :value="item.value" :min="0" :max="9" @change="bindChange($event,item)"></uni-number-box>
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<uni-popup ref="popup"  type="bottom" class="uni-popup-box">
			<view class="product-detail">
				<uni-swiper-dot :info="swiperList" :current="current" class="runbo">
					<swiper class="swiper-box" @change="changeSwiper">
						<swiper-item v-for="(item,index) in swiperList" :key="index">
							<image class="image" :src="item.url"></image>
						</swiper-item>
					</swiper>
				</uni-swiper-dot>
				<view class="dish dish-name">
					<view class="title">辣椒炒肉</view>
					<view class="box">
						<text class="label">做法</text>
						<view class="btns">
							<button size="mini" type="default" v-for="(item,index) in btns" :key="index" :class="item.active?'active':''" class="btn" @click="selectDish(index)">{{ item.text }}</button>
						</view>
					</view>
					<view class="box">
						<text class="label">醬汁</text>
						<view class="btns">
							<button size="mini" type="default" v-for="(item,index) in btns" :key="index" :class="item.active?'active':''" class="btn" @click="selectDish(index)">{{ item.text }}</button>
						</view>
					</view>
				</view>
				<view class="dish dish-detail">
					<view class="title">菜品詳情</view>
					<view class="box">湘菜招牌菜味道還不錯 吃了還想吃</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import classifyData from '@/common/classify.data.js';
	//import http from '@/untils/request.js';
	import uniNumberBox from '@/components/uni-number-box/uni-number-box.vue';
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	import uniSwiper from '@/components/uni-swiper-dot/uni-swiper-dot.vue';
	export default {
		components:{
			uniNumberBox,
			uniPopup,
			uniSwiper
		},
		data() {
			return {
				name: "wkiwi",
				swiperList:[
					{
						url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1569495006309&di=4e582a3ab43e1a1814472a71fc44b59a&imgtype=0&src=http%3A%2F%2Fpic39.nipic.com%2F20140321%2F18063302_210604412116_2.jpg'
					},
					{
						url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1569495006309&di=4e582a3ab43e1a1814472a71fc44b59a&imgtype=0&src=http%3A%2F%2Fpic39.nipic.com%2F20140321%2F18063302_210604412116_2.jpg'
					},{
						url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1569495006309&di=4e582a3ab43e1a1814472a71fc44b59a&imgtype=0&src=http%3A%2F%2Fpic39.nipic.com%2F20140321%2F18063302_210604412116_2.jpg'
					}
				],
				btns:[{
					id:'0',
					text: '清蒸',
					active: true
				}, {
					id: '1',
					text: '红骚',
					active: false
				}, {
					id: '2',
					text: '水煮鱼片',
					active: false
				}], // demo
				current: 0, // 轮播图
				nums: 0, // 购物车 总数
				height: 0,
				categoryActive: 0, //左边栏 选中的 下标
				scrollTop: 0, // 距离顶部高度
				scrollLeftTop: 0,
				// scrollHeight: 0,
				classifyData: classifyData, //classifyData
				arr:[0,50,1168,1752,2336,2805,3274,3858,4442,4911,5380,5734,6203,6672,7017],//初始值，后边计算会根据手机适配覆盖 [0,50,1168,1752,2336,2805,3274,3858,4442,4911,5380,5734,6203,6672,7017]
				leftItemHeight: 0,//49行会计算出新值进行覆盖
				navLeftHeight:0,//左边scroll-view 内层nav的总高度
				diff: 0,//左边scroll-view 内层nav的总高度与视口之差
				tabBarHeight:0,//如果此页面为Tab页面，自己改变高度值,,一般tab高度为51
			}
		},
		onLoad: function () {
			this.height = uni.getSystemInfoSync().windowHeight - this.tabBarHeight;
		},
		onReady() {
			for(let i in this.classifyData){
				for(let j in this.classifyData[i].foods){
					this.classifyData[i].foods[j].value = 0;
				}
			}
			this.getHeightList();
			//this.initAjax();
		},
		methods: {
			initAjax(){
				/*let opts = {
					url: '/menu',
					method: 'get'
				};
				
				http.httpRequest(opts).then((res) => {
					console.log(res+' 0.000')
					 this.classifyData = res.data.data;
					console.log(this.classifyData,this.height)
					for(let i in this.classifyData){
						for(let j in this.classifyData[i].foods){
							this.classifyData[i].foods[j].value = 0;
						}
					}
					this.$nextTick(()=>{
						this.getHeightList();
					}) 
					this.height = uni.getSystemInfoSync().windowHeight - this.tabBarHeight; 
				}).catch((error) => {
					console.log(error+' 0.0')
				})*/
				
			},
			bindChange(value,e){
				this.nums = 0;
				e.value = value;
				for(let i in this.classifyData){
					for(let j in this.classifyData[i].foods){
						this.nums += this.classifyData[i].foods[j].value;
					}
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
			},
			selectDish(index){
				for(let i in this.btns){
					this.btns[i].active = false;
				}
				this.btns[index].active = true;
			},
			getHeightList(){
				let _this = this;
				let selectorQuery=uni.createSelectorQuery();
				selectorQuery.selectAll('.nav-left-item').boundingClientRect(function(rects) {
					_this.leftItemHeight  =  rects[0].height;
					_this.navLeftHeight = _this.leftItemHeight * classifyData.length;
					_this.diff =  _this.navLeftHeight - _this.height;
				});
				selectorQuery.selectAll('.box').boundingClientRect(function(rects) {
					let arr = [0];
					let top = 0;
					rects.forEach(function(rect){
	// 					rect.id      // 节点的ID
	// 					rect.dataset // 节点的dataset
	// 					rect.left    // 节点的左边界坐标
	// 					rect.right   // 节点的右边界坐标
	// 					rect.top     // 节点的上边界坐标
	// 					rect.bottom  // 节点的下边界坐标
	// 					rect.width   // 节点的宽度
	// 					rect.height  // 节点的高度
						top += rect.height;
						arr.push(top)
						})
						_this.arr = arr
					}).exec()
				},
				scroll(e) {
					let _this = this
					if(this.timeoutId){
						clearTimeout(this.timeoutId);
					}
					this.timeoutId = setTimeout(function(){ //节流
						_this.scrollHeight = e.detail.scrollTop + 1 + _this.height/2;
						//+1不要删除，解决最后一项某种情况下翻到底部，左边按钮并不会切换至最后一个
						//若想使切换参考线为屏幕顶部请删除 _this.height/2
						for (let i = 0; i < _this.arr.length;i++) {
							let height1 = _this.arr[i];
							let height2 = _this.arr[i+1];
							if (!height2 || (_this.scrollHeight >= height1 && _this.scrollHeight < height2)) {
								_this.categoryActive = i;
								(_this.diff>0) && (_this.scrollLeftTop = Math.round((_this.categoryActive * _this.diff)/(classifyData.length-1)));
								return false;
							}
						}
						_this.categoryActive = 0;
						_this.timeoutId = undefined;
					}, 10)
				},
				categoryClickMain(index) {
					this.categoryActive = index;
					this.scrollTop == this.arr[index] ? this.scrollTop = this.scrollTop+1 : this.scrollTop = this.arr[index]//防止两次相等造成点击不触发滚动时间
				},
				cart: function (text) {
					uni.showToast({
						title: text,
						icon: "none",
					})
					this.$refs.popup.open();
				}
		}
	}
</script>

<style lang="scss">
	.page-body {
		display: flex;
		background: #fff;
		overflow: hidden;
	}

	.nav {
		display: flex;
		width: 100%;
	}

	.nav-left {
		width: $uni-left-nav-width;
		background: $uni-bg-color-grey;
	}

	.nav-left-item {
		height: $uni-left-nav-height;
		border-right: solid 1px #f1f1f1;
		border-bottom: solid 1px #f1f1f1;
		font-size: $uni-font-size-lg;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.nav-left-item:last-child{
		border-bottom: none;
	}
	.nav-right {
		width: $uni-right-nav-width;
		.box {
			display: block;
			overflow: hidden;
			border-bottom: 15upx solid #f3f3f3;
			
			/* min-height: 100vh; */ 
			/*若您的子分类过少想使得每个子分类占满屏请放开上边注视 */
		}
		.box:last-child {
			border: none;
			min-height:100vh;
		}
	}
	
	.nav-right-item {
		/* width: 28%; */
		/* height: 220upx; */
		/* float: left; */
		/* text-align: center; */
		padding: $pd-all;
		font-size: $uni-font-size-sm;
		background: #fff;
		display: flex;
	}
	.msg{
		width: 460upx;
		display: flex;
		flex-direction: column;
		position: relative;
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
	.nav-right-item image {
		width: 135upx;
		height: 135upx;
	}
	.nav-right-item .img{
		width: 135upx;
		height: 135upx;
	}

	.active {
		color: $uni-color-primary;
		background: #fff;
		border-right: 0;
	}
	::-webkit-scrollbar {/*取消小程序的默认导航条样式*/
	   width: 0;
	   height: 0;
	   color: transparent;
		
	}
		.image{
			width: 100%;
		}
	.product-detail{
		height: 100%;
		background-color: #f2f2f2;
		padding-bottom: 100rpx;
		.dish-name{
			padding: $pd-all;
			background: #fff;
			.title{
				font-size: $uni-font-size-paragraph;
				font-weight: bold;
			}
			.box{
				margin-top: $mr-top;
				display: flex;
				.label{
					width: $label-width;
				}
				.btns{
					.btn{
						margin-left: $mr-left;
					}
					.active{
						background: $linear-gradient;
						color: $linear-color;
					}
				}
			}
		}
		.dish-detail{
			padding: $pd-all;
			background: #fff;
			margin-top: $mr-top;
			.title{
				font-size: $uni-font-size-paragraph;
				font-weight: bold;
			}
			.box{
				margin-top: $mr-top;
				color: $uni-color-paragraph;
			}
		}
	}
</style>
