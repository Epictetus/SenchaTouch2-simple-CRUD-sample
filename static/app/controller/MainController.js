/*
 * @class app.controller.MainController
 * @extends Ext.app.Controller
 */
Ext.define('app.controller.MainController', {
  extend: 'Ext.app.Controller',

  views: [
    'Main',
    'todo.TodoPanel',
    'todo.TodoEditPanel'
  ],

  stores: [
    'Todo'
  ],

  refs: [
    {
      ref     : 'todoList',
      selector: 'todolist'
    },

    {
      ref     : 'todoDetail',
      selector: 'tododetail'
    },

    {
      ref     : 'todoEdit',
      selector: 'todoeditpanel'
    },

    {
      ref     : 'todoPanel',
      selector: 'todopanel'
    }
  ],

  init: function() {
    this.control({
      '#todo-list': {
        show: this.onShowList,
        select: this.onListSelect
      },

      '#refresh-button': {
        tap: this.onRefreshButtonTap
      },

      '#add-button': {
        tap: this.onAddButtonTap
      },

      '#back-button': {
        tap: this.onBackButtonTap
      },

      '#cancel-button': {
        tap: this.onCancelButtonTap
      },

      '#delete-button': {
        tap: this.onDeleteButtonTap
      },

      '#save-button': {
        tap: this.onSaveButtonTap
      }
    });

    this.getMainView().create();
  },

  onShowList: function() {
    this.loadData();
  },

  onRefreshButtonTap: function() {
    this.loadData();
  },

  onListSelect: function(list, todo) {
    var detail = this.getTodoDetail(),
        form = detail.down('formpanel');
    if (detail == null) {
      detail = this.getView('todo.TodoDetail').create();
      form = detail.down('formpanel');
    }
    form.setRecord(todo);
    detail.show();
  },

  onAddButtonTap: function(btn) {
    var panel = this.getTodoEdit(),
        form = panel.down('formpanel'),
        newTodo = Ext.create('app.model.TodoModel', {
          title: '',
          priority: '',
          deadline: new Date(),
          detail: ''
        }),
        mainView = Ext.getCmp('main-view');

    form.setRecord(newTodo);
    mainView.showPanel(panel, {
      type: 'slide',
      direction: 'left'
    });
  },

  onBackButtonTap: function() {
    var view = this.getTodoDetail();
    view.hide();
  },

  onCancelButtonTap: function() {
    var panel = this.getTodoPanel(),
        mainView = Ext.getCmp('main-view');
    mainView.showPanel(panel, {
      type: 'slide',
      direction: 'right'
    });
  },

  onDeleteButtonTap: function() {
    var view = this.getTodoDetail(),
        dialog = view.down('#delete-confirm-dialog');
    dialog.alert({
      title : 'Confirm',
      msg   : 'Do you delete this task?',
      scope: this,
      fn: function(btn) {
        if (btn == 'yes') {
          console.log('a a a..');
        }
      }
    });
  },

  onSaveButtonTap: function() {
    var view = this.getTodoEdit(),
        dialog = view.down('#save-confirm-dialog');
    dialog.alert({
      title : 'Confirm',
      msg   : 'Do you save this task?',
      scope: this,
      fn: function(btn) {
        if (btn == 'yes') {
          console.log('a a a..');
        }
      }
    });
  },

  loadData: function() {
    var todoStore = this.getTodoStore(),
        todoList = this.getTodoList();
    todoList.setStore(todoStore);
    todoStore.load();
  }

});
