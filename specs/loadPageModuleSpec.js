//var initSpy = jasmine.createSpy('initSpy');

var testModuleStub = {
	init: function() { }
};

define(
	'modules/page-testModule',
	testModuleStub
);

define(
	['./../src/loadPageModule/loadPageModule.js'],
	function (loadPageModule) {
		"use strict";

		describe('Page Loader Module', function () {
			it('should exist', function() {
				expect(loadPageModule).toBeTruthy();
			});

			it('is also exposed via window/globals', function() {
				expect(window.loadPageModule).toBeTruthy();
			});

			it('loads a given module via RequireJS', function() {
				expect(loadPageModule('testModule')).toBeTruthy();
			});

			// TODO: find a way to test the required function call
			xit('it calls the init function from a loaded module', function() {
				spyOn(testModuleStub, 'init');
				loadPageModule('testModule');
				expect(testModuleStub.init).toHaveBeenCalled();
			});
		});
	}
);

