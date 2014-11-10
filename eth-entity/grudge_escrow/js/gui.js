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

selfurl = "TODO/selfurl/";
am_merchant = false;
am_customer = false;

function get_tip() {
    r = parseInt(ge("tip").value);
    if( r + "" == ge("tip").value ){
        ge("tip_note").innerText = ""; //TODO
        ge("tip_note").className = "";
        return r;
    }
    ge("tip_note").innerText = "invalid";
    ge("tip_note").className = "wrong"; //TODO
    return 0;
}

function amount_fraction_style(pct, f) {
    if(f==null){ f = 1; }
    if(f*pct < 30) {
        return "note";
    } else if(f*pct < 50) {
        return "";
    } else {
        return "important";
    }
}

var tip_warn_factor = 1.5;

function ge_amount_fraction(into, nom, div, f) {
    if(f==null){ f = 1; }
    pct = (100*nom)/div;
    el = ge(into);
    if( el == null ){ alert("Couldnt find " + into); }
    el.innerText = pct + "%";
    el.className = amount_fraction_style(pct, f);
}

function display_amounts(mer_stake, cust_total, cust_stake) {
    ge("merchant_stake").innerText = mer_stake;
    ge_amount_fraction("merchant_stake_note", mer_stake, cust_total);
    
    ge("customer_total").innerText = cust_total;
    ge("customer_back").innerText  = cust_stake;
    ge_amount_fraction("customer_back_note", cust_stake, cust_total);
    
    cust_price = "--";
    if(cust_total != "--") { cust_price = parseInt(cust_total) - parseInt(cust_stake); }
    ge("customer_price").innerText  = cust_price;
    
    text = "Pay " + total;
    tip = get_tip();
    if( tip != 0 ){
        ge("tip_note").innerText = (100*tip/total) + "%, Better afterwards?";
        ge("tip_note").className = "";
        if( 100*tip/total > 20 ){ ge("tip_note").className = "important"; }
        text += ", tip " + tip;
    }
    else{ ge("tip_note").innerText = ""; }
    ge("input_pay").innerText = text;

    html = "Release " + cust_stake + "(self) " + mer_stake + "(merchant)";
    html += "<br>If product not good, remember, you're very angry!";
    if( tip != 0 ){
        html += "<br>tip " + tip;
        ge_amount_fraction("tip_note", tip, total, tip_warn_factor);
    } else{ ge("tip_note").innerText = ""; }
    
    ge("input_release").innerHTML = html;
}

var angry_time = 300;
function update_mood(matters, cust_addr, total) {
    i = 0;
    if( matters && total==0 ){ i = -1; }
    if( nexttime()!="0x" && matters && cust_addr!="0x"){
        at_time = parseInt(eth.toDecimal(nexttime()));
        i  = Math.floor(((new Date()).getTime()/1000 - at_time)/angry_time);
//        if(i < 0){ alert("... In past?! Could be difference between Ethereum block time and your clock."); }
    }
    img_src = "";
    if( i == -1) { //TODO Moar.
        img_src = "pics/smiley_happy.svg";
    } else if( i==0 ) {
        img_src = "pics/smiley_neutral.svg";
    } else if(i==1) {
        img_src = "pics/smiley_grumpy.svg";
    } else {
        img_src = "pics/smiley_angry.svg";
    }
    ge("mood").src = img_src;
}

var show_all = false;

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
    ge("merchant_addr").innerText  = mer_addr;
    if( am_merchant ) { ge("merchant_addr_note").innerText  = "(ours)"; }

    total = parseInt(eth.toDecimal(customer_total()));
    ge("as_customer").hidden = (total == "0");
    if( total == "0" ) {
        if( customer_back() != "0x" ){ alert("Inconsistent state! Return not zeroed!"); }
        if( customer() != "0x" ){ alert("Inconsistent state, customer address not zeroed!"); }

        display_amounts("--", "--", "--");
    } else {
        bal = parseInt(eth.toDecimal(eth.balanceAt(contract_addr)));
        if(cust_addr != "0x") { mer_stake = bal - total; }
        display_amounts(bal, total, eth.toDecimal(customer_back()));
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

        ge("customer_addr").innerText  = cust_addr;
        if( am_customer ) { ge("customer_addr_note").innerHTML  = "(ours)"; }
        else{ ge("customer_addr_note").innerText  = "(taken)"; }
    }
    ge("input_pay").hidden = am_customer;
    ge("input_release").hidden = !am_customer;
    update_mood(am_customer || am_merchant, cust_addr, total);
    
    update_your_state();

    if(show_all) {
        ge("as_merchant").hidden = false; 
        ge("as_customer").hidden = false;
        ge("input_pay").hidden = false;
        ge("input_release").hidden = false;        
    }
}

function update_your_state() {
    var html = "";        
    if( !eth.codeAt(contract_addr) ) {  //TODO dunno how to do this.
        html = "Is not a contract.";
        ge("your_state").innerHTML = html;
        return;
    } else if( merchant() == "0x" ) { // TODO kindah want to be able ot recognize it.
        html = "No merchant; a state this contract is never in.<br>";
        html += "<b>Either not contract, or of different kind.<br>";
        html += "Cannot positively identify contracts as being of grudge escrow kind!</b>";
        ge("your_state").innerHTML = html;
        return;
    } else if( am_customer ){
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
    update();
}

function gui_merchant_init() {
    priv = got_privkey(merchant());
    if( priv == null ){ alert("Dont have the private key to merchant."); }
    
    merchant_init(ge("total_input").value, ge("back_input").value, update,
                  ge("ownstake_input").value, priv);
}

function reset_tip() {
    ge("tip").value = "tip"; ge("tip_note").innerText = "";
}

function gui_customer_pay(as) {
    if(as==null) { as = eth.key; }
    tip = get_tip();
    pay = parseInt(eth.toDecimal(customer_total())) + tip;
    customer_pay(as, pay, tip, update);
    reset_tip();
}

function gui_customer_release(from) {
    if(from==null) { from = got_privkey(customer()); }
    
    customer_release(from, get_tip(), update);

    reset_tip();    
    update();
}

function safety_toggle() {
    safety = !safety;
    if(safety){ ge("safety").innerText = "Remove safety checks"; }
    else{ ge("safety").innerText = "Enable safety checks"; }
}

function show_toggle() {
    show_all = !show_all;
    if(show_all){ ge("show_all").innerText = "Show relevant"; }
    else{ ge("show_all").innerText = "Show everything"; }
    update();
}
