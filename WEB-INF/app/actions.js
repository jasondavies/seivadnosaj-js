var {encode} = require('ringo/base64'),
    {get} = require('ringo/httpclient'),
    {Response} = require('ringo/webapp/response'),
    {ByteString} = require('binary');

exports.index = function(req) {
    return Response.static(module.resolve('public/about.html'));
};

exports.proxy = function(req) {
    var raw = get(req.params.url);
    return {
        status: 200,
        headers: {'Content-Type': 'text/javascript'},
        body: [req.params.callback + '("data:"+decodeURIComponent("' + encodeURIComponent(raw.type) + '")+";base64,',
            encode(new ByteString(raw.content)), '")']
    };
};
