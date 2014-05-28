In the latest DAO design jam, we discussed voting systems, and how to make
decisions. It was good, but a bit less focussed than i'd like.

Every decision is sort-of a vote, it is just from a single person. The question
is how much voting power is needed for a decision. I reckon it is affected by
the following:

#### (1) **Utility of outcome**
I think the utility is sub-linear relative to units of money or other assets.
If utility is some function `U(A)` where `A` is an amount.

A simple model is a set cost and binary outcome with probability `p` is
a result with `B` for bad, `G` for good and initially `I`. Then you need
`p < (U(G) &minus; U(I)) / (U(G) &minus; U(B))`. Where `U` is the sublinear function with
`U'(x)>0`.

If you look at that model with `U(x)=x`, you see a problem that the absolute
values dont matter, which does not make sense. Sublinearity doesnt explain it,
because the function will be approximately linear given small values relative to
the total.

The reason this happens is that investing more into something, you get
diminishing returns from the extra investments. By investing more 
`B` decreases but `G` doesnt increase much more.

#### (2) Chance of stolen private keys and 'betrayal'
Higher levels of stake increases the chance that stolen private keys, for
instance.

'Betrayal' could be simple theft, or much higher level.

#### (3) Fairness of ability to use risk&minus;taking ability
People that are first to try take some risk with the DO/DAO assets arent the
ones that should.

#### (4) Voting frequently shouldnt increase your effective voting power
However, not voting much should only accumulate to some point. This is not only
from the point of view it doesnt give you more power, it is also that if someone
makes multiple decisions, the failure/success of them cannot assumed to be
independent, so the distribution is wider than independent decisions.

#### (5) Getting decisions through should not be overly hard
Of course, this is largely a trade-off between security, efficiency of people
who have to learn about the topics, and democracy, decentralization of 
decision taking.

## **An** approach

Perhaps take this approach with a grain of salt. It favors utility
as seen by voters over representation.

The idea is to take the equation, and have classes of decision with a cost
`C`, potential benefit <code>&beta;C</code>, and then each voter has voting
power `n` corresponding to a 'probability to be wrong':
<code>p<sup>n</sup></code> then the equation is used to decide:(same as above)

<pre>
    p<sup>&sum;n</sup> &lt; (U(I+&beta;C) &minus; U(I)) / (U(I+&beta;C) &minus; U(I&minus;C))
</pre>

That does not completely describe it though, as it doesnt take care of all
the issues.

#### (1) Take account of the sublinearity
This means we need to figure a `U` that represents it well. This is hard, but
then, the value of the things decided about itself is also hard to estimate.
   
`U` can be dependent on the current state. For instance for a 'conservative'
`U`, any possibly lowering value is taken as very negative, making it very
risk averse. However, in my opinion this does not make sense; there are
*reasons* for being conservative in cases, whereas building it into `U` 
means you just presume it.

Three reasons being those diminishing returns, and ability
to assess choices, and managing culture/ability in expansion.

#### (2) Voting that pay just yourself isnt possible, &ge;2 deciders
Of course big changes may necessarily affect the voters themselves
directly, so those are allowed, however for smaller ones, you should have to
convince someone else.

Secondly perhaps there should be some review of decisions. Formal or informal,
but it must be possible to find review from the decision itself.

For stealing of keys, well you could simply depress the voting power a bit,
and try keep things secure as much as possible.

#### (3) Keep risk-taking ability in reserve
When any other combination can produce a <code>&sum;n</code>, that cannot be
done due to the staked amount, the vote either requires more voters so that 
is no longer true, *or* the vote is prolonged, for long enough for other
approaches to compete, and then the winner is the one that passes through the
main rule with the highest <code>&sum;n</code>. (possibly there is an automatic
notification when this happens)

This is triggered if below becomes true if the decision were accepted:
<pre>
&exist; n &le; remaining: p<sup>n</sup> &lt; (U(I + &beta;r&sdot;n) &minus; U(I))/(U(I + &beta;r&sdot;n) 
&minus; U(I &minus; r&sdot;n))
</pre>
Of course 'do nothing' should be an option in such a election of choices.

#### (4) Voting power is used, and grows back with time after use 
Simplest is to have it just increase linearly with time up to a limit. More
complex approaches, like increasing logarithmically, or reaching toward a limit
are options aswel.

#### (5) Giving voting power to others
However, i reckon there should be a limit. The possibility of strong voters
getting their private keys stolen must be dealt with. One obvious way to deal
with it is to simply instruct/invest in increasing the security of those private
keys. 

However, i feel the need to compensate nevertheless. `p` being the probability
that the voter is wrong *or* that somethings else happened. I.e.
<pre>
    p = P(Wrong &cup; Other) = P(Wrong) + P(Other) &minus; P(Wrong &cap; Other)<br>
    p = p<sub>w</sub> + p<sub>o</sub> &minus; p<sub>w</sub>&sdot;p<sub>o</sub>
</pre>
Where we assumed the two are independent. You can only pass along the bit of
your vote that is given by your mind, not your loyalty or private key.

Instead of using <code>p<sup>n</sup></code>, we keep track of 
<code>p<sub>w</sub><sup>n</sup></code> that way instead;
<pre>
    p<sup>n</sup> &rarr; p<sub>w</sub><sup>n</sup> + p<sub>o</sub> &minus; p<sub>w</sub><sup>n</sup>&sdot;p<sub>o</sub>
</pre>
And multiply these numbers from different people together.

### Many parameters
The above approach needs to figure out quite a few parameters and functions;
the utility, `U(A)`. For the fairness mechanisms `&beta;`, and `r`.
The classes of decisions are also open, and may affect `p=p(C)` too.

`p` and the total amount of voting power given `n` is given too. Assuming `U`
is at a point approximately linear and `p=0.5` and someone has vothing strength
`n=1`, if he had an action that paid out &times;2 the input, he *alone* vote
to do that action.(except the <code>&ge;2</code> rule)
So `p` cant quite be the probability a person is wrong in this approach, unless
you give people too much power, or think they are ridiculously unlikely to be
correct about anything.

## Caveits of this discussion
Suggestions are welcome, also wholly different approaches. I tried not being
ad-hoc, but that isnt a prerequisite, but it should try to be simple initially.

The voting mechanism in the competition case is completely open. The 'simple'
approach may cause spoiler effects, but i tend to think it is adequate for
the forseeable future.

A single parameter of voting power (two if you count <code>p<sub>o</sub></code>)
probably doesn't capture enough of the situation? There is little respect for
who knows what. A DO/DAO might have different stakeholders and knowledgables on
different topics, so it is possible to give people different voting power about
different things.

The discussion of this approach discussion also doesnt handle:

* Voting having effect on voting powers.
* Reviews of decisions.
* The role of communication. I suppose there could be a 'second voting power'
  about bringing up 'mandatory' discussions/responses.
* Decisions that have continuous effect after, rather than just going one or
  another way.

It would be nice if there was a way to make votes anonymous.
(also against timing analysis) It would make robust against buying votes and
threats.
