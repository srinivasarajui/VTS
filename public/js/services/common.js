'use strict';

var commonModule = angular.module('VTS.common');
commonModule.factory('Color', function() {
    var color = [{
        internalCode: 'SB 001',
        code: 'BAVARIAN BEECH',
        displayText: 'Bavarian Beech'
    }, {
        internalCode: 'SB 002',
        code: 'MAHAGONY',
        displayText: 'Mahagony'
    }, {
        internalCode: 'SB 005',
        code: 'CENTURY WHITE',
        displayText: 'Century White'
    }, {
        internalCode: 'SB 006',
        code: 'FROSTY WHITE',
        displayText: 'Frosty White'
    }, {
        internalCode: 'SB 007',
        code: 'SILVER GREY',
        displayText: 'Silver Grey'
    }, {
        internalCode: 'SB 008',
        code: 'SLATE GREY',
        displayText: 'Slate Grey'
    }, {
        internalCode: 'SB 009',
        code: 'BLACK',
        displayText: 'Black'
    }, {
        internalCode: 'SB 010',
        code: 'MYSORE IVORY',
        displayText: 'Mysore Ivory'
    }, {
        internalCode: 'SB 011',
        code: 'RED ORANGE',
        displayText: 'Red Orange'
    }, {
        internalCode: 'SB 012',
        code: 'YELLOW ORANGE',
        displayText: 'Yellow Orange'
    }, {
        internalCode: 'SB 013',
        code: 'PARROT GREEN',
        displayText: 'Parrot Green'
    }, {
        internalCode: 'SB 014',
        code: 'DARK GREEN',
        displayText: 'Dark Green'
    }, {
        internalCode: 'SB 015',
        code: 'CHOCLATE',
        displayText: 'Choclate'
    }, {
        internalCode: 'SB 016',
        code: 'ELECTRIC BLUE',
        displayText: 'Electric Blue'
    }, {
        internalCode: 'SB 017',
        code: 'SKY BLUE',
        displayText: 'Sky Blue'
    }, {
        internalCode: 'SB 018',
        code: 'YELLOW',
        displayText: 'Yellow'
    }, {
        internalCode: 'SB 019',
        code: 'RED',
        displayText: 'Red'
    }, {
        internalCode: 'SB 022',
        code: 'WENGI-I',
        displayText: 'Wengi-I'
    }, {
        internalCode: 'SB 024',
        code: 'WHITE BEECH',
        displayText: 'White Beech'
    }, {
        internalCode: 'SB 025',
        code: 'HIGHLAND PINE',
        displayText: 'Highland Pine'
    }, {
        internalCode: 'SB 026',
        code: 'WALNUT',
        displayText: 'Walnut'
    }, {
        internalCode: 'SB 027',
        code: 'PRECIOUS BEECH',
        displayText: 'Precious Beech'
    }, {
        internalCode: 'SB 028',
        code: 'ASIAN MAPLE',
        displayText: 'Asian Maple'
    }, {
        internalCode: 'SB 029',
        code: 'OCEAN RECON',
        displayText: 'Ocean Recon'
    }, {
        internalCode: 'SB 030',
        code: 'DOUGLAS PINE',
        displayText: 'Douglas Pine'
    }, {
        internalCode: 'SB 031',
        code: 'CANADIAN WALNUT',
        displayText: 'Canadian Walnut'
    }, {
        internalCode: 'SB 032',
        code: 'STRAIGHT WALNUT',
        displayText: 'Straight Walnut'
    }, {
        internalCode: 'SB 033',
        code: 'NR TEAK',
        displayText: 'NR Teak'
    }, {
        internalCode: 'SB 036',
        code: 'RED CHERRY ',
        displayText: 'Red Cherry '
    }, {
        internalCode: 'SB 039',
        code: 'SAPELLI',
        displayText: 'Sapelli'
    }, {
        internalCode: 'SB 040',
        code: 'WINDSOR BIRCH',
        displayText: 'Windsor Birch'
    }, {
        internalCode: 'SB 042',
        code: 'MANGFALI BEECH',
        displayText: 'Mangfali Beech'
    }, {
        internalCode: 'SP 003',
        code: 'OXFORD CHERRY',
        displayText: 'Oxford Cherry'
    }, {
        internalCode: 'SP 004',
        code: 'ROYAL CHERRY',
        displayText: 'Royal Cherry'
    }, {
        internalCode: 'SP 034',
        code: 'NATURAL TEAK',
        displayText: 'Natural Teak'
    }, {
        internalCode: 'SP 035',
        code: 'SANDY RECON',
        displayText: 'Sandy Recon'
    }, {
        internalCode: 'SP 037',
        code: 'BALINESE PINE',
        displayText: 'Balinese Pine'
    }, {
        internalCode: 'SP 043',
        code: 'ALBERTA MAPLE',
        displayText: 'Alberta Maple'
    }, {
        internalCode: 'SP 046',
        code: 'INTAL BEECH',
        displayText: 'Intal Beech'
    }, {
        internalCode: 'SP 047',
        code: 'OXFORD WALNUT',
        displayText: 'Oxford Walnut'
    }, {
        internalCode: 'SP 048',
        code: 'SANGARILA',
        displayText: 'Sangarila'
    }, {
        internalCode: 'SP 049',
        code: 'MODULA ACACIA',
        displayText: 'Modula Acacia'
    }, {
        internalCode: 'SS 020',
        code: 'AYA MAHAGONY',
        displayText: 'Kaya Mahagony'
    }, {
        internalCode: 'SS 021',
        code: 'MALASI WENGI',
        displayText: 'Malasi Wengi'
    }, {
        internalCode: 'NC 045',
        code: 'ALUWAVE',
        displayText: 'Aluwave'
    }, {
        internalCode: 'NC 044',
        code: 'ASIAN TEAK ',
        displayText: 'Asian Teak '
    }, {
        internalCode: 'NC 041',
        code: 'CLEAR OAK',
        displayText: 'Clear Oak'
    }, {
        internalCode: 'NC 023',
        code: 'COLONIAL BEECH',
        displayText: 'Colonial Beech'
    }, {
        internalCode: 'NC 038',
        code: 'IVORY ',
        displayText: 'Ivory '
    }, {
        internalCode: 'NC 050',
        code: 'MILK WHITE',
        displayText: 'Milk White'
    }, {
        internalCode: 'NC 051',
        code: 'WENGI-II',
        displayText: 'Wengi-II'
    }];
    return color;
});
commonModule.factory('Thickness', function() {
    var thickness = [{
        code: '2.0',
        displayText: '2.0mm'
    }, {
        code: '0.8',
        displayText: '0.8mm'
    }, {
        code: '0.5',
        displayText: '0.5mm'
    }];
    return thickness;
});
commonModule.factory('Width', function() {
    var width = [{
        code: '22',
        displayText: '22mm'
    }, {
        code: '30',
        displayText: '30mm'
    }];
    return width;
});
commonModule.factory('Warehouse', function() {
    var warehouse = [{
        code: 'MEDCHAL',
        displayText: 'Medchal'
    }, {
        code: 'PUNJAGUTTA',
        displayText: 'Punjagutta'
    }];
    return warehouse;
});

commonModule.factory('RollSize', function() {
    var rollSize = [{
        code: '100MTRS',
        displayText: '100 Meters',
        lengthInMeter: 100
    }, {
        code: '200MTRS',
        displayText: '200 Meters',
        lengthInMeter: 200
    }];
    return rollSize;
});

commonModule.factory('ParamUtil', ['_', 'Color', 'Thickness', 'Width', 'Warehouse','RollSize',
    function(_, Color, Thickness, Width, Warehouse,RollSize) {
        var base = {};
        base.getDisplayText = function(list, code) {
            return _.find(list, function(item) {
                return item.code === code;
            }).displayText;
        };
        base.getDisplayTextOfColor = function(code) {
            return base.getDisplayText(Color, code);
        };
        base.getDisplayTextOfThickness = function(code) {
            return base.getDisplayText(Thickness, code);
        };
        base.getDisplayTextOfWidth = function(code) {
            return base.getDisplayText(Width, code);
        };
        base.getDisplayTextOfWarehouse = function(code) {
            return base.getDisplayText(Warehouse, code);
        };
        base.getDisplayTextOfRollSize = function(code) {
            return base.getDisplayText(RollSize, code);
        };
        return base;
    }
]);
