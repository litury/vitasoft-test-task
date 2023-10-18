import {createRouter, createWebHistory} from 'vue-router'
import PostList from "../components/PostList.vue";
import NewPostForm from "../components/NewPostForm.vue";
import PostDetail from "../components/PostDetail.vue";


const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	
	routes: [
		{
			path: '/',
			name: 'PostList',
			component: PostList
		},
		
		{
			path: '/new',
			name: 'NewPostForm',
			component: NewPostForm
		},
		
		{
			path: '/post/:id',
			name: 'PostDetail',
			component: PostDetail,
			props: true
		}
	
	]
})

export default router