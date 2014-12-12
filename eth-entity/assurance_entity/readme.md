
# Assurance Ethereum entity. 

Assurance Ethereum entity.

* Creator creates, then initiates, sets it up, sets recipient, sets block
  number it will have to succeed/fail, sets minimum success amount.

* Anyone can help fund.

* Before deadline, creator can refund.

* Anything occuring after the deadline sends the funds to the project if
  success, and refunds otherwise.

## Tests
Just one that does a case test. 

Do **not** think it has high enough certainty for use. 

It is bound to need quite a lot of rewriting towards better contract writing.
Like formalizing the commands, efficiency, getting rid of the `refund` variable
being used as it is now..

Otherwise for security, need to try think of ways to break it, analyse the code,
and throw more random stuff at it in tests.

# TODO (note: only if i take it further)

* Go PoC7..
  + Get rid of that awful `refund` variable doing control flow.
  + Some static checks.

* Ensure cant attack by making many tiny contributions, *later* costing too much gas.
  (contribution minimum)

* The refund button should hide if you cannot control it. Also, refunding after the
  whole thing.

* More thurrough case test.
  + All logical paths.
  + Fuzz-test?
  + Reading well/annotating?

* It is not pretty enough.

* Show everything, and safety-off switch. NOTE: the safeties are merely some extra
  checks, do not imply safety.
