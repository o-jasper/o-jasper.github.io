import pyethereum, random
t = pyethereum.tester

def i(str):
    s,f = 0, 1
    for i in range(len(str)):
        s += f*ord(str[len(str)-i-1])
        f *= 256
    for i in range(32 - len(str)): # Right pad instead of left.
        s *= 256;
    return s

def stri(i):
    s=""
    while i > 0:
        s += chr(i%256)
        i /=256
    return "".join(reversed(s))

s = t.state()
c = s.contract('assurance_ent.se', t.k0)

def reset():
    global c,s
    s = t.state()
    c = s.contract('assurance_ent.se', t.k0)

def check(a, n):  # TODO this would be better with 'stateless call'
    assert s.send(t.k1, c, 0, [i("balance")]) == [a]
    assert s.send(t.k1, c, 0, [i("cnt")]) == [n]
    assert int(s.block.get_storage_data(c, 0x80)) == 0xC0 + 0x40*n

    # Check it isnt overwriting permanents
    assert hex(s.block.get_storage_data(c, 0x00))[2:-1] == t.a0
    assert hex(s.block.get_storage_data(c, 0x20))[2:-1] == t.a0    
    assert int(s.block.get_storage_data(c, 0x40)) == 10
    assert int(s.block.get_storage_data(c, 0x60)) == 20000
    assert int(s.block.get_storage_data(c, 0xA0)) == 30000
    

def dont_reach():
    paid = [i("paid")]
    check(0,0)
    assert s.send(t.k1, c, 1000, []) == paid
    check(1000, 1)
    assert s.send(t.k2, c, 1000, []) == paid
    check(2000, 2)
    assert s.send(t.k3, c, 1000, []) == paid
    check(3000, 3)
    assert s.send(t.k4, c, 10000, []) == paid  # TODO y you no succeed?
    check(13000, 4)
    assert s.send(t.k6, c, 60000, []) == [i("overpaid")]
    check(13000, 4)
    return 13000, 4

def scenario_underfunded():
    reset()
    a, n = dont_reach()
    s.mine(20)
    check(a, n)
    assert s.send(t.k6, c, 0, []) == [i("underfunded")]
    check(0, n)

def scenario_funded():
    reset()
    a,n = dont_reach()
    assert s.send(t.k6, c, 10000, []) == [i("paid")]  # One more so the limit is reached.
    check(23000, n + 1)
    s.mine(20)  # (Note expect refund on what k2 sends in value now.
    assert s.send(t.k2, c, random.randrange(0, 100), []) == [i("funded")]
    check(0, n + 1)

scenario_underfunded()
scenario_funded()
