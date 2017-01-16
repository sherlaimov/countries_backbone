/**
 * Created by eugene on 12/16/16.
 */
const parseDate = d3.timeParse('%Y');
d3.xml('./js/d3_experiments/data2.xml')
        .get((err, data) => {
            // ********** WHY ***********

            // Array.from(data.querySelectorAll('data')).map((d) => {
            //     console.log(d);
            // })
            // [].map.call(data.querySelectorAll('dat'), (d) => {
            //     console.log(d);
            // })
            const height = 200,
                    width = 500;
            const margin = {left: 50, right: 50, top: 40, bottom: 0};

            data = [].map.call(data.querySelectorAll('dat'), (d) => {
                return {
                    date: parseDate(d.getAttribute('id')),
                    top: +d.querySelector('top').textContent,
                    middle: +d.querySelector('middle').textContent,
                    bottom: +d.querySelector('bottom').textContent
                }
            });

            const x = d3.scaleTime()
                .domain(d3.extent(data, (d) => d.date))
                .range([0, width]);
            const y = d3.scaleLinear()
                .domain([0, d3.max(data, (d) => d.top + d.middle + d.bottom)])
                .range([height, 0]);

            const categories = ['top', 'middle', 'bottom'];
            const stack = d3.stack().keys(categories);

            const area = d3.area()
                .x((d) => x(d.data.date))
                .y0((d) => y(d[0]))
                .y1((d) => y(d[1]));

            const svg = d3.select('#chart').append('svg').attr('width', '100%').attr('height', '100%');
            const chartGtoup = svg.append('g').attr('transform', 'translate('+ margin.left +',' +margin.top+')');
            const stacked = stack(data);
            console.log(stacked);
            chartGtoup.append('g')
                .attr('class', 'x-axis')
                .attr('transform', 'translate(0,' + height +')')
                .call(d3.axisBottom(x));
            chartGtoup.append('g')
                .attr('class', 'y-axis')
                .call(d3.axisLeft(y).ticks(5));

            //Below is another way to achive the commented code
            // chartGtoup.selectAll('path.area')
            //     .data(stacked)
            //     .enter().append('path')
            //     .attr('class', 'area')
            //     .attr('d', (d, i) => area(d));

            chartGtoup.selectAll('g.area')
                .data(stacked)
                .enter().append('g')
                .attr('class', 'area')
                .append('path')
                .attr('class', 'area')
                .attr('d', (d, i) => area(d));



        })