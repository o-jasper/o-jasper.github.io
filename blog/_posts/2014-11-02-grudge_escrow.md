---
layout: post
title:  "Grudge escrow contract"
date:   2014-11-02 18:00
categories: Ethereum
---

I just wrote a 'grudge escrow' contract 
[with html gui(works on alethzero)](https://o-jasper.github.io/eth-entity/grudge_escrow/).
It is a *bad* contract, just to get started. It is a contract between a 
merchant and customer.

<img src="/eth-entity/grudge_escrow/pics/process.svg"
    alt="infographic of process" title="infographic of process">

This does serve a purpose, if the customer commits to not getting his stake back if
it goes wrong, the merchant cannot really gain from cheating. Actually there is a
third option; the merchant can refund. Of course that opens up the possibility of
the customer trying to do blackmail. I.e. the merchant must then similarly commit
not to respond to blackmail.

That way, it strongly hedges on the idea of fairness.

### How this contract is not good for use
The approach misses opertunities. It doesnt attempt any sort of reparations
nor does it gather any information about the participants.

As it is a first contract to get started, it is just not written to be
anything real. Not much has been done about security concerns, code not reviewed,
the test not thurrough enough.

### Table of utilities
Here `V` is the value of the product, `P` the price, `S`, `T` the stakes of respectively
the customer and merchant. The part with the specific numbers are filled
with `V=4`, `S=T=E=1`, `P=2`. Note that in both cases, there is the option to not
participate; `0`, `0`

<table><tr>
<td><u>Without anything</u><table>
  <tr><td></td><td></td></tr>
  <tr><td>Deliver</td><td>Dont deliver</td></tr>
  <tr><td><code>V - P</code>, <code>P - E</code></td><td><code>-P</code>, <code>P</code></td></tr>
</table>

</td><td>&nbsp;&rarr;&nbsp;</td>

<td><u>With Grudge Escrow</u><table>
  <tr><td></td> <td>Deliver</td><td>Dont deliver</td></tr>
  <tr><td>Release</td><td><code>V - P</code>, <code>P - E</code></td>
      <td><code>-P</code>, <code>P</code></td></tr>
  <tr><td>Don't Release</td><td><code>V - P - S</code>, <code>-E - T</code></td>
      <td><code>-P - S</code>, <code>-T</code></td></tr>
</table>
</td></tr></table>

<table><tr>
<td><table>
  <tr><td></td><td></td></tr>
  <tr><td>Deliver</td><td>Dont deliver</td></tr>
  <tr><td>2, 1</td><td>-2, 2</td></tr>
</table></td>

</td><td>&nbsp;&rarr;&nbsp;</td>
<td><table>
  <tr><td></td> <td>Deliver</td><td>Dont deliver</td></tr>
  <tr><td>Release</td><td>2, 1</td><td>-2, 2</td></tr>
  <tr><td>Don't Release</td><td>1, -3</td><td>-3, -1</td></tr>
</table></td>
</table>
</td></tr></table>

As you can see, for a single round, and no other influences, the merchant is
*always* better off just ripping off the customer. `+P` vs `0` for him.
The customer forseeing this, a deal would never happen. No deal at all is 0
utility for both.

In one round, the threat of not releasing the funds is
[non-credible](https://en.wikipedia.org/wiki/Non-credible_threat), 
*if* the deal gets started, releasing increases the utility of the customer
`+S` either way. Although a lot of it might depend on how it is represented,
*for humans*, i think the threat is credible, as humans value fairness, and
we dont get 'single rounds'.

### Attempt to model
I tried analysing it a bit assuming a probability distribution of
strategies, where strategies are a set probabilities for each decision. I.e.
`P(a,c,D)` each players has a `(a, c, D)` of again probabilities which
choices it makes. You meet a random player, as randomly being a
customer/merchant.

`a` is the probability of releasing *if* delivery arrives, `c` if the delivery
does not arrive, `D` is the probability of delivering.

The highest expectation value strategy given a distribution was:

* Deliver if `a+c>(E+2*T)/(P+T)` , where `a`,`c` are average probabilities
  (from the distribution of strategies of the 'oponent') for releasing if\
  respectively delivering and not delivering.
* Release:
  + If delivered. (If `D>0` but if `D==0` it almost never happens)
  + If not delivered, release if `D < 1`

Strange that if everyone follows the strategy, a defector could earn more, by
choosing to not deliver. That decreases my confidence.

However, the loss of having the rule of not releasing if there is no delivery
is small if there is a small number of defectors <code>D&asymp;0</code>; a small
amount of altruism would prevent defectors.

Additionally, a probability of accidental failure to deliver could be added by
reducing the maximum `D` the merchants may offer to `P_fail`.(You could modify
<code>D &rarr; P_fail&sdot;D</code>, but merchants would modify they `D` to
compensate, hence just the maximum.) 
This failure probability would increase the altruism aspect needed.

Note that perhaps an analysis looking at multiple rounds is more apt.
