
function new_crowdfund(_addr) {
    return function(){
        addr : _addr,
        // Accessing stuff.
        balance   : function() { return eth.block.balanceOf(addr); }
        creator   : function() { return eth.block.stateAt(addr, "0x00"); }
        recipient : function() { return eth.block.stateAt(addr, "0x20"); }
        endblock  : function() { return parseInt(eth.block.stateAt(addr, "0x40")); }
        min       : function() { return parseInt(eth.block.stateAt(addr, "0x60")); }
        max       : function() { return parseInt(eth.block.stateAt(addr, "0xA0")); }
        cnt       : function() { return parseInt(eth.block.stateAt(addr, "0x80")); }

        reached   : function() {
            return this.balance() > this.min()
        }
        // Doing stuff.
        do_create : function(creator, recipient, endtime) {
            var priv = got_privkey(creator);
            if( priv == null ){ alert("Do not have private key to that"); return; }
            if( creator != recipient ){
                alert("currently can only have creator and recipient identical.");
            }
            build_create_crowdfund(priv);
        }
    }
}
