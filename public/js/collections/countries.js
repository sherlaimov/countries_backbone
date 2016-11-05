/**
 * Created by ES on 12.10.2016.
 */
const debug = {};
const Countries = Backbone.Collection.extend({
    model: Country,
    sortAttribute: "Name",
    previousSortAttr: 'Name',
    sortDirection: 1,
    cnt: 0,

    sortCollection: function (attr) {
        this.sortDirection = (this.sortDirection === 1 ) ? -1 : 1;
        this.sort();
    },

    comparator: function (modelA, modelB) {
        console.log(`current sortAttribute ${this.sortAttribute}`);
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
        return '/country/' + this.testUrl
    },
    testUrl: '',
    region: undefined,
    initialize: function (models, options) {
        console.log(`Countries collection initialized: ${++this.cnt} times`);
    }
    // parse: function (response) {
    //     return response;
    // }
});


const countries = new Countries();
const CountryView = Backbone.View.extend({
    tagName: 'tr',
    template: getTemplate('table-row'),
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
const tableView = Backbone.View.extend({
    el: '#thead',
    template: getTemplate('table-head'),
    events: {
        //"change #regionSelector": "sortByRegion"
    },
    render: function () {
        //console.log(this.model);
        this.el.innerHTML = this.template(this.model);
        return this;
    }
});
const SearchView = Backbone.View.extend({
    el: '#search',
    events: {
        'keyup #searchBox': 'searchHandler'
    },

    initialize: function () {
        //this.on('click', this.searchHandler, this);
        _.bindAll(this, 'searchHandler');
    },
    searchHandler: _.debounce(function (e) {
        console.log('****TRIGGERED*********');
        countries.trigger('searchFilter', e);
    }, 750)
});
const searchView = new SearchView({});
const CountriesView = Backbone.View.extend({
    el: "#table",
    events: {
        "change #regionSelector": "sortByRegion",
        'click #Name': 'sortCollection',
        'click #Population': 'sortCollection',
        'click #LifeExp': 'sortCollection',
        'click #IndYear': 'sortCollection'

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
    //NOT IN USE |
    searchFilter: function (e) {
        console.log('searchFilter');
        this.searchFilter = e.target.value;
        this.trigger('change:searchFilter');

    },

    sortCollection: function (e) {
        debug.event = e;
        console.log(e.target.id);
        if (e.target.id === 'Population') {
            this.collection.sortAttribute = 'Population';
        } else if (e.target.id === 'LifeExp') {
            this.collection.sortAttribute = 'LifeExp';
        } else if (e.target.id === 'IndYear'){
            this.collection.sortAttribute = 'IndYear';
        } else if (e.target.id === 'Name') {
            this.collection.sortAttribute = 'Name';

        }
        console.log(this.collection.sortAttribute);
        //console.log('*******THIS COLLECTION*********');
        //console.log(this.collection);
        this.collection.sortCollection();
        this.render();
    },
    initialize: function () {
        this.collection = countries;//[]
        // _.bindAll(this, 'searchFilter');
        //this.listenTo(this.collection, 'change destroy add', this.render);
        this.listenTo(this.collection, 'remove', this.removeModel);
        this.listenTo(this.collection, 'reset', this.collectionReset);
        this.listenTo(this.collection, 'custom', this.render);
        this.collection.on('searchFilter', this.filterBySearch, this);
        //this.collection.bind('searchFilter', this.filterBySearch);
        //this.on('change:searchFilter', this.filterBySearch, this);

        // this.listenTo(this.collection, 'sort', this.render);
        //this.collection.fetch();
        const that = this;
        this.collection.fetch({
            success: function (collection, response, options) {
                that.cache = new Countries(response);
                debug.cache = that.cache;
                that.render();
            },
            error: function (collection, response, options) {

            }
        });
        this.table = ''

    },
    children: {},
    rendered: 0,
    filterBySearch: function (e) {
        console.log('FilterBySearch');
        let filterString = e.target.value.trim();
        if (filterString === '') {
            this.collection.reset(this.cache.toJSON());
            this.render();
            return;
        }
        let filtered = _.filter(this.collection.models, function (item) {
            return item.get('Name').toLowerCase().indexOf(filterString.toLowerCase())
                !== -1;
        });
        console.log(`Filtered collection length ${filtered.length}`);
        //this.setListLength(filtered.length);
        this.collection.reset(filtered);
        this.render();
        this.collection.reset(this.cache.toJSON());
    },
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
        console.log(`Times rendered ${++this.rendered}`);
        //console.log(this.collection.length);
        return this;

    },
    renderTable: function () {
        this.table = new tableView({
            model: {
                regions: this.getRegions(),
                number: this.collection.length,
                curRegion: this.collection.region
            }
        });
        //console.log(this.$el);
        this.$el.find('thead').prepend(this.table.render().el);
        return this;
    },
    getRegions: function () {
        let all = _.uniq(this.cache.pluck('Region'));
        // all.unshift('All');
        //console.log(all);
        //alert(); //-> 26
        let regions = {regions: all};
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
        console.log(`Collection reset`);
        //console.log(collection);
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
