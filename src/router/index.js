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
	]
});