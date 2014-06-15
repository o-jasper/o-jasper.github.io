# Secondary blockchains

A secondary blockchain with sort of 'mining'. The goal is to have a secondary
blockchain without neccesarily internal value, with mining incentivized on
ethereum, and values in the secondary usable on ethereum.(it is allowed to need
a client, i.e. that contracts cant do it on their own) 

Firstly you set up a scoring system, the highest score of a block wins. 

An instance of scoring is to have it be `block.prevhash + sender.address`.
(stake-like) *However* that isnt miner-collusion proof. So instead values from
a RANDAO could be used.
(first time i thought of a use that isnt betting-as-a game!)

Winners put up a block, they publish a Merkle Root.

That things exist in a block can be proven using Merkle paths. This can be used
to test the validity of a block. If *anything* is invalid this challenge can be
put up, and the entire block invalidated, and stake put in by the 'miner' taken
away, 'truth or punish' style.

Of course the list of who is allowed to mine could also be in the secondary
blockchain. The miner would have to prove it when claiming his prize and block
root.

### A big problem remaining

The remaining problem is how to make sure the file is actually available. People
cannot prove *anything* about invalidity if they do not have the file. 
Solutions are:

* Stakeholders can vote to veto.
  [The cheaper voting scheme](http://o-jasper.github.io/blog/2014/05/08/Proof-of-Reserve-and-voting.html) 
  suffers from the same problem,btw.

* Incentivize random people prove they have the file, before it is taken to be
  valid.

Neither is great, but workable, i suppose.
