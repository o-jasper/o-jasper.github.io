// Before creation: control: create button.
//
// After, show:
// * Creator & recipient.
// * End time(TODO get out of end-block way of showing.)
// * Minimum and maximum input value.
// * Funders.
// * Something from the creator.(TODO so kindah need a bit of text added..)
//
// control:
// * Refund button.
// * Putting coin in.
//

function new_crowdfund_gui()  {
    return {
        crowdfund : new_crowdfund(),
        // Prevent wrong inputs to passing along. (only disable for testing)
        safety : true, hide : true,
        min_default : 2000,
        max_default : 10000,
        
        amount_default : 100,

        watch : null,

        got_upto_cnt : 0,
        
        endtime_default : function(){
            return Math.floor((new Date()).getTime()/1000) + 31*24*3600;
        },

        owned_w_default : function(id, must_own, _default){
            if( _default == null ){ _default = eth.secretToAddress(eth.key); }
            els.value_default(id, _default);
            return els.addr_note(id, null, must_own);
        },

        set_crowdfund_addr : function(to) {
            this.crowdfund.addr = to;
            var search_to = (to ? "?addr=" + to : "");
            if( location.search != search_to ){
                var note = els.ge("crowdfunder_note");
                var URL = document.URL.substr(0,location.href.length - location.search.length);
                URL += search_to;
                var html = "DOESNT CORRESPOND TO URL ABOVE (appears i cant  set it)<br>";
                html += "<a href=\"" + URL + "\">go there</a>";
                note.innerHTML = html; note.className = "warn";
            }
        },

        init_from_url : function() {
            if(location.search.substr(0,6) == "?addr="){
                els.ge("crowdfunder").value = location.search.substr(6);
                this.crowdfunder_input();
            }
        },
        
        crowdfunder_input : function() {
            var value = els.addr_note("crowdfunder", null);
            if( value != this.crowdfund.addr ){
                this.got_upto_cnt = 0;
                ge("list_table").innerHTML = "";
            }
            if( value != "" && value!="0x" ){
                this.set_crowdfund_addr(value);
                this.update_all();
                if( this.watch != null ){ this.watch.uninstall(); }
                // TODO doesnt seem to be working..
                this.watch = eth.watch({altered:value});
                this.watch.changed(function(){ this.update_all(); });
            } else{
                els.ge("crowdfunder").value = "";
                this.set_crowdfund_addr(null);
                this.update_all();
            }
        },
        
        // Inputs. Creation:
        creator_input : function() { return this.owned_w_default("creator", "validity"); },
        owner_input : function() { return this.owned_w_default("owner", "important"); },
        recipient_input : function() { return this.owned_w_default("recipient", "important"); },
        
        endtime_input : function() {
            els.value_default("endtime", this.endtime_default());
            var val = els.int_note("endtime");
            var note = els.ge("endtime_note");
            if( note.innerHTML == "" ){
                var delta = parseInt(val) - Math.floor(((new Date()).getTime()/1000));
                var tl = timelength_text(delta);
                note.innerHTML = tl.substr(0, tl.length-2) + " from now";
            }
            return val;
            // TODO extreme time range warnings.
        },

        min_input : function() {
            els.value_default("min", this.min_default);
            return els.int_note("min");
        },
        max_input : function() {
            els.value_default("max", this.max_default);
            return els.int_note("max");
            //TODO amounts warnings.
        },
        
        // Funding:
        amount_input : function() {
            els.value_default("amount", this.amount_default);
            var amount = els.int_note("amount");
            ge("anyone_button").innerText = "Pay " + amount;
            var note = els.ge("amount_note");
            if( note.innerText == "" ){
                var html = fraction_txt(amount, eth.balanceAt(this.from_input()),true);
                note.innerHTML = "(" + html + ")";
                note.className = "note";
            }
            return amount;
            //TODO amounts warnings.
        },
        
        from_input : function() {
            els.value_default("from", eth.secretToAddress(eth.keys[1]));
            var addr = els.addr_note("from", null, "validity");

            var note = els.ge("from_note");
            if( addr == this.crowdfund.creator() ){
                note.innerText = "Paying with creator"; note.className = "warn";
            } else if( addr == this.crowdfund.recipient() ){
                note.innerText = "Paying with recipient"; note.className = "warn";
            }
            return addr;
        },

        update_inputs : function() {
            this.creator_input();
            this.owner_input();
            this.recipient_input();
            this.endtime_input();
            this.min_input();
            this.max_input();            
            this.amount_input();
            this.from_input();
        },

        update_contract : function() {
            var cf = this.crowdfund;
            if( cf.addr ){
                ge("crowdfunder").value = cf.addr;

                ge("owner").value = cf.creator();
                ge("recipient").value = cf.recipient();
                if( ge("recipient").value != "0x0" ){
                    ge("min").value = cf.min();
                    ge("max").value = cf.max();
                    ge("endtime").value = cf.endtime();
                }
            }
            this.update_inputs();
        },

        update_hidden : function() {
            if( !this.hide ){ return; }
            
            els.ge("create").hidden = (this.crowdfund.addr != null);
            if(!els.ge("create").hidden) {
                els.hide_ids(["init", "anyone", "refund", "list"]); return;
            }
            var initialized = this.crowdfund.is_initialized();
            els.ge("init").hidden = false;

            els.disable_ids(["owner", "recipient", "min", "max", "endtime"], initialized);
            els.ge("init_button").hidden = initialized;
            
            els.ge("anyone").hidden = !initialized;
            var releasable = this.crowdfund.is_timed_out();
            els.ge("refund").hidden = !initialized && !releasable;
            els.ge("amount_part").hidden = releasable;
            els.ge("anyone_txt").innerText = (releasable ? "Release from" : "Pay from");
            els.ge("anyone_button").innerText = (releasable ? "Release" : "Pay");
            els.ge("anyone_title").innerText = (releasable ? "Release" : "Funding");

            els.ge("refund").hidden = !initialized && got_privkey(this.crowdfund.creator());
            els.ge("refund_button").disabled = !els.ge("refund_lock_toggle").checked;
            els.ge("list").hidden = !initialized || (this.crowdfund.cnt() == 0);
        },

        update_list_table : function() {
            var cf = this.crowdfund;
            var cnt = cf.cnt();
            els.ge("contributor_cnt").innerText = cnt;
            els.ge("balance").innerText = cf.balance();
            for( var n = this.got_upto_cnt ; n < cnt ; n++ ){
                var html = "<tr><td>" + addr_html(cf.contributor(n)) + "</td><td>";
                html += cf.contributor_paid(n) + "</td></tr>";
                els.ge("list_table").innerHTML += html;
            }
            this.got_upto_cnt = cnt;            
        },

        run_anyone : function() {
            if(this.crowdfund.is_timed_out()){ this.run_release(); }
            else{ this.run_fund(); }
        },
        
        update_all : function(){
            this.update_contract();
            //this.update_inputs();
            this.update_hidden();
            this.update_list_table();
        },
        
        // Doing stuff(using inputs
        run_create : function() {
            var creator   = this.creator_input();
            if( this.safety && creator == null ){ wrongs.push("no creator input"); }
            this.crowdfund.do_create(creator, this.update_contract);
        },
        run_init : function() {
            var owner     = this.owner_input();
            var recipient = this.recipient_input();
            var endtime   = this.endtime_input();
            var minimum   = this.min_input();
            var maximum   = this.max_input();
            
            if( this.safety ){
                var wrongs = ["Wrong:"];
                if( owner == null ){ wrongs.push("* owner input\n"); }
                if( recipient == null ){ wrongs.push("* recipient input\n"); }
                if( endtime == null ){ wrongs.push("* end time"); }
                if( wrongs.length > 1 ){ alert(wrongs); return; }
            }            
            this.crowdfund.do_init(owner, recipient, endtime, minimum, maximum);
        },
        
        run_fund : function() {
            var amount = this.amount_input();
            var from = this.from_input();
            if( this.safety ) {
                if( amount == null ){ alert("Not a valid amount input."); return; }
                if( from == null ){ alert("Not a valid from input."); return; }
            }
            this.crowdfund.do_fund(from, amount);
        },

        run_release : function() {
            var from = this.from_input();
            if( this.safety ) {
                if( from == null ){ alert("Not a valid from input."); }
            }
            this.crowdfund.do_release(from);
        },

        run_release_or_pay : function() {
            //TODO
        },

        refund_lock_toggle : function() {
            els.ge("refund_button").disabled = !els.ge("refund_lock_toggle").checked;
        },
        
        run_refund : function() {
            if(els.ge("refund_lock_toggle").checked) {
                this.crowdfund.do_refund(this.owner_input());;
            } else {
                alert("Refund button locked, yet clicked");
            }
        }
    }
}
