/**
 * @class app.model.Todo
 * @extends Ext.data.Model
 */
Ext.define('app.model.TodoModel', {
  extend: 'Ext.data.Model',

  fields: [
    {name: "id",    type: "string"},
    {name: "title", type: "string"},
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
