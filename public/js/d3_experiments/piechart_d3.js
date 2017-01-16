const width = 400,
    height = 400,
    radius = 200;

const colors = d3.scaleOrdinal(d3.schemeCategory20c);

const pieData = [
    {
        label: 'Harrod',
        value: 33
    },
    {
        label: 'Murray',
        value: 103
    },
    {
        label: 'Cumbar',
        value: 33
    },
    {
        label: 'Batch',
        value: 33
    },
    {
        label: 'Finch and Co',
        value: 33
    },
    {
        label: 'Bugakov',
        value: 33
    },
    {
        label: 'Eugene',
        value: 99
    }
]

const pie = d3.pie()
    .value((d) => {
        return d.value
    })

const arc = d3.arc()
    .innerRadius(10)
    .outerRadius(radius)

console.log(pie(pieData))

const myPie = d3.select('#chart')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(' + (width - radius) + ', ' + (height - radius) + ')')

    .selectAll('path')
    .data(pie(pieData))
    .enter()
    .append('g')
    .attr('class', 'slice')


const slices = d3.selectAll('g.slice')
    .append('path')
    .attr('d', arc)
    .attr('fill', (d, i) => {
        // console.log(d)
        return colors(i)
    })

const text = d3.selectAll('g.slice')
    .append('text')
    .text((d, i) => {
        return d.data.label
    })
    .attr('text-anchor', 'middle')
    .attr('fill', '#fff')
    .attr('transform', (d, i) => {
    d.innerRadius = 0;
    d.outerRadius = radius;
    return 'translate(' + arc.centroid(d) + ')'
})