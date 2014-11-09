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
        }
        i ++;
        n += type[1];
    }
    out.push("0x" + hex.substr(n));
    return out;
}


// Object of definitions.
function new_typedict(name_len) {
    return {
        iface:{},
        lengths:{},
        name_len:name_len, // Lengthen names to this.

        add:function(name, types) {
            this.iface[name] = types;
            var cnt = this.lengths[name.length];
            if( cnt == null ){ this.lengths[name.length] = 1; }
            else{ this.lengths[name.length] = cnt + 1; }
        }

        add_str:function(name_str, types) {
            this.add(eth.fromAscii(name_str, this.name_len), types);
        }
        
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
    }
}
