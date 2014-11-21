---
layout: post
title:  "Publishing DAO, and its holy grail"
date:   2014-11-21 18:00
categories: Ethereum
---

If we have [Swarm](https://github.com/ethereum/cpp-ethereum/wiki/Swarm)
functionality with Ethereum, this in effect becomes
[more than just storage](https://o-jasper.github.io/blog/dht,/ethereum/contracts,/2014/05/08/DHTs:-more-than-just-storage.html), because Swarm magnet links in contracts
can be controlled by the contracts, and a Name Registry contract can
name the contract as being *the* way people arrive at the website.

This means that the files are essentially *real assets* of the contract.
The contract cannot make the files, however, the rules of the contract
determine when a file is accepted.

### Publishing DAO
These files can be used to host web pages. Now, it is easy to imagine
having magnet links be the text, and advertisements of said pages.
The contract can enforce the presence of the advertisements for a period
of time, including conditions like being paid for, or arbitrary other ones.

Another source of income would be payment-without-powerplay.(aka donations)
The default of the viewer could be to remove ads where donations are made.
(of course this would be trivial to override)

How do you organize it, though. Who writes the articles, gets paid for them,
decides what advertisements to accept.

One way is to have a sort-of co-operative with people that agree on who add
to the group. They write articles and (delegative)vote on where to put them,
and which ads to accept where, and how to use the money. Selecting the ads
can also be sort-of automatic, picking the higher-paying one. Or merely
automatic until a vote overrides. ([half-baked code](https://github.com/o-jasper/o-jasper.github.io/tree/master/eth-entity/publishDAO))

### Holy grail of Publishing DAOs
However, the above requires a group of people *to agree* to add people to the
DAO. What if it could just accept *any*one? In order to do so, you have to
stop plagiarism, and determine what files are useful. Two things:

1. Each file is (possibly)derived from some other set of files, to different
  degrees.

2. One thing that is already trivial, is timestamping files. This means we dont
  necessarily need the direction of how files were derived from each other.

If (1) can be figured out, anyone can join simply by doing stuff, and payments
from both advertisement and donations can flow down the graph. 
Besides the effort needed to achieve (1), it is a zero-barrier-to-entry and
zero-overhead publishing scheme. Hence, holy grail'.

Because income flows down the derived-from graph, it is *not* necessary to
estimate the value of files. Advertisements and donation decide that.

I have no illusions, none of the ideas below are sure to work. They also may
still need an limited aspect of delegative voting to help advertise itself, and
manage what advertisement to accept where.

### Using Reputation?
The most general idea i know is to have some sort
of reputation system, where people repute each other, and try figure out whether
files depend on each other, their reputation is punished or rewarded depending
on the accuracy, and they may also get a fraction of the DAOs income.

These reputation systems "are good because the currently reputed users
are good" and stay good for the same reason. So it might be tricky to figure out
how to do this with decent certainty that it will keep working. The approach can
be changed midway, though. The DAO has sources of information to estimate reputation,
each with different interests, including who is donating, buying ads, creating files
and estimating derivativeness, and perhaps some other functions, like advertising-for
the DAO.

### Internal structure?
In a wiki, derived-from could be seen as clear, and instead of figuring out
derivated-from, the goal could be to try stop bad edits.(also hard)

In software development, you could use repositories of software. Users expecting
the proper names,(the DAO could have a namereg for this) not wanting duplicate
dependencies, and decency between programmers could conspire to get the dependency
graph be the derived-from graph.(Idea due to [Casey Kuhlman](http://caseykuhlman.com/))

A more technical internal-structure approach is a system of proofs, you could put
up a claim that something is a new theorem, which can be challenged. Perhaps the
length of the statements to get to the same statement could be used to determine
whether the theorem is really new. The derived-from's would be the theorems and
axioms used.

Similarly, that could be used to try find equivalent programs, to create software,
[or perhaps also hardware](http://www.openscad.org/).
