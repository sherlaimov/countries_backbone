/**
 * Created by ES on 12.10.2016.
 */
const debug = {};
const Countries = Backbone.Collection.extend({
    model: Country,
    sortAttribute: "Name",
    sortDirection: 1,
    cnt: 0,

    sortMovies: function (attr) {
        this.sortAttribute = attr;
        this.sort();
    },

    sortByName: function () {
        this.sortDirection = (this.sortDirection === 1 ) ? -1 : 1;
        this.sort();
        this.trigger('custom');
    },

    comparator: function (modelA, modelB) {
        console.log('SORTED');
        let a = modelA.get(this.sortAttribute),
            b = modelB.get(this.sortAttribute);

        if (a == b) return 0;

        if (this.sortDirection == 1) {
            return a > b ? 1 : -1;
        } else {
            return a < b ? 1 : -1;
        }
    },
    // url: '/country',
    url: function () {
        return '/country/' + this.region
    },
    region: '',
    initialize: function (models, options) {
        console.log(`Countries collectino initialized: ${++this.cnt} times`);
    }
    // parse: function (response) {
    //     return response;
    // }
});

// let countries = new Countries();
const CountryView = Backbone.View.extend({
    tagName: 'tr',
    template: getTemplate('countries'),
    events: {
        'click': 'removeModel'
    },
    removeModel: function (evt) {
        console.log('CLICKED');
        this.model.collection.remove(this.model);
    },
    render: function () {
        this.el.innerHTML = this.template(this.model.toJSON());
        return this;
    }
});
const tableView = Backbone.View.extend({
    template: getTemplate('table-body'),
    events: {
        //"change #regionSelector": "sortByRegion"
    },
    render: function () {
        console.log(this.model);
        this.el.innerHTML = this.template(this.model);
        return this;
    }
});
const CountriesView = Backbone.View.extend({
    el: "#panel-body-table",
    events: {
        "change #regionSelector": "sortByRegion",
        'click #sortByName': 'sortByName'
    },
    cache: {},
    sortByRegion: function (e, i) {
        let region = this.$el.find('#regionSelector').val();
        this.collection.region = region;
        if (region === 'All') {
            this.collection.reset(this.cache.toJSON());
            this.render();
        } else {
            this.collection.reset(this.cache.where({Region: region}));
            this.render();
        }

    },
    sortByName: function (e) {

        this.collection.sortByName();
        // this.render();
    },
    initialize: function () {
        this.collection = new Countries();//[]
        //this.listenTo(this.collection, 'change destroy add', this.render);
        this.listenTo(this.collection, 'remove', this.removeModel);
        this.listenTo(this.collection, 'reset', this.collectionReset);
        this.listenTo(this.collection, 'custom', this.render);
        // this.listenTo(this.collection, 'sort', this.render);
        //this.collection.fetch();
        const that = this;
        this.collection.fetch({
            success: function (collection, response, options) {
                that.cache = new Countries(response);
                debug.cache = that.cache;
                //console.log(this.cache);
                //maybe response
                // console.log(that.getRegions());
                //that.renderTable();
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
        this.renderTable();
        let html = [];
        this.collection.each((model, index, list) => {
            /*var view = new CountryView({model: model});
             view.render();*/
            this.children[model.cid] = new CountryView({model: model});
            //console.log(this.children[model.cid].render().el);
            html.push(this.children[model.cid].render().el);
        }, this);
        html.join('');
        //console.log(html);
        debug.children = this.children;
        this.$el.find('tbody').html(html);
        console.log(++this.rendered);
        console.log(this.collection.length);
        return this;

    },
    renderTable: function () {
        this.table = new tableView({
            model: {
                regions: this.getRegions(),
                number: this.collection.length
            }
        });
        this.$el.prepend(this.table.render().el);
        return this;
    },
    getRegions: function () {
        let regions = {regions: _.uniq(this.cache.pluck('Region'))};
        return regions;
    },
    removeModel: function (model) {
        console.log(this.children[model.cid].cid + ' REMOVED');
        // console.log('would remove here');
        // this.children[model.cid].$el.remove();
        // this.collection.remove(this.children[model]);
        this.children[model.cid].remove();
        //console.log(this.children);
        //this.render();
    },
    collectionReset: function (collection) {
        //this.renderTable();
        console.log(`Collection reset as`);
        console.log(collection);
    }
});
const countriesView = new CountriesView();
const Router = Backbone.Router.extend({
    routes: {
        '': 'show',
        'add/:id': 'add'
    },
    show: function () {
        console.log('SHOWING THE ROOT');
    },
    add: function (id) {
        console.log('add ' + id);
    }
});

const router = new Router();
Backbone.history.start({pushState: true});

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
