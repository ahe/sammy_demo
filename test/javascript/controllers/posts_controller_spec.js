require("../spec_helper.js");
requireDefaultStack();
require("../../../public/javascripts/app/controllers/posts_controller.js");
require("../../../public/javascripts/app/models/post.js");

Screw.Unit(function(){
	
	before(function() {
		app = genSammyTestApp(PostsController);
		context = mock({});
	});
	
	after(function() {
		app.unload();
		context = null;
	});
	
  describe("PostsController", function(){
		
		describe("routes", function() {
			describe("responding to GET #/posts", function(){
			
		    it("it should load the posts and display the index partial", function(){
					mock(Post).should_receive("all").exactly(1, "times").and_return([]);
					context.should_receive("partial").exactly(1, "times");
					app.testRoute(context, 'get', '#/posts');
					expect(context.posts).to(equal, []);
		    });
	
			});
		
			describe("responding to GET #/posts/:id", function(){
			
		    it("it should load the post and display the show partial", function(){
					var fakePost = {title: 'hey!'};
					mock(Post).should_receive('find').with_arguments('1').exactly(1, "times").and_return(fakePost);
					context.should_receive('partial').exactly(1, 'times');
					app.testRoute(context, 'get', '#/posts/1');
					expect(context.post).to(equal, fakePost);
		    });
	
			});
		});
		
		describe("events", function() {
			describe("raising post_remove", function(){
			
		    it("it should remove the post DIV in the page", function(){
					$('#root').append('<div id="post_1"></div>');
					$('#root').append('<div id="post_2"></div>');					
					app.run('#/');
					app.trigger('post_remove', { postId: 1 });
					expect($('#post_1')).to(have_length, 0);
					expect($('#post_2')).to(have_length, 1);
		    });
	
			});
		});
  });
});