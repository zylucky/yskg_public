import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
	routes:[
		{
			path:'/',
			name:'testVue',
			component:resolve => require(['../components/fy_share.vue'],resolve),
			meta:{
				title:''
			}
		},
		{//邀请渠道
			path:'/invite',
			name:'invite',
			component:resolve => require(['../page/invite.vue'],resolve),
			meta:{
				title:'邀请好友'
			}
		},
		{//邀请渠道
			path:'/wecome',
			name:'wecome',
			component:resolve => require(['../page/wecome.vue'],resolve),
			meta:{
				title:'邀请好友'
			}
		},
		{//渠道注册
			path:'/register',
			name:'register',
			component:resolve => require(['../page/register.vue'],resolve),
			meta:{
				title:'用户注册'
			}
		},
	]
});