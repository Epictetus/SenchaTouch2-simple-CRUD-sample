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
        xtype: 'textfield',
        name : 'title',
        label: 'Title'
      },

      {
        xtype: 'selectfield',
        name : 'priority',
        label: 'Priority',
        options: [
          {text: 'High',  value: '1'},
          {text: 'Medium', value: '2'},
          {text: 'Low',  value: '3'}
        ]
      },

      {
        xtype: 'datepickerfield',
        name : 'deadline',
        label: 'Deadline'
      },

      {
        xtype: 'textareafield',
        name : 'detail',
        label: 'Detail'
      }
    ]
  }
});
