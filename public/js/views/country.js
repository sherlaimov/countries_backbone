define([
    'jquery',
    'underscore',
    'backbone',
    'templates/templates',
    'views/modal_content'
], function ($, _, Backbone, Templates, ModalContent) {

    const CountryView = Backbone.View.extend({
        tagName: 'tr',
        template: Templates['table-row'],
        events: {
            'click': 'openModal'
        },
        removeModel: function (evt) {
            //console.log('CLICKED');
            this.model.collection.remove(this.model);
        },

        openModal: function(){
            const modal = new ModalContent({
                title: 'Is this an options object?',
                model: this.model
            })
            modal.show();
        },

        render: function () {
            this.el.innerHTML = this.template(this.model.toJSON());
            return this;
        }
    });

    return CountryView;
})
