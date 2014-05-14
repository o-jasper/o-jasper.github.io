---
layout: post
title:  "Hanging blocks"
date:   2014-05-15 00:10
categories: Moot
---


The idea is that;

1. People(could be anyone, or arbitrary group) claim they made a block and
   register the Merkle root. And spread around the file. You would put in stake
   that can potentially punish. If it succeeds you get a little ether for it.

2. There is a mechanism to show people have the file. Ideas:
   + Random people(like from a group) must show they have it.
   + A backup to create a new random set of people that show to have it.
   + As backup a vote. (Which is an expensive approach, but...)

3. Blocks can be made invalid by when chunks at the end of Merkle paths can be
   shown to be invalid.(possibly pairs of chunks/multiples)

Number **2** is the weakness. The people that have to show they have the file 
could also be attackers trying to avoid a block getting on. Of course you could
have arbitrary people come and show they do have it, the problem is that it
devolves into voting, with each vote being a weight on the Ethereum blockcahin.

**1** could be modified to choose a person, for instance based on RANDAO output,
`msg.sender` and stake.(bit like stake-mining) That way an attacker has to wait
to get lucky, and cant start an attack at his arbitrary time.
