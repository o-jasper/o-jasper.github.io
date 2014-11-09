
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
