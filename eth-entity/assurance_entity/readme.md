
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

# TODO (might take a while till i take it up)

* Go PoC7..
  + Get rid of that awful `refund` variable doing control flow.

* Ensure cant attack by making many tiny contributions, *later* costing too much gas.
  (contribution minimum)

* More thurrough case test.
  + All logical paths.
  + Fuzz-test?
