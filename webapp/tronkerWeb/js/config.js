require.config({
    baseUrl: '/tronkerWeb/js/',
    paths: {
        jquery: 'plugins/jquery.min',
        global: 'global', // 全局模块，用来定义全局变量以及工具函数
        common: 'common', // 公用模块，前期依赖以及初始化公用模块
        bootstrap: 'plugins/bootstrap/bootstrap.min',
        bootstraptable: 'plugins/bootstrap-table/bootstrap-table.min',
        ejs: 'plugins/ejs/ejs',
        text: 'plugins/text',
        rejs: 'plugins/rejs',
        metisMenu: 'plugins/metisMenu/jquery.metisMenu',
        layer: 'plugins/layer/layer.min',
        slimScroll: 'plugins/slimScroll/jquery.slimscroll.min'
    },
    shim: {
        jquery: {
            exports: '$'
        },
        bootstrap: {
            deps: ['jquery']
        },
        bootstraptable: {
            deps: ['jquery', 'css!/tronkerWeb/css/bootstraptable/bootstrap-table.min']
        },
        metisMenu: {
            deps: ['jquery']
        },
        layer: {
            deps: ['jquery']
        },
        slimScroll: {
            deps: ['jquery']
        },
        ejs: {
            exports: 'ejs'
        },
        cas: {
            deps: ['jquery']
        }
    },
    map: {
        '*': {
            'css': 'plugins/require-css/css'
        }

    }
});