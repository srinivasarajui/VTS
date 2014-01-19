'use strict';

var app=angular.module('VTS', ['ngCookies', 'ngResource', 'ngRoute', 'ui.bootstrap', 'ui.route','xeditable', 'underscore','VTS.system', 'VTS.articles','VTS.transactions','VTS.stocks']);

angular.module('VTS.system', []);
angular.module('VTS.articles', []);
angular.module('VTS.transactions', []);
angular.module('VTS.stocks', []);
app.run(function(editableOptions) {
		editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
	});

var underscore = angular.module('underscore', []);
underscore.factory('_', function() {
	return window._; // assumes underscore has already been loaded on the page
});