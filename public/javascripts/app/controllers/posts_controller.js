PostsController = function(app) { with(app) {
	
	get('#/posts', function(context) {
		context.posts = Post.all();
		context.partial(VIEW_PATH + 'posts/index.jshtml');
	});
	
	get('#/posts/new', function(context) {
		context.partial(VIEW_PATH + 'posts/new.jshtml');
	});
	
	post('#/posts', function(context) {
		Post.create(context.params['post'], function(post) {
			context.redirect('#/posts/' + post.id())
		});
	});
	
	route('delete', '#/posts/:id', function(context) {
		var post = Post.find(context.params['id']);
		post.destroy();
		context.trigger('post_remove', { postId: post.id() });		
	});
	
	get('#/posts/:id', function(context) {
		context.post = Post.find(context.params['id']);
		context.partial(VIEW_PATH + 'posts/show.jshtml');
	});
	
	bind('post_remove', function(e, data) {
		$('#post_' + data['postId']).remove();
	});
	
}};