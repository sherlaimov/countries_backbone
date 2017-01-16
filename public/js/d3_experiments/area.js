/**
 * Created by ES on 30.11.2016.
 */

const data = [25, 2, 28, 32, 37, 45, 55, 70, 90, 120, 135, 150, 160, 168, 172, 177, 180];
const dataYears = ['2000', '2001','2002','2003','2004', '2005', '2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016'];

const parseDate = d3.timeParse('%Y');
//console.log(d3.extent(dataYears, (d) => parseDate(d)));

const height = 200,
      width = 500;
const margin = {left: 50, top: 40, right: 50, bottom:0 };

const y = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([height, 0]);

const x = d3.scaleTime()
    .domain(d3.extent(dataYears, (d) => parseDate(d)))
    .range([0, width])
//console.log(x(parseDate('2016')));
const yAxis = d3.axisLeft(y)
                .ticks(4) //making a suggestion rather than instruction
                .tickPadding(10)
                .tickSize(10);
const xAxis = d3.axisBottom(x);
//console.log(y(180));

const area = d3.area()
    .x((d,i) => x(parseDate(dataYears[i])))
    .y0(height)
    //.y1((d) => height - d)
    .y1((d) => y(d))

const svg = d3.select('#chart').append('svg').attr('width', '100%').attr('height', '100%');
const chartGroup = svg.append('g').attr('transform', 'translate('+margin.left+', '+margin.top+')');

chartGroup.append('path').attr('d', area(data));

chartGroup.append('g').attr('class', 'axis y')
    .call(yAxis);
// yAxis(svg.append('g').attr('class', 'axis y'));

chartGroup.append('g').attr('class', 'axis x')
    .attr('transform', 'translate(0, '+height+')')
    .call(xAxis);