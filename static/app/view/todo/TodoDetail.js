/**
 * @class app.view.todo.TodoDetail
 * @extends Ext.Sheet
 */
Ext.define('app.view.todo.TodoDetail', {
  extend: 'Ext.Sheet',
  xtype: 'tododetail',

  requires: [
    'app.view.todo.TodoForm',
    'app.view.ui.ConfirmDialog'
  ],

  config: {
    modal: true,
    centered : false,
    top: 0,
    right: 0,
    layout: 'fit',

    items: [
      {
        xtype: 'panel',
        layout: 'fit',

        items: [

          {
            docked: 'top',
            xtype : 'toolbar',
            title: 'Todo',

            items: [
              {
                xtype: 'button',
                id: 'back-button',
                ui: 'back',
                text: 'Back'
              }
            ]

          },

          {
            xtype: 'todoform',
            id: 'view-todo-form'
          },

          {
            docked: 'bottom',
            xtype : 'toolbar',
            items: [
              {
                xtype: 'button',
                id: 'edit-button',
                ui: 'action',
                iconCls: 'compose',
                iconMask: true
              },

              {
                xtype: 'spacer'
              },

              {
                xtype: 'button',
                id: 'delete-button',
                ui: 'action',
                iconCls: 'delete',
                iconMask: true
              }
            ]
          }
        ]
      },

      {
        xtype: 'confirmdialog',
        id: 'delete-confirm-dialog'
      }
    ]
  },

  animationDuration: 300,

  show: function() {
    this.callParent();

    Ext.Animator.run(
      [
        {
          element  : this.element,
          xclass   : 'Ext.fx.animation.SlideIn',
          direction: 'left',
          duration : this.animationDuration
        },

        {
          element : 'ext-mask-1',
          xclass  : 'Ext.fx.animation.FadeIn',
          duration: this.animationDuration
        }
      ]
    );
  },

  hide: function() {
    var me = this,
        mask = Ext.getCmp('ext-mask-1');

    this.fireEvent('hideanimationstart', this);

    mask.show();

    Ext.Animator.run(
      [
        {
          element  : me.element,
          xclass   : 'Ext.fx.animation.SlideOut',
          duration : this.animationDuration,
          preserveEndState: false,
          direction: 'right',
          onEnd: function() {
            me.setHidden(true);
            mask.setHidden(true);
          }
        },

        {
          element : 'ext-mask-1',
          xclass  : 'Ext.fx.animation.FadeOut',
          duration: this.animationDuration
        }
      ]
    );
  }

});
