/**
 * Created by ES on 06.11.2016.
 */
define([
    'backbone',
    'underscore'
], function(Backbone, _){
   const EventEmitter = _.extend({}, Backbone.Events);

    return EventEmitter;
});