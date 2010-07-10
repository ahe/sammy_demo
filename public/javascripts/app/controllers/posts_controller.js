PostsController = function(app) { with(app) {
	
	/** Routes **/
	
	// GET index
	get('#/posts', function(context) {
		context.posts = Post.all();
		context.partial(VIEW_PATH + 'posts/index.jshtml');
	});
	
	// GET new
	get('#/posts/new', function(context) {
		context.partial(VIEW_PATH + 'posts/new.jshtml');
	});
	
	// POST create
	post('#/posts', function(context) {
		var post = new Post(context.params['post']);
		post.save(function(success) {
			context.redirect('#/posts/' + post.id());
		});
	});
	
	// GET edit
	get('#/posts/edit/:id', function(context) {
		context.post = Post.find(context.params['id']);
		context.partial(VIEW_PATH + 'posts/edit.jshtml');
	});
	
	// PUT update
	put('#/posts/update/:id', function(context) {
		var post = Post.find(context.params['id']);
		post.update(context.params['post']).save();
		context.redirect('#/posts/' + post.id())
	});
	
	// DELETE destroy
	route('delete', '#/posts/:id', function(context) {
		var post = Post.find(context.params['id']);
		post.destroy();
		context.trigger('post_remove', { postId: post.id() });		
	});
	
	// GET show
	get('#/posts/:id', function(context) {
		context.post = Post.find(context.params['id']);
		context.partial(VIEW_PATH + 'posts/show.jshtml');
	});
	
	/** Events **/
	
	bind('post_remove', function(e, data) {
		$('#post_' + data['postId']).remove();
	});
	
}};