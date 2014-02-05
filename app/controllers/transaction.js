'use strict';
/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Transaction = mongoose.model('Transaction'),
    TapeStock = mongoose.model('TapeStock'),
    _ = require('lodash');



/**
 * Find transaction by id
 */
exports.transaction = function(req, res, next, id) {
    Transaction.load(id, function(err, transaction) {
        if (err) return next(err);
        if (!transaction) return next(new Error('Failed to load article ' + id));
        req.transaction = transaction;
        next();
    });
};

/**
 * Create a transaction
 */
var create = function(req, res, transaction) {
    if (!transaction.transState) {
        transaction.transState = 'DRAFT';
    }
    
    transaction.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                transaction: transaction
            });
        } else {
            res.jsonp(transaction);
        }
    });

};

exports.createIn = function(req, res) {
    var transaction = new Transaction(req.body);
    transaction.transType = 'IN';
    create(req, res, transaction);
};

exports.createOut = function(req, res) {
    var transaction = new Transaction(req.body);
    transaction.transType = 'OUT';
    create(req, res, transaction);

};

/**
 * Update a transaction
 */
exports.update = function(req, res) {

    var transaction = req.transaction;
    if (!transaction.transState) {
        transaction.transState = 'DRAFT';
    }
    transaction = _.extend(transaction, req.body);
    if (transaction.transState === 'APPROVED') {
        return res.send('500', {
            errors: [{
                Error: 'Can not updated APPROVED'
            }],
            transaction: transaction
        });
    }
    
    transaction.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                transaction: transaction
            });
        } else {
            res.jsonp(transaction);
        }
    });
};

/**
 * Delete an transaction
 */
exports.destroy = function(req, res) {
    var transaction = req.transaction;

    transaction.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                transaction: transaction
            });
        } else {
            res.jsonp(transaction);
        }
    });
};

/**
 * Show an transaction
 */
exports.show = function(req, res) {
    res.jsonp(req.transaction);
};

/**
 * List of transactions
 */
var all = function(req, res, query) {
    Transaction.find(query).exec(function(err, transactions) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(transactions);
        }
    });
};

exports.allIn = function(req, res) {
    var query = {
        transType: 'IN'
    };
    all(req, res, query);
};

exports.allOut = function(req, res) {
    var query = {
        transType: 'OUT'
    };
    all(req, res, query);
};

/**
 * Approve a transaction
 */
exports.approve = function(req, res) {
    var transaction = req.transaction;
    transaction = _.extend(transaction, req.body);
    
    if (transaction.transState === 'APPROVED') {
        return res.send('500', {
            errors: null,
            transaction: transaction
        });
    }
    transaction.transState = 'APPROVED';

    _.forEach(transaction.lines, function(line) {
        var conditions = {
            color: line.color,
            thickness: line.thickness,
            width: line.width,
            rollSize: line.rollSize,
            warehouse: transaction.warehouse
        };

        TapeStock.findOne(conditions).exec(function(err, stock) {
            var index = _.findIndex(stock.boxes, {
                'BoxId': line.boxNum
            });
            if (transaction.transType === 'IN') {
                stock.quantity = stock.quantity + line.quantity;

                if (index === -1) {
                    stock.boxes.splice(stock.boxes, 0, {
                        BoxId: line.boxNum,
                        quantity: line.quantity
                    });
                } else {
                    stock.boxes[index].quantity = stock.boxes[index].quantity + line.quantity;
                }

            } else if (transaction.transType === 'OUT') {
                stock.quantity = stock.quantity - line.quantity;

                if (index !== -1) {

                    stock.boxes[index].quantity = stock.boxes[index].quantity - line.quantity;
                    if (stock.boxes[index].quantity <= 0) {
                        stock.boxes.splice(index, 1);
                    }
                }
            }
            stock.save();
        });




        transaction.save(function(err) {
            if (err) {
                return res.send('users/signup', {
                    errors: err.errors,
                    transaction: transaction
                });
            } else {
                res.jsonp(transaction);
            }
        });
    });
};

