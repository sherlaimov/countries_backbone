/**
 * Created by ES on 03.11.2016.
 */
define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {
    const SearchView = Backbone.View.extend({
        el: '#search',
        events: {
            'keyup #searchBox': 'searchHandler'
        },

        initialize: function () {
            //this.on('click', this.searchHandler, this);
            _.bindAll(this, 'searchHandler');
        },
        searchHandler: _.debounce(function (e) {
            console.log('****TRIGGERED*********');
            countries.trigger('searchFilter', e);
        }, 750)
    });

    return SearchView;
})
