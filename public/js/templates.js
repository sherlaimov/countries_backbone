/**
 * Created by ES on 15.10.2016.
 */
const Templates = {};

//TRY SUBSTITUTING [] WITH A DOT!!!
Templates['countries'] = [
    '<tr class="odd gradeX">',
    '<td> <%= Name %></td>',
    '<td> <%= Region %></td>',
    '<td> <%= Population %></td>',
    '<td> <%= LifeExpectancy %></td>',
    '<td> <%= IndepYear %></td>',
    '</tr>'
].join('');

Templates['table-body'] = [
    '<table width="100%" class="table table-striped table-bordered table-hover" id="dataTables-example">',
    '<thead><tr><th id="sortByName">Name <span class="icon-chevron-down"></span></th>',
    '<th>Region',
    '<select style="margin-left: 15px;" name="region" id="regionSelector">',
    '<option selected="selected" value="All">All</option>',
    '<%  _.each(regions.regions, function(reg) { %>',
    '<option value="<%=reg%>"><%=reg%></option>',
    '<%}) %>',
    '</select><span><%= number%></span></th>',
    '<th id="sortByPopulation">Population</th>',
    '<th id="sortByLifeExp">Life expectancy</th>',
    '<th id="sortyByIndYear">Independence year</th></tr></thead>',
    '<tbody id="tbody">',
    '</tbody></table>'

].join('');


for (var tmpl in Templates) {
    if (Templates.hasOwnProperty(tmpl)) {
        //console.log(_.template(Templates[tmpl]));
        Templates[tmpl] = _.template(Templates[tmpl]);
    }
}

function getTemplate(name) {
    if (Templates.hasOwnProperty(name)) {
        return Templates[name];
    }
    return null;
}

