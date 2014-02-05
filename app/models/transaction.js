'use strict';

/**
 * Module dependencies.
 */
var paramsPath = __dirname.substring(0, __dirname.lastIndexOf('/')) + '/common/params.js';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    params = require(paramsPath),
    _ = require('lodash');

/**
 * TransactionLine Schema
 */
var TransactionLineSchema = new Schema({
    lineNo: {
        type: Number
    },
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
    quantity: {
        type: Number,
        min: 0
    },
    boxNum: {
        type: String,
        default: 'Unassigned'
    }

});

/**
 * Transaction Schema
 */
var TransactionSchema = new Schema({
    docId: {
        type: String,
        default: '',
        trim: true,
        uppercase: true
    },
    transDate: {
        type: Date,
        default: Date.now
    },
    warehouse: {
        type: String,
        default: '',
        trim: true,
        uppercase: true,
        enum: params.getWarehouseCode()
    },
    transType: {
        type: String,
        default: 'IN',
        trim: true,
        uppercase: true,
        enum: ['IN', 'OUT']
    },
    transState: {
        type: String,
        default: 'DRAFT',
        trim: true,
        uppercase: true,
        enum: ['DRAFT', 'APPROVED']
    },
    lines: [TransactionLineSchema]

});
/**
 * Statics
 */
TransactionSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).exec(cb);
};

TransactionSchema.pre('save', function(next) {
    _.forEach(this.lines, function(line) {

        if (line.boxNum === null || line.boxNum === '') {

            line.boxNum = 'Unassigned';

        }
    });

    next();
});
mongoose.model('Transaction', TransactionSchema);
