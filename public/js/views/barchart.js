/**
 * Created by ES on 10.12.2016.
 */

/**
 * Created by ES on 26.11.2016.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'd3',
    'barchart'
], function ($, _, Backbone, d3, BarChart) {

    const ChartView = Backbone.View.extend({
        el: '#chart',
        barData: [],
        events: {
            'mouseover rect': 'tooltip'
        },
        chart: null,
        chartSelection: null,
        initialize: function () {
            _.bindAll(this, 'render');
            if (this.collection) {
                //console.log(this.collection.toJSON());
                this.collection.toJSON()
                    .filter((country) => country.Population == 0 ? false : true)
                    .filter((country, i) => {
                        while (i < 100) {
                            return true;
                        }
                    })
                    .map((country, i) => {
                        this.barData.push({
                            name: country.Name,
                            population: country.Population
                        })

                    })
                // barData.sort((a, b) => {
                //    return a - b;
                // })
                this.render();
                //WORKS WITHOUT this
                //chart = BarChart();
            }
        },
        render: function () {
            // console.log(d3.select(this.el));
            // console.log(this.barData);
            this.chartSelection = d3.select(this.el)
                .datum(this.barData)
                .call(BarChart);
        },

        tooltip: function (e) {
            //console.log(e.target);

        },
        getValues: function (value) {
            return this.barData.map((country) => {
                return country[value]
            })
        }
    })


// .tickArguments(10)
// .ticks(20, "s");
// .ticks(10);

    return ChartView
})
