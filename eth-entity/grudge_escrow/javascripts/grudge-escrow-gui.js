// Stuff touches both the transacting/state and the gui.

function start() {
    if( window.location.search.substr(0,5) == "addr=" ) {
        contract_addr = window.location.search.substr(5) 
    }
}

contract_addr = null;
function callback_addr(addr) {
    contract_addr = addr;
    update();
    ge("creator_state").innerText = "";
    ge("creator_state").hidden = true;

//    ge("addr_input").hidden = true;
    //TODO
    //window.location.search = "addr=" + contract_addr;

    find_or_create_set_state(false);
}

function find_or_create_set_state(which) {
    ge("find_or_create").hidden = !which;
    ge("find_or_create_button").hidden = which;
}

function set_from_input() {
    val = ge("addr_input").value.trim();
    if(val.substr(0,2)!="0x") { val = "0x" + val; }
    callback_addr(val);
}

selfurl = "TODO/selfurl/";

function update() {
    url = selfurl + "?addr=" + contract_addr;
    if(contract_addr == "") {
        ge("contract_addr").innerText = "Empty contract addr";
    } else {
        ge("contract_addr").innerHTML = " <a href= \"" + url + "\">" + contract_addr + "</a>";
    }
    cust_addr = customer();
    mer_addr  = merchant();

    priv = got_privkey(mer_addr);
    ge("as_merchant").hidden = (priv==null);
    if( priv==null ) {
        ge("merchant_addr").innerText  = mer_addr;
    } else {
        ge("merchant_addr").innerText  = "(available to you)" + mer_addr;
    }
    
    ge("customer_addr").innerText  = cust_addr;
    if( cust_addr == "0x" ) {
        ge("customer_total").innerText = "(not initialized)";
        ge("customer_back").innerText  = "(not initialized)";
    } else {
        ge("customer_total").innerText = customer_total();
        ge("customer_back").innerText  = customer_back();
    }
}

function createIt() {
    if(contract_addr != null){ alert("Already have a contract."); return; }
    ge("creator_state").innerText = "Creating...";
    createContract(eth.key, callback_addr);
}

function gui_merchant_init() {
    priv = got_privkey(mer_addr);
    if( priv == null ){ alert("Dont have the private key to merchant."); }
    
    merchant_init(ge("total_input").value, ge("back_input").value, update,
                  ge("own_stake").value, priv);
}
