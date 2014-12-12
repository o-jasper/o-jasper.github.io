---
layout: post
title:  "Assurance contract mention"
date:   2014-12-12 18:00
categories: Ethereum
---
Just mentioning the
[assurance contract](https://o-jasper.github.io/eth-entity/assurance_entity/)([readme](https://github.com/o-jasper/o-jasper.github.io/tree/master/eth-entity/assurance_entity#assurance-ethereum-entity))
i made, it is a crowdfunder a bit like kickstarter. Such a contract
goes through three stages.

1. Creation, setting of parameters like minimum and maximum raised.
2. People paying to it. 
3. If not funded, return funds, otherwise the project progresses.
   ('manual' refunds are possible in 2 and 3)

The point is to ensure there are enough customers/interested parties, of course.

Note that reward levels can be done with this system, but would have to be
implemented otherwise. Though that implementation doesnt need to be on-blockchain,
could even be promise.

#### Gui code
The gui is *very* bare-bones, and for now, tests are still rudimentary,
and no static analysis to add some restraints.

Although the number of lines of code is low(448 lines), it is important to have good
control over this too.
Different than the earlier [grudge-escrow](/blog/ethereum/2014/11/02/grudge_escrow.html)
the gui and contract interface are objects on themselves, and some code is shared too.
I refrained from libraries(like react.js) in this case, for some reason none of them
sparkle with me. I look at them and think, does this really help me? Perhaps i am being
stubborn.

The inputs could be better than just text fields, particularly inputting times
and ether amounts. The latter could include a unit.
(Note: it doesnt do subcurrencies, likely people dealing in ethers dont have much reason
to pay the gas cost for that.)

I like the concepts of warnings, important notes, and notes showing up that dont
interfere with what you're looking at because they're greyer, but still provide the
information. `js/els.js` has some stuff that helps doing that, but i think
having 'classes' represent inputs and have those refer to elements of particular kinds
will be a better approach. Said 'classes' need to be flexible enough to add their own
context-dependent notes to things.

Also like generally things showing up/not showing up depending
on the state of the form. That said, it still needs to tell what stage you are in,
link to an explanation of what a crowdfunder is, and stages it goes through,
and have the parameters less prominent when not intializing.
