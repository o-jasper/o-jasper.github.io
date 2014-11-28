# Wallet contract

Basically it is a contract to help you do stuff. Mainly it limits how much you
can spend, if you spend more it increases the security level.

It can also it can bounce messages via a second address for the different
security levels.

1. Plain level, stuff can be spent with the lowest-level private key.

2. Second level, a second key address accepts. For instance this could be
   two-factor authentication, like sending a SMS message/phone call
   repeating details, or in a letter.

3. Third, highest level, `n` out of `m` other keys need to accept.

Accepting is done by sending a message with the hash of the command *before*
the command. Basically

* Figure out what you want.

* Ask required acceptors, wait until the hashes are sent to your contract.

* Send your command.

## Determining the security level

There are two mechanisms, first it uses proxy contracts that represent the
security levels directly. Other contract writers have to allow users to specify
higher security levels, or the user specifies a security level for an
entire external contract.

Secondly the amount of ethers can be restricted to some rate. (TODO)


TODO: the whole thing.
