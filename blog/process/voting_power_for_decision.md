# TODO use

    .lin { display: none; }
    .den, .nom { display: block;  width:100%; text-align:center }
    .nom { text-decoration: underline; } 

<span class="nom"><span class="lin">(</span><i>a</i> &minus;
<i>b</i><span class="lin">)</span></span><span
class="lin">/</span>
<span class="den"><i>x</i></span>

Thanks to http://www.cs.tut.fi/~jkorpela/math/

# Voting power needed for decisions

In the latest DAO design jam, we discussed voting systems,
**TODO** I am sure Casey will write a recap?(or someone anyway) In this
post, quite a lot is assumed:

* Who votes and their voting power will be assumed to be pre-set.

* The decision does not change voting powers.
  
* There is only one such group. (In principle, a DAO might give different voting
   power to different people, depending who is involved)

* The values can somehow be measured.

This helps me introduce the first in list of reasons why bigger decisions
require more voting power:

1. The **sub-linearity of utility** relative to units of money. If utility is some
   function `U(A)` where `A` is an amount. If you're in a desert zero versus one
   bottle for water makes a big difference. 1000 versus 1001, not so much.
   
   With `p` the chance of a decision coming out mad, with monetary result `B`,
   good `G` and initial `I` you need `p < (U(G) - U(I)) / (U(G) - U(B))`. `U` is
   the sublinear function; `U''(x)<0`.

2. Higher levels of stake increases the chance that stolen private keys, or
   'treason' are the cause of the decisions, or at least, or are at that point
   attempting to affect the DO/DAO.

3. Fairness of ability to use risk-taking ability. People that are first to take
   some risk with the DO/DAO arent necessarily the best ones.
   
4. In the case of multiple smaller decisions, the failure/success of them cannot
   assumed to be independent. If decided by one person, it should be considered
   a single probability of failure on the whole.

### An approach

1. Take account of the sublinearity, means we need to figure a `U` that
   represents it well. This is hard, but then, the value of the things decided
   about itself is hard to estimate.
   
   `U` can be dependent on the current state. For instance for a 'conservative'
   `U`, any possibly lowering value is taken as very negative, making it very
   risk averse.

2. Take dependence on size of the decision into account with the probability.

3. Keep in reserve ability to risk, calculating the `p` other groups can reach,
   and then ensuring they can actually risk some amount of value.
   
   Increasing the number of voters does not help here, as long as enough 
   abstain/vote against, which has to be reserved for. Nevertheless, possibly
   a decision is desirable nevertheless. 
   
   There is the possibility of instead of keeping the reserve, you stretch the
   duration of the vote, and allow multiple ideas to compete, and after a longer
   time than usual, the vote goes through, not respecting reserve.

4. Actually do account for them that way.

Obviously this is easier said than done!

#### (2) dependence
The probability per-person has to be some `p = p(C/n)`, increasing, as it is the
chance of mistake, divided by `n` which is the amount-per-vote.

#### (3) The reserve bit

Each vote gets `r` reserve-to-vote, then it should be able to get a vote through
assuming `&beta;` potential gain, each vote represents a probability `p` of being
wrong. Including if `n` pool their voting power;

<pre>
&forall; n &le; remaining: p<sup>n</sup> &lt; (U(I + &beta;r&sdot;n) - U(I))/(U(I + &beta;rn) 
- U(I-rn))
</pre>

Note that you could see `n` as continuous, i.e. people with more `1.5` voting power
add `1.5` to `n`, and `1.5&sdot;r` reserve.

With `n` increasing both sides of the equation go down. It is not a-priory clear
if any `n` in particular(the high or low one) set the limit. Note that the
implications of (2); `p = p(r)` is nicely constant for this consideration.

**TODO** WIP

## Caveits of this discussion
The range of this 
