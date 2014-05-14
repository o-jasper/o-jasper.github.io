---
layout: post
title:  "DHTs: more than just storage"
date:   2014-05-08 18:00
categories: DHT, Ethereum contracts, Ethereum
---

<p class="small_note">article has been edited for clarity</p>

[Distributed Hash Tables](https://en.wikipedia.org/wiki/Distributed_hash_table)
are distributed data storage systems like bittorrent.
We will assume that with some DHT you get a file by naming it by its checksum,
and files cannot be removed or changed if they already exist, and there is at
least one party interested in them.

This has far reaching implications: 

A contract can control its page via a Name Registry. As it is arbitrary code,
it can also be *limited* to the extent it can change the reference
in the name registry. Because of the assumption, the file cannot change either.
Just like domain names currently, the name registry is what people use to link to
things. So what is behind those links is the image that belongs to that contract.

Furthermore, javascript on the page can 1) look at the consensus data in
the blockchain 2) change what it shows it. POC 5 has already implemented
[javascript bindings](https://github.com/ethereum/cpp-ethereum/wiki/PoC-5-JS-Bindings).

This means that contracts choose can force themselves to have particular data on
their URL, from which follows that particular javascript doing its thing.

A big caveit is that users dont change their browsers to alter how the
javascript is shown.

## Uses

### Publishing DAOs

For a publishing DAO: force itself to a layout, with articles and
advertisements. Potential advertisers check that they like the layout,
and buy spots. As added bonus a way to opt out from the advertising could
be created where users do a little payment.

For writings, but maybe even audio and video(depending on how well that DHT
works!) on the web, this is one end of the 'Earning from Authorship' problem.

The other end is attracting and rewarding authors! This is still an open
problem. One solution is simply to do a co-op and gather people with some 
agreement over who does/controls/earns what.

But wiki-DAO or functional code may have a particular way where the content,
is estimated to be valuable or authored by particular people, and reward
based on that. Most ambitiously, even a system where how everything derives
from everything else and who authored it may be possible.

### Forcing Entities to admit things

A company may claim its product is good, and put that up to some kind of judge,
for instance, the customers. The layout can be forced to show the actual 
customers opinion.

In the context of Democracy-DAO, a government can literally be forced to make
certain statements on their own public websites.

Publishing DAO, again, could also force themselves to allow some other party
to add criticism right on the page itself. This might be useful for parties
seeking to be reputable sources.

It could integrate with reputation systems aswel.

## Things to deal with

The browser can change, and the page cannot be updated to match those changes.
It would have to use use stable features.
