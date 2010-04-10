(function($) {
  
  var main_controller = $.sammy(function() {
    this.element_selector = '#root';    
		this.use(Sammy.Template, 'jshtml');

    this.get('#/', function(context) {
    });

		this.get('#/about', function(context) {
      this.name = 'Anthony';
			this.partial('views/main/about.jshtml', {}, function(html) {
				$('#content').html(html);
      });
    });

		this.get('#/articles', function(context) {
      articles_controller.run('#/articles');
    });
  });
  
  $(function() {
    main_controller.run('#/');
  });
  
})(jQuery);