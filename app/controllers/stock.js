'use strict';
var mongoose = require('mongoose'),
    TapeStock  = mongoose.model('TapeStock');
    
/**
 * List of transactions
 */
exports.all = function(req, res) {
    TapeStock.find().exec(function(err, stocks) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(stocks);
        }
    });
};