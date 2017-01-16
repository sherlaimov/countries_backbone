const barData = [];

for (let i = 0; i < 100; i++) {
    barData.push(Math.floor(Math.random() * 1000))
}

 // barData.sort((a, b) => {
 //    return a - b;
 // })
const margin = {
    top: 30,
    right: 30,
    bottom: 40,
    left: 50
}

const height = 400 - margin.top - margin.bottom,
    width = 800 - margin.right - margin.left,
    barWidth = 30,
    barOffset = 5;

const colors = d3.scaleLinear()
    .domain([0, barData.length])
    .range(['#FFB832', '#C61C6F'])
let tempColor;

const tooltip = d3.select('body').append('div')
    .style('position', 'absolute')
    .style('padding', '0 10px')
    .style('background', '#fff')
    .style('opacity', 0)

//Given any number between 0 and d3.max(barData),
// convert it to a number between 0 and height using a linear scale.
const yScale = d3.scaleLinear()
    .domain([0, d3.max(barData)])
    .range([0, height])

console.log(d3.range(0, barData.length));
const xScale = d3.scaleBand()
    .domain(d3.range(0, barData.length))
    .range([0, width])
    .paddingInner(.3)

const myChart = d3.select('#chart').append('svg')
    .style('background', '#E7E0CB')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    //Canvas size set, below goes the chart section
    .append('g')
    .attr('transform', 'translate(' + margin.left + ', ' + margin.right + ')')
    // .style('background', '#C9D7D6')
    .selectAll('rect').data(barData)
    .enter().append('rect')
    .style('fill', (d, i) => {
        return colors(i);
    })
    .attr('width', function() {
        console.log(xScale.bandwidth());
        return xScale.bandwidth()
    })
    .attr('x', function (d, i) {
        //return i * (barWidth + barOffset);
        return xScale(i);
    })
    .attr('height', 0)
    .attr('y', height)


    .on("mouseover", function (d) {
        tooltip.transition()
            .style('opacity', .9)

        tooltip.html(d)
            .style('left', (d3.event.pageX - 20) + 'px')
            .style('top', (d3.event.pageY - 35) + 'px')

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
    })

myChart.transition()
    .attr('height', function (d) {
        return yScale(d);
    })
    .attr('y', function (d) {
        // console.log(`${height - d} and the value is ${d}`);
        //console.log(d);
        return height - yScale(d);
    })
    .delay((d, i) => {
        return i * 20;
    })
    .duration(1000)
// .ease('cubicInOut');


const yGuide = d3.scaleLinear()
    .domain([0, d3.max(barData)])
    .range([height, 0])

const yAxis = d3.axisLeft(yGuide)
const xAxis = d3.axisBottom(xScale)
    .tickValues(xScale.domain().filter((d, i) => {
        //console.log(i);
        //console.log(!( i % (barData.length / 10)));
        return !( i % (barData.length / 10))
    }));

// .tickArguments(10)
// .ticks(20, "s");
// .ticks(10);


const vGuide = d3.select('svg').append('g');
const hGuide = d3.select('svg').append('g');
yAxis(vGuide);
xAxis(hGuide)

vGuide.attr('transform', 'translate('+ margin.left + ',' + margin.top + ' )');
hGuide.attr('transform', 'translate('+ margin.left + ',' + (height + margin.top) + ' )');

//hGuide.attr('transform', 'translate(0, ' + (height - 20) + ')')


// var div = d3.select(".test")
//     .selectAll("div")
//     .data([4, 8, 15, 16, 23, 42])
//     .enter().append("div")
//     .text(function (d) {
//         return d;
//     });
//

//var myStyles = [
//    { width: 200,
//        name: 'Barot Bellingham',
//        color: '#A57706'},
//    { width: 230,
//        name: 'Hassum Harrod',
//        color: '#BD3613'},
//    { width: 220,
//        name: 'Jennifer Jerome',
//        color: '#D11C24'},
//    { width: 290,
//        name: 'Richard Tweed',
//        color: '#C61C6F'},
//    { width: 236,
//        name: 'Lorenzo Garcia',
//        color: '#595AB7'},
//    { width: 230,
//        name: 'Xhou Ta',
//        color: '#2176C7'}
//];
//
//d3.selectAll('#chart').selectAll('div')
//    .data(myStyles)
//    .enter().append('div')
//    .classed('item', true)
//    .text(function(d) {
//        return d.name;
//    })
//    .style({
//        'color': 'white',
//        'background' : function(d) {
//            return d.color;
//        },
//        width : function(d) {
//            return d.width + 'px';
//        }
//    }).
