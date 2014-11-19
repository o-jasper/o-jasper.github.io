import pyethereum, random
from pyethereum import rlp
t = pyethereum.tester
u = pyethereum.utils

def sha3(data):
    return i(u.sha3(rlp.encode(map(u.encode_int, data))))
      
from random import randrange

def i(str):
    s,f = 0, 1
    for i in range(len(str)):
        s += f*ord(str[len(str)-i-1])
        f *= 256
    for i in range(32 - len(str)): # Right pad instead of left.
        s *= 256;
    return s

def stri(i):
    s=[]
    while i > 0:
        s += chr(i%256)
        i /=256
    return "".join(reversed(s))

def ae(a, b, cond=None, what="N/A"):
    if (a !=b if cond == None else not cond):
        print(a,b)
        print('-', map(stri,a), "vs", map(stri,b), ":", what)
        print(map(hex,a), "vs", map(hex,b), ":", what)
        assert False

#COMMITSTRIP = 411376139330301510538742295639337626245683966408394965837152256
STRIP = 24519928653854221733733552434404946937899825954937634816

print(i("commit")/STRIP, i("puppeteer")/STRIP)

s = None
c1 = None
c2 = None
echo_contract = None

def gs(of, index):
    global s
    if isinstance(index, str):
        index = i(index)
    return s.block.get_storage_data(of, index)

def reset():
    global c1,c2, s, echo_contract
    s = t.state()
    c1 = s.contract('tx-swap.se', t.k0)
    c2 = s.contract('tx-swap.se', t.k4)  
    echo_contract = s.contract('echo-1.se', t.k0)  
  
def check(c, owner=None, secret=None, H_secret=None, H_msg=None):
    if owner:  # Check if owner right.
        assert hex(gs(c, "owner"))[2:-1] == u.privtoaddr(owner)
    
    if gs(c, "commit") == 0:
        assert gs(c, "commit_release") == 0
    else:
        assert gs(c, "commit_release") != 0
        if H_secret:
            assert gs(c, "commit") % STRIP == H_secret
        if H_msg:
            assert gs(c, "commit_release") % STRIP == H_msg
    
    check_meddling(c, owner, secret)
    if owner:
        check_wrong(c, owner)

# Effectively committed.(committed and not expired)
def is_committed(c):
    return gs(c, "commit") != 0 and gs(c, "commit_release")/STRIP < s.block.timestamp

# Checks some strategies for meddling at any point.
def check_meddling(c, owner=None, secret=None):
    key = None
    # TODO t.keys is privkeys... # TODO some of these come out same with owner..
    for k in t.keys: 
        if k != owner:  # Check non-owner not allowed to do stuff.
            key = k 
    # Try break in with random crap.
    assert s.send(key, c, 0, []) == [i("denied")]
    assert s.send(key, c, 0,[i("commit") + randrange(STRIP), randrange(STRIP) + STRIP*(s.block.timestamp + 3600*48)]) == [i("denied")]
    assert s.send(key, c, 0,[i("revoke")]) == [i("denied")]
    
    # Try break in with puppeteer command.
    ret_break_puppeteer = s.send(key, c, 0, [i("puppeteer") + randrange(STRIP)])

    # With the correct releasing value, try modified transactions.
    if secret == None:
        secret = randrange(STRIP)
    args = [i("puppeteer") + secret]  # Correct secret.
    for j in range(randrange(10)):  # Wrong message.
        args.append(randrange(2**256))
    ret_break_tx = s.send(key, c, 0, args)

    echoed = randrange(int(2**64))  # Value to echo.
    # As owner, should work _if_ commit time over.
    ret_owner = s.send(owner, c, 0, [i("puppeteer"), echo_contract, 0, echoed])
    # Still committed, should say no. (the timer allows revoking, not mandated)
    if is_committed(c):
        ae(ret_break_puppeteer, [i("commit hash wrong")])
        ae(ret_break_tx, [i("tx hash wrong" if secret else "commit hash wrong")])
        assert ret_owner == [i("not the releasing value")]
    else: # Not committed, expect the echo
        ae(ret_break_puppeteer, [i("not committed")])
        ae(ret_break_tx, [i("not committed")])
        ae(ret_owner, [echoed])

# Checks stuff that the owner might enter incorrectly.
def check_wrong(c, owner):
    ae(s.send(owner, c, 0, [i("commit")]), # + randrange(STRIP)]),
       [i("commit invalid args")])
    if is_committed(c):
        # Of course, it isnt just a check if it changes state. Which committing does.
        assert s.send(owner, c, 0, [i("commit") + randrange(STRIP), randrange(2**256)]) == [i("already committed")]
        assert s.send(owner, c, 0, [i("revoke")]) == [i("too early")]

def start():
    reset()
    check(c1, t.k0)

def commit(owner, c, H_secret, msg):
    to_time   = s.block.timestamp + randrange(200,1000)
    H_msg     = sha3(msg) % STRIP
    
    ae(s.send(owner, c, 0, [i("commit") + H_secret,  H_msg]), # + STRIP * to_time]),
       [i("committed")])
    # Check not here because didnt want `commit` function to know about secret.

def scenario_commit():
    start()
    
    secret   = randrange(STRIP)  # Known to A
    H_secret = sha3([secret%STRIP]) % STRIP
    msg1      = [int(echo_contract, 16), 0, randrange(2**256)]
    msg2      = [int(echo_contract, 16), 0, randrange(2**256)]
    
    commit(t.k0, c1, H_secret, msg1)  # 1 goes first, as he knows the secret.
    check(c1, t.k0, secret, H_secret, sha3(msg1) % STRIP)
        
    commit(t.k4, c2, H_secret, msg2)  # Now 2 knows secret will be known for 1 to get his.
    check(c2, t.k4, secret, H_secret, sha3(msg1) % STRIP)

    return secret, msg1, msg2

scenario_commit()
