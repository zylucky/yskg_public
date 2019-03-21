<template>
	<!-- 大块 -->
	<div class="big_con">
		<div class="top">
			
			<!-- 二维码显示区域 -->
			<div class="code_box">
				<!-- 白色背景 -->
				<div class="code_bg">
					<div class="user_num">
						<p>您将成为亮狮网</p>
						<p>第<span>{{qd_cout + 1}}</span>位渠道</p>						
					</div>
				</div>
				<!-- 标题 -->
				<div class="tit_box">
					<div class="tit">完成注册</div>
				</div>
			</div>
			
		</div>
		<div class="bottom">
			<div class="btn" @click="to_regedit()">立即注册</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	export default {
		data () {
	      return {
	      	qd_cout: "0000",
			invite_code: '',
	      }
	  	},
	  	created(){
	  		this.wec_init();
	  	},
	  	methods:{
	  		wec_init(){
	  			const url = this.$api + "/yhcms/web/wxqx/getInvitationCount.do";
				axios.post(url,{
					
				}).then((res)=>{
					this.qd_cout = res.data.usercount;
				}, (err)=>{
					console.log(err);
				});
	  		},
			getUrlStr(name){
				var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)","i");
				if(reg.test(window.location.href)){
					return unescape(RegExp.$2.replace(/\+/g," "))
				}
				return null;
			},
			to_regedit(){
				var _this = this;
				_this.$router.push({
					path:'/register',
					query:{
						invitecode: _this.invite_code
					}
				})
			},
			
		},
		mounted() {
			this.invite_code = this.getUrlStr('invite_code');
			console.log(this.invite_code);
		},
		
	}
</script>

<style scoped>
	.big_con{
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: #7263ca;
	}
	.top{
		position: relative;
		width: 100%;
		height: 10.013333rem;
		background: url(../img/top_bg1.png) no-repeat center -1.4rem;
		background-size: 100% auto;
	}
	.code_box{
		position: absolute;
		z-index: 99;
		left: 50%;
		margin-left: -4.533333rem;
		top: 7.5rem;
		width: 9.066666rem;
		height: 4.733333rem;
		border-radius: 0.44rem;
		background: #fff;
	}
	.tit_box{
		position: absolute;
		top: -0.4rem;
		left: 50%;
		margin-left: -2.966666rem;
		width: 5.933333rem;
		height: 0.866666rem;
		background: url(../img/tit_bg.png) no-repeat center;
		background-size: 100% auto;
	}
	.tit_box .tit{
		position: absolute;
		z-index: 999;
		top: 0;
		left: 50%;
		margin-left: -2.7rem;
		width: 5.4rem;
		height: 0.866666rem;
		line-height: 0.866666rem;
		background: #732ce5;
		border-radius: 10px;
		font-size: 0.426666rem;
		color: #fff;
		text-align: center;
	}
	.code_bg{
		position: absolute;
		z-index: 99;
		height: 100%;
		width: 100%;
		background: #fff;
		border-radius: 0.44rem;
	}
	
	.bottom{
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
		-webkit-flex-direction: column;
		align-items: center;
		-webkit-align-items: center;
		position: absolute;
		bottom: 1.2rem;
		width: 10rem;
		margin: 0 auto 0;
	}
	.btn{
		width: 8.653333rem;
		height: 1.466666rem;
		line-height: 1.466666rem;
		background: url(../img/btn_ion.png) no-repeat center;
		background-size: 100% auto;
		font-size: 0.533333rem;
		color: #ffffff;
		text-align: center;
	}
	.user_num{
		display: flex;
		display: -webkit-flex;
		align-items: center;
		-webkit-align-items: center;
		flex-direction: column;
		-webkit-flex-direction: column;
		margin-top: 1.4rem;
	}
	.user_num p{
		color: #333333;
		font-size: 0.533333rem;
		font-weight: bold;
		line-height: 1.066666rem;
	}
	@font-face {
		font-family: myfont;
		src: url('../font/myfont.ttf');
	}
	.user_num span{
		font-family: myfont;
		padding: 0 0.106666rem 0 0.133333rem;
		color: #5a4aba;
		font-size: 0.746666rem;
		font-weight: normal;
	}
</style>
