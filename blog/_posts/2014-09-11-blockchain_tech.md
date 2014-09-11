---
layout: post
title:  "The core Blockchain idea"
date:   2014-09-11 16:20
categories: blockchain, satoshi, hash function
---

The blockchain contains two important parts:

1. The scoring mechanism for different where different chains of events all get
   a separate score, and the one with the highest score is the truth.

2. A sense of validity, putting a structure on the sequence of events. This
   mechanism can be quite separate.

One important part of validity is that based of
[public key cryptography](https://en.wikipedia.org/wiki/Public-key_cryptography).
This allows each user to have an particular 'account', by showing that they have
a secret piece of data, without revealing it. It is then considered invalid if
the users does not show he has the secret piece of data.
<sup>(4)</sup>

### Example Validity for just-a-cryptocurrency
As example, lets consider a just-a-cryptocurrency. Each account has an amount
(of coins), and can send coins to an other account, but no more than you
actually have.

A transaction could be

    {signature, from_address, to_address, amount}, from_after, to_after

Can be defined to be valid if:

* Signature is correct, signing `{...}`
* `from_before - amount = from_after ≥ 0`; taken from own coins, cant send more than you have.
* `to_before + amount = to_after`; recipient receives.
Where `from_before` and `to_before` are the balances from when the previous
transaction or repetition listed the after-value.

So now we have a definition of correctness of a transaction. However this is *not*
sufficient. If people make the lists in different orders, two transactions might
try to send the same coins, and depending which you got first, wins. People
could try double-spend by sending two transactions using the same coins.

This would be solved if the list where ordered the same way for everyone.
Ordering this list is the most important part of Satoshi Nakamotos invention.

#### Cryptographic Hash functions
These are functions for which the pre-image is hard to find. What that means is
that given `h = H(x)`, it is hard to find a `x` that has `h` as output. Infact for
cryptographic hash functions it is so hard that the only way to do it is to brute
force; try a lot of `x`.<sup>(2)</sup>

Similarly, finding `H(x) < h` comes down to trying a lot of `x`.<sup>(1)</sup> It
takes a lot of work to do so. Lets say the output is between zero and one; 
`0 ≤ H(x) ≤ 1`, assuming the
hash functions 'mixes well and evenly', so the probability of `H(x) < h` for some
randomly picked `x` is `h`. I.e. `d=1/h` can be considered the 'difficulty', on
average it takes `d` attempts.

This can be used against some kinds of DDOS or spamming, before servers handle
a request, they could demand a solution. Any attacker then can send only send
requests as much as his computer can solve the problem. It is a sort of 
'Proof of Work'; PoW.

Two other properties are also important.

### Blockchain mechanism
<p style="float:right;padding:2%;font-size:70%;color:#555">
<img src="/blog/parts/block_scoring_example.png" alt="Example scoring">
<br>Here score of a block is defined as simply the block number.<br>
(other approaches possible)</p>

In blockchain mechanism uses this as proof of work as well. But instead of
requiring `H(x) < 1/d` it creates a challenge based on the block we're trying to
build on. Basically `H(append(x, building_on_block)) < 1/d`. Here `x` is called a
'nonce'.

How does this give give us the ordering that we want? Well, each block now has a
previous block, because each block creates a problem that is based off its own
data, and only solvers can lengthen the chain. The longest, most difficult chain
is taken as the correct one by clients. Your reward from the block only counts if
it is in the chain clients choose chain, and the easiest way to get it to count
is to work on the most difficult chain.

So, we're dependent on there being enough computation power being used for
creating blocks. The coins themselves can be used to ensure difficulty, since if
they are worth something, people will then 'mine', for them.

Finally, `d` is not actually a set value. It is varied based on how often a block
is created. Difficulty is increased if too many blocks are created, and decreased
if too few, so more attempted creations means that the difficulty will go up.

### The validity of a block

<span><img src="/blog/parts/simplified_block.png"
alt="previous_block_hash
block_number
creator_signature
nonce
current_time
list_of_transactions"
title="previous_block_hash
block_number
creator_signature
nonce
current_time
list_of_transactions"> </span>
    
It is valid if:

* The previous one actually has the `previous_block_hash`, and `block_number`
  is incremented by one relative to it.

* The signature is correct.

* `H(append(x, building_on_block)) < h` (it is also validity)

* `current_time` is not too far off from the time from self. 
  `|own_time - current_time| < some_discrepancy`

* The list of transactions is correct. (Could use the above rules, but to pay
  for mining, you need an additional rule)
  
Note that this approach is simplified, it leaves behind opertunities.<sup>(3)</sup>

### 'Simulated mining' Proof of Stake(PoS)
Proof of Work requires a lot of computation as its mechanism. However, there is
a way to give people a sort of 'simulated mining power'. The simplest is to give
each account a score `H(append(account_id, building_on_block)) / amount_under_pubkey`, and decrease `h=h(t)`
over time, and further give the first-time priority. Lets say there is s 1
minute block time but your account is only valid in 2 minutes, it would be in
your favor to pretend it is 2 minutes later.

PoS can use coin age to smooth out income with stuff like:
`H(append(account_id, building_on_block)) / amount_under_pubkey*last_time_reward`, this has the issue that if
you wait a long time, you have more than your fraction of simulated mining power.
Really, there are too many variations to cover here. (or mining algos in general)

One main issue with PoS is that there is 'nothing at stake'. If there is an
alternate (block)chain of events, and you happen to win a block on it, you could
just make a block for it. Another one is that the simulation is cheap.
If you have 51% at *any* point in time, you can simulate forward to now, and
pretend to be the real chain. Checkpoints help against this, but are centralized.
Although in principle, you could have a bunch of friends and do it decentralizedly,
in practice, i dont think it should be trusted that people will actually do that
properly.

### The rules of validity for Bitcoin
As in the example, each transaction refers to older transactions, but the rules
for Bitcoin are actually more complicated. Our example implicitly refers to the
previous send/receive of that account.

In bitcoin, you explicitly refer to block creations and other transactions,
called inputs. It produces a list of outputs, each with a script that unlocks it.
A script to send bitcoin sets those scripts up so that 
These scripts can be fairly arbitrary, but they are still very limited and
difficult to use when you want to actually do stuff.(and some parts are currently
disabled for fear of abuse) Typically they're just a script that allows the
recipient access to the bitcoins.

Also, this way of doing it isnt very efficient. I dont quite understand why this
approach was taken. It could be a particular conception of how to get
contracts, or a continuation of existing ideas out there that tried to patch
up the lack of ordering.

The score of a chain in bitcoin is simply the block number.

### The rules for Ethereum
Ethereum doesnt have the input-output stuff, nor does it have the repetition of
the state after each transaction. Instead it has a state that is kept track of,
and can rewind. Rewinding is necessary, of course, as it might turn out there is
a more difficult chain out there.

Ethereum doesnt have much set in stone with regards to what blockchain mechanism
it exactly will use. 

### Improvements on the simple example
Cant help myself but mention some possible improvements on the simple example.

* As noted, block creators repeat the balance of their account after adding 
  the block reward.

* [Patricia tree](https://github.com/ethereum/wiki/wiki/%5BEnglish%5D-Patricia-Tree),
  holds the state, and changes *before* the transaction are re-recorded instead
  of after.
  + Allows throwing away older blocks.
  + Still allows rewinding to non-thrown-away blocks. (Just read the state changes)
  + Allows for just repeating changes to entities, thus allowing Ethereum-like
    contracts.

* I havent specified whether PoW or PoS is used. This isnt really required,
  because the two mechanisms can be separately chosen. Actually, expect a
  combination of both to be best.(PoS weaknesses shouldnt be underestimated..)

Really, taking the improvements seems to move it toward what Ethereum currently
is. Also, i am not 100% on how Ethereum rewinds it state at this point.

## Conclusion

I explained the blockchain mechanism in terms of scoring and validity, and
touched on Bitcoin, Ethereum work and a hypothetical 'simple currency'
works. This is explanation of an idea that has a much larger range of
possibilities than is actually explained, and has some blanks i left out, like
how to manage the difficulty to regulate the rate of creation of blocks.

---

**(1)** Not sure if the one follows from the other. Not to be taken for granted.
    Of course, hash functions are well studied and PoW was a thing before
    Bitcoin.

**(2)** It must also be hard to find an `x,y`, `x≠y` `H(x)=H(y)`. Otherwise someone
    could try stuff using two different blocks with the same hash.

**(3)** Particularly, that of lightweight clients. The state could be added in a
[Patricia tree](https://github.com/ethereum/wiki/wiki/%5BEnglish%5D-Patricia-Tree),
allowing for SPV('Simplified' Payment Verification) clients that can get proofs
from full nodes, it uses difficulty as a proxy for validity.

The transactions themselves arent sufficient, because you dont know if you're
getting an out-of-date end-state. However, putting them in a Merkle tree anyway,
and having the before-states repeated in transactions, could allow it be be used
as a [Hanging block](hanging_blocks.html), if the other system it hangs from can
do the computation needed to falsify transactions.

Either way, the transactions need to be offloaded into a hash, otherwise the block
headers would require the transactions included.(not small)

**(4)** The psuedonyms are undesirable for some applications. Zerocoin was the first
cryptocurrency to do something about it, and there are different contenders.

Often they use [zero knowledge proofs](https://en.wikipedia.org/wiki/Zero-knowledge_proof).
