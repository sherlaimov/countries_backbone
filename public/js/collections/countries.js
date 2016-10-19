/**
 * Created by ES on 12.10.2016.
 */
const obj = {};
const Countries = Backbone.Collection.extend({
    model: Country,
    url: '/country',
    initialize: function (models, options) {
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

 let countries = new Countries();
const CountryView = Backbone.View.extend({
    tagName: 'tr',
    template: getTemplate('countries'),
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
});
const tableView = Backbone.View.extend({
    template:getTemplate('table-body'),
    events: {
      "change #regionSelector": "sortByRegion"
    },
    sortByRegion: function(e, i){
        //let region = this.$el.find('#regionSelector').val();

        //console.log(e.target);

    },
    render: function(){
        this.el.innerHTML = this.template(this.model);
        return this;
    }
})
const CountriesView = Backbone.View.extend({
    el: "#panel-body-table",
    events: {
        "change #regionSelector": "sortByRegion"
    },
    sortByRegion: function(e, i){
        let region = this.$el.find('#regionSelector').val();
         this.collection.set(this.collection.where({Region: region}));
        // console.log(this.collection);
        // this.collection.reset();
        // this.collection.comparator = region;
        // this.collection.sort();
         this.render();

        console.log(region);

    },
    initialize: function () {
        this.collection = new Countries();//[]
        //this.listenTo(this.collection, 'change destroy add', this.render);
        this.listenTo(this.collection, 'remove', this.removeModel);
        //this.collection.fetch();
        const that = this;
        this.collection.fetch({
               success: function (collection, response, options) {
                   console.log(that.getRegions());
                   that.renderTable();
                   that.render();
               },
               error: function (collection, response, options) {

               }
            });
        this.table = ''

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
            this.$el.find('tbody').append(this.children[model.cid].render().el)
        }, this);
        return this;

    },
    renderTable: function() {
        this.table = new tableView({model:this.getRegions()});
        this.$el.prepend(this.table.render().el);
        return this;
    },
    getRegions: function() {
        let regions = {regions:_.uniq(this.collection.pluck('Region'))};
        return regions;
    },
    removeModel: function(model){
         console.log(this.children[model.cid].cid + ' REMOVED');
        // console.log('would remove here');
        // this.children[model.cid].$el.remove();
        // this.collection.remove(this.children[model]);
        this.children[model.cid].remove();
        //console.log(this.children);
        //this.render();
    }
});
const countriesView = new CountriesView();
const Router = Backbone.Router.extend({
    routes: {
        '': 'show',
        'add/:id': 'add'
    },
    show: function() {
        console.log('SHOWING THE ROOT');
    },
    add: function(id) {
        console.log('add ' + id);
    }
});

const router = new Router();
Backbone.history.start({pushState:true});

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
