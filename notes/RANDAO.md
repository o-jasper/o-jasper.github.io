---
layout: note
title:  "Random Values in Ethereum"
date:   2014-07-19 16:00
categories: Ethereum contracts, Ethereum, Random, RANDAO
---

Here is the evolution of the problem of random values in Ethereum:

1. Denny's lottos approach, use future hashes of blocks. These are psuedorandom,
   but the problem is that miners know which they have when they get a block. 
   So if it makes enough difference for bets of the miners and/or people paying
   the miners, they can just not publish it and affect the odds.

2. Have commitments to random value from the different players `H(R1)`, `H(R2)` 
   and later `R1`, `R2` are revealed(checked,) and combined. Failing to provide
   your value will give maximum losses. This one is secure, but it is a bit 
   tedious and inconvenient two step process.
 
3. Finally, have a [RANDAO](https://github.com/dennismckinnon/Ethereum-Contracts/tree/master/RANDAO)
   where some parties put stake(like ethers) in, and commit random values like
   before. If they later come up with the actual values they get a payment,
   otherwise they lose their stake. The random values are accessible from other
   contracts with a small payment, or the DAO contract calls the other contract
   when the random value is in. (Me and Dennis McKinnon came up with it)
   
   Basically the suppliers of the random values in the RANDAO can still fail to
   publish their random values. However, the stake they put in can be much larger
   than a single block reward, it can be large enough so that it cant be profitable
   to do so when there are some bets benefitting.

Afaik the above basically is the relevant story, 
[here is an the main Ethereum thread about it](https://forum.ethereum.org/discussion/comment/2758/).

The RANDAO still has to be created 'in earnest'.
