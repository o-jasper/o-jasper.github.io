
# Simpler contract for simpler testing..

It is called grudging escrow because if the deal fails, the rational choice if
grudge has no value to you, is to pretend it succeeded.

Also, it just destroys value if things go wrong. It is a *bad* contract to
actually use! And the testing and such does not go as far as it aught to.

### TODO

* When a transaction is already underway, the javascript doesnt send another.
  
* Have images of waiting/smiling guys, and add a 'time of delivery',
  and if funds arent released have them turn grumpy.(TODO have more images)
  
* When setting up, show percentages of stake.
  Red letters if stake is bigger than total. (TODO add the CSS and stuff)

* Get the javascript contract launcher to actually work.

* Yikes, max-gas-use defaults to max ability of balance right now.. Do better
  on estimating.

### Did
* Add time notice to ensure the merchant cannot change the deal right
  before a customers' transaction arrives.

* Refund non-meaningful-message-donations.

* Add tipping to javascript.

