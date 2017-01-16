define([
    'collections/countries',
    'views/countries',
    'views/search',
    'views/barchart',
    'routers/router'

], function (Countries, CountriesView, SearchView, ChartView, Router) {
    'use strict';

    var initialize = function () {
        this.cache = {};
        //this.CountriesView = CountriesView;

        const countries = new Countries([]);
        let that = this;
        countries.fetch({
            success: function (collection, response, options) {
                //that.cache = new Countries(response);
                that.CountriesView = new CountriesView({collection: collection});
                const chartView = new ChartView({collection: collection});
                // chartView.render();
                //that.CountriesView.render();
            },
            error: function (collection, response, options) {

            }
        })

        const searchView = new SearchView;
        //pushStateL true
        var router = new Router();
        Backbone.history.start();

    }

    return {
        initialize: initialize
    }
});