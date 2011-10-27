/**
 * @class app.view.todo.TodoEditPanel
 * @extends Ext.Panel
 */
Ext.define('app.view.todo.TodoEditPanel', {
  extend: 'Ext.Panel',
  id: 'todo-edit-panel',
  xtype: 'todoeditpanel',

  config: {
    layout: 'fit',

    items: [
      {
        layout: 'fit',

        items: [
          {
            docked: 'top',
            xtype : 'toolbar',
            title: 'Todo',
            items: [
              {
                xtype: 'button',
                id: 'cancel-button',
                ui: 'back',
                text: 'Cancel'
              }
            ]
          },

          {
            xtype: 'todoform',
            id: 'create-todo-form'
          },

          {
            docked: 'bottom',
            xtype : 'toolbar',
            items: [
              {
                xtype: 'spacer'
              },

              {
                xtype: 'spacer'
              },

              {
                xtype: 'button',
                id: 'save-button',
                ui: 'action',
                text: 'Done'
              }
            ]
          }
        ]
      },

      {
        xtype: 'confirmdialog',
        id: 'save-confirm-dialog'
      }
    ]
  }
});
