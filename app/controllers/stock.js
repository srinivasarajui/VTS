'use strict';
var mongoose = require('mongoose'),
    TapeStock = mongoose.model('TapeStock'),
    BoxTransfer = mongoose.model('BoxTransfer'),
    InternalTransfer = mongoose.model('InternalTransfer'),
    _ = require('lodash');


/**
 * List of Stock items
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

/**
 * List of all Non Zero Stock items
 */
exports.allNonZero = function(req, res) {
    TapeStock.find({
        'quantity': {
            $gt: 0
        }
    }).exec(function(err, stocks) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(stocks);
        }
    });
};

exports.findStockByBoxId = function(req, res) {

    var query = {
        'boxes.BoxId': req.body.BoxId
    };

    TapeStock.find(query).exec(function(err, stocks) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            var results = [];
            _.forEach(stocks, function(stock) {
                var box = _.find(stock.boxes, {
                    'BoxId': req.body.BoxId
                });
                results.push({
                    color: stock.color,
                    thickness: stock.thickness,
                    width: stock.width,
                    warehouse: stock.warehouse,
                    rollSize: stock.rollSize,
                    BoxId: box.BoxId,
                    quantity: box.quantity
                });
            });

            res.jsonp(results);
        }
    });
};

exports.transferBoxes = function(req, res) {
    var reqresult = {
        code: 'Done',
        message: 'Stock tranfer done'
    };
    var boxTransfer = new BoxTransfer({
        transfers: req.body
    });
    boxTransfer.save();
    _.forEach(req.body, function(transfer) {
        var query = {
            color: transfer.color,
            thickness: transfer.thickness,
            width: transfer.width,
            warehouse: transfer.warehouse,
            rollSize: transfer.rollSize,
        };
        TapeStock.findOne(query).exec(function(err, stock) {

            var index = _.findIndex(stock.boxes, {
                'BoxId': transfer.BoxId
            });
            if (stock.boxes[index].quantity === transfer.newQuantity) {
                stock.boxes.splice(index, 1);
            } else {
                stock.boxes[index].quantity = stock.boxes[index].quantity - transfer.newQuantity;
            }
            index = _.findIndex(stock.boxes, {
                'BoxId': transfer.newBoxId
            });
            if (index === -1) {
                stock.boxes.splice(stock.boxes, 0, {
                    BoxId: transfer.newBoxId,
                    quantity: transfer.newQuantity
                });
            } else {
                stock.boxes[index].quantity = stock.boxes[index].quantity + transfer.newQuantity;
            }

            stock.save(function(err) {
                if (err) {
                    console.log(err);
                }
            });
        });
    });
    res.jsonp(reqresult);
};
exports.findStock = function(req, res) {
    //TODO
    var query = {
        'boxes.BoxId': req.body.BoxId
    };

    TapeStock.find(query).exec(function(err, stocks) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            var results = [];
            _.forEach(stocks, function(stock) {
                var box = _.find(stock.boxes, {
                    'BoxId': req.body.BoxId
                });
                results.push({
                    color: stock.color,
                    thickness: stock.thickness,
                    width: stock.width,
                    warehouse: stock.warehouse,
                    rollSize: stock.rollSize,
                    BoxId: box.BoxId,
                    quantity: box.quantity
                });
            });

            res.jsonp(results);
        }
    });
};

exports.internalStockTransfer = function(req, res) {
    var reqresult = {
        code: 'Done',
        message: 'Stock tranfer done'
    };
    var internalTransfer = new InternalTransfer(req.body);
    internalTransfer.save();
    _.forEach(internalTransfer.transferLines, function(transfer) {
        var fromquery = {
            color: transfer.color,
            thickness: transfer.thickness,
            width: transfer.width,
            warehouse: internalTransfer.fromWarehouse,
            rollSize: transfer.rollSize,
        };
        var toquery = {
            color: transfer.color,
            thickness: transfer.thickness,
            width: transfer.width,
            warehouse: internalTransfer.toWarehouse,
            rollSize: transfer.rollSize,
        };
        TapeStock.findOne(fromquery).exec(function(err, stock) {

            var index = _.findIndex(stock.boxes, {
                'BoxId': transfer.BoxId
            });
            if (stock.boxes[index].quantity === transfer.newQuantity) {
                stock.boxes.splice(index, 1);
            } else {
                stock.boxes[index].quantity = stock.boxes[index].quantity - transfer.newQuantity;
            }

            stock.save(function(err) {
                if (err) {
                    console.log(err);
                }
            });
        });

        TapeStock.findOne(toquery).exec(function(err, stock) {

            var index = _.findIndex(stock.boxes, {
                'BoxId': transfer.newBoxId
            });

            index = _.findIndex(stock.boxes, {
                'BoxId': transfer.newBoxId
            });
            if (index === -1) {
                stock.boxes.splice(stock.boxes, 0, {
                    BoxId: transfer.newBoxId,
                    quantity: transfer.newQuantity
                });
            } else {
                stock.boxes[index].quantity = stock.boxes[index].quantity + transfer.newQuantity;
            }

            stock.save(function(err) {
                if (err) {
                    console.log(err);
                }
            });
        });
    });
    res.jsonp(reqresult);
};
exports.getQuanityOfStock = function(req, res) {

    var query = {
        'boxes.BoxId': req.body.BoxId,
        'color': req.body.color,
        'thickness': req.body.thickness,
        'width': req.body.width,
        'rollSize': req.body.rollSize,
        'warehouse': req.body.warehouse


    };

    TapeStock.findOne(query).exec(function(err, stock) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            var box = _.find(stock.boxes, {
                'BoxId': req.body.BoxId
            });
            res.jsonp(box.quantity);
        }
    });
};
