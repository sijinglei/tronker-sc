/**
 * @author:sjl
 * @date:2017-08-09
 * @desc:test1相关js
 */
define([
    'vue',
    '$',
    'tPage',
    'query',
    'iCheck',
    'bootstrap',
    'bootstraptable'
], function(Vue, $, Paging) {

    var vm;
    var test = {
        init: function() {
            this.initVueObj();
            this.bindEvent();
            $('#pageTool').Paging({
                pagesize: 10,
                count: 120,
                toolbar: true,
                callback: function(page, size, count) {
                    console.log(arguments)
                    alert('当前第 ' + page + '页,每页 ' + size + '条,总页数：' + count + '页')
                }
            });
        },
        initVueObj: function() { //vue实例方法
            var _this = this;
            vm = new Vue({
                el: '#app',
                data: {
                    message: '商品列表',
                    data: [{
                        id: 1,
                        name: 'ddd'
                    }],
                    isCheckAll: false
                },
                methods: _this.vueMethods()

            })
        },
        vueMethods: function() {
            return {
                add: function() {
                    console.log('33333');
                },
                search: function() {
                    console.log(this.data);
                }
            }
        },
        bindEvent: function() { //jquery方法要等vue实例渲染完才能加载
            $(".i-checks").iCheck({
                checkboxClass: "icheckbox_square-blue",
                radioClass: "iradio_square-blue",
            })
            $('#checkAll').on('ifChecked', function(event) {
                $('input.i-checks').iCheck('check');
            });
            $('#checkAll').on('ifUnchecked', function(event) {
                $('input.i-checks').iCheck('uncheck');
            });
            $('#example1').on('click', function() {
                console.log(vm); //vue实例
            })
        }
    }
    test.init();
})