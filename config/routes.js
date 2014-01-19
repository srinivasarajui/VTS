'use strict';

module.exports = function(app, passport, auth) {
    //User Routes
    var users = require('../app/controllers/users');
    app.get('/signin', users.signin);
    app.get('/signup', users.signup);
    app.get('/signout', users.signout);
    app.get('/users/me', users.me);

    //Setting up the users api
    app.post('/users', users.create);

    //Setting the local strategy route
    app.post('/users/session', passport.authenticate('local', {
        failureRedirect: '/signin',
        failureFlash: true
    }), users.session);

    //Finish with setting up the userId param
    app.param('userId', users.user);

    //Article Routes
    var articles = require('../app/controllers/articles');
    app.get('/articles', articles.all);
    app.post('/articles', auth.requiresLogin, articles.create);
    app.get('/articles/:articleId', articles.show);
    app.put('/articles/:articleId', auth.requiresLogin, auth.article.hasAuthorization, articles.update);
    app.del('/articles/:articleId', auth.requiresLogin, auth.article.hasAuthorization, articles.destroy);

    //Finish with setting up the articleId param
    app.param('articleId', articles.article);

    //Article Routes
    var transaction = require('../app/controllers/transaction');
    app.get('/transaction/in', transaction.allIn);
    app.get('/transaction/out', transaction.allOut);
    app.post('/transaction/in', auth.requiresLogin, transaction.createIn);
    app.post('/transaction/out', auth.requiresLogin, transaction.createOut);
    app.get('/transaction/in/:transactionId', transaction.show);
    app.get('/transaction/out/:transactionId', transaction.show);
    app.put('/transaction/in/:transactionId', auth.requiresLogin, auth.transaction.hasAuthorization, transaction.update);
    app.put('/transaction/out/:transactionId', auth.requiresLogin, auth.transaction.hasAuthorization, transaction.update);
    app.del('/transaction/in/:transactionId', auth.requiresLogin, auth.transaction.hasAuthorization, transaction.destroy);
    app.del('/transaction/out/:transactionId', auth.requiresLogin, auth.transaction.hasAuthorization, transaction.destroy);
    app.put('/transaction/in/:transactionId/approve', auth.requiresLogin, auth.transaction.hasAuthorization, transaction.approve);
    app.put('/transaction/out/:transactionId/approve', auth.requiresLogin, auth.transaction.hasAuthorization, transaction.approve);

    //Finish with setting up the articleId param
    app.param('transactionId', transaction.transaction);

    var stock = require('../app/controllers/stock');
    app.get('/stock', stock.all);

    //Home route
    var index = require('../app/controllers/index');
    app.get('/', index.render);

};