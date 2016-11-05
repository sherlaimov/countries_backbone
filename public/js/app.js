define([
    'collections/countries',
    'views/countries',
    'routers/router'

], function (Countries, CountriesView, Router) {
    'use strict';

    var initialize = function () {
        this.cache = {};
        this.CountriesView = CountriesView;

        const countries = new Countries([]);
        let that = this;
        countries.fetch({
            success: function (collection, response, options) {
                that.cache = new Countries(response);
                that.CountriesView = new CountriesView({collection:collection});
                //that.CountriesView.render();
            },
            error: function (collection, response, options) {

            }
        })
        //var router = new Router(appView);
        //Backbone.history.start();

    }

    return {
        initialize: initialize
    }
});