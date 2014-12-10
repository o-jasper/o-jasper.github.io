#!/bin/bash

echo -n '//From '  # Show the commit it is from.
git log |head -n 1

echo 'maybe_creating = false;  // Whether maybe_creating already.

function build_create_crowdfund(priv, fun) {
    if(maybe_creating){ alert("Already creating?"); }
    maybe_creating = true;
    transact_code(priv, "0x'$(cat build/assurance_ent.se.evm)'", fun);
}'
