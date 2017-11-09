/**
 * @authors H君
 * @date    2015-10-30 11:30:58
 * @version 1.0
 */

/*************************************************************
 *	时间格式化
 *	var starTime="2015-10-28 16:10"
 *	var thisTime = new Date().Format("yyyy-MM-dd hh:mm"); 
 *************************************************************/
Date.prototype.Format = function(fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 ch
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

/*************************************************************
 * 	将时间字符串转换成时间戳，返回毫秒数
 *  时间字符串格式：2011-03-16 16:50:43
 *************************************************************/
function transdate(time) {
    return new Date(
        time.substring(0, 4),
        time.substring(5, 7) - 1,
        time.substring(8, 10),
        time.substring(11, 13),
        time.substring(14, 16),
        time.substring(17, 19)
    );
}

/*************************************************************
 * 	金额格式化（添加分隔符）
 *  @decimals {number} 保留小数位，默认保留两位小数
 *  
 *************************************************************/
function amountFormat(num, decimals) {
    var num = (parseFloat(num) || 0).toFixed(decimals === undefined ? 2 : parseInt(decimals)),
        neg = parseInt(num) < 0 ? 1 : 0,
        length = parseInt(num).toString().length - neg,
        arr = num.split('');

    for (var i = 0; i < Math.floor((length - 1) / 3); i++) {
        arr[(length % 3 === 0 ? 3 : length % 3) + i * 3 - 1 + neg] += ',';
    }

    return arr.join('');
}

/*************************************************************
 * 	将时间戳转换成时间字符串
 *************************************************************/
function getDate(timeStamp) {
    var T = new Date(timeStamp * 1000),
        Y = T.getFullYear(),
        M = T.getMonth() + 1,
        D = T.getDate(),
        h = T.getHours(),
        m = T.getMinutes(),
        s = T.getSeconds();

    (M / 10) < 1 ? M = '0' + M : '';
    (D / 10) < 1 ? D = '0' + D : '';
    (h / 10) < 1 ? h = '0' + h : '';
    (m / 10) < 1 ? m = '0' + m : '';
    (s / 10) < 1 ? s = '0' + s : '';

    return Y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s;
}


/*************************************************************
 * 	字节单位转换
 * 	
 *************************************************************/
function transBit(bit) {
    bit = parseInt(bit);

    if (bit <= 1024) {
        return bit + 'B';
    } else if (bit <= 1024 * 1024) {
        return (bit / 1024).toFixed(0) + 'KB';
    } else if (bit <= 1024 * 1024 * 1024) {
        return (bit / 1024 / 1024).toFixed(1) + 'MB';
    } else if (bit <= 1024 * 1024 * 1024 * 1024) {
        return (bit / 1024 / 1024 / 1024).toFixed(1) + 'GB';
    } else if (bit <= 1024 * 1024 * 1024 * 1024 * 1024) {
        return (bit / 1024 / 1024 / 1024 / 1024).toFixed(1) + 'TB';
    }
}


/*************************************************************
 * 	判断是否超过5分钟
 *************************************************************/
function isGreaterThanTime(timeStamp, nowtimeStamp, minutes) {
    var state,
        m = 1000 * 60 * minutes;
    var surplusT = Math.abs(nowtimeStamp - timeStamp);

    return surplusT > m ? state = true : state = false;

    //return nowtimeStamp - timeStamp > 1000 * 60 * minutes;
}

/**
 * 订单倒计时
 * @param  {number}  element 	  当前对象
 * @param  {number}  deadlineTime 截止时间:2010-10-09 10:00:10
 * @param  {funtion} callback     回调函数
 */
function orderCountdownFun(element, deadlineTime, callback) {
    getAjax('serve/getCurrentTime.html', 'get', '', function(getData) {
        var nowtimeStamp = transdate(getData.currentTime);
        // var nowtimeStamp = new Date().getTime();
        deadlineTime = transdate(deadlineTime);
        var timeDiff = deadlineTime - nowtimeStamp;
        if (timeDiff <= 0) {
            callback();
        } else {
            var intDiff = timeDiff / 1000;
            var _temp = setInterval(function() {
                var day = 0,
                    hour = 0,
                    minute = 0,
                    second = 0; //时间默认值		
                if (intDiff > 0) {
                    day = Math.floor(intDiff / (60 * 60 * 24));
                    hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
                    minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
                    second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
                }
                if (hour <= 9) hour = '0' + hour;
                if (minute <= 9) minute = '0' + minute;
                if (second <= 9) second = '0' + second;
                // $('#day_show').html(day+"天");
                // $('#hour_show').html('<s id="h"></s>'+hour+'时');
                // element.html(minute+'分'+second+'秒后自动取消');
                element.html(hour + ':' + minute + ':' + second);
                intDiff--;
                if (intDiff < 0) {
                    clearTimeout(_temp);
                    callback();
                }
            }, 1000);
            _temp = null;
        }
    })
}


/*************************************************************
 * 	IM时间格式
 *	type ：0位最近联系人列表，1为聊天窗口时间
 *	time ：传入的时间
 *	now  ：当前时间字符串（可选）
 *************************************************************/

function chatTimeFormat(type, time, now) {

    var Now = now ? transdate(now) : (new Date()),
        Time = transdate(time),

        midnight = new Date(Now.getFullYear(), Now.getMonth(), Now.getDate()), // 今天午夜临界点

        differTime = Now - Time, // 今天和目标时间相差的毫秒数
        differMid = Now - midnight, // 今天和午夜相差的毫秒数
        oneDayMs = 1000 * 60 * 60 * 24, // 一天内的毫秒数

        timeStr = time.split(' '),
        hm = timeStr[1].substring(0, 5), // 小时和分钟组成的字符串
        YMD = timeStr[0].substring(2) + (type == 0 ? '' : ' ' + hm)

    if (differTime >= (-5000) && differTime <= differMid) {
        return hm;
    } else if (differTime > differMid && differTime <= differMid + oneDayMs) {
        return '昨天 ' + hm;
    } else {
        return YMD.replace(/-/g, '/');
    }

}

/*************************************************************
 * 	对比时间差并格式化显示
 *	time ：传入的时间
 *	now  ：当前时间字符串（可选）
 *	
 *	例一：alert(timeFormat('2016-01-30 12:59:59'));
 *	例二：alert(timeFormat('2016-01-30 12:59:59', '2016-02-28 12:59:59'));
 *************************************************************/

function timeFormat(time, now) {

    var thisYear = new Date().getFullYear(),
        timeStr = time.split(' '),
        timeStrYMD = timeStr[0].split('-'),
        timeY = timeStrYMD[0],
        YMD = timeStr[0] + ' ' + timeStr[1].substring(0, 5),
        MD = timeStrYMD[1] + '-' + timeStrYMD[2] + ' ' + timeStr[1].substring(0, 5);

    var Now = now ? transdate(now) : (new Date()),
        Time = transdate(time),
        differTime = Math.abs(Time - Now);

    var Tip1 = Time > Now ? '后' : '前',
        Tip2 = Time > Now ? '刚刚' : '刚刚';

    var Y = 1000 * 60 * 60 * 24 * 365,
        M = 1000 * 60 * 60 * 24 * 30,
        D = 1000 * 60 * 60 * 24,
        H = 1000 * 60 * 60,
        m = 1000 * 60;

    if (thisYear != timeY) {
        return YMD;
    } else if (differTime > M) {
        return MD;
    } else if (differTime == M) {
        return parseInt(differTime / M) + '个月' + Tip1;
    } else if (differTime >= D) {
        return parseInt(differTime / D) + '天' + Tip1;
    } else if (differTime >= H) {
        return parseInt(differTime / H) + '小时' + Tip1;
    } else if (differTime >= m) {
        return parseInt(differTime / m) + '分钟' + Tip1;
    } else {
        return Tip2;
    }
}


/*************************************************************
 * 	格式化时间:今天\昨天\后天\逾期
 *	time ：传入的时间
 *	now  ：当前时间字符串(可选)
 *************************************************************/
function dayFormat(time, now) {

    var Now = now ? transdate(now) : transdate((new Date()).Format('yyyy-MM-dd')),
        Time = transdate(time),
        dayTimeStamp = 1000 * 60 * 60 * 24,
        differTime = Math.abs(Time - Now),
        str = '',
        type;

    if (differTime / dayTimeStamp > 3) {
        str = time;
        type = Time > Now ? 4 : -4;
    } else if (differTime / dayTimeStamp == 3) {
        str = Time > Now ? time : '逾期3天';
        type = Time > Now ? 3 : -3;
    } else if (differTime / dayTimeStamp == 2) {
        str = Time > Now ? '后天到期' : '逾期2天';
        type = Time > Now ? 2 : -2;
    } else if (differTime / dayTimeStamp == 1) {
        str = Time > Now ? '明天到期' : '逾期1天';
        type = Time > Now ? 1 : -1;
    } else {
        str = '今天到期';
        type = 0;
    }

    return {
        str: str,
        type: type
    };
}


/*************************************************************
 *	获取url参数值
 *	name:参数名称
 *************************************************************/
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.slice(1).match(reg);
    return r != null ? unescape(r[2]) : null;
}

/*************************************************************
 *	url: 地址
 *	type: 请求类型
 *	data：参数
 *	callback: 成功时回调函数
 *	errCallback: 错误时回调函数
 *	dataType: 数据类型
 *************************************************************/
function getAjax(url, type, data, callback, errCallback, dataType) {
    $.ajax({
        url: url,
        type: type,
        data: data,
        dataType: dataType || 'json',
        success: callback,
        error: errCallback
    });
}

function getAjaxBuffer(url, type, data, callback, errCallback, dataType) {
    $.ajax({
        url: url,
        type: type,
        dataType: dataType || 'json',
        data: data,
        buffer: true,
        success: callback,
        error: errCallback
    });
}

function formatCurrency(num) {
    num = num.toString().replace(/\$|\,/g, '');
    if (isNaN(num)) num = "0";
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num * 100 + 0.50000000001);
    cents = num % 100;
    num = Math.floor(num / 100).toString();
    if (cents < 10)
        cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
        num = num.substring(0, num.length - (4 * i + 3)) + ',' +
        num.substring(num.length - (4 * i + 3));
    return (((sign) ? '' : '-') + num + '.' + cents);
}


/*************************************************************
 * [debounce 函数两次的调用时间不能小于指定时间]
 * @param  {function} func      	待执行函数
 * @param  {number}   wait      	时间间隔
 * @param  {boolean}  immediate 	为true时会在wait时间之前先执行一次函数
 * @return {function}           	加工后的函数
 *************************************************************/
function debounce(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
        var last = new Date() - timestamp;

        if (last < wait && last >= 0) {
            timeout = setTimeout(later, wait - last);
        } else {
            timeout = null;
            if (!immediate) {
                result = func.apply(context, args);
                context = args = null;
            }
        }
    };

    return function() {
        context = this;
        args = arguments;
        timestamp = new Date();
        var callNow = immediate && !timeout;
        if (!timeout) timeout = setTimeout(later, wait);
        if (callNow) {
            result = func.apply(context, args);
            context = args = null;
        }
        return result;
    };
}


/**
 * 显示提示信息
 * @param  {string} html  提示内容
 * @param  {string} type  提示类型（ 普通：'common' | 成功：'success' | 错误：'error' | 警告：'warn' ）
 * 
 */
function showPrompt(html, type, callback) {
    var type = type || 'common';
    var d = dialog({
        content: '<div class="ui-dialog-tip" style="min-width:200px;max-width:800px;text-align:center;padding:20px;">' + html + '</div>',
        skin: 'prompt-dialog-' + type,
        quickClose: true,
        onclose: function() {
            callback && callback();
        }
    }).show();
    //两秒后自动隐藏
    setTimeout(function() {
        d.open && d.close().remove();
    }, 2000);
}


/**
 * 移动端的提示弹框
 * @param  {string} html  提示内容
 * @param  {string} type  提示类型（ 普通：'common' | 成功：'success' | 错误：'error' | 警告：'warn' ）
 * 
 */
function mobileAlert(html, type, callback) {
    var type = type || 'common';
    var $container = $('.custom-alert');

    if ($container.length === 0) {
        $container = $('<div class="custom-alert"><div class="custom-alert-box">' + html + '</div></div>');
        $('body').append($container);
        $container.on('click', function() {
            if ($container.hasClass('showed')) {
                $container.removeClass('showed');
                callback && callback();
                clearInterval(_interval);
            }
        });
    } else {
        $container.find('.custom-alert-box').html(html);
    }

    setTimeout(function() {
        $container.addClass('showed');
    }, 50);

    var _interval = setTimeout(function() {
        if ($container.hasClass('showed')) {
            $container.removeClass('showed');
            callback && callback();
        }
    }, 3000);
}


/*************************************************************
 * 消息确认
 * @param  {string}   	html     		提示文本代码
 * @param  {function}   okCallback     	确定回调函数
 * @param  {function}   cancelCallback  取消回调函数
 * 
 *************************************************************/
function myConfirm(html, okCallback, cancelCallback, params) {
    var _html = html || '';

    var obj = $.extend({
        content: '<div>' + html + '</div>',
        skin: 'confirm-dialog',
        okValue: '确定',
        cancelValue: '取消',
        ok: function() {
            okCallback && okCallback();
        },
        cancel: function() {
            cancelCallback && cancelCallback();
        }
    }, params);

    var d = dialog(obj).showModal();
    return d;
}


/*************************************************************
 * 	截取图片名
 *  
 *************************************************************/
function getImageName(path) {
    var _index = path.lastIndexOf('/');
    if (!path || _index < 0) return false;
    return path.substr(_index + 1);
}


/*************************************************************
 * 文件格式处理
 * @param  {string}   	name     		文件名称
 * @return {string}						返回文件类型字符串
 * 
 *************************************************************/
function fileType(name) {
    var type = {
        excl: ['xls', 'xslx'],
        music: ['mp3', 'wma', 'aac', 'ogg', 'flac', 'ape', 'wav'],
        image: ['jpg', 'png', 'gif', 'bmp'],
        pdf: ['pdf'],
        ppt: ['ppt'],
        txt: ['txt'],
        word: ['doc'],
        rar: ['zip', 'rar'],
        aa: ['ttf', 'otf'],
        html: ['html'],
        flash: ['flash'],
        psd: ['psd'],
        code: ['xml', 'css'],
        ai: ['ai']
    };
    for (var key in type) {
        if ($.inArray(name.toLowerCase(), type[key]) >= 0) return key;
    }
    return 'other';
}


/*************************************************************
 * 全屏弹窗（基于artDialog.js）
 * @param  {string}   	html     		html代码字符串
 * @param  {function}   callback     	回调函数
 * @return {object}						返回值同dialog();
 * 
 *************************************************************/
function fullDialog(html, callback) {

    var body = $('body');

    var d = dialog({
        autofocus: false,
        fullscreen: true,
        skin: 'fullscreen-dialog',
        content: '<a href="javascript:;" class="fullscreen-close"></a>' + html,
        onshow: function() {
            $(d.node).find('.fullscreen-close').on('click', function() {
                d.close().remove();
            });
            callback && callback();
        }
    });

    var _show = d.show,
        _close = d.close;

    d.show = function() {
        body.addClass('overflow-hidden');
        _show.call(d);
        return d;
    };

    d.close = function() {
        if ($('.fullscreen-dialog').length <= 1) {
            body.removeClass('overflow-hidden');
        }
        _close.call(d);
        return d;
    }

    return d.show();
}


/*************************************************************
 *	分解错误信息的内容
 *	data ：ajax报错返回对象
 *************************************************************/
function getErrorObj(data) {
    var txt = $.parseJSON(data.responseText)[0];
    var errorType = -1;
    var errorText = '';
    if (txt.indexOf(':') > -1) {
        errorType = txt.split(':')[0];
        errorText = txt.split(':')[1];
    } else {
        errorText = txt;
    }

    return {
        type: errorType,
        text: errorText
    };
}


/******************************************************************
 * 让指定元素弹出错误提示
 * 
 ******************************************************************/
function throwError(elem, errormsg) {
    elem.closest('.forms-group').addClass('z-error').find('.forms-cue').html(errormsg);
}



/******************************************************************
 * 序列化对象为表单字符串
 ******************************************************************/
function serializeBy(obj) {
    var arr = [];

    for (var i in obj) {
        arr.push(i + '=' + encodeURIComponent(obj[i].toString()));
    }
    return arr.join('&');
}


/******************************************************************
 * 图片加载后完执行
 * @param  {string}   url      [图片地址]
 * @param  {function} callback [回调函数]
 *
 ******************************************************************/
function loadImage(url, callback) {
    var img = new Image();

    img.src = url;

    if (img.complete) {
        // 如果图片已经存在于浏览器缓存，直接调用回调函数
        callback.call(img);
        return;
    }
    img.onload = function() {
        //图片下载完毕时异步调用callback函数。
        callback.call(img);
    };
}


/******************************************************************
 * 取代window.open弹出新窗口（IE9以上支持）
 *
 ******************************************************************/
function openUrl(url) {
    var a = $('<a href="' + url + '" target="_blank">test</a>')[0];
    var e = document.createEvent('MouseEvents');
    e.initEvent('click', true, true);
    a.dispatchEvent(e);
}


/*************************************************************************************************
 * create by SJ
 * @param $element
 * @param userId
 * @param proUserId
 *************************************************************************************************/
function addFriendFnc($element, userId, proUserId) {

    //验证是否已建立好友关系
    var addFriendContainer = '<div class="dialogMessage">' +
        '<div class="form-group form-line-input form-simple-input">' +
        '<textarea id="message" class="form-control" rows="3" placeholder="好友请求信息,限制在50字以内" maxlength="50"></textarea>' +
        '<label></label></div><div class="right" style="margin-top: 10px;">' +
        '<a href="javascript:;" id="cancel"><i class="icon-24 icon-close-black" style="margin-right: 20px;"></i></a>' +
        '<a href="javascript:;" id="commit"><i class="icon-24 icon-right"></i></a></div></div>';
    $('body').append(addFriendContainer);
    if (userId != proUserId) {
        $.ajax({
            url: 'user/isFriend.html',
            type: 'get',
            data: {
                fid: proUserId
            },
            success: function(data) {
                if (data.isFriend) {
                    $element.text('聊天');
                    $element.attr('target', 'tabX');
                    $element.attr('href', 'im.html?userId=' + proUserId);
                }
            }
        });
    }
    //新增添加好友
    $element.on('click', function(e) {
        if ($(this).text() == "聊天") { return; }
        e.stopPropagation();
        $('#message').val('');
        $('.dialogMessage').addClass('in');
        setTimeout(function() { $('#message').focus(); }, 200);
        $('#commit').attr('userId', proUserId);
    });
    //提交加好友信息
    $('#message').on('keypress', function(e) {
        if (e.keyCode == 13) {
            sendMessage();
        }
    });
    $('#commit').on('click', function() {
        sendMessage();
    });

    function sendMessage() {
        var id = $('#commit').attr('userId');
        var message = $('#message').val();
        $.ajax({
            url: 'user/invite.html',
            type: 'post',
            data: {
                invitedUserId: id,
                rmk: message
            },
            success: function() {
                $('.dialogMessage').removeClass('in');
                showPrompt('请求已发送', 'success');
            },
            error: function(xmlHttpRequest) {
                if (xmlHttpRequest.status == 400) {
                    $('.dialogMessage').removeClass('in');
                    showPrompt(xmlHttpRequest.responseJSON[0], 'success');
                }
            }
        });
    }
    //取消加好友消息提示框
    $('#cancel').on('click', function() {
        $('.dialogMessage').removeClass('in');
    });
    //鼠标点击其他位置关闭当前加好友窗口
    $('.dialogMessage').click('click', function(e) {
        var e = e || window.event;
        if (e.stopPropagation) {
            // 兼容火狐
            e.stopPropagation();
        } else if (e) {
            // 兼容IE
            window.event.cancelBubble = true;
        }
    });
    document.onclick = function() {
        $('.dialogMessage').removeClass('in');
    };
};