---
layout: post
title:  "Tinfoilchat inspired ideas"
date:   2015-02-03 18:00
categories: Security_devices
---

## Just repeating one of the diagram
[Tinfoil-chat(pdf)](https://www.cs.helsinki.fi/u/oottela/tfc.pdf)
is cool. Here is one of the diagrams.

<img style="width:80%" src="/blog/parts/tinfoilchat_inspired/tinchat_img.png">

Did not put much work into thinking about these below, doing this largely
"for fun" and they're not necessarily totally original;

## Computers that just receive or just send.
But i thought, well now you need three computers.. What if you wanted a
single *device* that did something like this?

<img src="/blog/parts/tinfoilchat_inspired/tinfoilchat_inspired_screen_key.svg">

So the idea is that each computer still just receives or sends. The
receiving one is connected to a display and keyboard(input) where it draws
the message to be created.

The second computer just looks at all the keyboard inputs, and in parallel
figures out what the messages are.

In receiving, you might know `H(Pubkey)`, and the message repeats `Pubkey`,
so knowing someone indeed has `H(Pubkey)` is enough. However, in sending, 
the sender computer knows nothing, never receives anything other than 
what is typed in. You have to re-type the *entire* receiving `Pubkey` 
in order for it to be able to.

#### Attacks
Point of these schemes is that they mitigate the effect of being hacked.
So lets consider being the screen(receiving) computer being hacked,
for instance because one of the contacts was malicious, or on some
side-channel of the crypto.

Even if the screen computer does the attackers bidding, you cannot send
anything any other way than the arrows; you can only send to the display.
So you can *only programmatically* depend that on data in the screen
computer.(unless you know about it separately)

You could simply disable the device, or try feign subtil frustrating
malfunctions. More active is to try get the user to think they should type
something, that the send-computer will then send. For instance the private
key of the screen computer. With that, you can eavesdrop on all traffick
towards the device.

#### Note
In some ways it is really quite similar to TFC. I mean, you could easily
imagine this device being hooked up, 'network' being pidgin, like TFC
suggest. Main difference is the idea of parallel construction of the
message in the sender and screen computer, and that here, the screen
computer does know about what messages are being sent.

## Reading the state of an installation by hardware
Instead of the OS making checksums, a separate piece of hardware does. This
can also put messages to the network.

<img src="/blog/parts/tinfoilchat_inspired/tinfoilchat_inspired_statelook.svg">

Then, when other devices exist with a similar setup, they can see if the
software checksums are what they should be. So if the one computer is
compromised and the others 'watching' it are not, those others are warned,
and can warn the owner.
