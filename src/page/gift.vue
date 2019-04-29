<template>
	<div class="big_con">
		<!-- 背景 -->
		<div class="bg_top">
			<p class="rule">
				<span @click="see_rule">活动规则</span>
			</p>
		</div>
		<!-- 表单 -->
		<div class="form_box">
			<div class="mes_box">
				<h3 class="mes_tex line">请认真填写以下信息，我们会及时与您联系，为您提供专属服务。</h3>
				<ul class="inp_list">
					<li>
						<span class="name">本人姓名</span>
						<span class="inp">
							<input type="text" placeholder="请输入你的姓名" v-model="username" @blur="blurchange">
						</span>
					</li>
					<li>
						<span class="name">本人电话</span>
						<span class="inp">
							<input type="number" placeholder="请输入你的电话" maxlength="11" v-model="usertel" @input="inp" @blur="blurchange">
						</span>
					</li>
					<li>
						<span class="name">验证码</span>
						<span class="inp">
							<input type="number" placeholder="请输入验证码" v-model="code" @blur="blurchange">
						</span>
						<span class="code" @click="getCode">{{!show?'重新获取' + count + 's':'获取验证码'}}</span>
					</li>
					<li>
						<span class="name">找房人姓名</span>
						<span class="inp">
							<input type="text" placeholder="请输入找房人姓名" v-model="findname" @blur="blurchange">
						</span>
					</li>
					<li>
						<span class="name">找房人电话</span>
						<span class="inp">
							<input type="number" placeholder="请输入找房人电话" maxlength="11" v-model="findtel" @blur="blurchange">
						</span>
					</li>
				</ul>
			</div>
			<div class="mes_box" style="padding-bottom: 0.666666rem;">
				<h3 class="title">房屋信息描述</h3>
				<p class="texare">
					<textarea placeholder="请描述一下房屋基本信息" v-model="describe" @blur="blurchange"></textarea>
					<span class="wt_texar_count"><i id="textareaCount">0</i>/200</span>
				</p>
			</div>
			<div class="btn" @click="btn_ture">确认提交</div>
		</div>
		<!-- 提交成功弹框 -->
		<div class="popup" v-if="pop_state">
			<div class="pop_box">
				<p class="succ_ion"></p>
				<p class="succ_tip">信息提交成功</p>
				<p class="succ_tip1">我们会尽快与您联系</p>
				<p class="succ_btn" @click="Iknow">我知道了</p>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	import wx from 'weixin-js-sdk';
	import { Toast } from 'mint-ui';
    import { Indicator } from 'mint-ui';
	import { MessageBox } from 'mint-ui'; //弹窗
	export default{
		data(){
			return{
				username: '',//本人姓名
				usertel: '',//本人电话
				code: '',//验证码
				findname: '',//找房人姓名
				findtel: '',//找房人电话
				describe: '',//房屋描述信息
				pop_state: false,
				show: true,
				count: '',
				timer: null,
			}
		},
		created() {
			
		},
		methods:{
			wechat_share(){//微信分享
	      	 const url = "http://omc.urskongjian.com/yhcms/web/weixin/share.do";
	      	 var url_share = window.location.href;
	      	 url_share = url_share.split('#')[0];
			 axios.post(url,{
				"url":url_share
		     }).then((res)=>{
		        let we_cs = res.data;   
				//微信签名调取
				wx.config({
			      debug: false, // 开启调试模式
			      appId: we_cs.appId, // 必填，公众号的唯一标识
			      timestamp: we_cs.timestamp, // 必填，生成签名的时间戳
			      nonceStr: we_cs.nonceStr, // 必填，生成签名的随机串
			      signature: we_cs.signature, // 必填，签名
			      jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "onMenuShareQZone", "getLocation", "scanQRCode", "closeWindow", "addCard", "chooseWxPay","chooseImage", "previewImage", "uploadImage", "downloadImage", "getLocalImgData"]
				});
						
		      }, (err)=>{
						console.log(err);
		      });
	      	},
			fx_send(){
				var _this = this;
		      	wx.ready(()=>{
					wx.onMenuShareAppMessage({
					    title: "幼狮空间新客户推荐有礼", // 分享标题
					    desc: "推荐新客户入驻幼狮空间拿豪礼，签约即送25%月租金", // 分享描述
					    link: _this.$url_share,
					    imgUrl: 'http://omc.urskongjian.com/yskg_public/images/gift_bg.png', // 分享图标
					    type: 'link', // 分享类型,music、video或link，不填默认为link
					    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
					    success: function () { 

					    },
					    cancel: function () { 

					    }
					});
							
					wx.onMenuShareTimeline({
					    title: "幼狮空间新客户推荐有礼", // 分享标题
					    link: _this.$url_share, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					    imgUrl: 'http://omc.urskongjian.com/yskg_public/images/gift_bg.png', // 分享图标
					    success: function () { 

					    },
					    cancel: function () { 
					    	
					    }
					});
				})
		    },
			inp(){
				if(this.usertel != ''){
					$('.code').css({'color':'#333'});
				}else{
					$('.code').css({'color':'#c8c8c8'});
				}
			},
			getCode(){
				//手机号码验证
				if(this.usertel == '' || this.usertel == null){
					Toast({
					  message: '手机号不能为空',
					  position: 'center',
					  duration: 1000
					});
                    return;
				}
				if(!(/^1[3456789]\d{9}$/.test(this.usertel))){
					Toast({
					  message: '您输入的手机号格式有误',
					  position: 'center',
					  duration: 2000
					});
					return;
				}
				//验证码倒计时
				const TIME_COUNT = 60;
				if (!this.timer) {
					this.send_code();//发送验证码
					$('.code').css({
						'color':'#c8c8c8',
						'background': 'none'
					});
					this.count = TIME_COUNT;
					this.show = false;
					this.timer = setInterval(() => {
						if (this.count > 1 && this.count <= TIME_COUNT) {
							this.count--;
						} else {
							this.show = true;
							clearInterval(this.timer);
							this.timer = null;
							$('.code').css({
								'color':'#333'
							});
						}
					}, 1000)
				}
			},
			send_code(){
				var _this = this;
				const sjsd = {"sjs":(new Date)};
				localStorage.setItem('cooknxcode', JSON.stringify(sjsd));
				const user22 = JSON.parse(localStorage.getItem('cooknxcode'));
				const url = _this.$url + "/yskjApp/appYskj/V1/getCode.do";
				axios.post(url,{
					"cookie": user22.sjs,
					"phone": _this.usertel,
				}).then((res)=>{
					var result = res.data;
					if(result.success){
						Toast({
							message: '验证码已发送，请稍等！',
							position: 'bottom',
							duration: 1000
						});
					}else{
						Toast({
							message: '验证码发送失败: ' + result.message,
							position: 'bottom'
						});
						return false;
					}
				}, (err)=>{
					console.log(err);
				});
			},
			verify(){
				// 验证码验证 + 成功后注册登陆
				const user22 = JSON.parse(localStorage.getItem('cooknxcode'));
				const url = this.$url + "/yskjApp/appYskj/V1/compCode.do";
				let _this = this;
				axios.post(url,{
					"cookie": user22.sjs,
					"code": _this.code,
				}).then((res)=>{
					var result = res.data;
					if(result.success){//验证成功
						console.log(result);
						const url1 = _this.$url + "/yskjApp/webApp/module/houseRecommend.do";
						axios.post(url1,{
							"recommendName": _this.username,
							"recommendPhone": _this.usertel,
							"houseName": _this.findname,
							"housePhone": _this.findtel,
							"houseDescription": _this.describe,
							"userId": null,
							"openId": "",
						}).then((res)=>{
							var result = res.data;
							if(result.success){//验证成功
								_this.pop_state = true;
							}else{//验证失败
								_this.code = "";
								Toast({
									message: result.message,
									position: 'bottom'
								});
								return false;
							}
						}, (err)=>{
							console.log(err);
						});

					}else{//验证失败
						_this.code = "";
						Toast({
							message: result.message,
							position: 'bottom'
						});
						return false;
					}
				}, (err)=>{
					console.log(err);
				});
			},
			btn_ture(){
				var _this = this;
				if(this.username==''||this.username==null){
					Toast({
						message: '本人姓名不能为空！',
						position: 'bottom',
						duration: 1000
					});
					return false;
				}
				if(this.usertel==''||this.usertel==null){
					Toast({
						message: '本人电话不能为空！',
						position: 'bottom',
						duration: 1000
					});
					return false;
				}
				if(!(/^1[3456789]\d{9}$/.test(this.usertel))){
					Toast({
					  message: '本人电话格式有误',
					  position: 'center',
					  duration: 2000
					});
					return;
				}
				if(this.code==''||this.code==null){
					Toast({
						message: '验证码不能为空！',
						position: 'bottom',
						duration: 1000
					});
					return false;
				}
				if(this.findname==''||this.findname==null){
					Toast({
						message: '找房人姓名不能为空！',
						position: 'bottom',
						duration: 1000
					});
					return false;
				}
				if(this.findtel==''||this.findtel==null){
					Toast({
						message: '找房人电话不能为空！',
						position: 'bottom',
						duration: 1000
					});
					return false;
				}
				if(!(/^1[3456789]\d{9}$/.test(this.findtel))){
					Toast({
					  message: '找房人电话格式有误',
					  position: 'center',
					  duration: 2000
					});
					return;
				}
				MessageBox.confirm('', { 
					message: '是否确认提交？', 
					title: '提示', 
					confirmButtonText: '确认', 
					cancelButtonText: '取消'
				}).then(action => { 
					if (action == 'confirm') {     //确认的回调
						_this.verify();
					}
				}).catch(err => {
					if (err == 'cancel') {     //取消的回调
						console.log(2);
					} 
				});
			},
			see_rule(){//活动规则
				this.$router.push({
					path:'/rules',
					query:{}
				})
			},
			Iknow(){//我知道了
				this.pop_state = false;
				WeixinJSBridge.call('closeWindow');
			},
			blurchange () {
			  let currentPosition = ''
			  let timer = ''
			  let speed = 1 // 页面滚动距离
			  timer = setInterval(function () {
				currentPosition = document.documentElement.scrollTop || document.body.scrollTop
				currentPosition -= speed
				window.scrollTo(0, currentPosition) // 页面向上滚动
				currentPosition += speed // speed变量
				window.scrollTo(0, currentPosition) // 页面向下滚动
				clearInterval(timer)
			  }, 1)
			},
			
		},
		mounted(){
			this.wechat_share();//微信配置调用
	  		this.fx_send();
			$(function(){  
				//控制文本域输入字数
			    $('textarea').keyup(function(event) {  
			        var maxLength = 200;  
			        var len = $('textarea').val().length;  
			        $('#textareaCount').html(len);  
			        if(parseInt($('#textareaCount').text()) > 200){  
			            $('#textareaCount').html('200');  
			            var res = $(this).val().substring(0,200);  
			            $(this).val(res);
			        }  
			    });  
			});
		},
		computed:{
			
		},
		
	}
</script>

<style scoped>
	/* 提交成功弹框 */
	.popup{
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: rgba(0,0,0,0.5);
	}
	.pop_box{
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
		-webkit-flex-direction: column;
		align-items: center;
		-webkit-align-items: center;
		position: absolute;
		left: 50%;
		top: 50%;
		width: 5.866666rem;
		height: 6.8rem;
		margin: -3.4rem 0 0 -2.933333rem;
		border-radius: 0.4rem;
		background: #fff;
	}
	.succ_ion{
		width: 2.706666rem;
		height: 2.586666rem;
		background: url(../img/gift/succe_ion.png) no-repeat center;
		background-size: 100% auto;
		margin-top: 0.466666rem;
	}
	.succ_tip{
		font-size: 0.426666rem;
		color: #333333;
		margin-top: 0.266666rem;
	}
	.succ_tip1{
		font-size: 0.373333rem;
		color: #999999;
		margin-top: 0.133333rem;
	}
	.succ_btn{
		width: 3.2rem;
		height: 1.173333rem;
		line-height: 1.173333rem;
		background: #6570fc;
		font-size: 0.426666rem;
		color: #fff;
		text-align: center;
		border-radius: 0.586666rem;
		margin-top: 0.533333rem;
	}
	/* 主体样式 */
	.big_con{
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: #6570fc;
		overflow: auto;
		-webkit-overflow-scrolling: touch;
		padding-bottom: 0.666666rem;
	}
	.bg_top{
		position: relative;
		width: 100%;
		height: 10.066666rem;
		background: #6570fc url(http://omc.urskongjian.com/yskg_public/images/gift_bg.png) no-repeat center;
		background-size: 100% auto;
	}
	.rule{
		display: flex;
		display: -webkit-flex;
		align-items: center;
		-webkit-align-items: center;
		justify-content: center;
		-webkit-justify-content: center;
		position: absolute;
		right: 0;
		top: 1.053333rem;
		width: 1.933333rem;
		height: 0.706666rem;
		background: url(../img/gift/rule_ion.png) no-repeat center;
		background-size: 100% auto;
		font-size: 0.346666rem;
		color: #fff;
		text-align: center;
		letter-spacing: 0.026666rem;
	}
	.form_box{
		position: relative;
		top: -0.8rem;
	}
	.mes_box{
		width: 9.2rem;
		height: auto;
		margin: 0 auto 0.333333rem;
		border-radius: 0.133333rem;
		background: #fff;
	}
	.mes_tex{
		display: flex;
		display: -webkit-flex;
		align-items: center;
		-webkit-align-items: center;
		position: relative;
		height: 1.666666rem;
		font-size: 0.346666rem;
		color: #999999;
		line-height: 0.56rem;
		padding: 0 0.4rem;
		/* border-bottom: 1px solid #e5e5e5; */
	}
	.inp_list{
		padding-left: 0.4rem;
	}
	.inp_list li{
		position: relative;
		display: flex;
		display: -webkit-flex;
		align-items: center;
		-webkit-align-items: center;
		height: 1.466666rem;
		width: 100%;
		/* border-bottom: 1px solid #e5e5e5; */
	}
	.inp_list li:last-child,.inp_list li:last-child::after{border-bottom: none;}
	.name{
		width: 2.76rem;
		font-size: 0.4rem;
		color: #333333;
	}
	.inp{
		display: flex;
		display: -webkit-flex;
		flex: 1;
		-webkit-flex: 1;
		height: 100%;
		box-sizing: border-box;
	}
	.inp input{
		width: 100%;
		height: 100%;
		border: none;
		font-size: 0.4rem;
		color: #333;
		padding-right: 0.4rem;
		background: none;
	}
	.inp input::-webkit-input-placeholder{
		color: #c8c8c8;
	}
	.code{
		font-size: 0.4rem;
		color: #c8c8c8;
		margin-right: 0.266666rem;
	}
	.title{
		display: flex;
		display: -webkit-flex;
		align-items: center;
		-webkit-align-items: center;
		padding: 0 0.4rem;
		height: 1.066666rem;
		color: #333;
		font-size: 0.4rem;
	}
	.texare{
		position: relative;
		width: 7.733333rem;
		height: 4.333333rem;
		border: 1px solid #e5e5e5;
		margin: 0 auto 0;
		padding: 0.266666rem;
	}
	.texare textarea{
		width: 100%;
		height: 100%;
		border: none;
		font-size: 0.4rem;
		color: #333;
	}
	.texare textarea::-webkit-input-placeholder{
		color: #c8c8c8;
	}
	.wt_texar_count{
		position: absolute;
		bottom: 0.133333rem;
		right: 0.266666rem;
		z-index: 1;
		display: block;
		font-size: 0.32rem;
		color: #c8c8c8;
	}
	.wt_texar_count i{
		font-style: normal;
	}
	.btn{
		width: 9.2rem;
		height: 1.333333rem;
		line-height: 1.333333rem;
		margin: 1.6rem auto 0;
		font-size: 0.48rem;
		color: #fff;
		text-align: center;
		background: url(../img/gift/btn_bg.png) no-repeat center;
		background-size: 100% auto;
	}
	/* 下边框线 */
	.inp_list li::after,.line::after{
		content: "";
		display: block;
		height: 1px;
		width: 100%;
		position: absolute;
		bottom: 0;
		left: 0;
		border-bottom: 1px solid #e5e5e5;
		-webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
        transform-origin: 0 0;
        -webkit-transform-origin: 0 0;
	}
</style>
