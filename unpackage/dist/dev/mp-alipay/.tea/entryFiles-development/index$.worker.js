if(!self.__appxInited) {
self.__appxInited = 1;


require('./config$');


var AFAppX = self.AFAppX.getAppContext
  ? self.AFAppX.getAppContext().AFAppX
  : self.AFAppX;
self.getCurrentPages = AFAppX.getCurrentPages;
self.getApp = AFAppX.getApp;
self.Page = AFAppX.Page;
self.App = AFAppX.App;
self.my = AFAppX.bridge || AFAppX.abridge;
self.abridge = self.my;
self.Component = AFAppX.WorkerComponent || function(){};
self.$global = AFAppX.$global;
self.requirePlugin = AFAppX.requirePlugin;
        


function success() {
require('../../app');
require('../../pages/tabbar/menus/menu');
require('../../pages/tabbar/cart/cart');
require('../../pages/tabbar/cart/cashier-desk');
require('../../pages/tabbar/cart/pay-success');
require('../../pages/tabbar/order/order');
require('../../pages/tabbar/order/order-detail');
require('../../pages/tabbar/my/my');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}