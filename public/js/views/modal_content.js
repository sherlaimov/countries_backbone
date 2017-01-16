/**
 * Created by sherlaimov on 09.11.2016.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'views/modal'
], function($, _, Backbone, ModalView) {

    var AddPlaceView = ModalView.extend({
        html: [
            '<form role="form">',
            '<div class="form-group">',
            '<label for="countryCodeInput">Country Code</label>',
            '<input type="text" class="form-control" id="countryCodeInput" placeholder="Enter country code">',
            '</div>',
            '<div class="form-group">',
            '<label for="nameInput">Place Name</label>',
            '<input type="text" class="form-control" id="nameInput" placeholder="Enter the place name">',
            '</div>',
            '<div id="btn-add" class="btn btn-default">Submit</div>',
            '</form>'
        ].join(''),

        events: {
            'click #btn-add': 'addNewPlace'
        },
        initialize: function(){
            console.log('Arguments');
            console.log(arguments);
            ModalView.prototype.initialize.apply(this, arguments);
            // console.log('ModalView.prototype.initialize.apply(this, arguments)');
            console.log(this);
            // console.log(this);
            this.$bodyEl.html(this.html);
        },

        addNewPlace: function(e) {
            var place = {
                countryCode: this.$('#countryCodeInput').val(),
                name: this.$('#nameInput').val()
            };

            this.collection.create(place);
            this.$modalEl.modal('hide');
        }
    });

    return AddPlaceView;
});
