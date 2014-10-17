
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
    ge("creator_state").hide = true;

    //TODO
    //window.location.search = "addr=" + contract_addr;
}

function merchant() { return eth.stateAt(contract_addr, 0x00); }
function customer() { return eth.stateAt(contract_addr, 0x20); }
function customer_total() { return eth.stateAt(contract_addr, 0x40); }
function customer_back() { return eth.stateAt(contract_addr, 0x60); }

selfurl = "TODO/selfurl/";

function update() {
    url = selfurl + "?addr=" + contract_addr;
    ge("contract_addr").innerHTML = " <a href= \"" + url + "\">" + contract_addr + "</a>";

    ge("merchant_addr").innerText = merchant();
    ge("customer_addr").innerText = customer();
    ge("customer_total").innerText = customer_total();
    ge("customer_back").innerText = customer_back();
}

function createIt() {
    if(contract_addr != null){ alert("Already have a contract."); return; }
    ge("creator_button").hide = true;
    ge("creator_state").innerText = "Creating...";
    createContract(eth.key, callback_addr);
}
