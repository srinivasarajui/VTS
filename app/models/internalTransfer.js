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
 * BoxTransfer Schema
 */
var InternalTransfer = new Schema({
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
    rollSize: {
        type: String,
        default: '',
        trim: true,
        uppercase: true,
        enum: params.getRollSizeCode()
    },
    BoxId: {
        type: String,
        default: 'Unassigned',
        trim: true,
        uppercase: true
    },
    quantity: {
        type: Number,
        min: 0
    },
    newBoxId: {
        type: String,
        default: 'Unassigned',
        trim: true,
        uppercase: true
    },
    newquantity: {
        type: Number,
        min: 0
    }

});


/**
 * Stock Schema
 */
var InternalTransferSchema = new Schema({
    transferDate: {
        type: Date,
        default: Date.now
    },
    fromWarehouse: {
        type: String,
        default: '',
        trim: true,
        uppercase: true,
        enum: params.getWarehouseCode()
    },
    toWarehouse: {
        type: String,
        default: '',
        trim: true,
        uppercase: true,
        enum: params.getWarehouseCode()
    },
    transferLines: [InternalTransfer]
});

InternalTransferSchema.pre('save', function(next) {
    _.forEach(this.transferLines, function(line) {

        if (line.BoxId === null || line.BoxId === '') {

            line.BoxId = 'Unassigned';

        }
        if (line.newBoxId === null || line.newBoxId === '') {

            line.newBoxId = 'Unassigned';

        }
    });

    next();
});
mongoose.model('InternalTransfer', InternalTransferSchema);
