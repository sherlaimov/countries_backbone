define([
    'jquery',
    'underscore',
    'backbone',
    'templates/templates'
], function ($, _, Backbone, Templates) {

    const CountryView = Backbone.View.extend({
        tagName: 'tr',
        template: Templates['table-row'],
        events: {
            'click': 'removeModel'
        },
        removeModel: function (evt) {
            //console.log('CLICKED');
            this.model.collection.remove(this.model);
        },
        render: function () {
            this.el.innerHTML = this.template(this.model.toJSON());
            return this;
        }
    });

    return CountryView;
})
