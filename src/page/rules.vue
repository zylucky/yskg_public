<template>
	<div class="big_con">
		<h3 class="big_title"><b>活动内容</b></h3>
		<p class="con_txt">即日起至2019年12月31日期间，直接推荐新客户签约幼狮空间，入驻后推荐人和被推荐人即可享受现金奖励和商城优惠。</p>
		
		<h3 class="big_title"><b>推荐方式</b></h3>
		<p class="con_txt">在亮狮APP或亮狮网公众号“幼狮空间推荐有礼”页面，填写并提交推荐客户的相关信息。</p>
		
		<h3 class="big_title"><b>奖励制度</b></h3>
		<h3 class="small_title"><b>1、推荐人</b></h3>
		<p class="con_txt"><b>·获得25%月租金等额现金奖励；</b></p>
		<p class="con_txt"><b>·获得企服商城500元感恩卡。</b></p>
		<h3 class="small_title" style="margin-top: 0.2rem"><b>2、新客户（被推荐人）</b></h3>
		<p class="con_txt"><b>·获得25%月租金减免；</b></p>
		<p class="con_txt"><b>·获得企服商城会员资格，享正价商品9.5及2000元组合优惠券。</b></p>
		
		<h3 class="big_title"><b>达标要求</b></h3>
		<p class="con_txt">1、换租、续租、同一客户变更合同不参与此活动；</p>
		<p class="con_txt">2、推荐人领取奖励的银行卡户名必须与填写的姓名一致。</p>
		
		<h3 class="big_title"><b>奖金发放</b></h3>
		<p class="con_txt">在被推荐人签约且支付首期房租及押金后，现金奖励将在推荐人提交银行卡信息的3-5天。</p>
		
		<h3 class="big_title"><b>活动时间</b></h3>
		<p class="con_txt">有效期截止至2019年12月31日，亮狮网员工不得参与。</p>
		
		
		<p class="con_txt jsq">本次活动最终解释权归幼狮空间所有</p>
	</div>
</template>

<script>
	import axios from 'axios';
	import { Toast } from 'mint-ui';
    import { Indicator } from 'mint-ui';
	import { MessageBox } from 'mint-ui'; //弹窗
	export default{
		data(){
			return{
				
			}
		},
		created() {
			
		},
		methods:{
			
		},
		mounted(){
			
		},
		computed:{
			
		},
		
	}
</script>

<style scoped>
	/* 主体样式 */
	.big_con{
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		overflow: auto;
		-webkit-overflow-scrolling: touch;
		padding-bottom: 0.666666rem;
		background: #ffffff;
		padding: 0 0.4rem;
	}
	.big_title{
		font-size: 0.4rem;
		color: #333;
		margin: 0.266666rem 0 0.2rem 0;
	}
	.con_txt{
		font-size: 0.346666rem;
		color: #999999;
		line-height: 0.48rem;
	}
	.small_title{
		font-size: 0.346666rem;
		color: #333333;
		margin-bottom: 0.133333rem;
	}
	.jsq{
		margin-top: 0.4rem;
		padding-bottom: 0.266666rem;
		color: #333;
	}
</style>
