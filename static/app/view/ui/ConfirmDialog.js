/**
 * @class app.view.todo.ConfirmDialog
 * @extends Ext.MessageBox
 */
Ext.define('app.view.ui.ConfirmDialog', {
  extend: 'Ext.MessageBox',
  xtype: 'confirmdialog',

  alert : function(config) {
    var title = config.title,
        msg = config.msg,
        fn = config.fn,
        scope = config.fn;

    return this.show({
      title : config.title,
      msg   : config.msg,
      buttons: Ext.MessageBox.YESNO,
      fn: function(button) {
        fn.call(scope, button);
      },
      scope : scope,
      icon: Ext.MessageBox.QUESTION
    });
  }

});
