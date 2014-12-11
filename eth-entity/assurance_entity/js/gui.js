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

        got_upto_cnt : 0,
        
        endtime_default : function(){
            return Math.floor((new Date()).getTime()/1000) + 31*24*3600;
        },

        owned_w_default : function(id, must_own, _default){
            if( _default == null ){ _default = eth.secretToAddress(eth.key); }
            els.value_default(id, _default);
            return els.addr_note(id, null, must_own);
        },
        
        crowdfunder_input : function() {
            var value = els.addr_note("crowdfunder", null);
            if( value != this.crowdfund.addr ){
                this.got_upto_cnt = 0;
                ge("list_table").innerHTML = "";
            }
            if( value != "" ){
                this.crowdfund.addr = value;
                this.update_all();
                eth.watch({altered:value}).changed(this.update_all);
            } else{
                this.crowdfund.addr = null;
                this.update_all();
            }
        },
        
        // Inputs. Creation:
        creator_input : function() { return this.owned_w_default("creator", "validity"); },
        owner_input : function() { return this.owned_w_default("owner", "important"); },
        recipient_input : function() { return this.owned_w_default("recipient", "important"); },
        
        endtime_input : function() {
            els.value_default("endtime", this.endtime_default());
            return els.int_note("endtime");
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
            return amount;
            //TODO amounts warnings.
        },
        from_input : function() { return this.owned_w_default("from", "validity"); },

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
            cf = this.crowdfund;
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
                els.hide_ids(["init", "anyone", "refund"]); return;
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

        run_refund : function() {
            this.crowdfund.do_refund(this.owner_input());;
        }
    }
}
