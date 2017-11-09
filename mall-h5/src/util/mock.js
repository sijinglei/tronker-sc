import Mock from 'mockjs';

Mock.mock('http://homelist', {
    'data|1-5': [{
        'href' : '@url',
        'age|1-100': 100,
        'imagename': '@img("320x160",@color,@word)'
    }]
})
Mock.mock('http://homehotmerchant', {
    'data|9': [{
        'merchantid': '@guid',
        'href' : '@url',
        'imagename': '@img("60x60",@color,@word)'
    }]
})
Mock.mock('http://merchantList', {
    'data|1-10': [{
        'merchantid': '@guid',
        'merchantshortname': '@ctitle',
        'businessscopename': '@ctitle',
        'imageid': '@img("320x160",@color,@word)',
        'saleremark1': '@ctitle',
        'saleremark2': '@ctitle'
    }]
})

Mock.mock('http://queryinfo', {
    'data': {
        'merchantshortname': '@ctitle',
        'businessscopename': '@ctitle',
        'imageid': '@img("60x60",@color,@word)',
        'address': '@county(true)',
        'linktel': '@id'
    }
})
Mock.mock('http://dzjList', {
    'data|1-10': [{
        'imageid': '@img("60x60",@color,@word)',
        'ticketshortname': '@ctitle',
        'linktel': '@id',
        'ticketprice': '@float(10, 20, 2, 2)',
        'ticketactprice': '@float(20, 50, 2, 2)',
        'ticketnumber|50-100': 50,
        'cardprice': '@float(20, 50, 2, 2)',
        'ticketbatchid': '@id',
        'merchantid': '@id'
    }]
})
Mock.mock('http://dzjinfo', {
    'data': {
        'imageid': '@img("80x80",@color,@word)',
        'ticketname': '@ctitle',
        'validitytype': 1,
        'validity|1-20': 1,
        'ticketnumber|20-50': 20,
        'salenumber|1-10': 1,
        'ticketprice': '@float(10, 20, 2, 2)'
    }
})
Mock.mock('http://yfkList', {
    'data|1-10': [{
        'imageid': '@img("60x60",@color,@word)',
        'cardshortname': '@ctitle',
        'linktel': '@id',
        'cardprice|+2': 1,
        'radio|+1': 1,
        'cardprice': '@float(20, 50, 2, 2)',
        'cardbatchid': '@id',
        'merchantid': '@id'
    }]
})
Mock.mock('http://yfkinfo', {
    'data': {
        'imageid': '@img("60x60",@color,@word)',
        'cardname': '@ctitle',
        'validitytype': 1,
        'validity|1-20': 1,
        'validity|1-20': 1,
        'cardnumber|20-50': 20,
        'salenumber|1-10': 1,
        'address': '@county(true)',
        'hex': '@hex()',
        'cparagraph': '@cparagraph',
        'carddescribe': function() {
            return '<span style="color:' + this.hex + '">' + this.cparagraph + '</span>';
        },
        'cardbatchid': '@id',
        'merchantid': '@id'
    }
})