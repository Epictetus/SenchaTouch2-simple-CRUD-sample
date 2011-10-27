/**
 * @class app.view.todo.TodoForm
 * @extends Ext.form.Panel
 */
Ext.define('app.view.todo.TodoForm', {
  extend: 'Ext.form.Panel',
  id: 'todo-form',
  xtype: 'todoform',

  config: {
    items: [
      {
        xtype: 'hiddenfield',
        name: 'id'
      },

      {
        xtype: 'textfield',
        name : 'title',
        label: 'Title'
      },

      {
        xtype: 'textareafield',
        name : 'detail',
        label: 'Detail'
      }
    ]
  }
});
