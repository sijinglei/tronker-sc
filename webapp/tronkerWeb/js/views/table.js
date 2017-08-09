/**
 * @author:sjl
 * @date:2017-08-09
 * @desc:test1相关js
 */
define([
    'vue',
    'iCheck',
    'bootstrap',
    'bootstraptable'
], function(Vue) {

    var vm;
    var test = {
        init: function() {
            this.initVueObj();
            this.bindEvent();
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
                checkboxClass: "icheckbox_square-green",
                radioClass: "iradio_square-green",
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