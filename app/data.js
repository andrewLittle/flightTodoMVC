'use strict';

define(
	function() {
		// Pull todos out of local storage or set to empty
		var storedTodos = JSON.parse(localStorage.getItem('todos')) || '';
		if(storedTodos != '') {
			return  { todos: storedTodos };
		} else {
			return { todos: [] };
		}
	}
);