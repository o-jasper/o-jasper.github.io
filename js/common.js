//  Copyright (C) 10-11-2014 Jasper den Ouden.
//
//  This is free software: you can redistribute it and/or modify
//  it under the terms of the GNU General Public License as published
// by the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// Get element.
function ge(element_id) { return document.getElementById(element_id); }

function transact_code(from, code, fun) { //This one is lazy.
    eth.transact({"from":from, "endowment":0, 
//                  "gas":1000000, "gasPrice":eth.gasPrice,
                  "code":code}, fun);
}

function private_keys_dict(keys) {
    var have = {}
    for(i=0 ; i < keys.length ; i++) {
        have[eth.secretToAddress(keys[i])] = keys[i];
    }
    return have;
}

var have_keys_dict = null;
 // Returns corresponding private key, if available.
function got_privkey(account, keys) {
    if(keys == null) {
        if( have_keys_dict == null){ have_keys_dict = private_keys_dict(eth.keys); }
        return have_keys_dict[account];
    } else {
        for(i=0 ; i < keys.length ; i++) {
            if( eth.secretToAddress(keys[i]) == account ){ return keys[i]; }
        }
        return null;
    }
}

function is_addr(x) {
    return /^0x[0-9a-f]*$/i.test(x) || /^0x[0-9A-F]*$/i.test(x);
}
function is_int(x){ return parseInt(x).toString() == x && x!="NaN"; }

// Returns text for an address, including info if it is one we have the privkey of.
function addr_text(addr) {
    if(got_privkey(addr)) { return addr + "(have)"; }
    return addr;
}

function hexify(data) {
    if(data == null){ return data; }
    if(data.length < 2 ){ return "0x" + data; }
    if(data.substr(0,2) != '0x'){ return "0x" + data; }
    return data;
}
function prep_int(x) {
    return "0x" + x.toString(16);
}

function fraction_txt(x, of, html) {
    if( x/of > 0.1 ){
        return Math.round((100*x)/of) + "%";
    } else if(x/of > 0.01) {
        var y = Math.floor((100*x)/of);
        var z = Math.round(10*(100*x/of - y));
        return y + "." + z + "%";
    }
    var n = -Math.floor(Math.log(x/of)/(3*Math.log(10)))*3;
    var seq = ["1", "m", html ? "&mu;" : "u", "n"];
    var name;
    if( n/3 < seq.length ){ name = seq[n/3]; }
    else{ name = html ? "&sdot;10<sup>-" + n + "</sup>" : "E-" + n; }
    return Math.floor((Math.pow(10, n)*x)/of) + name;
}

function timelength_text(dt, cnt) {
    var txt = "";
    if( cnt == null ){ cnt = 2; }
    var m=60, h=60*m, d=24*h, wk=7*d, mnth=31*d, yr=365.25*d;
    function use(str, t){
        if( cnt > 0 ){
            var n = Math.floor(dt/t);
            txt += n + str;
            dt -= n*t;
            cnt -= 1;
        }
    }
    if( dt > yr  ){ use("years, ", yr); }
    var did_month = (dt > mnth);
    if( did_month ){ use("months, ", mnth); }
    if( !did_month && dt > wk ){ use("weeks, ", wk); }
    if( dt > d ){ use("days, ", d); }
    if( dt > h ){ use("hours, ", h); }
    if( dt > m  ){ use("minutes, ", m); }
    if( dt > 1  ){ use("seconds, ", 1); }
    return txt;
}
