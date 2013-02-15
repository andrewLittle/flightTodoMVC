'use strict';

define(

  [
    'app/data/todo',
    'app/data/todos',
    'app/ui/todo',
    'app/ui/todos'
  ],

  function(
    todoUI,
    todoDATA,
    todosUI,
    todosDATA) {

    function initialize() {
      // Just attaching everything at the document level
      // maybe able to get more specific
      todoDATA.attachTo(document);
      todosDATA.attachTo(document);
      todoUI.attachTo(document);
      todosUI.attachTo(document);
    }

    return initialize;
  }
);