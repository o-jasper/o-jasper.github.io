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
        crowdfund : null,
        // Prevent wrong inputs to passing along. (only disable for testing)
        safety : true,
        
        // Inputs. Creation:
        creator_input : function() {
            return els.addr_note("creator_input", null, true);
        }
        
        recipient_input : function() {
            return els.addr_note("recipient_input");
        }
        
        endtime_input : function() {
            return els.int_note("endtime_input");
            // TODO extreme time range warnings.
        }

        // Funding:
        amount_input : function() {
            return els.int_note("endtime_input");
            //TODO amounts warnings.
        }
        from_input : function() {
            return els.addr_note("from_input", null, "validity");
        }
        
        // Doing stuff(using inputs
        run_create : function() {
            var creator   = this.creator_input();
            var recipient = this.recipient_input();
            var endtime   = this.endtime_input();

            if( this.safety ){
                var wrongs = ["Wrong:"];
                if( creator == null ){ wrongs.push("* creator input\n"); }
                if( recipient == null ){ wrongs.push("* recipient input\n"); }
                if( endtime == null ){ wrongs.push("* end time"); }
                if( wrongs.length > 1 ){ alert(wrongs); return; )
            }            
            this.crowdfund.do_create(creator, recipient, endtime);
        }

        run_fund : function() {
            var amount = this.amount_input(), from = this.from_input();
            if( this.safety ) {
                if( amount == null ){ alert("Not a valid amount input."); }
                if( from == null ){ alert("Not a valid from input."); }
            }
            this.crowdfund.do_fund(from, amount);
        }

        run_release : function() {
            var from = this.from_input();
            if( this.safety ) {
                if( from == null ){ alert("Not a valid from input."); }
            }
            this.crowdfund.do_release(from);
        }

        run_release_or_pay : function() {
            //TODO
        }

        run_refund : function() {
            this.crowdfund.do_refund(this.creator_input());;
        }
    }
}
