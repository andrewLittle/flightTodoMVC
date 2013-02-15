'use strict';

define(
	function() {
		// markup for todo list
		var todos = 
			'{{#todos}}\
				<li class="todo{{#complete}} completed{{/complete}}">\
					<div class="view">\
						<input class="toggle" type="checkbox" \
						{{#complete}}\
							checked\
						{{/complete}}\
						>\
						<label>{{title}}</label>\
						<button class="destroy"></button>\
					</div>\
					<input class="edit" data-title="{{title}}">\
				</li>\
			{{/todos}}';

		// Markup for number of todos left
		var count = 
			'<strong>\
				{{count}}\
			</strong>\
			<span>\
				{{#multiple}}\
					items\
				{{/multiple}}\
				{{^multiple}}\
					item\
				{{/multiple}}\
					left\
			</span>';

		return {
			todos: todos,
			count: count
		}
	}
);