from sim import Key, Simulator, compile_serpent

max_gas_cost = 1000
INITIAL = 10**18
founders = {}

def add_id(name):
    key = Key(name)
    founders[key.address] = INITIAL
    return key

ALICE = add_id('Alice')
BOB   = add_id('Bob')
CICIL = add_id('Cicil')

# People involved.
class TestAssurance:
    def __init__(self, owner=ALICE):
        self.owner = owner
        self.sim = Simulator(founders)
        # The eth_ent.
        code = compile_serpent('assurance_ent.se')
        self.eth_ent = self.sim.load_contract(owner, code) # Alice is recipient.

        assert self.storage(0) == int(owner.address, 16)
        assert self.storage(1) == int(owner.address, 16)
        assert self.storage(2) == 10
        assert self.storage(3) == 20000
        assert self.storage(4) == 5

    def tx(self, fr, v=0, d=[]):
        return self.sim.tx(fr, self.eth_ent, v, d)

    def storage(self, index):
        return self.sim.get_storage_data(self.eth_ent, index)

    def status(self):
        return "open"

    def expect_funded(self):
        print("NOTE: think it funded.")

    def expect_refunded(self):
        for v in founders:  # Check if money back modulo gas.
            assert INITIAL - founders[v] < max_gas_cost
        print("NOTE: think it refunded.")
        
    def contribute(self, who, v):  # Contribute.
        i = self.storage(4)
        assert self.tx(who, v) == []
        if self.status() == "open":
            assert self.storage(4) == i + 2
            assert self.storage(i) == int(who.address, 16)
            assert self.storage(i + 1) == v
        elif self.status() == "end_funded":
            self.expect_funded()
        else:
            self.expect_refunded()
        # TODO check increase in balance

    def refund(self):
        assert self.tx(self.owner, 0, ["refund"]) == []
        if self.status() == "open" or self.status() == "refunded":
            self.expect_refunded()
        else:
            self.expect_funded()

    
ta = TestAssurance()

ta.contribute(BOB, 1000)
ta.contribute(CICIL, 1000)

ta.refund()

print(ALICE.address)

print('done')
