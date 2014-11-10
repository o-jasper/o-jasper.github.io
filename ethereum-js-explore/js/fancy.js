//  Copyright (C) 10-11-2014 Jasper den Ouden.
//
//  This is free software: you can redistribute it and/or modify
//  it under the terms of the GNU General Public License as published
// by the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

function new_fancy_display(which) {
    return {
        prev_num:null, check_block:null, check_coinbase:null,
        which:which,
        
        non_number_block_data:function(cur) {
            var html = "";
            if( this.which["block_hash"] ) {
                html += "<tr><td>block:</td><td class=\"block_hash\">" + cur["block"] + "</td></tr>"; }
            if( this.which["coinbase"] ) {
                html += "<tr><td>coinbase:</td><td>"  + html_addr(cur["coinbase"]) + "</td></tr>"; }
            if( this.which["timestamp"] ) {
                html += "<tr><td>timestamp:</td><td>" + cur["timestamp"] + "</td></tr>";
            }
            return html;
        },
        
        one:function(cur, a) {
            var value = cur[a];
            if( (a == "from" || a=="origin") && cur["origin"] == cur["from"] ){
                if( cur["path"].length != 1 ){
                    alert("MSG from contract, origin a contract!?!");
                }
                if( a=="from" ){
                    return "(=o)" + html_addr(value);
                } else{ return null; }
            } else if( a=="origin" || a=="to" || a=="from"){
                return html_addr(value);
            } else if( a == "path" ) {
                return "(" + value.length + ")" + value;
            } else if( a=="input" || a=="output"){
                return "<table>" + this.data_side_by_side(value) + "</table>";
            } else {
                return value;
            }
        },

        // Different interpretations of slots side-by-side.
        data_side_by_side:function(data){
            if( data.substr(0,2) != "0x" ){ alert("Just accepting hex."); }
            var hex = "<tr>", dec="<tr>", ascii="<tr>";
            for(var i=2 ; i < data.length ; i+=64){
                var cur = data.substr(i, i + 32);
                var dec_str = eth.toDecimal("0x" + cur);
                var dec_val = parseInt(dec_str);
                if( dec_val < 100000000000 ) {
                    dec += "<td class=\"data\">" + dec_str + "</td>";
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
                    j -= 1
                    if( j>3 ) { cur = ".." + cur.substr(j); }
                }
                hex   += "<td class=\"data_small\">" + cur + "</td>";
            }
            return hex + "</tr>" + dec + "</tr>" + ascii + "</tr>";
        },

        html_1:function(i, cur) {
            var html = "";
            if( this.which["block"] ) {
                if( cur["number"] != this.prev_num ){ // Different block, list block first.
                    this.prev_num = cur["number"];
                    this.check_block    = cur["block"];
                    this.check_coinbase = cur["coinbase"];
                    // TODO show prettier, time differences,
                    // show the bits of time relevantly different.
                    html += "<tr class=\"block\"><td><span class=\"blocki\">Block: ";
                    html += cur["number"] + "</span><table>";
                    html += this.non_number_block_data(cur) + "</table></td></tr>";
                } else if(this.prev_num != null) {
                    if(this.check_block != cur["block"]){
                        alert("Inconsistent reporting of block hash?");
                    }
                    if(this.check_coinbase != cur["coinbase"]){
                        alert("Inconsistent reporting of coinbase?");
                    }
                }
            }
            html += "<tr><td><table>";
            var first = true;
            for(a in cur) { //TODO doesnt recognize contract creation.
                if( a != "number" && a!="block" && a!="coinbase" && a!="timestamp" ) {
                    var info = this.one(cur, a)
                    if( info != null ) {
                        if(first) { first = false; html += "<tr><td>\*</td>"; }
                    else{ html += "<tr><td></td>"; }
                        
                        html += "<td>" + a + ":</td><td>" + info + "</td></tr>";
                    }
                }
            }
            html +=  "</table></td><td></td></tr>";
            return html;
        },

        html:function(indexes) {
            this.prev_num = null;
            this.check_block = null;
            this.check_coinbase = null;            
            var html = "";
            for(i in indexes) { html += this.html_1(i, indexes[i]); }
            return html;
        }
    }
}
