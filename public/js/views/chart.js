/**
 * Created by ES on 26.11.2016.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'collections/countries',
    'd3'
], function ($, _, Backbone, Countries, d3) {

    const ChartView = Backbone.View.extend({
        el: '#chart',
        barData: [],
        events: {
            'mouseover rect': 'tooltip'
        },
        initialize: function () {
            if (this.collection) {
                //console.log(this.collection.toJSON());
                this.collection.toJSON()
                    .filter((country) => country.Population == 0 ? false : true)
                    .filter((country, i) => {
                        while (i < 40) {
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
            }
        },
        render: function () {
            const margin = {
                top: 20,
                right: 20,
                bottom: 60,
                left: 35
            };
            const height = 400 - margin.top - margin.bottom;
            const width = 800 - margin.right - margin.left;

            const y = d3.scaleLinear()
                .domain([0, d3.max(this.getValues('population'))])
                .range([0, height]);
            const yGuide = d3.scaleLinear()
                .domain([0, d3.max(this.getValues('population'))])
                .range([height, 0]);

            const x = d3.scaleBand()
                .domain(d3.range(0, this.getValues('name').length))
                .range([0, width])
                .paddingInner(.2);

            const colors = d3.scaleLinear()
                .domain([0, this.barData.length])
                .range(['#FFB832', '#C61C6F']);

            // console.log(this.getValues('population'));

            var that = this;
            let tempColor;
            const yAxis = d3.axisLeft(yGuide);
            const xAxis = d3.axisBottom(x);

            const svg = d3.select('#chart').append('svg')
                .style('background', '#E7E0CB')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom);
            //Canvas size set, below goes the chart section
            const chartGroup = svg.append('g').attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

            chartGroup.append('g')
                .attr('class', 'bars')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ' )')
                .selectAll('rect')
                .data(this.getValues('population'))
                .enter().append('rect')
                .style('fill', (d, i) => colors(i))
                .attr('width', (d, i) => x.bandwidth())
                //.attr('height',0)
                .attr('height', 0)
                .attr('x', (d, i) => x(i))
                .attr('y', height)
                //.attr('y', (d) => height - y(d))
                .transition()
                .attr('height', function (d) {
                    //console.log(d);
                    return y(d)
                })
                .attr('y', (d) => height - y(d))
                .delay((d, i) => i * 20)
                .duration(1000);


            // chartGroup.append('g').attr('class', 'x axis')
            //     .attr('transform', 'translate(' + margin.left + ',' + (height + margin.top) + ' )')
            //     .call(xAxis);
            chartGroup.append('g').attr('class', 'x axis')
                .attr('transform', 'translate(' + margin.left + ',' + (height + margin.top) + ' )')
                .call(xAxis);
            // xAxis(chartGroup);
            chartGroup.append('g').attr('class', 'y axis')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ' )')
                .call(yAxis);

            //const tooltip = d3.select('body').append('div')
            //    .style('position', 'absolute')
            //    .style('padding', '0 10px')
            //    .style('background', '#fff')
            //    .style('opacity', 0);
            //chartGroup.selectAll('rect')
            //    .on("mouseover", (d, i, e) => {
            //        //console.log(e);
            //        tooltip.transition()
            //            .style('opacity', .9);
            //
            //        tooltip.html('<h5>' + this.barData[i].name + '</h5>' + d)
            //            .style('left', (d3.event.pageX - 20) + 'px')
            //            .style('top', (d3.event.pageY - 60) + 'px');
            //
            //        //console.log(this.$el.find('rect'));
            //        tempColor = this.el.style.fill;
            //        d3.select(this.el)
            //            .transition()
            //            .style('opacity', .5)
            //            .style('fill', '#fbf606')
            //    })
            //    .on('mouseout', function (d) {
            //        tooltip.html('')
            //        d3.select(this)
            //            .transition().duration(250)
            //            .style('opacity', 1)
            //            .style('fill', tempColor)
            //    });
            //const yGuide = d3.scaleLinear()
            //    .domain([0, d3.max(getValues('population'))])
            //    .range([height, 0])
            //.tickFormat(function(d) {return getValues('name').map((country) => country )})

            // .ease('cubicInOut');
//             const yScale = d3.scaleLinear()
//                 .domain([0, d3.max(barData)])
//                 .range([0, height])
            return this;
        },
        tooltip: function (e) {
            console.log(e.target);
            const tooltip = d3.select('body').append('div')
                .style('position', 'absolute')
                .style('padding', '0 10px')
                .style('background', '#fff')
                .style('opacity', 0);

            //chartGroup.selectAll('rect')
            //    .on("mouseover", (d, i, e) => {
            //        //console.log(e);
            //        tooltip.transition()
            //            .style('opacity', .9);
            //
            //        tooltip.html('<h5>' + this.barData[i].name + '</h5>' + d)
            //            .style('left', (d3.event.pageX - 20) + 'px')
            //            .style('top', (d3.event.pageY - 60) + 'px');
            //
            //        //console.log(this.$el.find('rect'));
            //        tempColor = this.el.style.fill;
            //        d3.select(this.el)
            //            .transition()
            //            .style('opacity', .5)
            //            .style('fill', '#fbf606')
            //    })
            //    .on('mouseout', function (d) {
            //        tooltip.html('')
            //        d3.select(this)
            //            .transition().duration(250)
            //            .style('opacity', 1)
            //            .style('fill', tempColor)
            //    });
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