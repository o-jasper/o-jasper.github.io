
function new_crowdfund(_addr) {
    return function(){
        addr : _addr,
        safety : true,
        safety_min_time : 60,
        
        // Accessing stuff.
        balance   : function() { return eth.block.balanceOf(addr); }
        creator   : function() { return eth.block.stateAt(addr, "0"); }
        recipient : function() { return eth.block.stateAt(addr, "1"); }
        endtime  : function() { return parseInt(eth.block.stateAt(addr, "2")); }
        min       : function() { return parseInt(eth.block.stateAt(addr, "3")); }
        max       : function() { return parseInt(eth.block.stateAt(addr, "4")); }
        cnt       : function() { return parseInt(eth.block.stateAt(addr, "5")); }
        
        // Doing stuff.
        do_create : function(creator, recipient, endtime) {
            var priv = got_privkey(creator);
            if( priv == null ){ alert("Do not have private key to that"); return; }
            if( safety && creator != recipient ){
                alert("currently can only have creator and recipient identical.");
                return;
            }
            build_create_crowdfund(priv, function(ret_addr){ this.addr = ret_addr; })
        }

        do_init : function(recipient, end_time, minimum, maximum) {
            var priv = got_privkey(this.creator());
            if( priv == null ){ alert("Do not have private key to that"); return; }
            if( this.addr == null ){ alret("Contract not created yet"); return; }

            if(safety) {
                if( end_time < eth.block.timestamp + this.safety_min_time ){
                    alert("End time less than " + this.safety_min_time +
                          " seconds in the future?");
                    return;
                }
                if( minimum < maximum ){ alert("Minimum less than maximum"); return; }
            }
            data = [this.creator(), recipient, end_time, minimum, maximum];
            eth.transact({"from":priv, "to":this.addr, "value":0, "data":data});
        }

        do_fund : function(from, amount) {
            var priv = got_privkey(from);
            if( priv == null ){ alert("Do not have private key to that"); return; }
            if(safety) {
                if(amount == 0){ alert("Not giving any?"); return; }
                
                if( amount > eth.balanceAt(from) ){ alert("Dont have the funds."); return; }
            }
            eth.transact({"from":priv, "to":this.addr, "value":amount});
        }

        do_release : function(from) {
            var priv = got_privkey(from);
            if( priv == null ){ alert("Do not have private key to that"); return; }
            eth.transaction({"from":priv, "to":this.addr, "value":0});
        }

        do_refund : function(from) {
            if( safety && from != creator() ){ alert("Only creator can refund"); return; }
            var priv = got_privkey(from);
            if( priv == null ){ alert("Do not have private key to that"); return; }
            eth.transaction({"from":priv, "to":this.addr, "value":0});
        }
    }
}
