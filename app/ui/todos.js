'use strict';

define(
	[
		'components/flight/lib/component'
	],

	function(defineComponent) {

		return defineComponent(todos);

		function todos() {
			this.defaultAttrs({
				// selectors
				todosList: '#todo-list',
				todoCount: '#todo-count',
				clearCompleted: '#clear-completed',
				toggleAll: '#toggle-all',
				filter: '.filter',
				footer: '#footer',
				main: '#main'
			});

			// Draw all existing todos, hide the main and footer
			// sections if there aren't any, and set the toggle-all
			// element to checked if all todos are completed
			this.renderTodos = function(ev, data) {
				this.select('todosList').html(data.markup);
				this.select('todoCount').html(data.count);
				if($('.todo').length == 0) {
					this.select('footer').css({'display': 'none'});
					this.select('main').css({'display': 'none'});
				} else {
					this.select('footer').css({'display': ''});
					this.select('main').css({'display': ''});
				}
				if(data.allChecked) {
					this.select('toggleAll').prop('checked', true);
				} else {
					this.select('toggleAll').prop('checked', false);
				}
			}

			// Display the clear completed button in the footer
			// section if any todos are completed
			this.displayClearCompleted = function(ev, data) {
				if(data.count > 0) {
					this.select('clearCompleted').css({'display': ''}).html('Clear Completed (' + data.count + ')');
				} else {
					this.select('clearCompleted').css({'display': 'none'});
				}
			}

			// Trigger the controller to remove all completed todos
			this.clearAllCompleted = function() {
				this.trigger('uiClearCompleted');
			}

			// Handle filter clicks in the footer section
			this.setFilter = function(ev, data) {
				var $item = $(data.el);

				this.select('filter').removeClass('selected');
				$item.addClass('selected');

				$('.todo').css({'display': ''});
				if ($item.text() == 'Active') {
					$('.completed').css({'display': 'none'});
				} else if ($item.text() == 'Completed') {
					$('.todo:not(.completed)').css({'display': 'none'});
				}
			}

			// Capture if the toggle-all checkbox is on or off and 
			// trigger controller action to set all todos appropriately
			this.toggleAll = function(ev, data) {
				var $item = $(data.el);

				this.trigger('uiToggleAll', {
					toggle: $item.is(':checked')
				});
			}

			// Set listeners
			this.after('initialize', function() {
				this.on('todosServed', this.renderTodos);
				this.on('displayClearCompleted', this.displayClearCompleted);
				this.on('click', {
					'clearCompleted': this.clearAllCompleted,
					'filter': this.setFilter,
					'toggleAll': this.toggleAll
				});

				// This fires on intial page load
				this.trigger('uiTodosRequested');
			});
		}
	}
);