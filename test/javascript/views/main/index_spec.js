require("../../spec_helper.js");

Screw.Unit(function(){
	
  describe("main/index.jshtml", function(){
	
		before(function() {
			// You have to launch your page on apache, you'll get a permission denied on file://
			template = $('#source_page').contents().find("body").html();
		});
		
		it("should display a list of numbers", function() {
			data = [1,2,3,4,5];
			var html = srender(template, template, data);
			$('#root').append(html);
			
			var ul = $('#root').find('ul');
			expect(ul).to(have_length, 1);
			expect(ul.children().size()).to(equal, 5);
		});
		
  });
});