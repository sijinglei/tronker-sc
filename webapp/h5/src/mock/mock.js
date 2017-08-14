/**
 * @author:sjl
 * @date:2017-08-14
 * @desc:模拟请求数据
 */
import Mock from 'mockjs'

Mock.mock('http://getlist', {
    'data|1-5': [{
        'href' : '@url',
        'age|1-100': 100,
        'imagename': '@img("320x160",@color,@word)'
    }]
})