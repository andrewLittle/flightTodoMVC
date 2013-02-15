'use strict';

define(
	[
		'components/flight/lib/component'
	],

	function(defineComponent) {

		return defineComponent(todo);

		function todo() {
			this.defaultAttrs({
				//selectors
				newTodo: '#new-todo',
				toggle: '.toggle',
				toggleAll: '#toggle-all',
				todoItem: 'label',
				edit: '.edit',
				remove: '.destroy'
			});

			// On the enter key being press set the value in data,
			// reset input value to empty, and trigger controller action
			this.addTodo = function(ev) {
				if(ev.keyCode == 13) {
					var data = {
						title: this.select('newTodo').val()
					}
					this.select('newTodo').val('');
					this.trigger('uiAddTodo', data);
				}
			}

			// For a single todo item, handle clicking finished
			// checkbox and update controller
			this.toggleComplete = function(ev, data) {
				var $item = $(data.el),
					title = $item.siblings('label').text(),
					isChecked = $item.is(':checked');

				if(isChecked) {
					$item.parents('li').addClass('completed');
				} else {
					$item.parents('li').removeClass('completed');
				}

				this.trigger('uiTodoUpdated', {
					title: title,
					complete: isChecked
				});
			}

			// Handle double clicking to edit existing todo item
			this.editTodo = function(ev, data) {
				var $item = $(data.el);

				$item.parents('li').addClass('editing');
				$('.edit').focus();
			}

			// On enter key press after editing existing todo
			// item, set li back to normal, clear out entered 
			// value, attach values to trigger for controller
			// and fire. If nothing entered, set it back to old
			// value
			this.updateTodo = function(ev, data) {
				var $item = $(data.el),
					oldValue = $item.attr('data-title'),
					newValue = $item.val();

				if(ev.keyCode == 13) {
					if(newValue.trim() == '') {
						newValue = oldValue;
					}
					$item.parents('li').removeClass('editing');
					$item.val('');

					this.trigger('uiTodoUpdated', {
						newTitle: newValue,
						title: oldValue
					});
				}
			}

			// On click of delete 'x' for single todo, capture
			// todo title, attach it to trigger, and fire
			this.removeTodo = function(ev, data) {
				var $item = $(data.el),
					removeTitle = $item.siblings('label').text();

				this.trigger('uiRemoveTodo', {
					title: removeTitle
				});
			}

			// Set listeners
			this.after('initialize', function() {
				this.on('keypress', {
					'newTodo': this.addTodo,
					'edit': this.updateTodo
				});
				this.on('click', {
					'toggle': this.toggleComplete,
					'remove': this.removeTodo
				});
				this.on('dblclick', {
					'todoItem': this.editTodo
				})
			});
		}
	}
);