/**
 * Created by eugene on 11/27/16.
 */
const data = [5, 8, 12, 16];
const dataDays = ['Mon', 'Wed', 'Fri', 'Sat'];

const rainbow = d3.scaleSequential(d3.interpolateRainbow).domain([0, 10]);
const rainbow2 = d3.scaleSequential(d3.interpolateRainbow).domain([0, 3]);
const cat20 = d3.schemeCategory20;

console.log(cat20);

const x = d3.scaleBand()
    .domain(dataDays)
    .range([0, 230])
    .paddingInner(0.1176)
    //.range([25, 85, 145, 205]); scaleOrdinal

const xAxis = d3.axisBottom(x);

const svg = d3.select('#chart').append('svg').attr('height', '100%').attr('width', '100%');

svg.selectAll('rect')
    .data(data)
    .enter().append('rect')
        //.attr('fill', 'pink')
        .attr('fill', (d, i) => rainbow(i))
        .attr('height', (d, i) => d * 10)
        .attr('width', '50')
        .attr('x', (d, i) =>  i * 60)
        .attr('y', (d, i) => 300 - (d * 10))
svg.append('g')
    .attr('class', 'x axis hidden')
    .attr('transform', 'translate(0, 300)')
    .call(xAxis);

var newX = 300;
svg.selectAll('circle.circle')
    .data(data)
    .enter().append('circle')
    .attr('class', 'first')
        .attr('fill', (d, i) => rainbow2(i))
    //.attr('cx', (d, i) => 300+(i*20))
    .attr('cx', (d, i) => newX += (d*3) + ( i * 20))
    .attr('cy', '200')
    .attr('r', (d) => d * 3)

var newX = 300;
svg.selectAll('ellipse')
    .data(data)
    .enter().append('ellipse')
    .attr('fill', (d, i) => cat20[i])
    .attr('class', 'ellipse')
    //.attr('cx', (d, i) => 300+(i*20))
    .attr('cx', (d, i) => newX += (d*3) + ( i * 20))
    .attr('cy', '400')
    .attr('rx', (d) => d * 3)
    .attr('ry', '30')

//var newX = 300;
svg.selectAll('line')
    .data(data)
    .enter().append('line')
    .attr('class', 'line')
    //.attr('stroke', 'blue')
    //.style('stroke', 'green')
    //.attr('stroke-width', '2')
    //.attr('cx', (d, i) => 300+(i*20))
    .attr('x1', 0)
    .attr('y1', (d, i) => 400 + (i * 20))
    .attr('x2', (d) => d * 10)
    .attr('y2', (d, i) => 400 + (i * 20))



const textArr = ['start', 'middle', 'end'];
svg.append('text').selectAll('tspan')
    .data(textArr)
    .enter().append('tspan')
    .attr('x', '450')
    .attr('y', (d, i) => 50 + (40 * i))
    .attr('stroke', 'navy')
    .attr('stroke-width', '2')
    .attr('fill', 'none')
    .attr('font-size', '50')
    .attr('text-anchor', 'start')
    .attr('dominant-baseline', 'middle')
    .text((d) => d)

//svg.append('text')
//    .attr('x', '450')
//    .attr('y', '90')
//    .attr('fill', 'blue')
//    .attr('stroke', 'none')
//    .attr('font-size', '50')
//    .attr('text-anchor', 'middle')
//    .attr('dominant-baseline', 'middle')
//    .text('middle')
//
//
//svg.append('text')
//    .attr('x', '450')
//    .attr('y', '130')
//    .attr('fill', 'none')
//    .attr('stroke', 'blue')
//    .attr('font-size', '50')
//    .attr('text-anchor', 'end')
//    .attr('dominant-baseline', 'middle')
//    .text('end')

svg.append('line')
    .attr('x1', '450')
    .attr('y1', '50')
    .attr('x2', '450')
    .attr('y2', '130')



