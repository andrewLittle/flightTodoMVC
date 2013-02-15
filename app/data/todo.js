'use script';

define(

	[
	'components/flight/lib/component',
	'components/mustache/mustache',
	'app/data',
	'app/templates'
	],

	function(defineComponent, Mustache, dataStore, templates) {
		return defineComponent(todo);

	    function todo() {
			this.defaultAttrs({
				// none needed
			});

			// Add new todo to list and fire off trigger to 
			// redraw list
			this.add = function(ev, data) {
				dataStore.todos.push({
					title: data.title,
					complete: false
				});

				this.trigger('uiTodosRequested');
			}

			// Update existing todo and fire off trigger to
			// redraw list
			this.update = function(ev, data) {
				dataStore.todos.forEach(function(todo) {
					if(data.title == todo.title) {
						if(data.newTitle) {
							todo.title = data.newTitle;
						} else {
							todo.complete = data.complete;
						}
					}
				});

				this.trigger('uiTodosRequested');
			}

			// Remove single existing todo and fire off
			// trigger to redraw list
			this.remove = function(ev, data) {
				var index = 0;
				dataStore.todos.forEach(function(todo) {
					if(data.title == todo.title) {
						// Probably a better way to do this working for now
						dataStore.todos.splice(index, 1);
					}
					index++;
				})

				this.trigger('uiTodosRequested');
			}

			// Set listeners
			this.after('initialize', function() {
				this.on('uiAddTodo', this.add);
				this.on('uiTodoUpdated', this.update);
				this.on('uiRemoveTodo', this.remove);
			});
		}
	}
);