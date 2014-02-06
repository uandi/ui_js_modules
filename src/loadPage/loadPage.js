/*global define, require*/

define(
	function () {
		"use strict";

		/**
		 * loads and initializes a page specific module via RequireJS
		 * @param {string} pageId
		 * @returns {boolean}
		 * @example
		 * loadPageModule('index') // loads 'modules/page-index.js' and calls the 'init' method (if given)
		 */
		var loadPageModule = function (pageId) {
			if (typeof pageId === 'undefined') {
				return false;
			}

			return require(['modules/page-' + pageId], function (page) {
				if (typeof page !== 'undefined' && typeof page.init === 'function') {
					return page.init();
				}

			}, function (err) {
				window.console.warn('error loading page module "' + err.requireModules[0] + '"');
//				console.dir(err);
//				throw new Error(err.message);

				return false;
			});

		};

		return loadPageModule;
	}
);
