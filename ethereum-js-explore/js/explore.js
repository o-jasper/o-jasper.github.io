
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

function html_addr(addr) {
    if( addr.substr(0,2) != "0x" ){ alert("Just accepting hex atm"); }
    var html = "<span class=\"addr_front\">" + addr.substr(2,10) + "</span>";
    html += "<span class=\"addr_aft\">" + addr.substr(10) + "</span>";
    return html;
}

function fancy_non_number_block_data(cur) {
    var html =  "<tr><td>block:</td><td class=\"block_hash\">";
    html += cur["block"] + "</td></tr>";
    html += "<tr><td>coinbase:</td><td>"  + html_addr(cur["coinbase"]) + "</td></tr>"
    html += "<tr><td>timestamp:</td><td>" + cur["timestamp"] + "</td></tr>";
    return html;
}

function data_side_by_side(data){
    if( data.substr(0,2) != "0x" ){ alert("Just accepting hex atm"); }
    var hex = "<tr>", dec="<tr>", ascii="<tr>";
    for(var i=2 ; i+32 <= data.length ; i+=32){
        var cur = data.substr(i, i + 32);
        var dec_str = eth.toDecimal("0x" + cur);
        var dec_val = parseInt(dec_str);
        if( dec_val < 100000000000 ) {
            dec += "<td>" + dec_str + "</td>";
        } else if( dec_val < 1e32 ){
            dec += "<td class=\"data_small\">" + dec_str + "</td>";
        } else {
            dec += "<td></td>";
        }
        ascii += "<td>" + eth.toAscii("0x" + cur); + "</td>";
        var j = cur.length-1;
        for( ; j>=0 ; j-=1) { if( cur[j] != '0' ){ break; } }
        j += 2;
        if( j < cur.length-2 ){ cur = cur.substr(0,j) + ".."; }
        else {
            j = 0;
            for(; j < cur.length ; j++ ){ if( cur[j] != '0' ){ break; } }
            cur = ".." + cur.substr(j);
        }
        hex   += "<td class=\"data_small\">" + cur + "</td>";
    }
    return hex + "</tr>" + dec + "</tr>" + ascii + "</tr>";
}

function fancy_one(cur, a) {
    var value = cur[a];
    if( (a == "from" || a=="origin") && cur["origin"] == cur["from"] ){
        if( cur["path"].length != 1 ){
            alert("MSG from contract, origin a contract!?!");
        }
        if( a=="from" ){
            return "(=o)" + html_addr(value);
        } else{ return null; }
    } else if( a=="origin" || a=="to"){
        return html_addr(value);
    } else if( a == "path" ) {
        return "(" + value.length + ")" + value;
    } else if( a=="input" || a=="output"){
        return "<table>" + data_side_by_side(value) + "</table>";
    } else {
        return value;
    }
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
                var info = fancy_one(cur, a)
                if( info != null ) {
                    if(first) { first = false; html += "<tr><td>\*</td>"; }
                    else{ html += "<tr><td></td>"; }
                    
                    html += "<td>" + a + ":</td><td>" + info + "</td></tr>";
                }
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
