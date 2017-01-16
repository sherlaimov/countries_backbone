/**
 * Created by ES on 15.10.2016.
 */
define([
    'underscore'
], function (_) {

    const Templates = {};

//TRY SUBSTITUTING [] WITH A DOT!!!
    Templates['table-row'] = [
        '<tr class="odd gradeX">',
        '<td> <%= Name %></td>',
        '<td> <%= Region %></td>',
        '<td> <%= Population %></td>',
        '<td> <%= LifeExpectancy %></td>',
        '<td> <%= IndepYear %></td>',
        '</tr>'
    ].join('');

    Templates['table-head'] = [
        '<tr><th id="Name">Name <span class="icon-chevron-down"></span></th>',
        '<th>Region',
        '<select style="margin-left: 15px;" name="region" id="regionSelector">',
        '<option value="All">All</option>',
        //'<option selected="selected" value="<%=curRegion%>"><%=curRegion%></option>',
        '<%  _.each(regions.regions, function(reg) { %>',
        '<option ',
        '<% if (curRegion == reg) {%>',
        'selected="selected" ',
        '<% } %>',
        'value="<%=reg%>"><%=reg%>',
        '<% }) %>',
        '</option>',
        '</select><span><%= number%></span></th>',
        '<th id="Population">Population</th>',
        '<th id="LifeExp">Life expectancy</th>',
        '<th id="IndYear">Independence year</th></tr>'

    ].join('');

    Templates['modal'] = [
        '<div class="modal fade">',
        '<div class="modal-dialog">',
        '<div class="modal-content">',
        '<div class="modal-header">',
        '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>',
        '<h4 class="modal-title"><%=title%></h4>',
        '</div>',
        '<div class="modal-body"></div>',
        '</div>',
        '</div>',
        '</div>'
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

    return Templates;
});

