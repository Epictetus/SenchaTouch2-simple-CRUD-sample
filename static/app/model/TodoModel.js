/**
 * @class app.model.Todo
 * @extends Ext.data.Model
 */
Ext.define('app.model.TodoModel', {
  extend: 'Ext.data.Model',

  fields: [
    {name: "id",    type: "int"},
    {name: "title", type: "string"},
    {name: "priority", type: "string"},
    {name: "deadline", type: "string"},
    {name: "detail", type: "string"}
  ],

  proxy: {
    type: 'ajax',
    url: 'todolist',
    reader: {
      type: 'json',
      root: 'todo'
    }
  }

});
