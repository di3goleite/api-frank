let Datastore = require('nedb'),
    db = new Datastore({filename: './webhook.db', autoload: true});

module.exports = {
    index: function(req, res, next) {
        req.query.skip = !!(req.query.skip) ? req.query.skip : null;
        req.query.limit = !!(req.query.limit) ? req.query.limit : null;

        db.find({}).sort({createdAt: -1}).skip(req.query.skip).limit(req.query.limit)
        .exec(function(error, docs) {
            docs = docs.map(function(doc) {
                return doc.data;
            });

            if(error) {
                return res.send(500, error);
            } else {
                return res.send(200, docs);
            }
        });
    },

    store: function(req, res, next) {
        if(req.params != 'undefined' && req.params !== '' && req.params !== null) {
            var data = req.params;
            var createdAt = new Date();

            db.insert({data: data, createdAt: createdAt}, function(error, newDoc) {
                if(error) {
                    return res.send(500, error);
                } else {
                    return res.send(200);
                }
            });
        }
    },

    delete: function(req, res, next) {
        db.remove({}, {multi: true}, function(error, numRemoved) {
            if(error) {
                return res.send(500, error);
            } else {
                return res.send(205);
            }
        });
    }
};
