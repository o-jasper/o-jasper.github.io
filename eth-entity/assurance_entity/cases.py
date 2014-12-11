import pyethereum
from random import randrange
t = pyethereum.tester

def i(str):
    s,f = 0, 1
    for j in range(len(str)):
        s += f*ord(str[len(str)-j-1])
        f *= 256
    for j in range(32 - len(str)): # Right pad instead of left.
        s *= 256;
    return s

def stri(j):
    s=""
    while j > 0:
        s += chr(j%256)
        j /=256
    return "".join(reversed(s))

s = t.state()
c = s.contract('assurance_ent.se', t.k0)
end_time = 0

CREATOR = 0
RECIPIENT = 1
ENDTIME = 2
MIN = 3
MAX = 4    
CUR_I = 5
FROM_I = 6

def reset():
    global c,s, end_time
    s = t.state()
    c = s.contract('assurance_ent.se', t.k0)
    end_time = s.block.timestamp  + 200

def check(a, n):  # TODO this would be better with 'stateless call'
    #print(a, s.block.get_balance(c), s.send(t.k1, c, 0, [i("balance")]))
    assert s.block.get_balance(c) == a
    assert s.send(t.k1, c, 0, [i("balance")]) == [a]
    assert s.send(t.k1, c, 0, [i("cnt")]) == [n]
    assert int(s.block.get_storage_data(c, CUR_I)) == FROM_I + n*2

    # Check it isnt overwriting permanents
    assert hex(s.block.get_storage_data(c, CREATOR))[2:-1] == t.a0
    assert hex(s.block.get_storage_data(c, RECIPIENT))[2:-1] == t.a0    
    assert int(s.block.get_storage_data(c, ENDTIME)) == end_time
    assert int(s.block.get_storage_data(c, MIN)) == 20000
    assert int(s.block.get_storage_data(c, MAX)) == 30000

    assert s.send(t.k0, c, 0, randargs(5)) == [i("already init")]

def randargs(n):
    return map(lambda(x):randrange(2**64), range(n))
    
def scenario_init():
    assert hex(s.block.get_storage_data(c, CREATOR))[2:-1] == t.a0
    reset()
    assert s.send(t.k0, c, 0, randargs(randrange(5))) == [i("not ready")]
    assert s.send(t.k1, c, 0, randargs(5)) == [i("not creator")]
    assert s.send(t.k0, c, 0, [t.a0, t.a0, end_time, 20000, 30000]) == [i("initiated")]
    check(0,0)

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
    scenario_init()
    a, n = dont_reach()
    while s.block.timestamp < end_time:
        s.mine()
    check(a, n)
    assert s.send(t.k6, c, 0, []) == [i("underfunded")]
    assert s.block.get_balance(c) == 0
    assert hex(s.block.get_storage_data(c, CREATOR))[2:-1] == t.a0
    for j in range(1,10):
        assert s.block.get_storage_data(c, j) == (0 if j!=CUR_I else FROM_I)

def scenario_funded():
    scenario_init()
    a,n = dont_reach()
    assert s.send(t.k6, c, 10000, []) == [i("paid")]  # One more so the threshhold is reached.
    check(23000, n + 1)
    s.mine(20)  # (Note expect refund on what k2 sends in value now.
    pre_bal = s.block.get_balance(t.a0)
    assert s.send(t.k2, c, randrange(0, 100), []) == [i("funded")]
    assert s.block.get_balance(t.a0) - pre_bal >= 23000
    check(0, n + 1)

scenario_underfunded()
scenario_funded()
