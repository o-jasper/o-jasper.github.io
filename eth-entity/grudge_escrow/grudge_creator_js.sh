#!/bin/bash

echo 'function createContract(key, fun) {
    transact_code(key, "'$(cat build/grudge-escrow.evm)'", fun);
}'
