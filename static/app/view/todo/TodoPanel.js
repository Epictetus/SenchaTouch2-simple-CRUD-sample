/**
 * @class app.view.todo.TodoList
 * @extends Ext.dataview.DataView
 */
Ext.define('app.view.todo.TodoPanel', {
  extend: 'Ext.Panel',
  id: 'todo-panel',
  xtype: 'todopanel',
  requires: [
    'app.view.todo.TodoList',
    'app.view.todo.TodoDetail'
  ],

  config: {
    layout: 'fit',

    items: [
      {
        xtype: 'todolist'
      },

      {
        xtype: 'tododetail'
      }
    ]
  }
});
