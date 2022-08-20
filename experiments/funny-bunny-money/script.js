var isRunningOnSupportedBrowser = true;

try {
  const testVariableThing = `blarsh`;
}catch (e) {
  isRunningOnSupportedBrowser = false;
}

if (isRunningOnSupportedBrowser) {
  // BEGIN LIBRARIES

  // BEGIN CODE FROM http://www.webtoolkit.info/javascript_sha256.html#.WMW--XeZO2w

  /**

  *

  *  Secure Hash Algorithm (SHA256)

  *  http://www.webtoolkit.info/

  *

  *  Original code by Angel Marin, Paul Johnston.

  *

  **/

  function SHA256(s){
  var chrsz = 8;
  var hexcase = 0;
  function safe_add (x, y) {
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
  }
  function S (X, n) { return ( X >>> n ) | (X << (32 - n)); }
  function R (X, n) { return ( X >>> n ); }
  function Ch(x, y, z) { return ((x & y) ^ ((~x) & z)); }
  function Maj(x, y, z) { return ((x & y) ^ (x & z) ^ (y & z)); }
  function Sigma0256(x) { return (S(x, 2) ^ S(x, 13) ^ S(x, 22)); }
  function Sigma1256(x) { return (S(x, 6) ^ S(x, 11) ^ S(x, 25)); }
  function Gamma0256(x) { return (S(x, 7) ^ S(x, 18) ^ R(x, 3)); }
  function Gamma1256(x) { return (S(x, 17) ^ S(x, 19) ^ R(x, 10)); }
  function core_sha256 (m, l) {
  var K = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786, 0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2);
  var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);
  var W = new Array(64);
  var a, b, c, d, e, f, g, h, i, j;
  var T1, T2;
  m[l >> 5] |= 0x80 << (24 - l % 32);
  m[((l + 64 >> 9) << 4) + 15] = l;
  for ( var i = 0; i<m.length; i+=16 ) {
  a = HASH[0];
  b = HASH[1];
  c = HASH[2];
  d = HASH[3];
  e = HASH[4];
  f = HASH[5];
  g = HASH[6];
  h = HASH[7];
  for ( var j = 0; j<64; j++) {
  if (j < 16) W[j] = m[j + i];
  else W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);
  T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
  T2 = safe_add(Sigma0256(a), Maj(a, b, c));
  h = g;
  g = f;
  f = e;
  e = safe_add(d, T1);
  d = c;
  c = b;
  b = a;
  a = safe_add(T1, T2);
  }
  HASH[0] = safe_add(a, HASH[0]);
  HASH[1] = safe_add(b, HASH[1]);
  HASH[2] = safe_add(c, HASH[2]);
  HASH[3] = safe_add(d, HASH[3]);
  HASH[4] = safe_add(e, HASH[4]);
  HASH[5] = safe_add(f, HASH[5]);
  HASH[6] = safe_add(g, HASH[6]);
  HASH[7] = safe_add(h, HASH[7]);
  }
  return HASH;
  }
  function str2binb (str) {
  var bin = Array();
  var mask = (1 << chrsz) - 1;
  for(var i = 0; i < str.length * chrsz; i += chrsz) {
  bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i%32);
  }
  return bin;
  }
  function Utf8Encode(string) {
  string = string.replace(/\r\n/g,"\n");
  var utftext = "";
  for (var n = 0; n < string.length; n++) {
  var c = string.charCodeAt(n);
  if (c < 128) {
  utftext += String.fromCharCode(c);
  }
  else if((c > 127) && (c < 2048)) {
  utftext += String.fromCharCode((c >> 6) | 192);
  utftext += String.fromCharCode((c & 63) | 128);
  }
  else {
  utftext += String.fromCharCode((c >> 12) | 224);
  utftext += String.fromCharCode(((c >> 6) & 63) | 128);
  utftext += String.fromCharCode((c & 63) | 128);
  }
  }
  return utftext;
  }
  function binb2hex (binarray) {
  var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i++) {
  str += hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8+4)) & 0xF) +
  hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8  )) & 0xF);
  }
  return str;
  }
  s = Utf8Encode(s);
  return binb2hex(core_sha256(str2binb(s), s.length * chrsz));
  }

  // END CODE FROM http://www.webtoolkit.info/javascript_sha256.html#.WMW--XeZO2w

  // END LIBRARIES

  const $ = (q) => document.querySelector(q);
  const html = (e, h) => { e.innerHTML = h; };
  const val = (e) => e.value;
  const on = (e, t, f) => { e.addEventListener(t, f); };

  let currentFBM = 0;
  let currentFBMPS = 0;
  let currentFBMPC = 1;

  let gameSaveRestored = false
  let gameSaveData = {}

  if (localStorage.fbmGameData) {
    gameSaveData = JSON.parse(localStorage.fbmGameData);
    gameSaveDataNoHash = {currentFBMPS: gameSaveData.currentFBMPS, currentFBMPC: gameSaveData.currentFBMPC, currentFBM: gameSaveData.currentFBM, purchasesList: gameSaveData.purchasesList}
    if (gameSaveData.hash == SHA256(JSON.stringify(gameSaveDataNoHash))) {
      gameSaveRestored = true

      currentFBM = gameSaveData.currentFBM;
      currentFBMPC = gameSaveData.currentFBMPC;
      currentFBMPS = gameSaveData.currentFBMPS;
    }else{
      alert("Your game save conflicts with its hash. Your game has been reset.")
    }
  }

  const purchasesList = gameSaveRestored ? gameSaveData.purchasesList : [
    {name: "A pack of wild rabbits", isPerSecond: true, value: 1, cost: 50},
    {name: "Trip to the rabbit shop", isPerSecond: false, value: 1, cost: 150},
    {name: "A gaggle of rabid rabbits", isPerSecond: true, value: 3, cost: 200},
    {name: "Trip to the rabbit rescue facility", isPerSecond: false, value: 3, cost: 300},
    {name: "A flock of frolicking rabbits", isPerSecond: true, value: 5, cost: 400},
    {name: "Trip to the rabbit zoo", isPerSecond: false, value: 5, cost: 600},
    {name: "A school of smack-worthy rabbits", isPerSecond: true, value: 10, cost: 800},
    {name: "Trip to the all-you-can-take rabbit buffet", isPerSecond: false, value: 10, cost: 1200},
    {name: "A continent of to-cool-for-school rabbits", isPerSecond: true, value: 25, cost: 1600},
    {name: "Trip to the all-you-can-take rabbit buffet", isPerSecond: false, value: 25, cost: 2400},
  ]

  const updateFBM = () => { html($("#fbm"), currentFBM) };
  const updateFBMPS = () => { html($("#fbmps"), currentFBMPS) };
  const updateFBMPC = () => { html($("#fbmpc"), currentFBMPC) };

  const cacheData = () => {
    let dataToSave = {currentFBMPS, currentFBMPC, currentFBM, purchasesList};
    dataToSave.hash = SHA256(JSON.stringify(dataToSave))
    localStorage.fbmGameData = JSON.stringify(dataToSave);
  }

  const updatePurchases = () => {
    html($("#purchases"), "");
    purchasesList.forEach((v, i) => {
      let listItem = document.createElement("div")

      let pushButton = document.createElement("button")
      html(pushButton, `${v.name} - ${v.value} FBM ${v.isPerSecond ? "per second" : "per click"} - Price: ${v.cost}`);
      on(pushButton, "click", () => {
        if (currentFBM >= v.cost) {
          currentFBM -= v.cost;
          if (v.isPerSecond) {
            currentFBMPS += v.value;
            updateFBMPS()
            purchasesList[i].cost += Math.floor(v.cost / 2);
          }else{
            currentFBMPC += v.value;
            updateFBMPC()
            purchasesList[i].cost += Math.floor(v.cost / 3);
          }
          updatePurchases()
          cacheData()
        }else{
          alert("You do not have enough FBM to buy this.")
        }
      })

      listItem.appendChild(pushButton);
      $("#purchases").appendChild(listItem);
    })
  };

  updateFBM();
  updateFBMPC();
  updateFBMPS();
  updatePurchases();
  cacheData()

  setInterval(() => {
    currentFBM = currentFBM + currentFBMPS;
    updateFBM();
    cacheData()
  }, 1000)

  on($("#plus1fbm"), "touchstart", (e) => {
    e.preventDefault()
    currentFBM = currentFBM + currentFBMPC;
    updateFBM();
    cacheData()
  })
  on($("#plus1fbm"), "click", () => {
    currentFBM = currentFBM + currentFBMPC;
    updateFBM();
    cacheData()
  })
}else{
  document.body.innerHTML = "<h1>Sorry</h1><p>Your browser has grown a beard and cannot run Funny Bunny Money. Sorry. :(</p>";
}
