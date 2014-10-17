
// Get element.
function ge(element_id) { return document.getElementById(element_id); }

function transact_code(from, code, fun) {
    eth.transact({"from":from, "endowment":0, 
                  "gas":1000000, "gasPrice":eth.gasPrice,
                  "code":code}, fun);
}
