/**
 * @author:sjl
 * @date:2017-08-03
 * @desc:test2相关js
 */
define([
    'contabs'
], function() {
    function G(id) {
        return document.getElementById(id);
    }

    function addEvent(obj, ev, handler) {
        if (window.attachEvent) {
            obj.attachEvent("on" + ev, handler);
        } else if (window.addEventListener) {
            obj.addEventListener(ev, handler, false);
        }
    }

    function test(e) {
        alert("e.target.tagName : " + e.target.tagName + "\n e.currentTarget.tagName : " + e.currentTarget.tagName);
    }
    var test2 = {
        init: function() {
            var outer = G("outer");
            var inner = G("inner");
            //addEvent(inner, "click", test);  
            addEvent(outer, "click", test);
            console.log('test2');
        }
    }



    test2.init();
})