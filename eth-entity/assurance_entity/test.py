import binascii

import pyethereum
from pyethereum import tester

#tester.serpent = 'No'

import logging
from pprint import pprint

max_gas_cost = 1000

def hex_pad(x):
    return "{0:#0{1}x}".format(x, 66)

alice = tester.k0
bob   = tester.k1
cicil = tester.k2

#print(map(binascii.hexlify, [tester.k0, pyethereum.utils.privtoaddr(tester.k0), tester.a0]))
#print('--', hex(pyethereum.utils.coerce_to_int(tester.a0)))

def addr(of):
    return hex(pyethereum.utils.coerce_to_int(pyethereum.utils.privtoaddr(of)))[:-1]

print(map(addr, tester.keys))

# People involved.
class TestAssurance:
    def __init__(self, owner=alice):
        logging.disable(logging.INFO)  # disable DEBUG logging of pyethereum.
        self.evm = open('assurance_ent.lll.evm').read()

        self.s = tester.state()
        code = binascii.unhexlify(self.evm[:-1])  #bin(int(self.evm, 16))[2:]
        self.c = self.contract(code, owner)

        print(self.c)
        # Check if it initially set up right.
        if self.slot(0) != addr(owner):
            raise Exception('Wrong owner', addr(owner), 'vs', self.slot(0))
        assert self.slot(1) == addr(owner)
        if int(self.slot(2),16) != 10:
            raise Exception('Wrong', 10, 'vs', int(self.slot(2), 16))
        assert int(self.slot(3),16) == 20000
        assert int(self.slot(4),16) == 0xa0

# Dont want the other thing to compile for me right now.
    def contract(self, evm, sender=tester.k0, endowment=0):
        sendnonce = self.s.block.get_nonce(pyethereum.utils.privtoaddr(sender))
        tx = pyethereum.transactions.contract(sendnonce, 1, 100000, endowment, evm)
        tx.sign(sender)
        (s, a) = pyethereum.processblock.apply_transaction(self.s.block, tx)
        if not s:
            raise Exception("Contract creation failed")
        return a

    def send(self, fr, to, value, data):
        return self.s.send(fr, to, value, data)
        
    def storage(self, idx):
        idx = hex_pad(idx)
        return self.s.block.account_to_dict(self.c)['storage'].get(idx)
    def slot(self, i):
        return self.storage(i*32)

    def status(self):
        return "open"  # TODO

    def expect_funded(self):
        print("NOTE: think it funded.")

    def expect_refunded(self):
        for v in tester.accounts:  # Check if money back modulo gas.
            assert INITIAL - founders[v] < max_gas_cost #WRONG
        print("NOTE: think it refunded.")
#        
    def contribute(self, who, v):  # Contribute.
        i = int(self.slot(4), 16)
        o = self.send(who, self.c, 0, [v])
        storage = self.s.block.account_to_dict(self.c)['storage']
        for k in storage:
            print(k, storage[k])
        assert o == []
        if self.status() == "open":
            assert int(self.slot(4), 16) == i + 32
            print('--', i, self.storage(i), addr(who), self.storage(i + 0x20))
            assert self.storage(i) == addr(who)            
            assert int(self.storage(i + 0x20), 16) == v
        elif self.status() == "end_funded":
            self.expect_funded()
        else:
            self.expect_refunded()
#        # TODO check increase in balance
#
#    def refund(self):
#        assert self.tx(self.owner, 0, ["refund"]) == []
#        if self.status() == "open" or self.status() == "refunded":
#            self.expect_refunded()
#        else:
#            self.expect_funded()
#
#    
ta = TestAssurance()

ta.contribute(bob, 1000)
#ta.contribute(cicil, 1000)
#
#ta.refund()
#
#
print('done')
