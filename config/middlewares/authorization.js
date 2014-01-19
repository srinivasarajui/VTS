'use strict';

/**
 * Generic require login routing middleware
 */
exports.requiresLogin = function(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

/**
 * User authorizations routing middleware
 */
exports.user = {
    hasAuthorization: function(req, res, next) {
        if (req.profile.id != req.user.id) {
            return res.send(401, 'User is not authorized');
        }
        next();
    }
};

/**
 * Article authorizations routing middleware
 */
exports.article = {
    hasAuthorization: function(req, res, next) {
        if (req.article.user.id != req.user.id) {
            return res.send(401, 'User is not authorized');
        }
        next();
    }
};



/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    User=mongoose.model('User'),
     _ = require('lodash');

/**
 * Transaction authorizations routing middleware
 */
exports.transaction = {
    hasAuthorization: function(req, res, next) {
        /*var index  =_.findIndex(req.user.roles, function(chr) {
            return chr === 'SUPER_ADMIN';
        })
        if ( index===-1) {
            return res.send(401, 'User is not authorized');
        }*/
        next();
    }
};