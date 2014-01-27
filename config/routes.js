'use strict';

module.exports = function(app, passport, auth) {
    //User Routes
    var users = require('../app/controllers/users');
    app.get('/signin', users.signin);
    app.get('/signup', users.signup);
    app.get('/signout', users.signout);
    app.get('/users/me', users.me);
    app.post('/users/changePassword',auth.requiresLogin, users.changePassword);
    
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
    app.get('/transaction/in', auth.requiresLogin,transaction.allIn);
    app.get('/transaction/out', auth.requiresLogin,transaction.allOut);
    app.post('/transaction/in', auth.requiresLogin, transaction.createIn);
    app.post('/transaction/out', auth.requiresLogin, transaction.createOut);
    app.get('/transaction/in/:transactionId',auth.requiresLogin, transaction.show);
    app.get('/transaction/out/:transactionId',auth.requiresLogin, transaction.show);
    app.put('/transaction/in/:transactionId', auth.requiresLogin, transaction.update);
    app.put('/transaction/out/:transactionId', auth.requiresLogin,transaction.update);
    app.del('/transaction/in/:transactionId', auth.requiresLogin, transaction.destroy);
    app.del('/transaction/out/:transactionId', auth.requiresLogin,transaction.destroy);
    app.put('/transaction/in/:transactionId/approve', auth.requiresLogin,transaction.approve);
    app.put('/transaction/out/:transactionId/approve', auth.requiresLogin,transaction.approve);

    //Finish with setting up the articleId param
    app.param('transactionId', transaction.transaction);

    var stock = require('../app/controllers/stock');
    app.get('/stock', auth.requiresLogin,stock.all);
    app.put('/stock/getBoxDetails', auth.requiresLogin,stock.findStockByBoxId);
    app.put('/stock/transferBoxes', auth.requiresLogin,stock.transferBoxes);
    app.put('/stock/findStock', auth.requiresLogin,stock.findStock);
    app.put('/stock/internalStockTransfer', auth.requiresLogin,stock.internalStockTransfer);
    //Home route
    var index = require('../app/controllers/index');
    app.get('/', index.render);

};
