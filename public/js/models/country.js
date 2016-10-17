/**
 * Created by sherlaimov on 12.10.2016.
 */
var Country = Backbone.Model.extend({
    defaults: {
        id: function(){
            return 0;
        },
        Code: '',
        Name: '',
        Population: '',
        Region: '',
        IndepYear: '',
        LifeExpectancy: '',
        GNP: ''
    },
    //validate: function(attrs){
    //    if(typeof atts.Population !== 'number') {
    //        return 'Population must be a number';
    //    }
    //},
    //urlRoot: '/country',
    idAttribute: 'Code'
});

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
let title = $('#title');
let country = new Country( { Code: 'UKR'} );
//country.on('change', updateView);
//country.fetch();

function updateView(){
    title.text(country.get('Code'));
}