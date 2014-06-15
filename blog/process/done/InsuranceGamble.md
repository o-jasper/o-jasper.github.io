# Insurance is betting

Consider a bet where failure implies you get `F`(`<`) and success `S`(`>0`),
you think the probability of success is `p`.. You think the average is:

<table style="font-weight:bold"><tr> <td>Failure</td> <td>Success</td> <td>Average</td> </tr>
<tr> <td>F</td> <td>S</td> <td>(1-p)F + pS</td><td>= p(S-F) + F</td></table>

Now there is someone willing to bet, he believes that the probability is
infact `q`. He offers compensation if it fails `C`, but he wants `&beta;C`
if it success

<table style="font-weight:bold"><tr> <td></td> <td>Failure</td> <td>Success</td> <td>Average</td> </tr>
<tr><td>You</td> <td>F+C</td> <td>S-&beta;C</td>
<td>(1-p)(F+C) + p(S-&beta;C)</td><td> =  p(S-F-C(1+&beta;)) + F + C</td> </tr>
<tr><td>Gambler</td> <td>-C</td> <td>&beta;C</td> 
<td>-(1-q)C + q&beta;C</td><td>= qC(1+&beta;) - C</td></tr>
</table>

Now You will accept if you will do better than earlier;

        p(S-F-C(1+&beta;)) + F + C &ge; p(S-F) + F
     
        -pC(1+&beta;) + C &ge; 0
     
        &beta; &le; 1/p -1

So `S` and `F` dont matter! In general can add whatever you want and it
doesnt matter. It is just a bet? So why do just bet for stuff like insurance?

Three reasons come to mind:

1. Our utility(wellbeing) is not linear with the amount of money we own.
  `U(F)` and `U(S)` are much further apart than `F` and `S`. 
  But `U(F+C)` and `U(S-&beta;C)`.. Infact we can approximate;
    
       U(F+C) - U(S-&beta;C) &asymp; U'(F+C)&sdot;(F + C - S + &beta;C)
    
  This aswel makes this calculation still work as the approximation is linear
  and the factor doesnt matter for the analysis. So the bet is in a sense a 
  side issue.

2. The mechanisms in which someone else bets that way indicates someone else has
  trust in -for instance- a vendor.

3. You are particularly aware of the risks and deals and their probability.

Of course, in the current world, insurers are often large institutions and their
many bets even out.

It can also be investment, where `C` is given beforehand.
This implies that it can be used as stake. After all, if a contract(like RANDAO)
requires ethers as stake, and a gambler trusts you would not lose that stake,
he can make a deal. If you fail, his belief in you will decrease; that would be
the thing that is at stake for you.

## The gambler side

The gambler, assume he wants some profit; `E`

       qC(1+&beta;) - C &ge; E;

       &beta; &ge; (E/C +1)/q -1

But then we notice that the profit motive shows itself as an apparent probability;
`q' = q/(E/C + 1)` as the gambler can change the two accordingly, there is
not point to the freedom; we choose `E=0` and note that probability is only
apparent.

A deal is possible if `1/p -1 &ge; &beta; &ge; (E/C +1)/q -1`.

## Many gamblers
From many gamblers, the best deal is from one with the highest
(Apparent)probability, he will be able to demand the smallest payment. Perhaps,
however, he doesnt have enough money, or doesnt want to risk at those probabilities
that much money. Here this would be again because of nonlinearity of utility, but
also because the probability of failure may be dependent on the amount.

If we assume we have the comprehensive list of gamblers, after a gambler is
depleted, you can go to the next one with a lower `q`.

We presumably can find these gamblers within a system in Ethereum. Mind that
finding them being possibly client-side massively increases the ability to
search without using gas. You put the key things that actually need to be
done by contracts in the transaction.

The user will often 'bet' by estimating what he wants to pay for what he gets.
For instance if this backs up the quality of a product the effective price
increase of the product is increased. This makes the choice easier, the gamblers
will simply ask their minimum, and gamblers will have to deal with it with their
`q`. Really there is a slight worry here; gamblers might want a piecemeal approach
and seek workarounds. Currently expect this problem to be limited at best.

## Stabilizing gambler income
The gambler expects on average factor on the input ethers per unit time. However
depending on the number of bets and their dependence, actual results can vary.
He could insure himself against it, or predict some growth use a Contract for
a difference where people may bet it is more.

Of course, the insurance and contract for a difference may largely be the same
thing :)

## In relation to reputation networks

This can two relations to reputation networks;

1. The reputation network is used to estimate the probabilities. Here the above
   idea is essentially used to insure some deals.

2. Working backward from the probabilities to reputation. Oppositely,
   the insurance builds the reputation system. This one is likely much harder.

As this post is long enough, i will leave it to a future post to elaborate.
