---
layout: post
title:  "The core Blockchain idea"
date:   2014-09-02 18:00
categories: Blockchain
---

TODO illustration.

Blockchain technology starts with clients implementing a concept of validity and
one that decides which chain. In this blog post, we're starting from there, rather
than the somewhat weird approach bitcoin has taken.

One important part of validity is that based of public key cryptography. This
allows people to sign pieces of data. The keys are just bits of data.
Each public key corresponds to a private secret key. Basically there is a way that
you can manipulate data with the private key, without revealing the secret, but so
that people can see that it was done with the secret corresponding to the public
key.

In the blockchain the public key system allows only particular people do something.
Each public key can correspond to an 'account', and the private key is required to
do something with that 'account'.

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

#### Not sufficient
So now we have a definition of correctness of a transaction. However this is *not*
sufficient. If people make the lists in different orders, two transactions might
try to send the same coins, and depending which you got first. People could try 
double-spend by sending two transactions using the same coins.

This would be solved if the list where ordered the same way for everyone.
Ordering this list is the most important part of Satoshi Nakamotos invention.

TODO tangle of tubes and one-way-valve idea.
#### Cryptographic Hash functions
These are functions for which the pre-image is hard to find. What that means is
that given `h = H(x)`, it is hard to find a `x` that has `h` as output. Infact for
cryptographic hash functions it is so hard that the only way to do it is to just
try a lot of `x`.

Similarly, finding `H(x) < h` comes down to trying a lot of `x`.<sup>(1)</sup> It
takes a lot of work to do so. Lets say the output is between zero and one; 
`0 ≤ H(x) ≤ 1`, assuming the
hash functions 'mixes well and evenly', so the probability of `H(x) < h` for some
randomly picked `x` is `h`. I.e. `d=1/h`can be considered the 'difficulty', on average
it takes `d` attempts. 

This can be used against some kinds of DDOS or spamming, before servers handle
a request, they could demand a solution. Any attacker then can send only send
requests as much as his computer can solve the problem. It is a sort of 
'Proof of Work'; PoW.

### Blockchain mechanism
In blockchain mechanism uses this as proof of work as well. But instead of
requiring `H(x) < 1/d` it creates a challenge based on the block we're trying to
build on. Basically `H(append(x, building_on_block)) < 1/d`. Here `x` is called a
'nonce'.

How does this give give us the ordering that we want? Well, each block now has a
previous block, because each block creates a problem that is based off itself, and
only solvers can lengthen the chain.

In each chain there is a particular order. However, chains can still be lengthened
in a fork with two different blocks. This can be solved by choosing the chain that
is the most difficult. So lets say you received coin in a particular chain, 
in order for you to be confident, you want to be sure some other chain does not
become more difficult. In order to do this you wait until there are more blocks 
on it. This means that if there is another chain, it would have taken a lot of
computation power, and at some point you can be sure that this has not occurred.

So, we're dependent on there being enough computation power being used creating
blocks. The coins themselves can be used to ensure difficulty, since if
they are worth something, people will then 'mine', for them.

Finally, `d` is not actually a set value. It is varied based on how often a block
is created. Difficulty is increased if too many blocks are created, and decreased
if too few, so more attempted creations means that the difficulty will go up.

### The validity of a block

Now blocks consist of:

    previous_block_hash
    block_number
    
    creator_signature
    nonce
    
    current_time
    list_of_transactions
    
    (merkle_root, would be useful for SPVs)

It is valid if:

* The previous one actually has the `previous_block_hash`, and `block_number`
  is incremented by one relative to it.

* The signature is correct.

* `H(append(x, building_on_block)) < h` (it is also validity)

* `current_time` is not too far off from the time from self. 
  `|own_time - current_time| < some_discrepancy`

* The list of transactions is correct. (Could use the above rules, but to pay
  for mining, you need an additional rule)

### 'Simulated mining' Proof of Stake(PoS)
Proof of Work requires a lot of computation as its mechanism. However, there is
a way to give people a sort of 'simulated mining power'. (TODO)

### The rules of validity for Bitcoin
As in the example, each transaction refers to older transactions, but the rules
for Bitcoin are actually more complicated. Our example implicitly refers to the
previous send/receive of that account.

In bitcoin, you explicitly refer to block creations and other transactions,
called inputs. It produces a list of outputs, each with a script that unlocks it.
A script to send bitcoin sets those scripts up so that 
These scripts can be fairly arbitrary, but they are still very limited and
difficult to use when you want to actually do stuff, thats where Ethereum comes in.

Also, this way of doing it isnt very efficient. Not entirely sure why this 
approach was taken. Probably a solution was taken based on earlier approaches
that were still trying to solve the problem without sorting.

### The rules for Ethereum
Ethereum doesnt have the input-output stuff, nor does it have the repetition of
the state after each transaction. Instead it has a state that is kept track of,
and can rewind. Rewinding is necessary, of course, as it might turn out there is
a more difficult chain out there.

### Improvements on the simple example
Cant help myself but mention some possible improvements on the simple example.

* As noted, block creators repeat the balance of their account after adding 
  the block reward.

* In principle clients could keep a state and throw away old blocks if they
  think the data doesnt matter.(not the headers though)
  
* <p>Quite a lot more features are possible, including somewhat
  Ethereum-contract-like scripts.
  <br><br>
  However, contracts with a lot of storage would weight a lot, as the state is
  repeated. This is likely why Ethereum has a state. One might try mitigate it
  by repeating only the changed values. Running a contract would require
  searching through history for the values if you dont keep a state.
  <br><br>  
  On the other hand you could go for a by-itself non-rewindable state, and use
  the change-repetition to rewind by just changing the state.</p>

* I havent specified whether PoW or PoS is used. Actually, expect a
  combination of both to be best.(PoS weaknesses shouldnt be underestimated..)

### Lightweight clients; SPVs

Finally a note about SPVs. There is the 
[Merkle Tree](https://en.wikipedia.org/wiki/Merkle_tree) mechanism, i wont
explain it, but the effect is that if you have a large body of data, you 
can create a number, merkle root. Then people holding the data can
create another piece of data, that proves that a chunk of data is in the
large body corresponding to the root.

What this means for blockchains is that you can put these Merkle roots in
the 'block headers'. These header are enough to show that work with
some difficulty, but not enough to actually show that the transactions in
the blocks where valid. However if you assume full nodes are checking it
before accepting blocks, only valid blocks will have high difficulty. So
you can tell which headers are correct.

So then you know the Merkle roots, and can ask full nodes about things,
and the full nodes can prove to you that certain transactions took place.

[Hanging blocks](http://o-jasper.github.io/blog/2014/06/03/hanging_blocks.html)
sort-of uses this SPV verification, with transactions that 1) refer to the
previous state 2) repeat the state after. So it sees a transition between
states, which the Ethereum contract can check. Hence the Ethereum contract
can know if the hanging block is correct, assuming someone will provide
proof that it is wrong if it is wrong.

---

(1) Not sure if the one follows from the other. Not to be taken for granted.
    Of course, hash functions are well studied and PoW was a thing before
    Bitcoin.
