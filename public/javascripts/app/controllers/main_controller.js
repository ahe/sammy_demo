MainController = function(app) { with(app) {
	
	get('#/main/index', function(context) {
		context.data = [1, 2, 3, 4, 5];
		context.partial(VIEW_PATH + 'main/index.jshtml', {}, function(html) {
			$('#root').html(html);
	  });
	});
	
}};