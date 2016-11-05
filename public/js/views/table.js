/**
 * Created by ES on 03.11.2016.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'templates/templates'
], function ($, _, Backbone, Templates) {

    const TableView = Backbone.View.extend({
        el: '#thead',
        template: Templates['table-head'],
        events: {
            //"change #regionSelector": "sortByRegion"
        },
        render: function () {
            //console.log(this.model);
            this.el.innerHTML = this.template(this.model);
            return this;
        }
    });

    return TableView;
})
