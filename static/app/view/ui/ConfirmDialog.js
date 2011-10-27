/**
 * @class app.view.todo.ConfirmDialog
 * @extends Ext.MessageBox
 */
Ext.define('app.view.ui.ConfirmDialog', {
  extend: 'Ext.MessageBox',
  xtype: 'confirmdialog',

  confirm: function(config) {
    var title = config.title,
        msg = config.msg,
        fn = config.fn,
        scope = config.scope;

    return this.show({
      title: config.title,
      msg: config.msg,
      buttons: Ext.MessageBox.YESNO,
      promptConfig: false,
      iconCls: Ext.MessageBox.QUESTION,
      scope: scope,
      fn: fn
    });
  }

});
