var restify = require('restify');

var addHeaders = function(req, res) {
    var allowHeaders = ['Accept', 'Accept-Version', 'Content-Type'];

    res.header('Access-Control-Allow-Headers', allowHeaders.join(', '));
    res.header('Access-Control-Allow-Methods', res.methods.join(', '));
    res.header('Access-Control-Allow-Origin', '*');
};

// See:  https://github.com/mcavage/node-restify/issues/284
module.exports = {

    MethodNotAllowed: function() {
        return function(req, res) {

            if (req.method.toUpperCase() === 'OPTIONS') {

                if (res.methods.indexOf('OPTIONS') === -1)
                    res.methods.push('OPTIONS');

                addHeaders(req, res);

                return res.send(204);
            }
            else
                return res.send(new restify.MethodNotAllowedError());
        };
    },

    request: function() {
        return function(req, res, next) {
            addHeaders(req, res);
            next();
        };
    }
};
