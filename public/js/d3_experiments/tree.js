/**
 * Created by ES on 12.12.2016.
 */

const margin = {left: 50, right: 50, top:40, bottom: 0};
const height = 200,
        width = 500;

const tree = d3.tree().size([width, height]);

const svg = d3.select('#chart').append('svg').attr('width', '100%').attr('height', '100%');

const chartGroup = svg.append('g').attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

d3.json('./js/d3_experiments/treeData.json').get((err, data) => {
    //console.log(data);
    const root = d3.hierarchy(data[0]);
    console.log(root);
    tree(root);
    chartGroup.selectAll('circle')
        .data(root.descendants())
        .enter().append('circle')
            .attr('cx', (d) =>d.x)
            .attr('cy', (d) =>d.y)
            .attr('r', '5');
    chartGroup.selectAll('path')
        .data(root.descendants().slice(1))
        .enter().append('path')
        .attr('class', 'link')
        .attr('d', (d) => 'M' + d.x +',' + d.y + 'L' + d.parent.x + ',' + d.parent.y)
})