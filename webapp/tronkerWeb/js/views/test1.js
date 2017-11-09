/**
 * @author:sjl
 * @date:2017-08-03
 * @desc:test1相关js
 */
define([
    'contabs'
], function() {
    function openNewTab(link) {
        var frm = $('<form   method="get" action="' + link + '" target="_blank"></form>')
        $("body").append(frm);
        frm.submit().remove();
    }
    var test = {
        init: function() {
            $('#btn-refresh').on('click', function() {
                // openNewTab('http://www.baidu.com');
                var win = window.open("http://www.baidu.com", '_blank');
                win.focus();
            })
        }
    }
    test.init();
})