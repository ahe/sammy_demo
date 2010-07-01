var app = $.sammy(function() {
	this.element_selector = '#root';
	this.use(Sammy.Template, 'jshtml');
	this.use(Sammy.NestedParams);
	
	context = this;
	VIEW_PATH = '/javascripts/app/views/';
	
	MainController(this, context);
	PostsController(this, context);
});

$(function() {
	Post.findAllRemote(function() {
		// Run the app when your models are loaded
		app.run('#/main/index');
	});
});