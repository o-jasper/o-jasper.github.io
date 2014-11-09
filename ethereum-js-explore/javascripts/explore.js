

function from_value(id, default_value, dict, manip) {
    value = ge(id).value;
    if( value == "" || value == "default" ) {
        if( default_value == "omit" ){ return; }
        value = default_value;
    }
    if( manip == null ){
        dict[id] = value;
    } else {
        dict[id] = manip(value);
    }
}

function figure_filter() {
    filter = {};
    from_value("earliest", 0, filter, parseInt);
    from_value("latest", -1, filter, parseInt);
    
    from_value("max", "omit", filter, parseInt);
    from_value("skip", "omit", filter);    

    from_value("from", "omit", filter);
    from_value("to", "omit", filter);
    return filter;
}

function table_dict(tx) {
    html = "<table>";
    for(a in tx) {
        html += "<tr><td>" + a + ":</td><td>" + tx[a] + "</td></tr>";
    }
    return html + "</table>";
}

function update() {
    ge("cnt").innerText = parseInt(ge("cnt").innerText) + 1;

    filter = figure_filter();
    ge("search").innerHTML = table_dict(filter);

    indexes = eth.messages(filter);
    ge("yields_cnt").innerText = indexes.length;
    html = "<table>"; //TODO a different view.
    for(index in indexes) {
        html += "<tr><td>" + index + ":" + table_dict(indexes[index]) + "</td></tr>";
    }
    html += "</table>";
    ge("output").innerHTML = html;
}
