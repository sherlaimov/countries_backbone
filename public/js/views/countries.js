/**
 * Created by ES on 03.11.2016.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'views/country',
    'views/table',
    'collections/countries',
    'event_emitter'
], function ($, _, Backbone, CountryView, TableView, Countries, EventEmitter) {

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
            console.log(e.target.id);
            let sortAttr = 'Name';
            if (e.target.id === 'Population') {
                sortAttr = 'Population';
            } else if (e.target.id === 'LifeExp') {
                sortAttr = 'LifeExpectancy';
            } else if (e.target.id === 'IndYear') {
                sortAttr = 'IndepYear';
            } else if (e.target.id === 'Name') {
                sortAttr = 'Name';
            }
            console.log(this.collection.sortAttribute);
            this.collection.sortCollection(sortAttr);
            this.render();
        },
        initialize: function () {
            //this.collection = countries;//[]
            // _.bindAll(this, 'searchFilter');
            //this.listenTo(this.collection, 'change destroy add', this.render);
            this.listenTo(this.collection, 'remove', this.removeModel);
            this.listenTo(this.collection, 'reset', this.collectionReset);
            this.listenTo(this.collection, 'custom', this.render);
            EventEmitter.on('searchFilter', this.filterBySearch, this);
            //this.collection.bind('searchFilter', this.filterBySearch);
            //this.on('change:searchFilter', this.filterBySearch, this);

            // this.listenTo(this.collection, 'sort', this.render);
            //this.collection.fetch();
            const that = this;
            this.collection.fetch()
                .done((collection, resp) => {
                    //console.log(collection);
                    that.cache = new Countries(collection);
                })
                .then(()=> {
                    that.render();
                })

            //this.collection.fetch({
            //    success: function (collection, response, options) {
            //        console.log('COLLECTION');
            //        console.log(that.collection);
            //        that.cache = new Countries(response);
            //        //debug.cache = that.cache;
            //        that.render();
            //    },
            //    error: function (collection, response, options) {
            //
            //    }
            //});
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
                this.children[model.id] = new CountryView({model: model});
                //console.log(this.children[model.cid].render().el);
                html.push(this.children[model.id].render().el);
            }, this);
            html.join('');

            this.$el.find('tbody').html(html);
            console.log(`Times rendered ${++this.rendered}`);
            //console.log(this.collection.length);
            return this;

        },
        renderTable: function () {
            this.table = new TableView({
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
    return CountriesView;
});
