module.exports = function(app, controllers, middlewares) {
    app.get('/webhooks', controllers.webhook.index);
    app.post('/webhooks', controllers.webhook.store);
    app.del('/webhooks', controllers.webhook.delete);
};
