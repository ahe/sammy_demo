function requireDefaultStack(path) {
	var path = (path == null) ? '' : path
	
	require(path + "../../../public/javascripts/underscore-min.js");
	require(path + "../../../public/javascripts/js-model-0.8.3.min.js");
	require(path + "../../../public/javascripts/sammy/sammy-0.5.4.min.js");
	require(path + "../../../public/javascripts/sammy/plugins/sammy.template.js");
	require(path + "../../../public/javascripts/sammy/plugins/sammy.nested_params.js");
	require(path + "../../../public/javascripts/sammy/plugins/sammy.test.js");	
}

function genSammyTestApp(controller) {
	return $.sammy(function() {
		this.element_selector = '#root';
		this.use(Sammy.Test);
		VIEW_PATH = '/javascripts/app/views/';

		controller(this);
		
		this.get('#/', function() {})

	});
}

function loadTemplate(path, callback) {
	alert('test');
	$.get(path, function(template) {
		alert(template);
	  callback.call(this, template);
	});
}

var srender_cache = {};
var srender = function(name, template, data) {
  // target is an optional element; if provided, the result will be inserted into it
  // otherwise the result will simply be returned to the caller   
  if (srender_cache[name]) {
    fn = srender_cache[name];
  } else {
    if (typeof template == 'undefined') {
      // was a cache check, return false
      return false;
    }
    // Generate a reusable function that will serve as a template
    // generator (and which will be cached).
    fn = srender_cache[name] = new Function("obj",
    "var p=[],print=function(){p.push.apply(p,arguments);};" +

    // Introduce the data as local variables using with(){}
    "with(obj){p.push(\"" +

    // Convert the template into pure JavaScript
    template
      .replace(/[\r\t\n]/g, " ")
      .replace(/\"/g, '\\"')
      .split("&lt;%").join("\t")
      .replace(/((^|%&gt;)[^\t]*)/g, "$1\r")
      .replace(/\t=(.*?)%&gt;/g, "\",$1,\"")
      .split("\t").join("\");")
      .split("%&gt;").join("p.push(\"")
      .split("\r").join("")
      + "\");}return p.join('');");
  }

  if (typeof data != 'undefined') {
    return fn(data);
  } else {
    return fn;
  }
};