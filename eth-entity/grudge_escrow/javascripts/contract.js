// Just touch state/transactions in here.

// Note the awful order.
function merchant() { return eth.stateAt(contract_addr, "0x00"); }
function customer() { return eth.stateAt(contract_addr, "0x60"); }
function customer_total() { return eth.stateAt(contract_addr, "0x20"); }
function customer_back() { return eth.stateAt(contract_addr, "0x40"); }

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
        if(customer_total() != "0x") { alert("Already init"); return; }
        if(customerTotal == 0 || customerTotal=="0x" ){
            alert("Selling for nothing!"); return;
        }
//        if(customerBack > customerTotal){
//            alert("Customer is one with profit?!" + customerBack + " > " + customerTotal);
//            return;
//        }
    }
    eth.transact({"from":from, "to":contract_addr,
                  "value":ownStake, "data":[customerTotal, customerBack]},
                 callback);
}

function customer_pay(from, total, tip, callback) {
    if(safeties) {
        if(customer_total() == "0x"){
            alert("Escrow not yet initialized(to be done by merchant)"); return;
        }
        if(customer() != "0x"){ alert("someone, possibly you, already paid"); return; }
        if(total + "" != customer_total()) {
            alert("You should pay the indicated price!\n" +
                  total + "!=" + customer_total()); return;
        }
    }
    //NOTE: tip disregarded.
    eth.transact({"from":from, "to":contract_addr, "value":total}, callback);
}

function customer_release(from, more_tip, callback) {
    if(safeties) {
        if( customer() == "0x" ){
            alert("You arent paying here, so you cant release the funds.");
        }
        if( eth.secretToAddress(from) != customer() ){
            alert("You cannot release funds on someone elses escrow.\n" +
                 eth.secretToAddress(from) + " != " + customer()); return;
        }
    }
    eth.transact({"from":from, "to":contract_addr, "value":more_tip}, callback);
}
