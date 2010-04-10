var articles_controller = $.sammy(function() {
  this.element_selector = '#content';
	this.use(Sammy.Template, 'jshtml');
	this.use(Sammy.NestedParams);
	
	this.get('#/articles', function(context) {
		this.articles = Article.all();
		
		this.partial('views/articles/index.jshtml', {}, function(html) {
			$('#content').html(html);
    });
  });

	this.get('#/articles/new', function(context) {
		this.partial('views/articles/new.jshtml', {}, function(html) {
			$('#content').html(html);
    });
	});
	
	this.post('#/articles', function(context) {
		articleId += 1; // Just to keep the demo simple :)
		Article.add(new Article({id: articleId, title: this.params['article']['title'], content: this.params['article']['content']}));
		this.redirect('#/articles/'+articleId);
	});

	this.get('#/articles/:id', function(context) {
		this.article = Article.find(this.params['id']);
		this.partial('views/articles/show.jshtml', {}, function(html) {
			$('#content').html(html);
    });
	});
});