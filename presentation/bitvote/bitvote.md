
## Bitvote

<img src="pics/bitvote_logo.png">

## What the internet used to be

* Wide open to new companies

* Wide open to new blogs etcetera

* Optimistic

## What it has become and is in danger of becoming

* Television 2.0

* Panopticon

* Seeing... and manipulating!

## xkcd on facebook

<img src="pics/research_ethics.png">

I mean, it&#39;s not like we could just demand to see the code that&#39;s governing our lives. What right do we have to poke around in Facebook&#39;s private affairs like that

<small style="color:#888">(https://xkcd.com/1390/)</small>

## What and why

<img src="pics/why_how_what.svg">

<small style="color:#888">(inspired from http://www.ted.com/talks/simon_sinek_how_great_leaders_inspire_action)</small>

## What we do now/before

* essentially a vote by loudness. Largely it was 'spamming'
  ('twitter storm' over SOPA)
  
* inefficient 

* insecure against manipulation (astroturf)

* can the 'will of the people' be presented by something that is less 'loudness'?

<!--<small style="color:#BBB">Still thank the EFF and co for what good they do get quietly!</small> (distracting)-->

## An Idea

* Everyone gets vote-time, i.e. one second per second &rArr; need to:
  + how vote&sdot;time do voters and votes have
  + have one person - one ID

* If you care about a topic particularly, spend more vote-hours on it

* Topics cover any subject matter. Usually represented with a link.
  (random example)
  + [http://https://www.march-against-monsanto.com](http://https://www.march-against-monsanto.com)

## What it looks like

<a href="http://bitvote.github.io/"><img src="pics/screen.png"></a>

## Button that is in the flow of internet use

<button width=100%><table style="text-align:center"><tr><td><br><img src="pics/bitvote_logo_small.png"></td></tr><tr><td>+ 10 hours</td></tr></table></button>

<button><table><tr><td style="vertical-align:middle"><br><img style="vertical-align:middle;image-orientation:90deg;width:50%" src="pics/bitvote_logo_small.png"></td><td style="vertical-align:middle">+ 10 hours</td></tr></table></button>

## Need for **de**centralization

Otherwise:

* Single place to sue/threaten.

* Requires trust towards the operators.

* Just not cool.

## More technical bit

## Ethereum

<img src="pics/browser_contract.svg">

interfaces from arbitrary pages are possible any page can
access the contract state and send transactions

## Ethereum contracts recap

<img src="pics/contract_recap.svg">

## The Bitvote contract diagram

<img src="pics/approach1.svg">

## Open problem: Scalibility

+ More people implies more voting weight

+ cant say ‘tough luck’ when contract execution too expensive
  
Ethereum working on it, some ideas that help.

## Open problem: One per ID

Each person should only be able to get one second per second.

Not solid, but ideas:

* Do computer-hard things.
  
  + Synchronizing to make faking harder.
    
* Reputation network -like approaches

  + 'Detectives' point out doubles and 'punishing' nodes that vouched for it
    
Note that this is something other things might also want; 'UBI coin'('socialcoin')

## To summarize

* Bitvote is a project to give people a voice.

* Interface is internet-browsing-like, where the browser can read Ethereum state

* Challenges:
  + Large numbers of users &rArr; scalability
  + One person per ID

## Thanks to

* Aaron Bale who came with the idea, and has good ideas on the non-technical side.

  Also for helping me 

* Ethereum!

## Questions/Responses from the audience
<img src="pics/bitvote_logo.png">

## Appendix: notes

* The browser will likely not be the only way;
  
  anyone is free to develop ways to get data from and send transactions too
  Ethereum contracts.

* We have a wiki on [bitvote.github.io/wiki](https://bitvote.github.io/wiki).

## Appendix: Scaling

* It is listed ontop here
  [github.com/ethereum/wiki/wiki/Problems](https://github.com/ethereum/wiki/wiki/Problems),
  but it is more defining the problem that solving right now.
  (though that is a good first step!)

* Aggegrated signatures.
  ([reddit.com/r/crypto/comments/291hzz/aggregate_signatures/](http://www.reddit.com/r/crypto/comments/291hzz/aggregate_signatures/))

  Basically you have a secret and a public part in public key cryptography.
  
  Signatures are data resulting from a program and the private key that
  indicates that a person signed it.
  
  You can encrypt towards another public key. So the other guy can use his
  private key to open it, he can then also figure the sender public key.
  
  Simplest aggegrate signing would to have a 'public secret' and
  repeatedly encrypting the same message. 
  (not 100% sure that doesnt increase the size, believe so)

* Hanging blocks. It increases space a lot, but it has achillies heel in data
  availability. The current approach solves it with votes, so aggegrate
  signatures matter to it!
  
  [o-jasper.github.io/blog/2014/06/03/hanging_blocks.html](http://o-jasper.github.io/blog/2014/06/03/hanging_blocks.html)

* Three scalability on blog.ethereum posts
  [1](https://blog.ethereum.org/2014/09/17/scalability-part-1-building-top/),
  [2](https://blog.ethereum.org/2014/10/21/scalability-part-2-hypercubes/), 
  [3](https://blog.ethereum.org/2014/11/13/scalability-part-3-metacoin-history-multichain/).

## More

* Deck.js presentatie: [imakewebthings.com/deck.js/](http://imakewebthings.com/deck.js/)
