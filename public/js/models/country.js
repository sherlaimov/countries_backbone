/**
 * Created by sherlaimov on 12.10.2016.
 */
define([
    'backbone'
], function (Backbone) {

    const Country = Backbone.Model.extend({
        defaults: {
            Code: '',
            Name: '',
            Population: '',
            Region: '',
            IndepYear: '',
            LifeExpectancy: '',
            GNP: ''
        },
        testThis: function(){
            console.log(this);
        },
        //validate: function(attrs){
        //    if(typeof atts.Population !== 'number') {
        //        return 'Population must be a number';
        //    }
        //},
        //urlRoot: '/country',
        idAttribute: 'Code',
        cnt: 0,
        initialize: function () {
            //console.log(`Model initialized ${++this.cnt} times`);
            //this.testThis();
            this.on('change', () => {
                console.log(`${this.get('Name')} model has changed`);
            })
        }
    });

    return Country;
})

/*ALL possible Model EVENTS

 obj.on/once/off/triger

 view.listenTo(obj, event, fn)
 view.stopListening(obj, event, fn)

 change
 change:field
 destory
 request
 sync
 error
 invalid
 all
 */
