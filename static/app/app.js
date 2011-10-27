/*
 * Bootstrap for Simple CRUD sample application :)
 */
Ext.Loader.setConfig({
  enabled: true,
  paths: {
    'app': './static/app'
  }
});

Ext.application({
  name: 'app',
  appFolder: 'static/app',
  controllers: [
    'MainController'
  ]
});
