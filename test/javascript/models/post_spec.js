require("../spec_helper.js");
requireDefaultStack();
require("../../../public/javascripts/app/models/post.js");

Screw.Unit(function(){
	
  describe("Post", function(){
		
		it("should display the title with the author", function() {
			post = new Post({ title: 'A simple test', author: 'antho' });
			expect(post.titleWithAuthor()).to(equal, "A simple test posted by antho");
		});
		
  });
});