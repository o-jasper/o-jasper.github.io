
function crowdfund(_addr) {
    return function(){
        addr : _addr,
        balance   : function(){ return eth.block.balanceOf(addr); }
        creator   : function(){ return eth.block.storageAt(addr, "0x00"); }
        recipient : function(){ return eth.block.storageAt(addr, "0x20"); }
        endblock  : function(){ return eth.block.storageAt(addr, "0x40"); }
        min       : function(){ return eth.block.storageAt(addr, "0x60"); }
        max       : function(){ return eth.block.storageAt(addr, "0xA0"); }
        cnt       : function(){ return eth.block.storageAt(addr, "0x80"); }
    }
}
