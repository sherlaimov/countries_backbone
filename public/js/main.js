/**
 * Created by ES on 05.11.2016.
 */
require.config({
    paths: {
        'jquery': './vendor/jquery/dist/jquery.min',
        'underscore': './vendor/underscore/underscore-min',
        'backbone': './vendor/backbone/backbone-min',
        'backbone.localStorage': './vendor/backbone.localStorage/backbone.localStorage-min',
        'bootstrap': './vendor/bootstrap/dist/js/bootstrap.min'
    },

    // The shim config allows us to configure dependencies for
    // scripts that do not call define() to register a module

    shim: {
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        'backbone.localStorage': {
            deps: [
                'backbone'
            ],
            exports: 'Backbone'
        },
        'bootstrap': {
            deps: [
                'jquery'
            ]
        }
    }
});

require([
    'backbone',
    'app',
    'bootstrap'
], function(Backbone, App, Bootstrap) {
    App.initialize();
})