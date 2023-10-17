import {defineStore} from 'pinia'

// Функции для создания объектов поста и комментария
function createPost(id, title, summary, content, date) {
	return {
		id,
		title,
		summary,
		content,
		date,
	};
}

function createComment(id, postId, name, email, text, date) {
	return {
		id,
		postId,
		name,
		email,
		text,
		date,
	};
}

// Функция для создания начальных данных
function initializeData() {
	
	const initialPosts = [
		createPost(1, 'Первый пост', 'Это краткое описание первого поста', 'Это полное описание первого поста', '2023-10-01'),
		createPost(2, 'Второй пост', 'Это краткое описание второго поста', 'Это полное описание второго поста', '2023-10-02')
	];
	localStorage.setItem('posts', JSON.stringify(initialPosts));
	
	const initialComments = [
		createComment(1, 1, 'Иван Иванов', 'ivan@example.com', 'Комментарий к первому посту', '2023-10-03'),
		createComment(2, 2, 'Петр Петров', 'petr@example.com', 'Комментарий ко второму посту', '2023-10-04')
	];
	localStorage.setItem('comments', JSON.stringify(initialComments));
}

export const usePostsStore = defineStore({
	id: 'postsStore',
	
	// начальное состояние
	state: () => {
		
		// Проверка наличия данных в local storage и инициализация начальных данных при необходимости
		if (!localStorage.getItem('posts') || !localStorage.getItem('comments')) {
			initializeData();
		}
		
		// Возврат начального состояния
		return {
			posts: JSON.parse(localStorage.getItem('posts')) || [],
			comments: JSON.parse(localStorage.getItem('comments')) || []
		};
	},
	
	actions: {
		
		// Добавление нового поста
		addPost(postData) {
			const post = createPost(
				postData.id,
				postData.title,
				postData.summary,
				postData.content,
				postData.date,
			);
			this.posts.push(post);
			localStorage.setItem('posts', JSON.stringify(this.posts));
		},
		
		// Редактирование поста
		editPost(postId, updatedPostData) {
			const index = this.posts.findIndex(post => post.id === postId);
			if (index !== -1) {
				this.posts[index] = {...this.posts[index], ...updatedPostData};
				localStorage.setItem('posts', JSON.stringify(this.posts));
			}
		},
		
		// Удаление поста
		deletePost(postId) {
			this.posts = this.posts.filter(post => post.id !== postId);
			localStorage.setItem('posts', JSON.stringify(this.posts));
		},
		
		// Добавление нового комментария
		addComment(commentData) {
			const comment = createComment(
				commentData.id,
				commentData.postId,
				commentData.name,
				commentData.email,
				commentData.text,
				commentData.date,
			);
			this.comments.push(comment);
			localStorage.setItem('comments', JSON.stringify(this.comments));
		},
		
		// Удаление комментария
		deleteComment(commentId) {
			this.comments = this.comments.filter(comment => comment.id !== commentId);
			localStorage.setItem('comments', JSON.stringify(this.comments));
		}
	},
	
	getters: {
		
		// Получение всех постов
		getPosts() {
			return this.posts;
		},
		
		// Получение поста по id
		getPost: (state) => (postId) => {
			return state.posts.find(post => post.id === postId);
		},
		
		// Получение всех комментариев
		getComments() {
			return this.comments;
		},
		
		// Получение комментариев по id поста
		getCommentsByPostId: (state) => (postId) => {
			return state.comments.filter(comment => comment.postId === postId);
		}
	}
})