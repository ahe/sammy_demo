var Post = Model("post", 
	{
		persistence: Model.RestPersistence("/posts"),
	
		findAllRemote: function(callback) {
			$.getJSON('/posts.json', function(data) {
				$.each(data, function(i, post) {
					var post_data = post.post;
					var post = new Post({ id: post_data.id });
					post.merge(post_data);
					Post.add(post);
	      });
				callback.call(this);
			});
		}
	}, 
	{
		titleWithAuthor: function() {
			return this.attr('title') + ' posted by ' + this.attr('author');
	  }
	}
);