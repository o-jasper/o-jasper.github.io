---
layout: post
title:  "Hanging blocks"
date:   2014-06-03 02:00
categories: Ethereum, hanging blocks, Blockchain, scalability
---

Hanging blocks are essentially like blocks on a blockchain, but instead, they
register a [Merkle root](https://en.wikipedia.org/wiki/Merkle_tree) in an
Ethereum contract, and promise the corresponding file was made available.
Checking on the promise, and creation of blocks require people to have some kind
of stake in the system.

#### Making blocks
A client making a block registers the Merkle root in the hanging block contract,
and spreads around the file. Block makers must also
put in stake that can be used to punish not providing the actual data to the 
block, or invalidity of the block.

The criterion to allow people to make a block can be arbitrary, it could be
random based on RANDAO and `msg.sender` and the stake. Or it could rotate
through a list, and the nearest to next one is allowed to create the block.

#### 'Proving' that the block data is available
If the files are not being shared, people *cannot* point out invalid facts in
said files as below. To ensure it is available, there is a vote about it.

This is why a system where people have stake is necessary, otherwise it is
not possible to defend against many fake accounts.
([Sybil attack](https://en.wikipedia.org/wiki/Sybil_attack))

#### Validity of blocks
Entire blocks, *and* their successors can be made invalid by when the 
combination of chunks, as proven to be in a block with Merkle paths, are shown
to be invalid. The hanging block contract logic would contain the ability to
check this.

If the size of a block is **n** it costs **&propto;log(n)** length of path to
prove a chunk is in there, plus the size of the chunk itself.

As said earlier, makers of blocks put something at stake that can be taken away
as punishment. One way to view it is that this is 'Truth or Punish'(and discard 
after) whereas the 'normal' blockchain uses 'Truth or Discard'. There should
also be a reward for pointing out invalid transactions.

## What can you do with it?
You can do *anything* with it where you can use a few chunks that are not
inpractically large to show invalidity. What does this imply? For instance,
what if there is a program **f** with states **S<sub>i</sub>** and 
input **I<sub>i</sub>**?

**<blockquote>f(S<sub>i</sub>,I<sub>i</sub>) = S<sub>i+1</sub> &nbsp;&nbsp;&dagger;
</blockquote>**

This can be done! Store triplets in the block:
**(p<sub>i</sub>, I<sub>i</sub>, S<sub>i</sub>)**, where **p<sub>i</sub>** is the
previous change of state. We need to check two things:

1. **p<sub>i</sub>** as reported is correct: Do this by searching the hanging
   blocks for one that is actually between the
   claimed new one and the old one. If there is, it is a invalid transaction.

   <img src="/blog/parts/wrong_prev.png" alt="Diagram illustrating (1)">

2. End state reported is wrong: This is the requirement at **&dagger;**, and it
   can easily be checked by the client and verified to be wrong by the hanging
   block contract, by providing the two relevant blocks.

   That the hanging block contract needs to know **f** could be limiting.

The program here is limited by the entire state needing to be offered up to
to the hanging block contract. So this state cannot be too large. Furthermore,
barring things like cryptographic commitments, the different programs running
on the hanging blocks cannot interact.

To try fix this, you could easily allow contracts to depend both their own and
other contracts' state, and simply have more backward state connections that
need to be checked to be correct, and can be shown to be wrong if needed.

### Communicating with contracts on regular Ethereum
Contracts cannot know about the data in the hanging block themselves. However,
a client can prove what value chunks of it have via the hanging block contract;
it is just the same process as proving invalidity, except the chunk is send
to the other contract. So it is somewhat limited, but useful interactions are
possible.

The depth of a chunk doesnt increase security the same way as mining, but the
passing of time improves the chance that inconsistencies were reported, and
decreases the chance that a vote to take it down will take place.

## Final notes
*Amazingly*, if you look at the above, you can see that this does not actually
require all full nodes to compute everything. But it does require *a lot* of
clients ensuring availability of the data, and *some* clients checking
everything, and reporting invalid actions.

It is not quite clear what the implications are, or if i made a mistake. If it is
a good idea, likely the best approach is to try figure out how to make 
developing for hanging blocks similar to developing for Ethereum itself, so
people are around that know how to do it.

The Merkle tree does not need to be all explicit in memory/harddisk. For
instance, the client could keep track of the state like Ethereum, and just
calculate the intermediate states as needed.
(Essentially, this just compresses it)

Furthermore, considering not everything needs to be run, you might not even need
all the data either, just the checksum of the merkle tree on some sides. 
However, due to the need for those votes, *most* of the clients will need to be
able to tell when any part of it is not available, because a vote to falsely
claim everything is available needs to be countered. Of course you might
try have a "raise the alarm if a bit can't be found", but an attack of spamming
such alarms would have to be ineffective in that case aswel.
