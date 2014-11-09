//  Copyright (C) 10-11-2014 Jasper den Ouden.
//
//  This is free software: you can redistribute it and/or modify
//  it under the terms of the GNU General Public License as published
// by the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// Get element.
function ge(element_id) { return document.getElementById(element_id); }

function transact_code(from, code, fun) {
    eth.transact({"from":from, "endowment":0, 
//                  "gas":1000000, "gasPrice":eth.gasPrice,
                  "code":code}, fun);
}

function got_privkey(account, keys) { // Returns corresponding private key, if available.
    if(keys == null) { keys = eth.keys }
    for(i=0 ; i < keys.length ; i++) {
        if( eth.secretToAddress(keys[i]) == account ){ return keys[i]; }
    }
    return null;
}
