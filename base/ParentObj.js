/**
 * Created by admin on 2016/3/27.
 */
require('../bin/runner.js');

function Obj(o){
    function F(){}
    F.prototype=o;
    return new F();
}

function create(parent,test){
    var f=obj(parent.prototype);
    f.constructor=test;//create new child obj, and the constructor method will be 'test'.
}
function ParentObj(browser){
    this.browser=browser;
    this.weburl='https://www.baidu.com/';
    this.username='';
    this.password='';
    this.screenshotPath='./screenshots/';
}

ParentObj.prototype.openUrl=function(){//this method 'run' can be shared.you can use prototype to add fields and methods.
    return this.browser.url(this.weburl).pause(1000);
};

ParentObj.prototype.waitForElement=function(target){//The selector (CSS / Xpath) used to locate the target element.
    return this.browser.waitForElementVisible(target, 1000);
};

ParentObj.prototype.setValue=function(target, value){
    return this.browser.setValue(target, value).pause(1000);
};

ParentObj.prototype.click=function(target){
    return this.browser.click(target).pause(1000);
};

ParentObj.prototype.closeWindow=function(){
    return this.browser.end();
};

ParentObj.prototype.takeScreenshots=function(screenshotName){
    var now = new Date();
    return this.browser.saveScreenshot(this.screenshotPath + getDateString(now) + '_' + screenshotName +'.png');
};

exports.inheritParentObj = function(child, browser){
    ParentObj.call(child, browser);
};

exports.setProtoType = function(){
    return Obj(ParentObj.prototype);
};


function getDateString(date){
    var year = date.getFullYear();
    var month =(date.getMonth() + 1).toString();
    var day = (date.getDate()).toString();
    var hour = (date.getHours()).toString();
    var minute = (date.getMinutes()).toString();
    var second = (date.getSeconds()).toString();

    if (month.length == 1) {
        month = "0" + month;
    }
    if (day.length == 1) {
        day = "0" + day;
    }

    if (hour.length == 1) {
        hour = "0" + hour;
    }

    if (minute.length == 1) {
        minute = "0" + minute;
    }

    if (second.length == 1) {
        second = "0" + second;
    }
    return (year + month + day + hour + minute + second);
}

/*
function Child(name,age){
    ParentObj.call(this,name);//inherit Parent
    this.age=age;
}
Child.prototype = obj(ParentObj.prototype);//do not use 'new' to create child class, use this method, just
                                            // inherit the public or shared methods in parent class.

var test=new Child("masike",19);
test.arr.push("withershins");
console.log(test.arr);
console.log(test.run());

var test2=new Child("jack",22);
console.log(test2.arr);*/
