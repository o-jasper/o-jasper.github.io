---
layout: post
title:  "Voting power needed for DAO/DO decisions"
date:   2014-05-29 14:30
categories: voting, democracy, DAO, DO, Ethereum
---
<p>In the latest DAO design jam, we discussed voting systems, and how to make
decisions. It was good, but a bit less focussed than i&rsquo;d like.</p>

<p>Every decision is sort-of a vote, it is just from a single person. The question
is how much voting power is needed for a decision. I reckon it is affected by
the following:</p>

<h4>(1) <strong>Utility of outcome</strong></h4>

<p>I think the utility is sub-linear relative to units of money or other assets.
If utility is some function <span class="math">U(A)</span> where <span class="math">A</span> is an amount.</p>

<p>A simple model is a set cost and binary outcome with probability <span class="math">p</span> is
a result with <span class="math">B</span> for bad, <span class="math">G</span> for good and initially <span class="math">I</span>. A rational agent
decides to go for a decision if:
<span class="math">p &lt; (U(G) &minus; U(I)) / (U(G) &minus; U(B))</span>.
Where <span class="math">U</span> is the sublinear function with <span class="math">U'(x)&gt;0</span>.</p>

<p>If you look at that model with <span class="math">U(x)=x</span>, you see a problem that the absolute
values dont matter, which does not make sense. Sublinearity doesnt explain it,
because the function will be approximately linear given small values relative to
the total.</p>

<p>The reason this happens is that investing more into something, you get
diminishing returns from the extra investments. By investing more
<span class="math">B</span> decreases but <span class="math">G</span> doesnt increase much more.</p>

<h4>(2) Chance of stolen private keys and &lsquo;betrayal&rsquo;</h4>

<p>Higher levels of stake increases the chance that stolen private keys, for
instance.</p>

<p>&lsquo;Betrayal&rsquo; could be simple theft, or much higher level.</p>

<h4>(3) Fairness of ability to use risk&minus;taking ability</h4>

<p>People that are first to try take some risk with the DO/DAO assets arent the
ones that should.</p>

<h4>(4) Voting frequently shouldnt increase your effective voting power</h4>

<p>However, not voting much should only accumulate to some point. This is not only
from the point of view it doesnt give you more power, it is also that if someone
makes multiple decisions, the failure/success of them cannot assumed to be
independent, so the distribution of outcomes wider.</p>

<h4>(5) Getting decisions through should not be overly hard</h4>

<p>Of course, this is largely a trade-off between security, efficiency of people
who have to learn about the topics, and democracy, decentralization of
decision taking.</p>

<h2><strong>An</strong> approach</h2>

<p>Perhaps take this approach with a grain of salt. It favors utility
as seen by voters over representation.</p>

<p>The idea is to take the equation, and have classes of decision with a cost
<span class="math">C</span>, potential benefit <span class="math">&beta;C</span>, and then each voter has voting
power <span class="math">n</span> corresponding to a &lsquo;probability to be wrong&rsquo;:
<span class="math">p<sup>n</sup></span> then the equation is used to decide:(same as above)</p>

<blockquote class="math">
<table><tr><td>
p<sup>&sum;n</sup> &lt;
</td><td>
<span class="nom"><span class="lin">(</span>U(I + &beta;C) &minus; U(I)<span class="lin">)</span></span><span
class="lin">/</span>
<span class="den">U(I + &beta;C) &minus; U(I &minus; C)</span>
</td></tr></table>
</blockquote>


<p>That does not completely describe it though, as it doesnt take care of all
the issues.</p>

<h4>(1) Take account of the sublinearity</h4>

<p>This means we need to figure a <span class="math">U</span> that represents it well. This is hard, but
then, the value of the things decided about itself is also hard to estimate.</p>

<p><span class="math">U</span> can be dependent on the current state. For instance for a &lsquo;conservative&rsquo;
<span class="math">U</span>, any possibly lowering value is taken as very negative, making it very
risk averse. However, in my opinion this does not make sense; there are
<em>reasons</em> for being conservative in cases, whereas building it into <span class="math">U</span>
means you just presume it.</p>

<p>Three reasons being those diminishing returns, and ability
to assess choices, and managing culture/ability in expansion. Some do relate to
the state, for instance if more people are involved &lsquo;low on funds&rsquo; is more money.</p>

<h4>(2) Voting that pay just yourself isnt possible, &ge;2 voters</h4>

<p>Of course big changes may necessarily affect the voters themselves
directly, so those are allowed, however for smaller ones, you should have to
convince someone else.</p>

<p>Secondly perhaps there should be some review of decisions. Formal or informal,
but it must be possible to find review from the decision itself.</p>

<p>For stealing of keys, well you could simply depress the voting power a bit,
and try keep things secure as much as possible.</p>

<h4>(3) Keep risk-taking ability in reserve</h4>

<p>When any other combination can produce a <span class="math">&sum;n</span>, that cannot be
done due to the staked amount, the vote either requires more voters so that
is no longer true, <em>or</em> the vote is prolonged, for long enough for other
approaches to compete, and then the winner is the one that passes through the
main rule with the highest <span class="math">&sum;n</span>. (possibly there is an automatic
notification when this happens)</p>

<p>This is triggered if below becomes true if the decision were accepted:</p>

<blockquote class="math">
<table><tr><td>&exist; n &le; remaining: p<sup>n</sup> &lt;</td>
<td>
<span class="nom"><span class="lin">(</span>U(I + &beta;r&sdot;n) &minus; U(I)<span class="lin">)</span></span><span
class="lin">/</span>
<span class="den">U(I + &beta;r&sdot;n) &minus; U(I &minus; r&sdot;n)</span>
</td></tr></table>
</blockquote>


<p>Of course &lsquo;do nothing&rsquo; should be an option in such a election of choices.</p>

<h4>(4) Voting power is used, and grows back with time after use</h4>

<p>Simplest is to have it just increase linearly with time up to a limit. More
complex approaches, like increasing logarithmically, or reaching toward a limit
are options aswel.</p>

<h4>(5) Giving voting power to others</h4>

<p>However, i reckon there should be a limit. The possibility of strong voters
getting their private keys stolen must be dealt with. One obvious way to deal
with it is to simply instruct/invest in increasing the security of those private
keys.</p>

<p>However, i feel the need to compensate nevertheless. <span class="math">p</span> being the probability
that the voter is wrong <em>or</em> that somethings else happened. I.e.</p>

<blockquote class="math">
    p = P(Wrong &cup; Other) = P(Wrong) + P(Other) &minus; P(Wrong &cap; Other)<br><br>
    p = p<sub>w</sub> + p<sub>o</sub> &minus; p<sub>w</sub>&sdot;p<sub>o</sub>
</blockquote>


<p>Where it is assumed the two are independent. You can only pass along the bit
of your vote that is given by your mind, not your loyalty or private key.</p>

<p>Instead of using <span class="math">p<sup>n</sup></span>, we keep track of
<span class="math">p<sub>w</sub><sup>n</sup></span> that way instead;</p>

<blockquote class="math">
    p<sup>n</sup> &rarr; p<sub>w</sub><sup>n</sup> + p<sub>o</sub> &minus; p<sub>w</sub><sup>n</sup>&sdot;p<sub>o</sub>
</blockquote>


<p>And multiply these numbers from different people together. If
<span class="math">p<sub>o</sub></span> becomes limiting, security might be improved, maybe
some background checks to warrant an increase.</p>

<h3>Many parameters</h3>

<p>The above approach needs to figure out quite a few parameters and functions;
the utility, <span class="math">U(A)</span>. For the fairness mechanisms <span class="math">&beta;</span>, and <span class="math">r</span>.
The classes of decisions are also open, and may affect <span class="math">p=p(C)</span> too.</p>

<p><span class="math">p</span> and the total amount of voting power given <span class="math">n</span> is given too. Assuming <span class="math">U</span>
is at a point approximately linear and <span class="math">p=0.5</span> and someone has vothing strength
<span class="math">n=1</span>, if he had an action that paid out &times;2 the input, he <em>alone</em> vote
to do that action.(except the <span class="math">&ge;2</span> rule)
So <span class="math">p</span> cant quite be the probability a person is wrong in this approach, unless
you give people too much power, or think they are ridiculously unlikely to be
correct about anything. It really is just a cumulative voting power <span class="math">n</span>, and
each sort of decision needing some amount, and there is interpretation with
probabilities. (though it comes out a lot when you modify it for
<span class="math">p<sub>o</sub></span>.</p>

<h2>Caveits of this discussion</h2>

<p>Suggestions are welcome, also wholly different approaches. I tried not being
ad-hoc, but that isnt a prerequisite, imho an approach should either start from
principles or be simple.</p>

<p>The voting mechanism in the competition case is completely open. The &lsquo;simple&rsquo;
approach may cause spoiler effects, but i tend to think it is adequate for
the forseeable future.</p>

<p>A single parameter of voting power (two if you count <span class="math">p<sub>o</sub></span>)
probably doesn&rsquo;t capture enough of the situation? There is little respect for
who knows what. A DO/DAO might have different stakeholders and knowledgables on
different topics, so it is possible to give people different voting power about
different things.</p>

<p>More can be said on for instance:</p>

<ul>
<li>Decisions having effect on voting powers.</li>
<li>Reviews of decisions.</li>
<li>The role of communication. I suppose there could be a &lsquo;second voting power&rsquo;
about bringing up &lsquo;mandatory&rsquo; discussions/responses.</li>
<li>Decisions that have continuous effect after, rather than just going one or
another way.</li>
</ul>


<p>It would be nice if there was a way to make votes anonymous.
(also against timing analysis) It would make robust against buying votes and
threats.</p>
