---
layout: post
title:  "Voting power needed for decisions"
date:   2014-05-28 15:30
categories: voting, democracy, DAO, Ethereum
---
<p>In the latest DAO design jam, we discussed voting systems, and how to make
decisions. It was good, but a bit less focussed than i&rsquo;d like.</p>

<p>For every decision there is a vote, even if it is from a single
person. The question is how much voting power is needed for a decision.
I reckon it is affected by the following:</p>

<h4>(1) <strong>utility of outcome</strong></h4>

<p>I think the utility is sub-linear relative to units of money, and other assets.
If utility is some function <span class="math">U(A)</span> where <span class="math">A</span> is an amount.</p>

<p>More important is is that of diminishing returns. Even if you have a lot, you
might not want to spend much on an issue/investment, because it would simply not
improve the outcome.</p>

<p>A simple model is a set cost and binary outcome with probability <span class="math">p</span> is
a result with <span class="math">B</span> for bad, <span class="math">G</span> for good and initially <span class="math">I</span> you need
<span class="math">p &lt; (U(G) &minus; U(I)) / (U(G) &minus; U(B))</span>. Where <span class="math">U</span> is the sublinear function with
<span class="math">U'(x)&gt;0</span>.</p>

<p>If you look at that model with <span class="math">U(x)=x</span>, you see a problem that the absolute
values dont matter, which does not make sense. The diminishing results and
sublinearity cover.</p>

<h4>(2) Chance of stolen private keys and &lsquo;betrayal&rsquo;</h4>

<p>Higher levels of stake increases the chance that stolen private keys, for
instance.</p>

<p>&lsquo;Betrayal&rsquo; could be simple theft, or much higher level.</p>

<h4>(3) Fairness of ability to use risk&minus;taking ability</h4>

<p>People that are first to try take some risk with the DO/DAO assets arent the
ones that should.</p>

<h4>(4) Voting frequently shouldnt increase your effective voting power</h4>

<p>However, not voting much should only accumulate to some point.</p>

<p>Part of the reason is  that if someone makes multiple decisions, the
failure/success of them cannot assumed to be independent.</p>

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

<blockquote><b>
    p<sup>&sum;n</sup> &lt; (U(I+&beta;C) &minus; U(I)) / (U(I+&beta;C) &minus; U(I&minus;C))
</b></blockquote>


<p>That does not completely describe it though, as it doesnt take care of all
the issues.</p>

<h4>(1) Take account of the sublinearity</h4>

<p>This means we need to figure a <span class="math">U</span> that represents it well. This is hard, but
then, the value of the things decided about itself is also hard to estimate.</p>

<p><span class="math">U</span> can be dependent on the current state. For instance for a &lsquo;conservative&rsquo;
<span class="math">U</span>, any possibly lowering value is taken as very negative, making it very
risk averse. However, i think this does not make sense, there are <em>reasons</em>
for being conservative in cases, whereas building it into <span class="math">U</span> means you just
presume it.</p>

<p>Three reasons being those diminishing returns, and ability
to assess choices, and managing culture/ability in expansion.</p>

<h4>(2) Voting that pay just yourself isnt possible, &le;2 deciders</h4>

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

<p>This is triggered if below is true, were the decision accepted:</p>

<blockquote><b>
&exist; n &le; remaining: p<sup>n</sup> &lt; (U(I + &beta;r&sdot;n) &minus; U(I))/(U(I + &beta;r&sdot;n) 
&minus; U(I &minus; r&sdot;n))
</b></blockquote>


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

<blockquote><b>
    p = P(Wrong &cup; Other) = P(Wrong) + P(Other) &minus; P(Wrong &cap; Other)<br>
    p = p<sub>w</sub> + p<sub>o</sub> &minus; p<sub>w</sub>&sdot;p<sub>o</sub>
</b></blockquote>


<p>Where we assumed the two are independent. You can only pass along the bit of
your vote that is given by your mind, not your loyalty or private key.</p>

<p>Instead of using <span class="math">p<sup>n</sup></span>, we keep track of
<span class="math">p<sub>w</sub><sup>n</sup></span> that way instead;</p>

<blockquote><b>
    p<sup>n</sup> &rarr; p<sub>w</sub><sup>n</sup> + p<sub>o</sub> &minus; p<sub>w</sub><sup>n</sup>&sdot;p<sub>o</sub>
</b></blockquote>


<p>And multiply these numbers from different people together.</p>

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
correct about anything.</p>

<h2>Caveits of this discussion</h2>

<p>Suggestions are welcome, also wholly different approaches. I tried not being
ad-hoc, but that isnt a prerequisite, but it should try to be simple initially.</p>

<p>The voting mechanism in the competition case is completely open. The &lsquo;simple&rsquo;
approach may cause spoiler effects, but i tend to think it is adequate for
the forseeable future.</p>

<p>A single parameter of voting power (two if you count <span class="math">p<sub>o</sub></span>)
probably doesn&rsquo;t capture enough of the situation? There is little respect for
who knows what. A DO/DAO might have different stakeholders and knowledgables on
different topics, so it is possible to give people different voting power about
different things.</p>

<p>The discussion of this approach discussion also doesnt handle:</p>

<ul>
<li>Voting having effect on voting powers.</li>
<li>Reviews of decisions.</li>
<li>The role of communication. I suppose there could be a &lsquo;second voting power&rsquo;
about bringing up &lsquo;mandatory&rsquo; discussions/responses.</li>
<li>Decisions that have continuous effect after, rather than just going one or
another way.</li>
</ul>


<p>It would be nice if there was a way to make votes anonymous.
(also against timing analysis) It would make robust against buying votes and
threats.</p>
