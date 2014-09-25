import pyethereum, random
t = pyethereum.tester

def i(str):
    s,f = 0, 1
    for i in range(len(str)):
        s += f*ord(str[len(str)-i-1])
        f *= 256
    return s

def stri(i):
    s=""
    while i > 0:
        s += chr(i%256)
        i /=256
    return "".join(reversed(s))

s = t.state()
c = s.contract('grudge-escrow.se', t.k0)

def reset(a):
    global c,s
    s = t.state()
    c = s.contract('grudge-escrow.se', t.k0, a)

def check(a, ready=False, customer=False):
    assert s.block.get_balance(c) == a
    if not ready:
        assert s.block.get_storage_data(c, 0x20) == 0
        assert s.block.get_storage_data(c, 0x40) == 0
    if customer:
        assert hex(s.block.get_storage_data(c, 0x60))[2:-1] == customer
    else:
        assert s.block.get_storage_data(c, 0x60) == 0
    # Check it isnt overwriting permanents
    assert hex(s.block.get_storage_data(c, 0x00))[2:-1] == t.a0

    
def scenario_insufficient(r=True, a=1000):
    if r: reset(1000)
    check(1000 if r else 0)
    assert s.send(t.k0, c, 20 if r else 1020, [4000, 1000]) == [i("price changed")]
    assert s.block.get_storage_data(c, 0x20) == 4000
    assert s.block.get_storage_data(c, 0x40) == 1000
    assert s.block.get_storage_data(c, 0x60) == 0
    check(1020, True)

    assert s.send(t.k1, c, 2500, []) == [i("insufficient")]
    check(1020, True)

def scenario_sufficient(r=True):
    scenario_insufficient(r)
    check(1020, True)

    assert s.send(t.k2, c, 3000, []) == [i("bought")]
    check(4020, True, t.a2)

    assert s.send(t.k4, c, 3, []) == [i("stranger")]  # Guy meddling.
    check(4023, True, t.a2)

    assert s.send(t.k2, c, random.randrange(0,100), []) == [i("released")]
    check(0)

scenario_sufficient()
assert s.send(t.k8, c, 0, [7000, 500])  # Meddling.
check(0)

scenario_sufficient(False) # Tests reviving.
