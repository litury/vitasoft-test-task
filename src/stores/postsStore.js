import {defineStore} from 'pinia'

export const usePostsStore = defineStore({
	id: 'postsStore',
	
	state: () => ({
		posts: [
			{
			
			}
		],
	}),
})