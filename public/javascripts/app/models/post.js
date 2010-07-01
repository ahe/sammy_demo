var Post = Model("post", 
	{
		persistence: Model.RestPersistence("/posts"),
	
		findAllRemote: function(callback) {
			$.getJSON('/posts.json', function(data) {
				$.each(data, function(i, post) {
					var post = post.post;
					Post.add(new Post({ id: post.id, title: post.title, content: post.content, author: post.author }));
	      });
				callback.call(this);
			});
		},
	
		create: function(params, callback) {
			var post = new Post({ author: params['author'], title: params['title'], content: params['content'] });
			post.save(function(success) {
			  if (success) {
					Post.add(post);
					callback.call(this, post);
			  }
			});
		}
	}, 
	{
		titleWithAuthor: function() {
			return this.attr('title') + ' posted by ' + this.attr('author');
	  }
	}
);