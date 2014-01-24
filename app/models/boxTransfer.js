'use strict';

/**
 * Module dependencies.
 */
//var _ = require('lodash');

var paramsPath = __dirname.substring(0,__dirname.lastIndexOf('/'))+'/common/params.js';



var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    params = require(paramsPath);

/**
 * BoxTransfer Schema
 */
var BoxTransfer = new Schema({
	color: {
        type: String,
        default: '',
        trim: true,
        uppercase: true,
        enum:params.getColorCode()
    },
    thickness: {
        type: String,
        default: '',
        trim: true,
        uppercase: true,
        enum:params.getThicknessCode()
    },
    width: {
        type: String,
        default: '',
        trim: true,
        uppercase: true,
        enum:params.getWidthCode()
    },
    warehouse: {
        type: String,
        default: '',
        trim: true,
        uppercase: true,
        enum:params.getWarehouseCode()
    },
    rollSize: {
        type: String,
        default: '',
        trim: true,
        uppercase: true,
        enum:params.getRollSizeCode()
    },
    BoxId: {
        type: String,
        default: '',
        trim: true,
        uppercase: true
    },
    quantity: {
        type: Number,
        min: 0
    },
    newBoxId: {
        type: String,
        default: '',
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
var BoxTransferSchema = new Schema({
	transfers : [BoxTransfer]
});

mongoose.model('BoxTransfer', BoxTransferSchema);