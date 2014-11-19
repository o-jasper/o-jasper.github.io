# Transaction Swap
Trustlessly know that a message will be done, if you do your transaction,
even across disconnected blockchains.

Uses `crypto_commitment = sha3(secret)` to unlock a message, and
`sha3(message_data)` identifies the message.

**NOTE:** written with assumption of
[this push request!](https://github.com/ethereum/serpent/pull/21) It will *not*
work without.
