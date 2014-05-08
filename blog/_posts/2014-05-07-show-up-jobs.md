---
layout: post
title:  "Just show up anytime jobs"
date:   2014-05-08 23:40
categories: Ethereum contracts, Ethereum, positions, labour
---

Recently there was the second weekly Ethereum video hangout.
[Casey Kuhlman made a good recap](https://tao.epm.io/entries/2014/dao-design-jam-week-2-recap.html).

However, the way roles were talked about seemed to imply more fixedness than
many DAOs might have for their business model. Since there is a cost to hiring
people, many sorts of DAOs may just use spontaneous contributions as 'labour'
input, where the DAO does not put in requirements for participation. This could
be the case when:

* The labour *must not* risk large amounts of wealth, or risk life. This will
  likely require a 'fixed' position as in a qualification, although i suppose
  many DAOs may accept the same qualifications; Just a job needs a diploma,
  doesnt mean it will involve fixed positions.

* Design so bad labour inputs cant hurt the system. This might work by:
  + Identifying labour as good, and passing along value to those contributors.
  + Requiring input of stake, which can be taken in the case of failure.

* A reputation system limits damage that can be done.

* The thing is typically opertune to particular people, or they do not do it
  somewhat spontaneously. For instance because they're in the right place at the
  right time, or because statistically you always get someone to respond,
  or time/location doesnt matter. For they have something on their mind, like
  some wikipedia editors, blog writers or artists.

Below are some examples, really, each of them is an entire topic on itself.
Even though this post got a bit too long, it does not nearly cover the entire
idea. Note that i am not sure on the feasibility of these, not in the near term,
anyway.

### Opertune: Rideshares, 'Mechanical Turk'
Taking people and stuff along with you to places near the route you are going
anyway already, where time is not critical but location is. Estimating ability
to carry and, using some sort or reputation and/or stake system is needed.

Could really imagine anything, like sweeping the streets, but with package
delivery, the signal wether things went well is stronger.

The 'Mechanical Turk' is the opposite, largely here time may be critical, but
location isnt, so if you can attract enough people you can serve them.

### Publishing DAO's
You can timestamp documents by publishing their checksum on the blockchain.
(cryptographic commitment) [Chronos](https://github.com/mquandalle/chronos/)
does this, for instance.

However, a way could be determined to indicate the 'derivativeness' of two
timestamped documents, Different contexts may have different ways of 
determining 'derivativeness'.

Income is a separate problem, for instance a publish DAO could use
[DHT methods](http://o-jasper.github.io/blog/2014/05/08/DHTs%3A-more-than-just-storage.html) to prove it is showing advertisements, advertisers ask to buy the spots, and the
highest paying get them. Authors would have be able to vote on whether 
advertisementss are abusive. Another source of income could be donations.

Approaches using DHT may not entirely neccessary Advertisers could simply 'patrol'
the pages and value the according to how consistently ads are placed.

In the context of
[package repositories](https://tao.epm.io//entries/2014/introducing-ethereum-package-manager.html),
an idea i heard from Casey Kuhlmann was that you can use the combination of name
registries that help hold on to a name, loyalty between open source developpers
to credit their dependencies to create a payment system.

### Using stake: RANDAO

[Dennis McKinnon](https://github.com/dennismckinnon)'s
[RANDAO](https://github.com/dennismckinnon/Ethereum-Contracts/tree/master/RANDAO).
is a random value(seed) generator for other contracts.
Future block hashes are random for this purpose, but can be affected by miners
colluding with betters.(failing to report blocks, because the bets earn more)

In essence it works by various parties using a cryptographic commitment 
-the hash of a random value- and then in the second stage the same party
releases the random value. Random values are then combined so none of the
parties can determine it onesidedly. In essence, any party can just come in
and play along.

Of course, parties can still fail to report the random value if the, or people
they deal have bets that may swing in that case. Which is the equivalent of not
reporting blocks in the case of future blocks. However as here it is a contract,
the stake can be a lot bigger than a single block reward.

## Where to send the money

DAOs dont have top-salaries to pay or dividents to pay, at least, a good one at
worst only pays dividents up to an amount paying back for investment. I am
critical of dividents of corporations, but DAOs really dont have investments
to make, unless they're really clever and can use it to program new things..

They have to do something with their earnings, if they have a margin.
Accumulating is sort-of a waste for the community using and putting effort in
it. As far as i can tell, are three ways to go, none excluding the others,
and what to do is context sensitive.

1. Cheapen their service, eliminating the margin.

2. Goes to the contributors.

3. Goes to some other (decentralized)organization, for instance
  human-identification system with
  [UBI](https://en.wikipedia.org/wiki/Basic_income_guarantee).
  Possibly could be an organization that is based on contributors to the system
  itself too.

   This passes responsibilities on. I.e. there is the question how well you
   could trust that organization.(or insofar it doesnt require trust)

   However, it could deal with social problems that are not solved by figuring
   out some business model.

For rideshares, different approaches of rideshares will compete, so it will
tend to go to 1 and 2 as transporters and consumers seek cheapness. Of course
what that will be depends on what other opertunities transporters have.

The Publication DAO, might have fans, and something like Wikipedia DAO might
have quite a bit of network effects. Since i dont have that much respect for the
idea of advertising, and the method to trustlessly choose who gets the spots,
i am of the opinion that it should do 2/3.

With RANDAO, i reckon (1) is the best way to go by far. Other contracts depend
on it, and it doesnt involve many people directly.
