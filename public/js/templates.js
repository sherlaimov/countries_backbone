/**
 * Created by ES on 15.10.2016.
 */
const Templates = {};

//TRY SUBSTITUTING [] WITH A DOT!!!
Templates['country'] = [
    '<tr class="odd gradeX">',
    '<td> <%= Name %></td>',
    '<td> <%= Region %></td>',
    '<td> <%= Population %></td>',
    '<td> <%= LifeExpectancy %></td>',
    '<td> <%= IndepYear %></td>',
    '</tr>'
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

