
els = { // Elements.
    els : {},
    
    ge : function(id) {
        if( this.els[id] == undefined ){ // Setting `els` manually overrides.
            this.els[id] = document.getElementById(id);
        }
        return this.els[id];
    } 

    addr_note : function(id, value = null, must_own=null) {
        if( value == null ){ value = hexify(els.ge(id).value); }
        var note = ge(id + "_note");            
        if( !is_addr(value) ){
            note.innerText = "Not an address"; note.className = "invalid";
            return null;
        }
        if(must_own && got_privkey(value)==null) {
            note.innerText = "Dont have privkey"; note.className = "warn";
            if(must_own == "validity") {
                return null; 
            } else {
                return value;
            }
        }
        note.innerText = ""; note.className = "";
        return value;
    }

    int_note : function(id) {
        var string = els.ge(id).value;
        if( !is_int(string) ){ 
            var note = ge(id + "_note");
            note.innerText = "Not an integer"; note.className = "invalid";
            return null;
        }
        return parseInt(string);
    }
}
