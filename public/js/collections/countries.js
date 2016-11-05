/**
 * Created by ES on 12.10.2016.
 */
define([
    'backbone',
    'models/country'
], function (Backbone, Country) {
    'use strict';

    const Countries = Backbone.Collection.extend({
        model: Country,
        sortAttribute: "Name",
        previousSortAttr: 'Name',
        sortDirection: 1,
        cnt: 0,

        sortCollection: function (attr) {
            this.sortDirection = (this.sortDirection === 1 ) ? -1 : 1;
            this.sort();
        },

        comparator: function (modelA, modelB) {
            console.log(`current sortAttribute ${this.sortAttribute}`);
            let a = modelA.get(this.sortAttribute),
                b = modelB.get(this.sortAttribute);

            if (a == b) return 0;

            if (this.sortDirection == 1) {
                return a > b ? 1 : -1;
            } else {
                return a < b ? 1 : -1;
            }
        },
        // url: '/country',
        url: function () {
            return '/country/' + this.testUrl
        },
        testUrl: '',
        region: undefined,
        initialize: function (models, options) {
            console.log(`Countries collection initialized: ${++this.cnt} times`);
        }
        // parse: function (response) {
        //     return response;
        // }
    });

    return Countries;
});


