<template>
	<view class="my-page content-page">
		<view class="header">
			<view class="userMsg">
				<view class="member">v 微信会员</view>
				<view class="my-msg">
					<view class="tx">
						<image class="image" :src="userMsg.imgUrl"></image>
					</view>
					<view class="middle">
						<text class="username text">{{ userMsg.username }}</text>
						<text class="text">{{ userMsg.phone }}</text>
					</view>
				</view>
				<view class="hotel-msg">
					<view class="box">	
						
						<view class="tabs">
							<view class="tab">
								<text class="iconfont">&#xe611;</text>
								<text>券包</text>
								<view>10张</view>
							</view>
							<view class="tab">
								<text class="iconfont">&#xe611;</text>
								<text>储值</text>
								<view>￥1000</view>
							</view>
							<view class="tab">
								<text class="iconfont">&#xe611;</text>
								<text>积分</text>
								<view>3000分</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="mains">
			<view class="suduko">
				<uni-grid :column="4" :show-border="false" :square="false">
					<uni-grid-item>
						<text class="iconfont">&#xe611;</text>
						<text class="text">邀请注册</text>
					</uni-grid-item>
					<uni-grid-item>
						<text class="iconfont">&#xe611;</text>
						<text class="text">收藏酒店</text>
					</uni-grid-item>
					<uni-grid-item>
						<text class="iconfont">&#xe611;</text>
						<text class="text">会员特权</text>
					</uni-grid-item>
					<uni-grid-item>
						<text class="iconfont">&#xe611;</text>
						<text class="text">中奖记录</text>
					</uni-grid-item>
					<uni-grid-item>
						<text class="iconfont">&#xe611;</text>
						<text class="text">点评记录</text>
					</uni-grid-item>
					<uni-grid-item>
						<text class="iconfont">&#xe611;</text>
						<text class="text">分销记录</text>
					</uni-grid-item>
				</uni-grid>
			</view>
			<view class="btns">
				<view class="edgegap">
					<button type="primary" open-type="getUserInfo" @getuserinfo="gotoRoomService" class="btn" >微信一键登录</button>
					<button type="warn"  class="btn" >退出登录</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniGrid from '@/components/uni-grid/uni-grid.vue';
	import uniGridItem from '@/components/uni-grid-item/uni-grid-item.vue';
	export default {
		components:{
			uniGrid,
			uniGridItem
		},
		data(){
			return{
				userMsg:{
					username: '周圆圆',
					phone: '13712345678',
					imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568978734942&di=8fd3a8b21d16f88b68488065eb3520e9&imgtype=0&src=http%3A%2F%2Fimg4.bbs.szhome.com%2Fuploadfiles%2Fimages%2F2009%2F07%2F10%2F0710105147585.jpg',
				}
			}
		},
		mounted() {
			this.getSetting();
		},
		onLoad() {
			
		},
		methods:{
			getSetting(){
				let that = this;
				uni.login({
					provider: 'weixin',
					success: function (loginRes){
						let js_code = loginRes.code;
						//获取用户信息
						uni.getUserInfo({
							provider: 'weixin',
							success: function(infoRes){
								console.log(infoRes)
								that.userMsg.imgUrl = infoRes.userInfo.avatarUrl;
								that.userMsg.username = infoRes.userInfo.nickName;
							},
							fail: function(res){
								console.log('error: '+res)
							}
						})
					}
				})
				
			},
			gotoRoomService: function(e){
				if(e.mp.detail.rawData){
					console.log('授权成功')
					this.getSetting();
				}else{
					console.log('授权失败')
				}
			}
		}
	}
</script>

<style lang="scss" >
.my-page{
	background: $uni-bg-color-grey;	
	height: 100%;
	.header{
		padding: $pd-all;
		.userMsg{
			background-image: $linear-gradient;
			border-radius: $uni-border-radius-lg;
			color: $linear-color;
			padding: $pd-all;
			.member{
				float: right;
				color: $uni-text-color-grey;
			}
			.my-msg{	
				view{
					display: inline-block;
				}
				.tx{
					width: 100rpx;
					height: 100rpx;
					line-height: 100rpx;
					border-radius: 50%;
					margin-right: 10rpx;
					.image{					
						width: 100rpx;
						height: 100rpx;
						border-radius: 50%;
					}
				}
				.middle{
					vertical-align: top;
					.text{
						display: block;
						font-weight: bold;
					}
				}
			}
		}
		.hotel-msg{
			padding-top: $pd-top;
			.tabs{
				.tab{
					display: inline-block;
					width: 210rpx;
					text-align: center;
					color: $linear-color;
					.iconfont{
						color: $uni-text-color-grey;
						font-size: $uni-font-size-sm;
					}
				}
			}
		}
	}
	.mains{	
		.orders{
			background-color: #fff;
			.iconfont{
				font-size: 1rem;
			}
			.text{
				font-size: $uni-font-size-sm;
				margin-top: $mr-top;
			}
		}
		.suduko{
			margin-top: $mr-top;
			background: #fff;
			.iconfont{
				font-size: 1rem;
			}
			.text{
				font-size: $uni-font-size-sm;
				margin-top: $mr-top;
			}
		}
		.btns{
			position: absolute;
			bottom: 20rpx;
			width: 100%;
			.edgegap{
				padding: $pd-all;
			}
			.btn{
				/* background-image: $linear-gradient;
				color: $linear-color; */
				margin-top: $mr-top;
			}
		}
	}
}
</style>
