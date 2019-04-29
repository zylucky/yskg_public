<template>
	<div class="big_con">
		<ul class="list_inp">
			<li>
				<p class="inp_name"><i>*</i>姓名</p>
				<p class="inp_txt">
					<input type="text" v-model.trim="name" placeholder="请输入真实姓名">
				</p>
			</li>
			<li>
				<p class="inp_name"><i>*</i>手机号</p>
				<p class="inp_txt">
					<input type="number" v-model.trim="phone" placeholder="请输入手机号" maxlength="11">
				</p>
				<p class="get_code" @click="getCode">{{!show?'重新获取' + count + 's':'获取验证码'}}</p>
			</li>
			<li>
				<p class="inp_name"><i>*</i>验证码</p>
				<p class="inp_txt">
					<input type="text" v-model="verificode" placeholder="请输入验证码">
				</p>
			</li>
			<li>
				<p class="inp_name"><i v-if="false">*</i>渠道公司</p>
				<p class="inp_txt">
					<input type="text" placeholder="请输入渠道公司" v-model="com_name" @focus="com_stat">
				</p>
			</li>
		</ul>
		<ul class="company_list" v-show="comData.length>0 && com_name != '' && com_state">
			<li v-for="item in listcom" @click="comclk(item)">{{item.gsname}}</li>
		</ul>
		<!-- 注册并登陆 -->
		<div class="btn_box">
			<div class="btn" @click="register">注册并登录</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	import { Toast } from 'mint-ui';
    import { Indicator } from 'mint-ui';
	import { MessageBox } from 'mint-ui'; //弹窗
	import crypto from 'crypto';
	export default{
		data(){
			return{
				"name": null, //姓名
                "phone":null, //电话
                "verificode": null, //验证码
				show: true,
				count: '',
				timer: null,
				com_name: "",//公司名称
				comData: [],//公司
				com_id: '',//公司id
				com_state: true,
				invite_code: '',//邀请码
			}
		},
		created() {
			this.invite_code = this.$route.query.invitecode;
		},
		methods:{
			getCode(){
				//手机号码验证
				if(this.phone == '' || this.phone == null){
					Toast({
					  message: '手机号不能为空',
					  position: 'center',
					  duration: 1000
					});
                    return;
				}
				if(!(/^1[3456789]\d{9}$/.test(this.phone))){
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
					$('.get_code').css({
						'color':'#b5b5b5',
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
							$('.get_code').css({
								'color':'#fff',
								'background': 'rgb(123, 198, 249)'
							});
						}
					}, 1000)
				}
			},
			send_code(){
				var _this = this;
				const url = this.$api + "/yhcms/web/qduser/getUser.do";
				axios.post(url,{//查询用户是否注册
					"parameters":{
						"phone": _this.phone,
					},
					"foreEndType":2,
					"code":"4"
				}).then((res)=>{
					var result = res.data;
					if(result.success){
						//可以注册 发送验证码   获取当前的cookie
						const sjsd = {"sjs":(new Date)};
						localStorage.setItem('cooknxcode', JSON.stringify(sjsd));
						const user22 = JSON.parse(localStorage.getItem('cooknxcode'));
						const url = _this.$api + "/yhcms/web/qduser/getCode.do";
						axios.post(url,{
							"parameters":{
								"cookie": user22.sjs,
								"phone": _this.phone,
							},
							"foreEndType":2,
							"code":"14"
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
					}else{
						Toast({
							message: result.message,
							position: 'center'
						});
						// 手机号置空，清除定时器
						this.phone = null;
						this.show = true;
						clearInterval(this.timer);
						this.timer = null;
						$('.get_code').css({
							'color':'#fff',
							'background': 'rgb(123, 198, 249)'
						});
						return false;
					}
				}, (err)=>{
					console.log(err);
				});
			},
			comclk(item){
				this.com_id = item.id;
				this.com_name = item.gsname;
				this.com_state = false;
			},
			com_stat(){
				this.com_state = true;
			},
			register(){//注册并登陆
				if(this.name==''||this.name==null){
					Toast({
						message: '姓名不能为空！',
						position: 'bottom',
						duration: 1000
					});
					return false;
				}
				if(this.phone==''||this.phone==null){
					Toast({
						message: '手机号不能为空！',
						position: 'bottom',
						duration: 1000
					});
					return false;
				}
				if(this.verificode==''||this.verificode==null){
					Toast({
						message: '验证码不能为空！',
						position: 'bottom',
						duration: 1000
					});
					return false;
				}
				// 验证码验证 + 成功后注册登陆
				const user22 = JSON.parse(localStorage.getItem('cooknxcode'));
				const url = this.$api + "/yhcms/web/qduser/compareCode.do";
				let _this = this;
				axios.post(url,{
					"parameters":{
						"cookie": user22.sjs,
						"code": _this.verificode,
					},
					"foreEndType": 2,
					"code": "15"
				}).then((res)=>{
					var result = res.data;
					if(result.success){//验证成功
					//注册登陆 
						const sjsd = {"sjs":(new Date)};
						localStorage.setItem('cooknx', JSON.stringify(sjsd));
						const _this = this, user22 = JSON.parse(localStorage.getItem('cooknx'));
						const url = this.$api + "/yhcms/web/qduser/register.do";
						let that = this;
						let head = JSON.parse(localStorage.getItem('nxhead'));
						axios.post(url,{
							"parameters":{
								"cookie": user22.sjs,
								"img": head,
								"name": _this.name,
								"phone": _this.phone,
								"gsname": _this.com_name,
								"saleNum":_this.invite_code,
								"openid": ''
							},
							"foreEndType":2,
							"code":"1"
						}).then((res)=>{
							var result = res.data;
							if(result.success){
								Toast({
									message: '注册成功',
									position: 'bottom',
									duration: 1000
								});
								const msg = {"user": name,"time":(new Date).getMilliseconds()};
								localStorage.setItem('usernx', JSON.stringify(_this.name));
								localStorage.setItem('loginnx', JSON.stringify(msg));
								localStorage.setItem('cooknx', JSON.stringify(sjsd));
								location.href = 'http://omc.urskongjian.com/nx/#/';//跳转到公众号
							}else{
								Toast({
									message: '注册失败: ' + result.message,
									position: 'bottom'
								});
							}
							
						}, (err)=>{
							console.log(err);
						});
								
					}else{//验证失败
						// this.verificode = null;
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
			
		},
		computed:{
			listcom(){//模糊查询楼盘
				if(this.com_name != '' && this.com_state){
					const url = this.$api + "/yhcms/web/qduser/getQdCompany.do";
					axios.post(url,{
						"companyName": this.com_name,//关键词搜索
					}).then((res)=>{
						this.comData = JSON.parse(JSON.stringify(res.data)).data;
					}, (err)=>{
						console.log(err);
					});
					return this.comData;
				}
			},
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
	}
	.list_inp{
		/* margin-top: 0.266666rem; */
		padding-left: 0.32rem;
	}
	.list_inp li{
		position: relative;
		display: flex;
		display: -webkit-flex;
		align-items: center;
		-webkit-align-items: center;
		height: 1.333333rem;
	}
	.list_inp li::after{
		position: absolute;
		left: 0;
		bottom: 0;
		content: "";
		display: block;
		width: 100%;
		height: 1px;
		border-bottom: 1px solid #d7d7d7;
		transform: scaleY(0.5);
	}
	.list_inp li:nth-child(2) .inp_txt{
		width: 4.666666rem;
	}
	.get_code{
		padding: 0.106666rem;
		background: rgb(123, 198, 249);
		font-size: 0.426666rem;
		color: white;
		border-radius: 0.08rem;
	}
	.inp_name{
		width: 2rem;
		font-size: 0.426666rem;
	}
	.inp_name i{
		font-style: normal;
		color: #ff0000;
	}
	.inp_txt{
		width: 6.266666rem;
		height: 100%;
	}
	.inp_txt input{
		width: 100%;
		height: 100%;
		border: none;
		background: none;
		font-size: 0.426666rem;
	}
	.company_list{
		padding-left: 0.266666rem;
	}
	.company_list li{
		height: 1.333333rem;
		line-height: 1.333333rem;
		font-size: 0.426666rem;
		color: #666;
	}
	.btn_box{
		margin-top: 1.6rem;
	}
	.btn{
		width: 7.2rem;
		height: 0.933333rem;
		line-height: 0.933333rem;
		background: url(../img/btn_bg.png) no-repeat center;
		background-size: 100%;
		border-radius: 0.106666rem;
		font-size: 0.426666rem;
		color: #fff;
		text-align: center;
		margin: 0 auto 0;
	}
</style>
