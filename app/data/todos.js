'use script';

define(

	[
	'components/flight/lib/component',
	'components/mustache/mustache',
	'app/data',
	'app/templates'
	],

	function(defineComponent, Mustache, dataStore, templates) {
		return defineComponent(todos);

	    function todos() {
			this.defaultAttrs({
				// none needed
			});

			// Trigger action for the view to display todo list with 
			// markup for todo list and number of todos completed and 
			// a flag to determine if all todos are completed, then save
			// todo list to local storage for persistence
			this.serveTodos = function(ev, data) {
				this.trigger('todosServed', {
					markup: this.renderItems(),
					count: this.renderCount(),
					allChecked : this.determineAllChecked()
				});
				localStorage.setItem('todos', JSON.stringify(dataStore.todos));
			}

			// Return markup for todo list from Mustache
			this.renderItems = function() {
				return Mustache.render(templates.todos, {todos: dataStore.todos});
			}

			// Determine number of tasks left and completed, trigger view to 
			// display Clear Completed button with correct number completed,
			// then return markup for number of todos left from Mustache
			this.renderCount = function() {
				var left = 0,
					completed = 0,
					multiple = true;

				if(dataStore.todos.length > 0) {
					dataStore.todos.forEach(function(todo) {
						if(!todo.complete) {
							left++;
						} else {
							completed++;
						}
					});
				}
				// This is for getting verbage right in markup
				if(left == 1) {
					multiple = false;
				}
				this.trigger('displayClearCompleted', {
					count: completed
				});
				return Mustache.render(templates.count, {count: left, multiple: multiple});
			}

			// Determine if all todos are completed
			this.determineAllChecked = function() {
				var allChecked = false;

				if(dataStore.todos.length > 0) {
					allChecked = dataStore.todos.every(function(todo) {
						return (todo.complete === true);
					});
				}

				return allChecked;
			}

			// Remove all completed todos at once, then redraw the list
			this.clearCompleted = function() {
				// not completely happy with this but it's working for now
				var tempArray = dataStore.todos.slice(0);

				dataStore.todos.length = 0;
				tempArray.forEach(function(todo) {
					if(!todo.complete) {
						dataStore.todos.push(todo);
					}
				});

				this.serveTodos();
			}

			// Set all todos to status passed from view, then redraw the lis
			this.setAll = function(ev, data) {
				dataStore.todos.forEach(function(todo) {
					todo.complete = data.toggle;
				});

				this.serveTodos();
			}

			// Set listeners
			this.after('initialize', function() {
				this.on('uiTodosRequested', this.serveTodos);
				this.on('uiClearCompleted', this.clearCompleted);
				this.on('uiToggleAll', this.setAll);
			});
		}
	}
);