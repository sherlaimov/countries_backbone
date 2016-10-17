/**
 * Created by ES on 12.10.2016.
 */
const obj = {};
const Countries = Backbone.Collection.extend({
    model: Country,
    url: '/country',
    initialize: function () {
        //this.fetch({
        //    success: function (collection, response, options) {
        //        let middleEast = collection.where({Region: 'Middle East'});
        //        //console.log(middleEast.map( (obj)  =>  obj.attributes.Name));
        //        console.log(countries);
        //        //console.log(countries.get('UKR'));
        //    },
        //    error: function (collection, response, options) {
        //
        //    }
        //})
    }
    // parse: function (response) {
    //     return response;
    // }
});

// let countries = new Countries();
const CountryView = Backbone.View.extend({
    tagName: 'tr',
    template: getTemplate('country'),
    events: {
      'click': 'removeModel'
    },
    removeModel: function(evt) {
        console.log('CLICKED');
       this.model.collection.remove(this.model);
    },
    render: function () {
        this.el.innerHTML = this.template(this.model.toJSON());
        return this;
    }
})
const CountriesView = Backbone.View.extend({
    el: "#tbody",
    initialize: function () {
        this.collection = new Countries();//[]
        //this.listenTo(this.collection, 'change destroy add', this.render);
        this.listenTo(this.collection, 'remove', this.removeModel);
        //this.collection.fetch();
        const that = this;
        this.collection.fetch({
               success: function (collection, response, options) {
                   that.render();
               },
               error: function (collection, response, options) {

               }
            });
        //this.$tbody = $('#tbody');


    },
    children: {},
    rendered: 0,
    render: function () {
        let that = this;
        console.log(this.rendered++);
        this.collection.each((model, index, list) => {
            /*var view = new CountryView({model: model});
            view.render();*/
            this.children[model.cid] = new CountryView({model: model});
            this.$el.append(this.children[model.cid].render().el)
        }, this);
        return this;

    },
    removeModel: function(model){
        // console.log('would remove here');
        // console.log(this.children[model.cid]);
        // this.children[model.cid].$el.remove();
        // this.collection.remove(this.children[model]);
        this.children[model.cid].remove();
        //console.log(this.children);
        //this.render();
    }
});
const countriesView = new CountriesView();


//$('#table').append(mainView.render().el);
/*ALL possible Collection EVENTS
 add
 remove
 reset
 sort
 request
 sync
 error
 */

// let app = $('#app');
//
// countries.on('add', (model) => {
//     model.view = $('<h2>').text(model.get('Name'));
//     app.append(model.view);
// });
// countries.fetch();
// countries.on('remove', (model) => {
//     model.view.remove();
// })


// countries.comparator = function(model1, model2) {
//     return model1.get('Name').length - model2.get('Name').length;
// }
