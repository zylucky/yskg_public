<template>
	<!-- 大块 -->
	<div class="big_con">
		<div class="top">
			<!-- 二维码显示区域 -->
			<div class="code_box">
				<!-- 白色背景 -->
				<div class="code_bg">
					<!-- 邀请码 -->
					<div class="yqm_show">
						<span>F</span>
						<span>O</span>
						<span>W</span>
						<span>T</span>
					</div>
					<!-- 二维码 -->
					<div class="qr_code"></div>
				</div>
				<!-- 标题 -->
				<div class="tit_box">
					<div class="tit">我的邀请码</div>
				</div>
			</div>
		</div>
		<div class="bottom">
			<p>面对面扫描二微码邀请好友成为亮狮网渠道伙伴</p>
			<p>或点击右上角的分享发送链接邀请好友成为亮狮网渠道伙伴</p>
		</div>
	</div>
</template>

<script>
	
</script>

<style scoped>
	.big_con{
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: #ebddf8;
	}
	.top{
		position: relative;
		width: 100%;
		height: 6.866666rem;
		background: url(../img/top_bg.png) no-repeat center -1.733333rem;
		background-size: 100% auto;
	}
	.code_box{
		position: absolute;
		z-index: 99;
		left: 50%;
		margin-left: -4.533333rem;
		top: 5.9rem;
		width: 9.066666rem;
		height: 7.4rem;
		border-radius: 0.44rem;
		background: #fff;
	}
	.qr_code{
		width: 3.866666rem;
		height: 3.866666rem;
		margin: 0 auto 0;
		border: 1px solid red;
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
	.yqm_show{
		display: flex;
		display: -webkit-flex;
		justify-content: space-between;
		width: 3.573333rem;
		margin: 1.04rem auto 0.426666rem;
	}
	.yqm_show span{
		display: inline-block;
		width: 0.6rem;
		height: 0.786666rem;
		line-height: 0.786666rem;
		background: #efefef;
		text-align: center;
		font-size: 0.426666rem;
		color: #732ce5;
		border-radius: 0.053333rem;
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
	.bottom p{
		font-size: 0.32rem;
		color: #a97df0;
	}
</style>
