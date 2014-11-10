//  Copyright (C) 10-11-2014 Jasper den Ouden.
//
//  This is free software: you can redistribute it and/or modify
//  it under the terms of the GNU General Public License as published
// by the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// Handy way to grab-a-value.
function from_value(id, default_value, dict, manip) {
    var value = ge(id).value;
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

function create_filter() {
    var filter = {};
    from_value("earliest", 0, filter, parseInt);
    from_value("latest", -1, filter, parseInt);
    
    from_value("max", "omit", filter, parseInt);
    from_value("skip", "omit", filter);    

    from_value("from", "omit", filter);
    from_value("to", "omit", filter);
    return filter;
}

function table_dict(dict, exclude) {
    if(exclude == null){ exclude = []; }
    var html = "<table>";
    for(a in dict) {
        var do_it = true;
        for(e in exclude) { if(exclude[e]==a){ do_it = false; break; } }
        if(do_it) { html += "<tr><td>" + a + ":</td><td>" + dict[a] + "</td></tr>"; }
    }
    return html + "</table>";
}

function plain_list(indexes) {
    var html = "";
    for(i in indexes) {
        html += "<tr><td>" + i + ":" + table_dict(indexes[i]) + "</td></tr>";
    }
    return html;
}

function update(force_plain) {
    ge("cnt").innerText = parseInt(ge("cnt").innerText) + 1;

    var filter = create_filter();
    //ge("search").innerHTML = table_dict(filter);
    
    var indexes = eth.messages(filter);
    ge("yields_cnt").innerText = indexes.length;

    var html =  "<table>";
    if(force_plain) {
        html += plain_list(indexes);
    } else {
        if(ge("view").value == "plain") {
            html += plain_list(indexes);
        } else if(ge("view").value == "fancy") {
            var which = {block:true, block_hash:true, coinbase:true, timestamp:true}
            html += new_fancy_display(which).html(indexes);
        }
    }
    //fun = {"plain":plain_list, "fancy":fancy_list}[ge("view").value];
    //if( fun != null ){ html += fun(indexes); }
    html += "</table>";
    ge("output").innerHTML = html;
}
