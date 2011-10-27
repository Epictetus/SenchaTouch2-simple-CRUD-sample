/**
 * @class app.view.todo.TodoList
 * @extends Ext.dataview.DataView
 */
Ext.define('app.view.todo.TodoList', {
  extend: 'Ext.dataview.List',
  id: 'todo-list',
  xtype: 'todolist',

  config: {
    itemTpl: '{title}',
    items: [
      {
        xtype : 'toolbar',
        docked: 'top',
        title: 'Todo List'
      },

      {
        docked: 'bottom',
        xtype : 'toolbar',
        items: [
          {
            xtype: 'button',
            id: 'refresh-button',
            text : 'Reload',
            ui: 'action',
            iconCls: 'refresh',
            iconMask: true
          },

          {
            xtype: 'spacer'
          },

          {
            xtype: 'button',
            id: 'add-button',
            ui: 'action',
            iconCls: 'add',
            iconMask: true
          }
        ]
      }
    ]
  }
});
