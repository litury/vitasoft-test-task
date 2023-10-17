import {createRouter, createWebHistory} from 'vue-router'
import PostList from "../components/PostList.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	
	routes: [
		{
			path: '/',
			name: 'PostList',
			component: PostList
		},
		
		// {
		// 	path: '/form',
		// 	name: 'form',
		// 	component: ContactFormViews
		// },
		//
		// {
		// 	path: '/contact/:id',
		// 	name: 'contact',
		// 	component: ContactDetailsViews
		// }
	
	]
})

export default router