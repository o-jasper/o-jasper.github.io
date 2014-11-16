import pyethereum, random
t = pyethereum.tester

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
    while i > 0:
        s += chr(i%256)
        i /=256
    return "".join(reversed(s))

COMMITSTRIP = 411376139330301510538742295639337626245683966408394965837152256

s = t.state()
c1 = s.contract('tx-swap.se', t.k0)
c2 = s.contract('tx-swap.se', t.k4)

def gs(of, index):
    global s
    if isinstance(index, string):
        index = i(index)
    return s.block.get_storage_data(of, index)

def reset():
    global c1,c2,s
    s = t.state()
    c1 = s.contract('tx-swap.se', t.k0)
    c2 = s.contract('tx-swap.se', t.k4)
  
def check(c, owner=False, secret=None):
    if owner:
        assert hex(gs(c, "owner"))[2:-1] == owner
    
    if gs(c, "commit") == 0:
        assert gs(c, "commit_release") == 0
    else:
        assert gs(c, "commit_release") != 0
        if early != None:
            assert gs(c, "commit_release")/COMMITSTRIP == early

    check_meddling(c, owner, secret)
    check_wrong(c, owner)

def is_commited(c):
    return gs(c, "commit") != 0 and gs(c, "commit")/COMMITSTRIP < timestamp

# Checks some strategies for meddling at any point.
def check_meddling(c, owner=None, secret=None):
    key = None
    # TODO t.keys is privkeys... # TODO some of these come out same with owner..
    for k in t.keys: 
        if k != owner:  # Check non-owner not allowed to do stuff.
            key = k 
    # Try break in with random crap.
    assert s.send(key, c, 0, []) == [i("denied")]
    assert s.send(key, c, 0,[i("commit") + randrange(COMMITSTRIP), randrange(PUPPETEERSTRIP) + PUPPETEERSTRIP*(timestamp + 3600*48)]) == [i("denied")]
    assert s.send(key, c, 0,[i("revoke")]) == [i("denied")]
    
    # Try break in with puppeteer command.
    ret_break_puppeteer = s.send(key, c, 0, [i("puppeteer") + randrange(0,PUPPETEERSTRIP)])

    # With the correct releasing value, try modified transactions.
    secret = secret or randrange(2**256)
    args =  i("puppeteer") + secret  # Correct secret.
    for i in range(randrange(10)):
        args.append(randrange(2**256))
    ret_break_tx = s.send(key, c, 0, args)

    echoed = randrange(2**64)  # Value to echo.

    # As owner, should work _if_ commit time over.
    ret_owner = s.send(owner, c, 0, [i("puppeteer"), echo_contract, echoed])
    # Still committed, should say no. (the timer allows revoking, not mandated)
    if is_committed(c):
        assert ret_break_puppeteer == [i("commit hash wrong")]
        assert ret_break_tx == [i("tx hash wrong" if secret else "commit hash wrong")]
        assert ret_owner == [i("not the releasing value")]
    else: # Not committed, expect the echo
        assert ret_break_puppeteer == [i("not committed")]
        assert ret_break_tx == [i("not committed")]
        assert ret_owner == echoed

# Checks stuff that the owner might enter incorrectly.
def check_wrong(c, owner):
    assert s.send(owner, c, 0, [i("commit") + randrange(COMMITSTRIP)]) == [i("commit invalid args")]
    if is_committed(c):
        # Of course, it isnt just a check if it changes state. Which committing does.
        assert s.send(owner, c, 0, [i("commit") + randrange(COMMITSTRIP), randrange(2**256)]) == [i("already committed")]
        assert s.send(owner, c, 0, [i("revoke")]) == [i("too early")]

def start():
    reset()
    check()
