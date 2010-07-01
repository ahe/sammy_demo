(function($) {
  
  Sammy = Sammy || {};
  
  Sammy.Test = function() {
	
		this.testRoute = function(context, verb, path, params, target) {
      var app = this,
          route = this.lookupRoute(verb, path),
          wrapped_route,
          arounds,
          around,
          befores,
          before,
          callback_args,
          final_returned;

      this.log('runRoute', [verb, path].join(' '));
      this.trigger('run-route', {verb: verb, path: path, params: params});
      if (typeof params == 'undefined') { params = {}; }

      $.extend(params, this._parseQueryString(path));

      if (route) {
        this.trigger('route-found', {route: route});
        // pull out the params from the path
        if ((path_params = route.path.exec(this.routablePath(path))) !== null) {
          // first match is the full path
          path_params.shift();
          // for each of the matches
          $.each(path_params, function(i, param) {
            // if theres a matching param name
            if (route.param_names[i]) {
              // set the name to the match
              params[route.param_names[i]] = decodeURIComponent(param);
            } else {
              // initialize 'splat'
              if (!params.splat) { params.splat = []; }
              params.splat.push(decodeURIComponent(param));
            }
          });
        }
				
				context.verb = verb;
				context.path = path;				
				context.params = params;
				context.target = target;				
				
				// set event context
        //context  = new this.context_prototype(this, verb, path, params, target);
				
        // ensure arrays
        arounds = this.arounds.slice(0);
        befores = this.befores.slice(0);
        // set the callback args to the context + contents of the splat
        callback_args = [context].concat(params.splat);
        // wrap the route up with the before filters
        wrapped_route = function() {
          var returned;
          while (befores.length > 0) {
            before = befores.shift();
            // check the options
            if (app.contextMatchesOptions(context, before[0])) {
              returned = before[1].apply(context, [context]);
              if (returned === false) { return false; }
            }
          }
          app.last_route = route;
					//context.trigger('event-context-before', {context: context});
          returned = route.callback.apply(context, callback_args);
          //context.trigger('event-context-after', {context: context});
          return returned;
        };
        $.each(arounds.reverse(), function(i, around) {
          var last_wrapped_route = wrapped_route;
          wrapped_route = function() { return around.apply(context, [last_wrapped_route]); };
        });
        try {
          final_returned = wrapped_route();
        } catch(e) {
          this.error(['500 Error', verb, path].join(' '), e);
        }
        return final_returned;
      } else {
        return this.notFound(verb, path);
      }
    };
  };
  
})(jQuery);