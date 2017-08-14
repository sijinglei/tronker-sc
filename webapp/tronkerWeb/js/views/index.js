/**
 * @author:sjl
 * @date:2017-08-03
 * @desc:后台首页js
 */
define([
    'rejs!/tronkerWeb/templates/menu',
    'mock',
    'common',
    'contabs'
], function(menuTemp, Mock) {

    var index = {
        init: function() {
            this.initMenu();
            this.bindEvent();
        },

        initMenu: function() {
            var data = [{
                menuName: '主页',
                Url: 'center.html',
                menulist: [{
                    menuName: '收件箱',
                    Url: './page1/test1.html',
                    menulist: []
                }, {
                    menuName: '个人介绍',
                    Url: './page2/test2.html',
                    menulist: []
                }, {
                    menuName: '表格',
                    Url: './page2/table.html',
                    menulist: []
                }]
            }, {
                menuName: '工具',
                Url: '#',
                menulist: [{
                    menuName: '表单构建器',
                    Url: 'form_builder.html',
                    menulist: []
                }]
            }];
            this.setMenu({ 'data': data });
        },
        bindEvent: function() {
            var _this = this;
            $('.sidebar-menu').on('click', 'li', function() {
                var menuId = $(this).find('a').data('menu-id');
                var data = _this.getSecondMenuList();
                _this.setMenu(data);
                $(this).addClass('active').siblings().removeClass('active');
            })
        },
        changeFirstMenu: function() {


        },
        setMenu: function(data) {
            var _html = menuTemp(data);
            $('#side-menu').html(_html);
        },
        getSecondMenuList: function() {
            var data = Mock.mock({
                'data|1-15': [{
                    'id|+1': 1,
                    'menuName': '@ctitle(3, 5)',
                    'Url': function() {
                        return './page' + this.id + '/test' + this.id + '.html';
                    },
                    'menulist|1-3': [{
                        'id|+1': 1,
                        'menuName': '@ctitle(3, 5)',
                        'Url': function() {
                            return './page' + this.id + '/test' + this.id + '.html';
                        }
                    }]
                }]
            });
            return data;
        }
    }
    index.init();
})