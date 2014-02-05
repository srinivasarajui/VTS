'use strict';

module.exports = function(grunt) {
    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            jade: {
                files: ['app/views/**'],
                options: {
                    livereload: true,
                },
            },
            js: {
                files: ['gruntfile.js', 'server.js', 'app/**/*.js', 'public/js/**', 'test/**/*.js'],
                tasks: ['jshint'],
                options: {
                    livereload: true,
                },
            },
            html: {
                files: ['public/views/**'],
                options: {
                    livereload: true,
                },
            },
            css: {
                files: ['public/css/**'],
                options: {
                    livereload: true
                }
            }
        },
        jshint: {
            all: {
                src: ['gruntfile.js', 'server.js', 'app/**/*.js', 'public/js/**', 'test/karma/*.js', 'test/mocha/*.js'],
                options: {
                    jshintrc: true
                }
            }
        },
        concat: {
            options: {
                separator: '\n', //add a new line after each file
                banner: '', //added before everything
                footer: '' //added after everything
            },
            dist: {
                // the files to concatenate
                src: [
                    //include libs
                    'public/lib/angular/angular.js',
                    'public/lib/angular-cookies/angular-cookies.js',
                    'public/lib/angular-resource/angular-resource.js',
                    'public/lib/angular-route/angular-route.js',
                    'public/lib/angular-bootstrap/ui-bootstrap.js',
                    'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
                    'public/lib/angular-ui-utils/ui-utils.js',
                    'public/lib/underscore/underscore.js',
                    'public/lib/angular-xeditable/dist/js/xeditable.js',
                    'public/lib/jquery/jquery.js',
                    'public/lib/ng-grid/ng-grid-2.0.7.js',
                    'public/lib/ng-grid/plugins/ng-grid-flexible-height.js',
                    'public/lib/ng-grid/plugins/ng-grid-csv-export.js',

                    //own classes and files
                    'public/js/!(base).js',
                    'public/js/controllers/!(base).js',
                    'public/js/services/!(base).js'

                ],

                // the location of the resulting JS file
                dest: 'build/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: ''
            },
            build: {
                src: 'build/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },
        nodemon: {
            dev: {
                options: {
                    file: 'server.js',
                    args: [],
                    ignoredFiles: ['public/**'],
                    watchedExtensions: ['js'],
                    nodeArgs: ['--debug'],
                    delayTime: 1,
                    env: {
                        PORT: 3000
                    },
                    cwd: __dirname
                }
            }
        },
        concurrent: {
            tasks: ['nodemon', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        },
        removelogging: {
            dist: {
                src: 'build/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.js'
            }
        },
        mochaTest: {
            options: {
                reporter: 'spec',
                require: 'server.js'
            },
            src: ['test/mocha/**/*.js']
        },
        env: {
            test: {
                NODE_ENV: 'test'
            }
        },
        karma: {
            unit: {
                configFile: 'test/karma/karma.conf.js'
            }
        }
    });

    //Load NPM tasks 
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-remove-logging');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');

    //Making grunt default to force in order not to break the project.
    grunt.option('force', true);

    //Default task(s).
    grunt.registerTask('default', ['jshint', 'concurrent']);

    //Test task.
    grunt.registerTask('test', ['env:test', 'mochaTest', 'karma:unit']);

    grunt.registerTask('build', ['concat', 'removelogging', 'uglify']);
};
