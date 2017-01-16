/**
 * Created by ES on 10.12.2016.
 */

define(['jquery', 'd3'], function ($, d3) {

    const margin = {top: 20, right: 20, bottom: 60, left: 35};
    let height = 400 - margin.top - margin.bottom;
    let width = 800 - margin.right - margin.left;



       // console.log(this.getValues('population'));
    //console.log(this);
    let tempColor;
    const dispatch = d3.dispatch('customHover');
    let bars;
    let convertData = false;

    function Chart(_selection) {
        // console.dir(_selection.data());
        // const [data] = [..._selection.data()];
        let data = _selection.data()[0];

        function getValues(value) {
            return data.map((country) => {
                return country[value]
            })
        }

        console.log(getValues('name').length);
        //const colors = d3.scaleLinear()
        //    .domain([0, getValues('name').length])
        //    .domain([0, 10])
        //    .range(['#FFB832', '#C61C6F']);
        const colors = d3.scaleOrdinal(d3.schemeCategory10);

        const x = d3.scaleBand()
            .domain(d3.range(0, getValues('name').length))
            // .domain(d3.range(0, _data.map((d, i) => d)))
            .range([0, width])
            .paddingInner(.2);

        const y = d3.scaleLinear()
            .domain([0, d3.max(getValues('population'))])
            .range([0, height]);

        const yGuide = d3.scaleLinear()
            .domain([0, d3.max(getValues('population'))])
            .range([height, 0]);

        const xAxis = d3.axisBottom(x);
        const yAxis = d3.axisLeft(yGuide);

        const svg = d3.select('#chart')
            .append('svg')
            .attr('class', 'chart')
            .attr('height', '100%')
            .attr('width', '100%');

        const container = svg.append('g').attr('class', 'container-group');
        container.append('g').attr('class', 'bars');
        container.append('g').attr('class', 'x-axis');
        container.append('g').attr('class', 'y-axis');
        //svg.transition().attr({width: config.width, height: config.height})
        svg.select('.container-group').attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');
        svg.select('.x-axis').attr('transform', 'translate(' + margin.left + ',' + (height + margin.top) + ' )')
            .call(xAxis);
        svg.select('.y-axis').attr('transform', 'translate(' + margin.left + ',' + margin.top + ' )')
            .call(yAxis);

        //const chartGroup = svg.append('g').attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

        //const chart = svg.select('.chart');
        bars = svg.select('.bars')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ' )')
            .selectAll('.bar')
            .data(data);

        bars.enter()
            .append('rect')
            .attr('class', 'bar')
            .style('fill', (d, i) => colors(i))
            .attr('width', (d, i) => x.bandwidth())
            .attr('height',0)
            //.attr('height', (d) => y(d.population))
            .attr('x', (d, i) => x(i))
             .attr('y', height)
            //.attr('y', (d) => height - y(d.population));
        // .on('mouseover', dispatch.customHover);

         svg.selectAll('.bar').transition()
             .attr('height', function (d) {
                 // console.log(d);
                 return y(d.population)
             })
             .attr('y', (d) => height - y(d.population))
             .delay((d, i) => i * 20)
             .duration(1000);
        //console.log(bars);
        //console.log(svg.selectAll('.bar'));

         //bars.exit().transition().style({opacity: 0}).remove();

        const tooltip = d3.select('body').append('div')
            .style('position', 'absolute')
            .style('padding', '0 10px')
            .style('background', '#fff')
            .style('opacity', 0);

        svg.selectAll('.bar')
            .on("mouseover", function (d, i, e) {
                        //console.dir(this);
                        tooltip.transition()
                            .style('opacity', .9);

                        tooltip.html('<h5>' + data[i].name + '</h5>' + d.population)
                            .style('left', (d3.event.pageX - 20) + 'px')
                            .style('top', (d3.event.pageY - 60) + 'px');

                        //console.log(this.$el.find('rect'));
                        tempColor = this.style.fill;
                        d3.select(this)
                            .transition()
                            .style('opacity', .5)
                            .style('fill', '#fbf606')
                    })
                    .on('mouseout', function (d) {
                        tooltip.html('')
                        d3.select(this)
                            .transition().duration(250)
                            .style('opacity', 1)
                            .style('fill', tempColor)
                    });

        //bars = selection.selectAll('.bar')
        //    .data(function (d) {
        //        return d;
        //    })
        //    .call(enterBars);
        /* set up and render the x and y-axis. */


        function enterBars(selection) {
            selection.enter().append('rect')
                .attr('class', 'bar')
                .attr('width', x.rangeBand());
            updateBars(selection);
        }

        function updateBars(selection) {
            selection.attr('x', function (d) {
                return x(d.letter);
            })
                .attr('y', function (d) {
                    return y(d.frequency);
                })
                .attr('height', function (d) {
                    return height - y(d.frequency);
                });
        }

        function exitBars(selection) {
            selection.exit().remove();
        }


        Chart.width = function (value) {
            if (!arguments.length) return width;
            width = value;
            return Chart;
        };
        Chart.height = function (value) {
            if (!arguments.length) return height;
            height = value;
            return Chart;
        };

        Chart.update = function () {
            bars.data(function (d) {
                return d;
            })
                .call(exitBars)
                .call(updateBars)
                .call(enterBars);
        }
    }

    return Chart;

});
