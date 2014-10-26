// Just touch state/transactions in here.

function merchant() { return eth.stateAt(contract_addr, "0x00"); }
function customer() { return eth.stateAt(contract_addr, "0x20"); }
function customer_total() { return eth.stateAt(contract_addr, "0x40"); }
function customer_back() { return eth.stateAt(contract_addr, "0x60"); }

function got_privkey(account, keys) { // Returns corresponding private key, if available.
    if(keys == null) {
        keys = eth.keys
    }
    for(i=0 ; i < keys.length ; i++) {
        if( eth.secretToAddress(keys[i]) == merchant() ){ return keys[i]; }
    }
    return null;
}

// Is of course not what guards the contract behavior, prevents some
//  pointless/inefficient transactions.
var safeties = true;

function merchant_init(customerTotal, customerBack, callback, ownStake, from) {
    if(safeties) {
        if(eth.secretToAddress(from) != merchant()){
            alert("Cannot init, you're not merchant\n" +
                  eth.secretToAddress(from) + "!=" + merchant());
            return;
        }
        if(customer_total() == "0x") { alert("Already init"); return; }
        if(customerTotal == 0 || customerTotal=="0x" ){
            alert("Selling for nothing!"); return;
        }
        if(customerBack > CustomerTotal ){
            alert("Customer is one with profit?!"); return;
        }
    }
    eth.makeTransact({"from":from, "to":contract_addr,
                      "value":ownStake, "data":[customerBack, customer]},
                     callback);
}

function customer_pay(from, total, tip, callback) {
    if(safeties) {
        if(customer_total() == "0x"){
            alert("Escrow not yet initialized(to be done by merchant)"); return;
        }
        if(customer() == "0x"){ alert("someone, possibly you, already paid"); return; }
        if(total + "" != eth.toDecimal(customer_total())) {
            alert("You should pay the indicated price!"); return;
        }
    }
    eth.makeTransact({"from":from, "to":contract_addr, "value":total + tip}, callback);
}

function customer_release(from, more_tip, callback) {
    if(safeties) {
        if( eth.secretToAddress(from) != customer() ){
            alert("You cannot release funds on someone elses escrow."); return;
        }
    }
    eth.makeTransact({"from":from, "to":contract_addr, "value":more_tip}, callback);
}
