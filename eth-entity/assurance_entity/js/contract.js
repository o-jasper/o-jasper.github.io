
function new_crowdfund(_addr) {
    return {
        addr : _addr,
        safety : true,
        safety_min_time : 60,

        state : function(index){
            var val = eth.stateAt(this.addr, index);
            if( val == "0x" ){ return "0x0"; }
            return val;
        },
        // Accessing stuff.
        balance   : function() { return eth.balanceOf(this.addr); },
        
        creator   : function() { return this.state(0); },
        recipient : function() { return this.state(1); },
        endtime   : function() { return parseInt(this.state(2)); },
        min       : function() { return parseInt(this.state(3)); },
        max       : function() { return parseInt(this.state(4)); },
        cnt       : function() { return parseInt(this.state(5)); },

        is_initialized : function(){ return this.recipient() != "0x0"; },
        is_timed_out   : function(time){
            if( time == null ){ time = (new Date()).getTime()/1000; }
            return this.endtime() < time;
        },

        // Doing stuff.
        do_create : function(creator, fun) {
            var priv = got_privkey(creator);
            if( priv == null ){ alert("Do not have private key to that"); return; }
            build_create_crowdfund(priv, function(ret_addr){ this.addr = ret_addr; fun(); })
        },

        contract_already : function(){
            if(this.addr == null){ alert("no contract yet"); return true; }
        },
                                   
        do_init : function(owner, recipient, end_time, minimum, maximum) {
            if( this.contract_already() ){ return; }
            
            var priv = got_privkey(this.creator());
            if( priv == null ){
                alert("Do not have private key to that(" + this.creator() +
                      ")(" + this.addr + ")"); return;
            }
            if( this.addr == null ){ alret("Contract not created yet"); return; }

            if(this.safety) {
                var to_time = Math.floor((new Date()).getTime()/1000) + this.safety_min_time;
                if( end_time < to_time){
                    alert("End time less than " + this.safety_min_time +
                          " seconds in the future?");
                    return;
                }
                if( minimum > maximum ){
                    alert("Minimum larger than maximum " + minimum + " vs " + maximum);
                    return;
                }

                if( this.recipient() != "0x0" ){ alert("already initialized"); return; }
            }
            data = [owner, recipient, prep_int(end_time),
                    prep_int(minimum), prep_int(maximum)];
            eth.transact({"from":priv, "to":this.addr, "data":data});
        },

        do_fund : function(from, amount) {
            if( this.contract_already() ){ return; }
        
            var priv = got_privkey(from);
            if( priv == null ){ alert("Do not have private key to that"); return; }
            if(this.safety) {
                if(amount == 0){ alert("Not giving any?"); return; }
                
                if( amount > eth.balanceAt(from) ){ alert("Dont have the funds."); return; }
            }
            eth.transact({"from":priv, "to":this.addr, "value":prep_int(amount)});
        },

        do_release : function(from) {
            if( this.contract_already() ){ return; }
            
            var priv = got_privkey(from);
            if( priv == null ){ alert("Do not have private key to that"); return; }
            eth.transaction({"from":priv, "to":this.addr, "value":0});
        },

        do_refund : function(from) {
            if( this.contract_already() ){ return; }
            
            if( this.safety && from != this.creator() ){
                alert("Only creator can refund"); return;
            }
            var priv = got_privkey(from);
            if( priv == null ){ alert("Do not have private key to that"); return; }
            eth.transaction({"from":priv, "to":this.addr, "value":0});
        }
    }
}
