/**
 * Created by ES on 29.11.2016.
 */

const data = [
    {x:5,y:5},
    {x:10,y:15},
    {x:20,y:7},
    {x:30,y:18},
    {x:40,y:10}
];

const interpolateTypes = [d3.curveLinear, d3.curveNatural, d3.curveStep, d3.curveBasis, d3.curveBundle, d3.curveCardinal];

const svg = d3.select('#chart').append('svg').attr('width', '100%').attr('height', '100%');


for (let p = 0; p < 6; p++) {
const line = d3.line()
                .x((d) => d.x*6)
                .y((d) => d.y*4)
    //.curve(d3.curveStep)
    .curve(interpolateTypes[p]);

let shiftX = p * 250;
let shiftY = 0;
const chartGroup = svg.append('g')
                     .attr('class', 'group'+p)
                    .attr('transform', 'translate('+shiftX+',0)');


chartGroup.append('path')
    .attr('fill', 'none')
    .attr('stroke', 'blue')
    .attr('d', line(data));


chartGroup.selectAll('circle.grp'+p)
    .data(data)
    .enter().append('circle')
    .attr('class', (d, i) => 'grp' + i)
    .attr('cx', (d) => d.x*6)
    .attr('cy', (d) => d.y*4)
    .attr('r', '5')
}
