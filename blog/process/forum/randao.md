Excellent article. Submit it to r/bitcoin? Elsewhere?

I disagree on the reason that prevhash is harder to manipulate because it can be validated. It is harder to manipulate because the hash is what determines if a miner gets a block. It can select hashes, but only by not getting blocks and thus block rewards.

Piling on different block hashes isnt a solution either, because the last one will know the former ones, so he knows the result of him choosing to (not)publish a block anyway. (the former blockhashes are really moot)

(edit: note: largely this is how i imagine the concept..)RANDAO doesnt quite require as much trust as implied. Random data providers make up a random value, which they commit to with `sha3(R)` and later they release it; `R`. Multiple providers do this at a time, and the data is combined.

Of course if they fail to deliver, in principle the RANDAO can 1) wait until the next random value or 2) play with one fewer. Both will affect the random value. But the latter means the attacker knows the result if he saw what `R` the others revealed already. So go (1) The trust there is based on the calculation that the stake here is big enough.

Unlike for the miners, where you have to pay the entire additional stake; `block_reward + what_you_pay_them`, you pay providers `N * p_accidental_failure * stake_ethers`. I.e. pay for the chance that by some accident the providers fail, for each of the `N` providers. Looking at when to choose which for to get the same stake:

    S = R + Q  # For miners, stake is reward plus payment.
    T = N⋅p⋅S  # For RANDAO providers you pay slightly more than this.
    T < Q      # When to choose for the RANDAO

    NpS < S - R  →  S > R/(1-Np)

For `p=1%,N=3` that is `~1.03R ~ R`, paying the miner is too expensive.. Immediately once you want more stake than the random value, RANDAO wins.

The second point of trust in the RANDAO is that you trust that the chosen providers are *not* in bed with each other. Then they can set their `R` entirely, or conversely, pick their bets when the time comes to reveal. However, it can be combined with `block.prevhash` aswel, so you could need this collusion of providers *and* the miner.

Note that this is sort-of a public good. I mean the RANDAO can charge for the service, but people could use shell-contracts that pay once, but serve a lot of people. Generally true for data feeds, afaict. This indirection does cost gas, so it could ask at least this gas price in value before people really start abusing it? Probably. So only if the price is above some level, this could become a problem.
