module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-copy');
    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        clean: ['dist/*.html',
            'dist/assets/*',
            'dist/js/*',
            'dist/js/collections/*',
            'dist/js/lib/*',
            'dist/js/models/*',
            'dist/js/routers/*',
            'dist/js/views/*'
        ],
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                globals: {
                    jQuery: true
                },
            },
            uses_defaults: ['src/js/*.js', 'src/js/collections/*.js',
            'src/js/models/*.js', 'src/js/routers/*.js', 'src/js/views/*.js'],
        },
        csslint: {
            strict: {
                options: {
                    import: 2
                },
                src: ['src/assets/index.css']
            }
        },
        validation: {
            options: {
                reset: grunt.option('reset') || false,
                stoponerror: true,
                relaxerror: ['Bad value X-UA-Compatible for attribute http-equiv on element meta.'], //ignores these errors
            },
            files: {
                src: ['src/index.html']
            }
        },
        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: 'src/js/lib',
                    src: ['backbone-min.js',
                    'backbone.localstorage-min.js',
                    'jquery.min.js',
                    'underscore-min.js'],
                    dest: 'dist/js/lib/'
                }]
            },
            readme: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: ['readme.md'],
                    dest: 'dist/'
                }]
            },
        },
        htmlmin: { // Task
            dist: { // Target
                options: { // Target options
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'dist/index.html': 'src/index.html'
                }
            },
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'css',
                    src: ['src/assets/*.css'],
                    dest: 'dist/assets',
                    ext: '.css'
                }]
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            my_target: {
                files: {
                    'dist/js/app.js': ['src/js/app.js'],
                    'dist/js/collections/todo.js': ['src/js/collections/todo.js'],
                    'dist/js/models/todo.js': ['src/js/models/todo.js'],
                    'dist/js/routers/todo.js': ['src/js/routers/todo.js'],
                    'dist/js/views/app.js': ['src/js/views/app.js'],
                    'dist/js/app.js': ['src/js/app.js']
                }
            }
        },
        jsdoc: {
            dist: {
                src: ['src/js/app.js',
                'src/js/collections/todo.js',
                'src/js/models/todo.js',
                'src/js/routers/todo.js',
                'src/js/views/app.js'
                ],
                options: {
                    destination: 'src/doc'
                }
            }
        }
    });
    grunt.registerTask('default', [
        'clean',
        'jshint',
        'validation',
        'csslint',
        'htmlmin',
        'cssmin',
        'uglify',
        'copy',
        'jsdoc'
    ]);
}