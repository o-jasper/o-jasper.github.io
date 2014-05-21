//Note that it is assumed that beforehand all pages are accepted, and thus can
// be trusted at this point.

// Indexes of ads.
top_ads    = ['a']
right_ads  = ['b']
corner_ads = ['c']

art_indexes = {'PublishDAO testing!':'testing'}

//Article index figured out from what comes after #
var i = location.href.indexOf("#");
if( i == -1 )
{   art_name = location.href.substr(i);
    art_i = art_indexes[art_name]
}
else{ art_i = 'testing'; }

// Advertisements are currently chosen randomly.
top_ad_i    = top_ads[Math.floor(Math.random()*top_ads.length)]
right_ad_i  = right_ads[Math.floor(Math.random()*right_ads.length)]
corner_ad_i = corner_ads[Math.floor(Math.random()*corner_ads.length)]

function get_src(of)
{   alert(of);
    return of; }

function getbit(name)
{   return document.getElementById(name); }

function fill_entries()
{
    getbit("article").src   = 'testing' //get_src(art_i);
    getbit("top").src    = 'a' //get_src(top_ad_i);
    getbit("corner").src = 'b' //get_src(corner_ad_i);
    getbit("right").src  = 'c' //get_src(right_ad_i);
}
