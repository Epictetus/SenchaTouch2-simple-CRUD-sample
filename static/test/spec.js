// Sorry.. test code is currently under construction.
describe("Sencha Touch 2 Simple CRUD Sample App", function() {

  it("load the data during the initial display.", function() {
    var view = Ext.getCmp('main-view'),
        list = view.down('todolist');
    expect(list.getStore().count()).toBeGreaterThan(0);
  });

  it("display details screen when select a row.", function() {
    var view = Ext.getCmp('main-view'),
        list = view.down('todolist'),
        record = list.getStore().getAt(0),
        detail = Ext.getCmp('todo-detail');
    list.select(record);
    expect(detail._hidden).toBe(false);
  });

  it("close details screen when press the back button.", function() {
    var detail = Ext.getCmp('todo-detail'),
        button = detail.down('#back-button');
    button.fireEvent('tap');
    setTimeout(function() {
      expect(detail._hidden).toBe(true);
    }, 3000);
  });

  it("can create a record.", function() {
    var view = Ext.getCmp('main-view'),
        list = view.down('todolist'),
        beforeCount = list.getStore().count();

    Ext.Ajax.request({
      url: '/todo',
      params: {
        title: 'created by test code.',
        detail: 'egg spam ham...'
      },
      scope: this,
      success: function(){
        list.getStore().load();
      }
    });

    setTimeout(function() {
      expect(list.getStore().count()).toBeGreaterThan(beforeCount);
    }, 3000);

  });

  // .....

});
