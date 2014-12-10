
els = { // Elements.
    els : {},
    
    ge : function(id) { // Setting `els` manually overrides.
        if( this.els[id] == undefined || this.els[id]==null ){
            this.els[id] = document.getElementById(id);
        }
        return this.els[id];
    },

    value_default : function(id, _default){
        var el = this.ge(id);
        if( el == null ){ alert("null: " + id);  return; }
        if(el.value == ""){ el.value = _default; }
    },
    
    addr_note : function(id, value, must_own) {
        var main = els.ge(id);
        if(main==null){ return; }
        if( value == null ){ value = hexify(main.value); main.value = value; }
        var note = els.ge(id + "_note");
        if( !is_addr(value) ){
            note.innerText = "Not an address"; note.className = "invalid";
            return null;
        }
        if(must_own && got_privkey(value)==null) {
            note.innerText = "Dont have privkey";
            if(must_own == "mention"){
                note.className = "";
            } else if(must_own == "important") {
                note.className = "important";
            } else {
                note.className = "warn";
            }
            if(must_own == "validity") {
                return null; 
            } else {
                return value;
            }
        }
        note.innerText = ""; note.className = "";
        return value;
    },

    int_note : function(id) {
        var string = els.ge(id).value;
        if( !is_int(string) ){ 
            var note = els.ge(id + "_note");
            note.innerText = "Not an integer"; note.className = "invalid";
            return null;
        }
        return parseInt(string);
    }
}
