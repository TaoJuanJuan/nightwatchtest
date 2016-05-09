/**
 * Created by admin on 2016/2/28.
 */
var parent = require('../base/ParentObj.js');

function testChild(browser){
    parent.inheritParentObj(this,browser);//inherit Parent
}
testChild.prototype = parent.setProtoType();

module.exports = {
    'Demo test Baidu' : function (browser) {
        var testChildObj = new testChild(browser);
        testChildObj.openUrl();
        testChildObj.waitForElement('body');
        testChildObj.takeScreenshots('BaiduHome');
        testChildObj.setValue( 'input[id=kw]', 'nightwatch');
        testChildObj.waitForElement('input[id=su]');
        testChildObj.click('input[id=su]');
        testChildObj.takeScreenshots('SearchResult');

        testChildObj.closeWindow();
        /*browser
            .url('')
            .waitForElementVisible('body', 1000)
            .setValue('input[id=kw]', 'nightwatch')
            .waitForElementVisible('input[id=su]', 1000)
            .click('input[id=su]')
            .pause(5000);*/
            //.end();
    }
};