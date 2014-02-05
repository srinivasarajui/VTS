'use strict';

/**
 * Module dependencies.
 */
//var _ = require('lodash');

var paramsPath = __dirname.substring(0, __dirname.lastIndexOf('/')) + '/common/params.js';



var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    params = require(paramsPath),
    _ = require('lodash');


/**
 * TransactionLine Schema
 */
var BoxDetailsSchema = new Schema({
    BoxId: {
        type: String,
        default: 'Unassigned',
        trim: true,
        uppercase: true
    },
    quantity: {
        type: Number,
        min: 0
    }
});

/**
 * Stock Schema
 */
var TapeStockSchema = new Schema({
    color: {
        type: String,
        default: '',
        trim: true,
        uppercase: true,
        enum: params.getColorCode()
    },
    thickness: {
        type: String,
        default: '',
        trim: true,
        uppercase: true,
        enum: params.getThicknessCode()
    },
    width: {
        type: String,
        default: '',
        trim: true,
        uppercase: true,
        enum: params.getWidthCode()
    },
    warehouse: {
        type: String,
        default: '',
        trim: true,
        uppercase: true,
        enum: params.getWarehouseCode()
    },
    rollSize: {
        type: String,
        default: '',
        trim: true,
        uppercase: true,
        enum: params.getRollSizeCode()
    },
    quantity: {
        type: Number,
        min: 0
    },
    boxes: [BoxDetailsSchema]

});
TapeStockSchema.pre('save', function(next) {
    _.forEach(this.boxes, function(line) {

        if (line.BoxId === null || line.BoxId === '') {

            line.BoxId = 'Unassigned';

        }
    });

    next();
});
mongoose.model('TapeStock', TapeStockSchema);

//INIT Admin User

var TapeStock = mongoose.model('TapeStock');
TapeStock.find().exec(function(err, tapeStock) {
    if (err) {
        console.error(err);
    } else {
        if (!tapeStock || tapeStock.length === 0) {
            _.forEach(params.getInitList(), function(item) {
                var stock = new TapeStock();
                stock.color = item.color.code;
                stock.width = item.width.code;
                stock.thickness = item.thickness.code;
                stock.warehouse = item.warehouse.code;
                stock.rollSize = item.rollSize.code;
                stock.quantity = item.quantity;
                stock.save(function(err) {
                    console.error(err);
                });
            });

        }
    }
});
