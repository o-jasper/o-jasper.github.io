//  Copyright (C) 10-11-2014 Jasper den Ouden.
//
//  This is free software: you can redistribute it and/or modify
//  it under the terms of the GNU General Public License as published
// by the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

function comma_separated_hex(string) {
    string = string.trim();
    if(string == ""){ return null; }
    return string.split(",");
}

function update(force_plain) {
    ge("cnt").innerText = parseInt(ge("cnt").innerText) + 1;

    var filter = create_filter();
    //ge("search").innerHTML = table_dict(filter);
    
    var indexes = eth.messages(filter);
    ge("yields_cnt").innerText = indexes.length;

    var html =  "<table>";
    if(ge("view").value == "plain") {
        html += plain_list(indexes);
    } else if(ge("view").value == "fancy") {
        var which = {block:ge("show_block").checked,
                     block_hash:ge("show_hash").checked,
                     coinbase:ge("show_coinbase").checked,
                     number:true, "on_line_timestamp":true,
                    }
        var display = new_fancy_display(which);
        display.from_filter = comma_separated_hex(ge("post_from").value);
        display.to_filter = comma_separated_hex(ge("post_to").value);
        
        html += display.html(indexes);
    }
    html += "</table>";
    ge("output").innerHTML = html;
}
