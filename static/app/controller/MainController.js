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
      ref: 'todoList',
      selector: 'todolist'
    },
    {
      ref: 'todoDetail',
      selector: 'tododetail'
    },
    {
      ref: 'todoEditPanel',
      selector: 'todoeditpanel'
    },
    {
      ref: 'todoPanel',
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

      '#edit-button': {
        tap: this.onEditButtonTap
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
    var panel = this.getTodoEditPanel(),
        form = panel.down('formpanel'),
        newTodo = Ext.create('app.model.TodoModel', {
          id: '',
          title: '',
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

  onEditButtonTap: function(btn, event) {
    var detail = this.getTodoDetail(),
        detailForm = detail.down('formpanel'),
        record = detailForm.getRecord(),
        editPanel = this.getTodoEditPanel(),
        editForm = editPanel.down('formpanel'),
        mainView = Ext.getCmp('main-view');

    editForm.setRecord(record);

    mainView.showPanel(editPanel, {
      type: 'slide',
      direction: 'left'
    });
  },

  onDeleteButtonTap: function() {
    var view = this.getTodoDetail(),
        dialog = view.down('#delete-confirm-dialog');
    dialog.confirm({
      title: 'Confirm',
      msg: 'Do you want to remove this TODO?',
      scope: this,
      fn: function(btn) {
        if (btn == 'yes') {
          this.doDelete();
        }
      }
    });
  },

  onSaveButtonTap: function() {
    var view = this.getTodoEditPanel(),
        dialog = view.down('#save-confirm-dialog');
    dialog.confirm({
      title : 'Confirm',
      msg: 'Do you want to save this TODO?',
      scope: this,
      fn: function(btn) {
        if (btn == 'yes') {
          this.doEdit();
        }
      }
    });
  },

  loadData: function() {
    var store = this.getTodoStore(),
        list = this.getTodoList();

    if (list.getStore() == null) {
      list.setStore(store);
      store.load();
    } else {
      list.deselect(list.getLastSelected());
      list.getStore().removeAll();
      list.getStore().load();
    }
  },

  doDelete: function() {
    var detail = this.getTodoDetail(),
        form = detail.down('formpanel'),
        values = form.getValues();

    Ext.Ajax.request({
      url: '/todo',
      method: 'post',
      scope: this,
      params: {
        id: values['id'],
        is_delete: true
      },

      success: function(){
        detail.hide();
        Ext.Msg.alert('Result', 'Remove completed ;)', this.loadData, this);
      },

      failure: function() {
        Ext.Msg.alert('Result', 'Failure! Internal error occurred.');
      }
    });
  },

  doEdit: function() {
    var view = this.getTodoEditPanel(),
        detail = this.getTodoDetail(),
        form = view.down('formpanel'),
        values = form.getValues();

    Ext.Ajax.request({
      url: '/todo',
      method: 'post',
      scope: this,
      params: {
        id: values['id'],
        title: values['title'],
        detail: values['detail']
      },

      success: function(){
        detail.hide();
        this.onCancelButtonTap();
        Ext.Msg.alert('Result', 'Save completed ;)', this.loadData, this);
      },

      failure: function() {
        Ext.Msg.alert('Result', 'Failure! Internal error occurred.');
      }
    });
  }

});

