---
layout: post
title:  "Assurance contract mention"
date:   2014-12-12 2:47
categories: Ethereum
---
Just mentioning the
[assurance contract](https://o-jasper.github.io/eth-entity/assurance_entity/) i made,
it is a crowdfunder a bit like kickstarter. Such a contract goes through three stages.

1. Creation, setting of parameters like minimum and maximum raised.
2. People paying to it.
3. If not funded

Note that reward levels can be done with this system, but would have to be
implemented otherwise. Though that implementation doesnt need to be on-blockchain,
could even be promise.

It isnt super-polished,
([readme](https://github.com/o-jasper/o-jasper.github.io/tree/master/eth-entity/assurance_entity#assurance-ethereum-entity))
the gui is *very* bare-bones, however, it can be prettied-up.

I have much improved the approach to the gui. Well maybe i am being stubborn and
should be using something like react.js.
The inputs could use other things than text fields, particularly the time one.
Also the amounts in ether could include a unit.

I like the concepts of warnings, important notes, or subtil hints showing up as
an interface is used. Also like generally things showing up/not showing up depending
on the state of the form. That said, it still needs to tell what stage you are in,
link to an explanation of what a crowdfunder is, and stages it goes through,
and have the parameters less prominent when not intializing.

It is important that you can see all the interface stuff when you want to, though.

TODO ... some things i do want.

* Description of the current stage.
* Hide the refund button.
* Link from that page to the blog post and development page.
