Ext.define('app.store.Todo', {
  extend  : 'Ext.data.Store',
  model   : 'app.model.TodoModel',
  requires: [
    'app.model.TodoModel'
  ]
});
