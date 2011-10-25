/*
 * @class app.view.MainView
 * @extends Ext.Container
 */
Ext.define('app.view.Main', {
  extend: 'Ext.Container',
  id: 'main-view',

  config: {
    fullscreen: true,
    layout: {
      type: 'card'
    },

    items: [
      {
        xtype: 'todopanel'
      },

      {
        xtype: 'todoeditpanel'
      }
    ]
  },

  showPanel: function(panel, animation) {
    this.getLayout().setAnimation(animation);
    this.setActiveItem(panel);
  }

});
