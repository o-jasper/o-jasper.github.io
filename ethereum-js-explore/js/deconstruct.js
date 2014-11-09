//  Copyright (C) 10-11-2014 Jasper den Ouden.
//
//  This is free software: you can redistribute it and/or modify
//  it under the terms of the GNU General Public License as published
// by the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// Deconstruct
function deconstruct(hex, types) {
    if( hex.substr(0,2) != "0x" ){ alert("Just accepting hex."); }
    var i=0, n = 2, out = [];
    while( n < hex.length && i < types.length) {
        type = types[i];
        curhex = "0x" + hex.substr(n, n + type[1]);

        if( type[0] == "raw" ){
            out.push(curhex);
        } else if( type == "ascii" ){ //String slot.
            out.push(eth.toAscii(curhex));
        } else if( type == "uint" ) { //Unsigned integer.
            out.push(parseInt(curhex));
        } else{ alert("unidentified type"); }
        i ++;
        n += type[1];
    }
    out.push("0x" + hex.substr(n));
    return out;
}

function construct(values, types) {
    if( values.length != types.length ){ alert("Constructing hex value mismatch"); }
    var out = "0x";
    for(var i in values) {
        var tp = types[i][0], len=types[i][1];
        if(tp == "raw") {
            if( values[i].subset(0,2)!="0x" ){ alert("this isnt hex"); }
            if( values[i].length > len ){ alert("hex string too long"); }
            out += values[i];
            for( var k=0 ; k < len - values.length ; k++){ out += "0"; }
        } else if(tp == "ascii") {
            var got_str = eth.fromAscii(types[i], len).substr(2);
            if( got_str.length != len ){ alert("wrong len"); }
            out += got_str;
        } else if(tp == "uint" ) {
            var got_str = values[i].toString(16);
            if( got_str.length > len ){ alert("too large unsigned"); }
            for( var k=0 ; k < len - got_str.length ; k++){ got_str += "0"; }
            out += got_str;
        } else{ alert("unidentified type"); }
    }
    return out;
}


// Object of definitions.
function new_typedict(name_len) {
    return {
        iface:{},
        lengths:{},
        name_len:name_len, // Lengthen names to this.

        name_hex:function(name_str){ return eth.fromAscii(name_str, this.name_len); }
        
        add:function(name, types) {
            this.iface[name] = types;
            var cnt = this.lengths[name.length];
            if( cnt == null ){ this.lengths[name.length] = 1; }
            else{ this.lengths[name.length] = cnt + 1; }
        }

        add_str:function(name_str, types) { this.add(this.name_hex(name_str), types); }
        
        remove:function(name) {
            var cnt = this.lengths[name.length];
            if( cnt == null ){ throw "Cant remove the removed"; }
            if( cnt == 1 ){ this.lengths[name.length] = undefined; }
            this.lengths[name.length] = cnt - 1;
        }

        // Find if a name is being used first.
        deconstruct:function(hex) {
            if( hex.substr(0,2) == "0x" ){ alert("Just accepting hex."); }
            for(var len in this.lengths) {
                var got = this.iface[hex.substr(2,2+len)];
                if(got!=undefined) { //Got a definition for that one.
                    return deconstruct("0x" + hex.substr(2 + len), got);
                }
            }
            // None of the definitions match.
        }
        construct:function(name, values) {
            var types = iface[name];
            if( types != undefined ){ return contruct(values, types); }
        }
        construct_str:function(name_str, values) {
            return this.construct(this.name_hex(name_str), values);
        }
    }
}
