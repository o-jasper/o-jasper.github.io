**NOTE: Raw from ethereum forum probably make a little page of it.**

The method that Denny's Lotto uses is to use the `block.prevhash` at
some future time, this is psuedorandom. If you use the one at the current time,
it is also psuedorandom but the result is known already.

But using the previous hash has the problem that miners can affect probabilities
by failing to provide the blocks, if the block reward is smaller than bets they
lose due to the block. A solution is to both figure out random values 
`R1,R2` and when betting provide <code>SHA3(R1),SHA3(R2)</code>, and
play the game by releasing `R1,R2` afterward and combining those in the
contract. Then neither can know the other guys' random value, and the miner cant
do anything. Of course forfeiting should be losing.

However, that is inconvenient. We figured we could do the above cryptographic
commitment scheme with a few people, and then have everyone be able to use it.
This is the idea behind
[RANDAO](https://github.com/dennismckinnon/Ethereum-Contracts/tree/master/RANDAO).
(afaik it doesnt run yet) You would essentially subscribe to the RANDAO and it
would call you back with a random value. Though i suppose 'raw' usage where 
you call it directly and get a random value directly is also possible.
(with more security concerns being the users' responsibility.) You pay a little
for using it. The RANDAO has a scheme were multiple people put in stake
(bigger than the block reward) and a `SHA3(RANDVAL)` and they 
then *must* provide `RANDVAL`, or lose the stake. They get apart of the earnings
if they succeed.

tl;dr when Ethereum is live you probably just subscribe to a random data feed for
random seeds.
