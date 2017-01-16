/**
 * Created by ES on 08.11.2016.
 */
/**
 * Created by ES on 13.06.2016.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'templates/templates'
    // 'bootstrap'
], function($, _, Backbone, Templates){

    var ModalView = Backbone.View.extend({
        template: Templates['modal'],
        events: {

        },

        id: 'modal-view',

        initialize: function(){
            var title = this.title || 'What the fuck?!';
            var appendTo = this.appendTo || 'body';

            var html = Templates['modal']({title:title});
            this.$el.html(html);
            this.$modalEl = this.$('.modal');
            this.$bodyEl = this.$('.modal-body');
            this.$titleEl = this.$('.modal-title');
            $(appendTo).append(this.el);
        },

        render: function(){
            this.$modalEl.modal({
                show: false,
                keyboard: false
            });
            return this;
        },

        show: function(){
            var that = this;
            console.log(this.$modalEl);
            this.$modalEl.modal('show');
            this.$modalEl.on('hidden.bs.modal', function(){
                that.onModalHidden();
            });
        },

        onModalHidden: function(e) {
            this.$modalEl.off('hidden.bs.modal');
            this.remove();
        }
    });


    return ModalView;

});