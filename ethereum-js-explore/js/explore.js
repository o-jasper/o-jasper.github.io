
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

function fancy_non_number_block_data(cur) {
    var html =  "<tr><td>block:</td><td>"     + cur["block"] + "</td></tr>";
    html += "<tr><td>coinbase:</td><td>"  + cur["coinbase"] + "</td></tr>"
    html += "<tr><td>timestamp:</td><td>" + cur["timestamp"] + "</td></tr>";
    return html;
}

function fancy_list(indexes) {
    var prev_num = null;
    var check_block = null;
    var check_coinbase = null;
    var html = "";
    for(i in indexes) {
        //TODO cleverer.
        var cur = indexes[i];
        if( cur["number"] != prev_num ){ // Different block, list block first.
            prev_num = cur["number"];
            check_block    = cur["block"];
            check_coinbase = cur["coinbase"];
            html += "<tr class=\"block\"><td><span class=\"blocki\">Block: ";
            html += cur["number"] + "</span><table>";
            html += fancy_non_number_block_data(cur) + "</table></td></tr>";
        } else if(prev_num != null) {
            if(check_block != cur["block"]){
                alert("Inconsistent reporting of block hash?");
            }
            if(check_coinbase != cur["coinbase"]){
                alert("Inconsistent reporting of coinbase?");
            }
        }
        html += "<tr><td><table>";
        var first = true;
        for(a in cur) {
            if( a != "number" && a!="block" && a!="coinbase" && a!="timestamp" ) {
                if(first) { first = false; html += "<tr><td>\*</td>"; }
                else{ html += "<tr><td></td>"; }
                var value = cur[a];
                if( (a == "from" || a=="origin") && cur["origin"] == cur["from"] ){
                    if( a=="from" ){
                        value = "(=o)" + value;
                    } else{ continue; }
                }
                html += "<td>" + a + ":</td><td>" + value + "</td></tr>";
            }
        }
        html +=  "</table></td><td></td></tr>";
    }
    return html;
}

function update() {
    ge("cnt").innerText = parseInt(ge("cnt").innerText) + 1;

    var filter = create_filter();
    //ge("search").innerHTML = table_dict(filter);
    
    var indexes = eth.messages(filter);
    ge("yields_cnt").innerText = indexes.length;

    var html =  "<table>";
    if(ge("view").value == "plain") {
        html += plain_list(indexes);
    } else if(ge("view").value == "fancy") {
        html += fancy_list(indexes);
    }
    //fun = {"plain":plain_list, "fancy":fancy_list}[ge("view").value];
    //if( fun != null ){ html += fun(indexes); }
    html += "</table>";
    ge("output").innerHTML = html;
}
