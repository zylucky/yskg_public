<template>
	<div class="box">
		<!--轮播图-->
		<div class="banner">
			<swiper :options="swiperOption">
				<swiper-slide v-for="image,idx in house_image">
					<img v-if="image" :src="$prefix + '/' + image" alt="">
                	<img v-else :src="$prefix + '/upload/2017-08-27/6404b4de960b81fc5403c870aefcea34.png'" alt="">
				</swiper-slide>
				<div class="swiper-pagination" slot="pagination"></div>
			</swiper>
		</div>
		<!--楼盘、月租金、日租金-->
		<div class="fyjj">
			<!--<span class="fybh">A - 2206/2207/2207</span>-->
			<span class="fybh" v-if="zdh.indexOf('独栋') > -1"><i v-text="fybh" style="color:black"></i></span>
        <span class="fybh" v-else-if="zdh == ''"><i v-text="fybh" style="color:black"></i></span>
        <span class="fybh" v-else><i v-text="zdh" style="color:black"></i> - <i v-text="fybh" style="color:black"></i></span>
			<span class="yzj"><i v-text="monthly_price" style="color:#e01222"></i><i v-if="monthly_price != null" style="color:black">元/月</i></span>
			<span class="rzj"><i v-if="daily_price != null">{{daily_price}}</i>元/㎡/天</span>
		</div>
		<!--面积、工位、房间状态-->
		<div class="fjxx">
			<ul class="list">
				<li>
					<p class="fj_nane">面积</p>
					<p class="fj_xq" v-text="room_area"></p>
				</li>
				<li>
					<p class="fj_nane">工位</p>
					<p class="fj_xq" v-text="workstation"></p>
				</li>
				<li>
					<p class="fj_nane">房间状态</p>
					<p class="fj_xq" v-text="fjzt"></p>
				</li>
			</ul>
		</div>
		<!--详细信息-->
		<div class="fj_detail">
			<div class="detail_h">
				<p>
					<span class="detail_name">楼&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;层：</span>
					<span class="detail_xq" v-text="locat_floor"></span>
				</p>
				<p>
					<span class="detail_name">可否注册：</span>
					<span class="detail_xq" v-text="zc"></span>
				</p>
			</div>
			<div class="detail_h">
				<p>
					<span class="detail_name">层&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;高：</span>
					<span class="detail_xq" v-text="fjcg"></span>
				</p>
				<p>
					<span class="detail_name">朝&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;向：</span>
					<span class="detail_xq" v-text="chx"></span>
				</p>
			</div>
			<div class="detail_h">
				<p>
					<span class="detail_name">建成年代：</span>
					<span class="detail_xq" v-text="kprq"></span>
				</p>
				<p>
					<span class="detail_name">停&nbsp;&nbsp;车&nbsp;&nbsp;费：</span>
					<span class="detail_xq" v-text="tcf"></span>
				</p>
			</div>
			<div class="detail_h">
				<p style="width: 100%;">
					<span class="detail_name">产权性质：</span>
					<span class="detail_xq" v-text="chqxz"></span>
				</p>
			</div>
			<div class="detail_h">
				<p style="width: 100%;">
					<span class="detail_name">物业公司：</span>
					<span class="detail_xq" v-text="wygs"></span>
				</p>
			</div>
			<div class="detail_h">
				<p>
					<span class="detail_name">物&nbsp;&nbsp;业&nbsp;&nbsp;费：</span>
					<span class="detail_xq" v-text="wyf"></span>
				</p>
				<p>
					<span class="detail_name">供&nbsp;&nbsp;暖&nbsp;&nbsp;费：</span>
					<span class="detail_xq" v-text="gnf"></span>
				</p>
			</div>
			<div class="detail_h">
				<p style="width: 100%;">
					<span class="detail_name">网络公司：</span>
					<span class="detail_xq" v-text="wlgs"></span>
				</p>
			</div>
			<div class="fgx"></div>
			<div class="detail_h">
				<span class="fjldcss" style="width: 100% !important;">房间亮点：</span>
			</div>
			<div class="detail_h">
				<span v-text="fangjlidian" style="width: 100% !important;"></span>
			</div>
			<div class="fgx"></div>
			<div class="detail_h">
				<p style="width: 100%;">
					<span class="detail_name">礼品等级：</span>
					<span class="detail_xq"  v-text="lpdj" style="color: #000;"></span>
				</p>
			</div>
			<div class="fgx"></div>
			<div class="detail_h">
				<p style="width: 100%;">
					<span class="detail_name">销售顾问：</span>
					<span class="detail_xq" v-text="name" style="color: #000;"></span>
				</p>
			</div>
			<div class="detail_h">
				<p style="width: 100%;">
					<span class="detail_name">联系方式：</span>
					<span class="detail_xq" style="color: #000;"><a :href="'tel:' + phone"><i class="con_telephone" v-text="phone"></i></a></span>
				</p>
			</div>
			
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	import wx from 'weixin-js-sdk';
	export default {
		data() {
			return {
				swiperOption: {//轮播图配置
					pagination: '.swiper-pagination',
					paginationClickable: true,
					autoplay: {
					    delay: 3000,
					    stopOnLastSlide: false,
					    disableOnInteraction: true
				   	},
					autoplayDisableOnInteraction: false,
					loop: true,
					pagination: {
						el: '.swiper-pagination',
						type: 'fraction'
					},
				},
				hourse_id: "",
		        daily_price:0, //日价格
		        monthly_price:0, //月价格
		        room_area:0, //面积
		        workstation:0, //工位
		        floors:0, //总楼层
		        locat_floor:0, //所在楼层
		        fjzt: "", 
				topic:'',//楼盘
		        house_image: [],
		        name: "",
		        phone: "",
		        fjcg: "",
		        chx: "",
		        wygs: '',//物业公司
		        zdh:'',//座栋号
		        fybh:"",
		        wyf: '',//物业费
		        kprq: '',//建成年代
		        tcf: "",
		        wlgs: "",
		        gnf: "",
		        zc: "",
		        chqxz: "",
		        lpdj: "",
		        building_images: [],
		        property: {"1":"写字楼", "2":"公寓","3":"商务楼","4":"住宅","5":"商业","6":"酒店","7":"综合","8":"别墅","9":"商业综合体","10":"酒店式公寓"},
                fangjlidian:"",
			}
		},
		created(){
			this.getPerDetail();
		},
		methods:{
			//获取某一办公楼详情
		    getPerDetail(){
		    	var _this = this;
		    	let house_id = this.getUrlStr('hourse_id');
		    	_this.hourse_id = house_id;
		        axios.post(this.$api + "/yhcms/web/lpjbxx/getWxFyxx.do",
		        	{
			            "parameters": {
			              "hourse_id": house_id
			            },
			            "foreEndType": 2,
			            "code": "30000004"
			        }
		        ).then(res => {
					var result = res.data
					console.log(result);
					if (result.success) {
			            if (result.data) {
			              const data = result.data[0];
			              _this.fangjlidian = !result.data1.roomBrightSpot ? '暂无数据' : result.data1.roomBrightSpot;
			              document.title = data.topic;
			              _this.topic = data.topic;
			              $('title').html(result.data.name);
			              _this.daily_price = !data.dj ? '暂无数据' : data.dj;
			              _this.monthly_price = !data.yzj ? '暂无数据' : data.yzj;
			              _this.room_area = !data.fjmj ? '暂无数据' : data.fjmj + '㎡';
			              _this.workstation = data.krgw || '暂无数据';
			              _this.floors = data.zglc || '暂无数据';
			             /* _this.wyf = !data.wyf ? '暂无数据' : data.wyf + '元/㎡/月';*/
			              if(result.data.wyf == 0){
			                  _this.wyf = '已包含';
			              }else{
			                  _this.wyf = !result.data.wyf ? '暂无数据' : result.data.wyf + '元/㎡/月'; //物业费
			              }
			              _this.wygs = data.wygs || '暂无数据';
			              /*_this.fjcg = data.fjcg + "m" || '暂无数据';*/
			              _this.fjcg = !data.fjcg ? '暂无数据' : data.fjcg + "m";
			              _this.fjzt = data.fjzt || '暂无数据';
			              if(_this.fjzt == "预租房"){
			                  _this.fybh = "即将上线";
			                  _this.zdh = '';
			                  _this.locat_floor = '暂无数据';
			              }else{
			                  _this.fybh = data.fybh || '暂无数据';
			                  _this.zdh = data.zdh || '暂无数据';
			                  _this.locat_floor = data.lc || '暂无数据';
			              }
			              _this.name = data.name || '暂无数据';
			              _this.phone = data.phone || '暂无数据';
			              _this.house_image = data.housing_icon.split(";");
			
			              const zc = data.zc || '暂无数据';
			              _this.zc = zc === '0' ? '不可注册' : '可注册';
			              _this.chx = data.chx || '暂无数据';
			              _this.kprq = data.kprq || '暂无数据';
			              _this.chqxz = data.chqxz || '暂无数据';
			              /*_this.gnf= !data.gnf ? '暂无数据' : data.gnf + '元/㎡/季';*/
			              if(result.data.gnf == 0){
			                  _this.gnf = '已包含';
			              }else{
			                  _this.gnf = !result.data.gnf ? '暂无数据' : result.data.gnf + '元/㎡/季';
			              }
			              _this.tcf = !data.tcf ? '暂无数据' : data.tcf + '元/月';
			              _this.wlgs = data.wlgs || '暂无数据';
			              _this.lpdj = data.lpsort || '暂无数据';
			              
			              _this.fx_send();//微信分享调用
			            }
			          }
				}, err => {

				})
		    },
		    getUrlStr(name){
		        let reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)","i");
		        if(reg.test(window.location.href)){
		            return unescape(RegExp.$2.replace(/\+/g," "))
		        }
		        return undefined
		    },
		    wechat_share(){//微信分享
		      	const url = this.$api = "/yhcms/web/weixin/shareYskj.do";
		      	var url_share = window.location.href;
		      	url_share = url_share.split('#')[0];
		      	console.log(url_share);
						axios.post(url,{
							"url":url_share
			     }).then((res)=>{
			        let we_cs = res.data;
			        console.log(we_cs);	          
							//微信签名调取
							wx.config({
							      debug: false, // 开启调试模式
							      appId: we_cs.appId, // 必填，公众号的唯一标识
							      timestamp: we_cs.timestamp, // 必填，生成签名的时间戳
							      nonceStr: we_cs.nonceStr, // 必填，生成签名的随机串
							      signature: we_cs.signature, // 必填，签名
							      jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "onMenuShareQZone", "getLocation", "scanQRCode", "closeWindow", "addCard", "chooseWxPay"]
							});
							
			      }, (err)=>{
							console.log(err);
			      });
		      },
		      fx_send(){
		      	wx.ready(()=>{
					wx.onMenuShareAppMessage({
					    title: this.topic + '  ' + this.zdh +'-'+ this.fybh, // 分享标题
					    desc: "面积："+this.room_area + '     ' + "月租金："+ this.monthly_price, // 分享描述
					    link: 'http://omc.urskongjian.com/yskg_public/#/?hourse_id=' + this.hourse_id,
					    imgUrl: 'http://omc.urskongjian.com:81/yskjapp/shi_ion.png', // 分享图标
					    type: 'link', // 分享类型,music、video或link，不填默认为link
					    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
					    success: function () { 

					    },
					    
					    cancel: function () { 

					    }
					});
							
					wx.onMenuShareTimeline({
					    title: this.topic + '  ' + this.zdh +'  '+ this.fybh, // 分享标题
					    link: 'http://omc.urskongjian.com/yskg_public/#/?hourse_id=' + this.hourse_id, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					    imgUrl: 'http://omc.urskongjian.com:81/yskjapp/shi_ion.png', // 分享图标
					    success: function () { 

					    },
					    cancel: function () { 
					    	
					    }
					});
				})
		      },
		    
		},
		mounted(){
			this.wechat_share();//微信分享调用
		}
	}
</script>

<style scoped>
.box{
	position: absolute;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	overflow: auto;
	background: #f0eff5;
	width: 10rem;
	-webkit-overflow-scrolling:touch;
}
/*轮播图*/
.banner{
	width: 10rem;
	height: 6.4rem;
}
.swiper-container{
	width: 10rem;
	height: 6.4rem;
}
.banner img{
	width: 100%;
	height: 100%;
}
.fyjj{
	display: flex;
	display: -webkit-flex;
	align-items: center;
	-webkit-align-items: center;
	height: 0.933333rem;
	padding: 0 0.466666rem;
	background: #fff;
	margin-bottom: 0.133333rem;
}
.fyjj span{
	display: inline-block;
	font-size: 0.346666rem;
	color: #000000;
	margin-right: 0.533333rem;
}
.fyjj span:last-child{
	margin: 0;
}
.fyjj i{
	font-style: normal;
	color: #c50723;
}
.fjxx{
	height: 1.333333rem;
	background: #fff;
	padding: 0 0.466666rem;
	margin-bottom: 0.133333rem;
}
.list{
	display: flex;
	display: -webkit-flex;
	align-items: center;
	-webkit-align-items: center;
	height: 100%;
}
.list li{
	position: relative;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	-webkit-flex-direction: column;
	align-items: center;
	-webkit-align-items: center;
	justify-content: center;
	-webkit-justify-content: center;
	width: 33.333%;
	height: 100%;
}
.list li p:first-child{
	margin-bottom: 0.133333rem;
}
.list li::after{
	position: absolute;
	right: 0;
	top: 50%;
	margin-top: -0.28rem;
	content: "";
	display: block;
	width: 1px;
	height: 0.56rem;
	border-left: 2px solid #cbcbcb;
}
.list li:last-child::after{
	display: none;
}
.fj_nane{
	font-size: 0.346666rem;
	color: #000000;
}
.fj_xq{
	font-size: 0.346666rem;
	color: #4f4f4f;
}
.fj_detail{
	min-height: 5.733333rem;
	height: auto;
	background: #fff;
	padding: 0.733333rem 0.466666rem 0.4rem 0.466666rem;
}
.detail_name{
	font-size: 0.346666rem;
	color: #000000;
}
.detail_xq{
	font-size: 0.346666rem;
	color: #5a5a5a;
}
.detail_h{
	display: flex;
	display: -webkit-flex;
	margin-bottom: 0.333333rem;
}
.detail_h p{
	/*border: 1px solid red;*/
	width: 4.466666rem;
}
.fgx{
	height: 0.053333rem;
	background: #e7e7e9;
	margin: 0.426666rem 0;
}
.con_telephone{
	font-style: normal;
	color: #5061b1;
}
a{
	text-decoration: none;
}
</style>