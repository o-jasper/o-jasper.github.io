// Stuff touches both the transacting/state and the gui.

function start() {
    if( window.location.search.substr(0,5) == "addr=" ) {
        contract_addr = window.location.search.substr(5) 
    }
}

contract_addr = null;
function callback_addr(addr) {
    contract_addr = addr;

    eth.watch({altered: contract_addr}).changed(update);
    
    update();
    ge("creator_state").innerText = "";
    ge("creator_state").hidden = true;

//    ge("addr_input").hidden = true;
    //TODO
    //window.location.search = "addr=" + contract_addr;
}

function set_from_input() {
    val = ge("addr_input").value.trim();
    if(val.substr(0,2)!="0x") { val = "0x" + val; }
    callback_addr(val);
    ge("creator_button").hide = true;
}

function setting_addr(yes) {
    return;
    if(ge("addr_input").value.length == 0){ return; }
    ge("addr_input").hidden = !yes;
    ge("contract_addr").hidden = yes;
}

selfurl = "TODO/selfurl/";
am_merchant = false;
am_customer = false;

// TODO.. need in-progress stages?
function update() {
    ge("contract_balance").innerText = eth.toDecimal(eth.balanceAt(contract_addr));
    
    url = selfurl + "?addr=" + contract_addr;
    if(contract_addr == "") {
        ge("contract_addr").innerText = "Empty contract addr";
    } else {
        ge("contract_addr").innerText = contract_addr;
        ge("addr_input").value = contract_addr;
    }
    cust_addr = customer();
    mer_addr  = merchant();

    priv = got_privkey(mer_addr);
    am_merchant = (priv != null);
    ge("as_merchant").hidden = !am_merchant || customer_total()!="0x";
    if( am_merchant ) {
        ge("merchant_addr").innerHTML  = "<small>(have)</small>" + mer_addr;
    } else {
        ge("merchant_addr").innerText  = mer_addr;
    }

    total = eth.toDecimal(customer_total());
    ge("as_customer").hidden = (total == "0");

    if( total == "0" ) {
        if( customer_back() != "0x" ){ alert("Inconsistent state! Return not zeroed!"); }
        if( customer() != "0x" ){ alert("Inconsistent state, customer address not zeroed!"); }

        ge("merchant_stake").innerText = "--";
        ge("customer_total").innerText = "--";
        ge("customer_back").innerText  = "--";
        ge("customer_price").innerText = "--";
    } else {
        back  = eth.toDecimal(customer_back());
        ge("customer_total").innerText = total;
        ge("customer_back").innerText  = back;
        ge("customer_price").innerText = "TODO";
        //(num.valueOf(total) - num.valueOf(back)) + "";

        bal = eth.toDecimal(eth.balanceAt(contract_addr));
        if(cust_addr == "0x") {
            ge("merchant_stake").innerText = bal + "";
        } else {
            //ge("merchant_stake").innerText = (bal - num.valueOf(total)) + "";
            ge("merchant_stake").innerText = bal + " minus TODO";
        }
    }

    am_customer = false;    
    if( cust_addr == "0x" ) {
        if( total != "0" ) {
            ge("customer_addr").innerText  = "No customer yet."
        } else {
            ge("customer_addr").innerText  = "Not initialized yet."
        }
    } else {
        cust_priv = got_privkey(cust_addr);
        am_customer = (cust_priv != null);
        
        if( am_customer ) {
            ge("customer_addr").innerHTML  = "<small>(have)</small>" + cust_addr;
        } else {
            ge("customer_addr").innerHTML  = "<small>(taken)</small>" + cust_addr;
        }
    }
    ge("input_pay").hidden = am_customer;
    ge("input_release").hidden = !am_customer;
    
    update_your_state();
}
function update_your_state() {
    /*if( !eth.codeAt(contract_addr) ) {  //TODO dunno how to do this.
        ge("your_state").innerHTML = "Is not a contract.";
        return;
        }
        TODO want to be able to recognize it? Dunno how to do that either.
    */
    var html = "";
    if( am_customer ){
        if(am_merchant) {
            html = "You have both <b>Merchant and Customer</b> privkey. You are possibly silly.";
        } else {
            html = "You have the <b>Customer</b> privkey.";
        }
    } else if(am_merchant) {
        html =  "You have the <b>Merchant</b> privkey.";
    } else {
        html = "Insofar application can tell, no relation to this contract.";
    }
    if( customer_total() == "0x" ) {
        html += "<br>The escrow is <b>not yet initialized</b>.";
    } else if( customer() == "0x" ) {
        html += "<br><b>Waiting</b> for customer.";
    } else {
        html +="<br>Customer here, <b>not yet released.</b>";
    }
    ge("your_state").innerHTML = html;
}

function createIt() {
    if(contract_addr != null){ alert("Already have a contract."); return; }
    ge("creator_state").innerText = "Creating...";
    createContract(eth.key, callback_addr);
}

function gui_merchant_init() {
    priv = got_privkey(merchant());
    if( priv == null ){ alert("Dont have the private key to merchant."); }
    
    merchant_init(ge("total_input").value, ge("back_input").value, update,
                  ge("ownstake_input").value, priv);
}

function gui_customer_pay(as) {
    if(as==null) { as = eth.key; }
    customer_pay(as, customer_total(), 0, update);
}

function gui_customer_release(from) {
    if(from==null) { from = got_privkey(customer()); }
    customer_release(from, 0, update);
    update();
}
