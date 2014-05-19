; * Creation is offer by merchant. Cancelable. as long as not accepted.
;    initial balance is merchant stake.
; * A customer accepting. It is totally open to customers.
; * Release by customer.

{ [[0x00]] 1200  ;Want.
  [[0x20]] 200   ;Part of that that is customer stake.
  [[0x40]] (origin) ;(Or put in creator manually) 

  (return 0
   (lll {
   (when (= @@0x60 0) ;Customer not arrived yet.
    ;Cancel by Merchant.
     (when (= (caller) @@0x40)
       (suicide (caller))  ;Return funds and everything.
       (stop))
    ;Customer accepts deal.
     (if (> (callvalue) @@0x00)
       { [[0x60]] (caller)
          (stop)
       } ;Insane enough not to accept free money.
       (call (- (gas) 21)  (caller) (callvalue) 0 0 0 0)))
   (when (= (caller) @@0x60)  ;Customer releasing.
     (call (- (gas) 21) (caller) @@0x20 0 0 0 0)  ;Return customer stake.
     (suicide @@0x40))
   } 0))
}
