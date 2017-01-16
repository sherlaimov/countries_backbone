/**
 * Created by ES on 04.12.2016.
 */

const parseDate = d3.timeParse('%m/%d/%Y');

d3.csv('./js/d3_experiments/prices.csv')
    .row((d) => { return {month:parseDate(d.month),price: Number(d.price.trim().slice(1))}})
    .get((error, data) => {
    console.log(data);
        const height = 300
        ,width = 500;

        const max = d3.max(data,((d) => d.price));
        const minDate = d3.min(data, ((d)=> d.month));
        const maxDate = d3.max(data, ((d)=> d.month));

        const y = d3.scaleLinear()
            .domain([0, max])
            .range([height, 0]);

        const x = d3.scaleTime()
            .domain([minDate, maxDate])
            .range([0, width]);

        const yAxis = d3.axisLeft(y);
        const xAxis = d3.axisBottom(x);

        const svg = d3.select('#chart').append('svg').attr('height','100%').attr('width', '100%');
        const margin = {top: 40, right:50, bottom:0, left:50};

        const chartGroup = svg.append('g')
                                .attr('transform', 'translate('+margin.left+ ','+margin.right+')');

        const line = d3.line()
                    .x((d) => x(d.month))
                    .y((d) => y(d.price));

        chartGroup.append('path').attr('d', line(data))
        chartGroup.append('g').attr('class', 'x axis').attr('transform', 'translate(0,'+ height +')').call(xAxis);
        chartGroup.append('g').attr('class', 'y axis').call(yAxis);
})