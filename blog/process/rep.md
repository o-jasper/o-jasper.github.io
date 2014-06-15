# Subjective reputation/trust in Ethereum

When making a reputation system for Ethereum it may be tempting to make an
'objective' one where a system has single reputations for each person, because
it may seem to likely take less computation and storage than a subjective one
where each person has his opinion about the reputation/trust in another person.

Though this post isnt intended to dissuade from objective systems, but to lessen
the idea that subjective ones cost more on the Ethereum protocol.

### Idea of the system

The, or at least *an*, idea of a subjective reputation system is that different
nodes point to each other and say 'i trust this guy, this much', and that a
trust of one particular node in another one is determined by what the edges
leading from one to the other say.

Now, you might think, contracts will to search trust when a contract needs it.
But this is not entirely true, because clients can do the searching and then
just tell the contracts exactly what they need to know so that the 
reputation/trust is at least above some level.

Even if the contract alone wants to tell a reputation, and cant afford to
search, it can just pay for some client to search for it, the best solution
gets paid.

### Somewhat arbitrary example

Generally i prefer the idea of subjective approaches, although i am open to
both. The most important property of a subjective reputation system is that if
you give someone some reputation, he cannot create more than he got. With some
(aspect of)resulting reputation between two persons given as **R(i,j)**, and a
direct one given as **D(i,j)** a simple example is:

<blockquote><b>
    R(i,k) = &sum;<sub>j</sub> R(i,j)&sdot;D(j,k)<br>
    &sum;<sub>i</sub>D(i,j) = &alpha; &le; 1
</b></blockquote>

A node can give out **&alpha;R(i,j)** reputation from **i**. Let us see if he
can use sock puppets to increase his leverage, **1** gets some **R(0,1)**, and
tries to use a sock puppet **2**, to increase his leverage.

<blockquote><b>
    D(1,2) = &alpha;
    D(2,1) = &alpha;
    R(0,1) = R(0,2)&sdot;D(1,2) = R(0,1)
</b></blockquote>


## Making the client do the work

Lets say you want to prove 



## Mine
i have been thinking of it as essentially a thing where everyone has his opinion
everyone can bootstrap, and interesting model is where you get to give away α of 
what you have, then by giving it to yourself you can at max get 1/(1-α)
and when reputations need to be calculated you provide the paths you want that show a 
line of reputation from the other party to yourself
the incentive to give others reputation would presumbably a little reward for when 
people use you as a path but there also still needs to be a way to lose reputation, 
i reckon



--------
 
## Reputation working from probabilities

The idea is that the bets are made and then probabilities are determined from 
that. The probability is caused by estimating the chance of different events,
and the different events relate to what the people did, and thus have
implications for the reputation system.

The problem here is that a lot of different things may have happened.



## Systems to determine `q`
Limiting to services with reputation, in the case of a kind of network where
nodes keep opinions of each other, which transfer.(in some non-exploitable way,
of course) This network may be used to determine `q` assuming the reputation
can be used in some fashion for that purpose.

Lets also assume that nodes list where they got trust from.

For instance in buying a service, say without escrow, client side, the search
starts from your own node, and that of the service. You work outward finding
nodes that have good reputation for both. How good different paths(trees) are
depends on how high `q` is for nodes on them, and how much they are willing to
contribute.

Once the search has exhausted, there are a bunch of paths(trees) of contracts
to follow, to submit this request for bets, you create a transaction that
lists the paths, and contract execution will not have to search and go straight
to computing how the bet will operate.

## Probabilities and trust
When a gambler indicates probability directly, this results from estimates of
the different aspects. It may be possible to figure out probabilities of the
individuals, and imply a level of trust. However, this can be a tangle, 
it seems likelier that the above approach is used to figure out an order of
betters. Still, it is an approach to look at.

There is also the issue to handle when things go wrong. Basically gamblers
would remove reputation, but they could also investigate what happened.
Removing reputation from a node may in many systems also remove reputation
from nodes downstream. This is bad for the subject of the node which thus gets
less reputation. So in principle it may cause investigation from that end aswel.
(and contacting about what the results are)

Point of the latter is that reputation may also be a way to incentivize at
least reputable people/entities helping each other.

