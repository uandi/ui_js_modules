(function (define, require) {
	"use strict";

	/**
	 * loads and initializes a page specific module via RequireJS
	 * @param {string} pageId
	 * @returns {boolean}
	 * @example
	 * loadPageModule('index') // loads 'modules/page-index.js' and calls the 'init' method (if given)
	 */
	var loadPageModule = function (pageId) {
		if (typeof pageId === 'undefined' || typeof require === 'undefined') {
			return false;
		}

		return require(['modules/page-' + pageId], function (page) {
			if (typeof page !== 'undefined' && typeof page.init === 'function') {
				return page.init();
			}

			return false;

		}, function (err) {
			var errorMsg = 'error loading page module "' + err.requireModules[0] + '"';
			throw new Error(errorMsg);
		});
	};

	if (typeof define === "function") {
		define( "loadPageModule", [], function () { return loadPageModule; } );
	}

}(define, require));