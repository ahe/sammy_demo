var Article = Model("article", 
	// Class methods
	{
		find_by_title: function(title) {
		    return this.detect(function() {
		      return this.attr("title") == title;
		    });
		  }
	}, 
	// Instance methods	
	{
		validate: function() {
	    if (this.attr('title') == null || this.attr('title') == '') {
	      this.errors.add("title", "cannot be empty")
	    }
		},
	  title: function() {
			return this.attr('title');
		}
	}
);

Article.add(new Article({id: 1, title: 'A first test', content: "Hello,<br/>This is a first article. Sammy is great!"}));
Article.add(new Article({id: 2, title: 'I love Javascript', content: "<h1>Hoy!</h1>ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ"}));
var articleId = 2;