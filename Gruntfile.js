/*global module:false, require*/
module.exports = function (grunt) {

	// Displays the elapsed execution time of grunt tasks
	require('time-grunt')(grunt);

	// Load NPM Tasks
	require('load-grunt-tasks')(grunt, ['grunt-*', '!grunt-template-jasmine-istanbul', '!grunt-template-jasmine-requirejs']);

	var dateFormat = require('dateformat');
	var reportDir = 'reports/' + dateFormat(new Date(), 'yyyymmdd-HHMMss');
	var tasks = 'tasks/**/*.js';
	var specs = 'specs/*Spec.js';

	grunt.initConfig({
		jshint : {
			options  : {
				curly  : true,
				eqeqeq : true,
				immed  : true,
				latedef: true,
				newcap : true,
				noarg  : true,
				sub    : true,
				undef  : true,
				unused : true,
				boss   : true,
				eqnull : true,
				browser: true,
				globals: {}
			},
			gruntfile: {
				src: 'Gruntfile.js'
			},
			lib_test : {
				src: ['src/**/*.js']
			}
		},
		connect: {
			test : {
				port : 8000
			}
		},
		jasmine: {
			taskName: {
				src    : '<%= jshint.gruntfile.src %>',
				options: {
					specs          : specs,
					helpers        : 'specs/*Helper.js',
					host           : 'http://127.0.0.1:8000/',
					template       : require('grunt-template-jasmine-requirejs'),
					templateOptions: {
						coverage: 'reports/coverage.json',
						report: 'reports/coverage'
//						requireConfigFile: 'src/main.js'
					}
				}
			}
		},
		watch  : {
			gruntfile: {
				files: '<%= jshint.gruntfile.src %>',
				tasks: ['jshint:gruntfile']
			},
			lib_test : {
				files: ['<%= jshint.lib_test.src %>', specs],
				tasks: ['jshint:lib_test', 'connect', 'jasmine']
			}
		},
		instrument : {
			files : tasks,
			options : {
				lazy : true,
				basePath : 'build/instrument/'
			}
		},
		reloadTasks : {
			rootPath : 'build/instrument/tasks'
		},
		storeCoverage : {
			options : {
				dir : reportDir
			}
		},
		makeReport : {
			src : 'build/reports/**/*.json',
			options : {
				type : 'lcov',
				dir : reportDir,
				print : 'detail'
			}
		}
	});

	grunt.registerTask('test', ['jshint', 'connect', 'jasmine']);
	grunt.registerTask('cover', [ 'instrument', 'reloadTasks', 'test', 'storeCoverage', 'makeReport' ]);

	grunt.registerTask('default', ['test']);

};
