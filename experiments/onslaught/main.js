/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _stats = __webpack_require__(1);

	var _stats2 = _interopRequireDefault(_stats);

	var _mousetrap = __webpack_require__(3);

	var _mousetrap2 = _interopRequireDefault(_mousetrap);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var MAIN_GUN_WIDTH = 40;
	var MAIN_GUN_HEIGHT = 60;
	var LASER_LENGTH = 40;
	var DEBUG_MODE = false;

	var elem = document.body;
	var params = { width: window.innerWidth, height: window.innerHeight };
	var two = new Two(params).appendTo(elem);

	var Enemy = function () {
	  function Enemy(deg, aHealth) {
	    var percent = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];

	    _classCallCheck(this, Enemy);

	    this.deg = deg;
	    this.health = aHealth;
	    this.maxHealth = aHealth;
	    this.percent = percent;
	  }

	  _createClass(Enemy, [{
	    key: "draw",
	    value: function draw() {
	      var deg = this.deg;
	      var aHealth = this.health;
	      var percent = this.percent;
	      var percBasis = Math.sqrt(Math.pow(window.innerWidth / 2, 2) + Math.pow(window.innerHeight / 2, 2));
	      var locX = window.innerWidth / 2 + Math.cos(deg * (Math.PI / 180)) * (percBasis * percent);
	      var locY = window.innerHeight / 2 + Math.sin(deg * (Math.PI / 180)) * (percBasis * percent);
	      var enemy = two.makePolygon(locX, locY, 15 + aHealth * 1.5 - 1, aHealth + 2);
	      enemy.linewidth = 4;
	      enemy.fill = "rgb(32, 32, 32)";
	      enemy.stroke = "rgb(241, 35, 227)";
	      enemy.rotation = (deg - 90) * (Math.PI / 180);
	    }
	  }, {
	    key: "advance",
	    value: function advance() {
	      this.percent -= 1 / this.health * 0.003;
	    }
	  }]);

	  return Enemy;
	}();

	var Laser = function () {
	  function Laser(deg) {
	    var percent = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

	    _classCallCheck(this, Laser);

	    this.deg = deg;
	    this.percent = percent;
	  }

	  _createClass(Laser, [{
	    key: "draw",
	    value: function draw() {
	      var deg = this.deg;
	      var percent = this.percent;
	      var percBasis = Math.sqrt(Math.pow(window.innerWidth / 2, 2) + Math.pow(window.innerHeight / 2, 2));
	      var loc = 30 + percent * percBasis;
	      var laser = two.makeLine(window.innerWidth / 2 + Math.cos(deg) * (loc - 20), window.innerHeight / 2 + Math.sin(deg) * (loc - 20), window.innerWidth / 2 + Math.cos(deg) * loc, window.innerHeight / 2 + Math.sin(deg) * loc);
	      laser.stroke = "rgb(212, 88, 88)";
	      laser.linewidth = 3;
	    }
	  }, {
	    key: "advance",
	    value: function advance() {
	      this.percent += 0.007;
	    }
	  }]);

	  return Laser;
	}();

	var PointMarker = function () {
	  function PointMarker(x, y, text) {
	    var percent = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];

	    _classCallCheck(this, PointMarker);

	    this.x = x;
	    this.y = y;
	    this.text = text;
	    this.percent = percent;
	  }

	  _createClass(PointMarker, [{
	    key: "draw",
	    value: function draw() {
	      var x = this.x;
	      var y = this.y;
	      var text = this.text;
	      var percent = this.percent;

	      var pdisp = new Two.Text(text, x, y - percent * 25, { size: 14 + percent * 7, leading: 18 + percent * 7, baseline: "baseline", fill: "#fff", opacity: 1 - percent, family: "\"Audiowide\", cursive" });
	      two.add(pdisp);
	    }
	  }, {
	    key: "step",
	    value: function step() {
	      this.percent += 0.007;
	    }
	  }]);

	  return PointMarker;
	}();

	var random = function random(x, y) {
	  return Math.floor(Math.random() * (y - x)) + x;
	};

	var makeRect = function makeRect(x, y, w, h) {
	  return two.makeRectangle(w / 2 + x, h / 2 + y, w, h);
	};

	var calculateGunPercent = function calculateGunPercent() {
	  return (window.innerWidth + MAIN_GUN_WIDTH * 2) * (percent / 100);
	};
	var calcXCoordFromPercent = function calcXCoordFromPercent(perc) {
	  return (window.innerWidth + MAIN_GUN_WIDTH * 2) * (perc / 100);
	};

	var setupScene = function setupScene() {
	  two.clear();
	  two.width = window.innerWidth;
	  two.height = window.innerHeight;
	};

	var makeBackground = function makeBackground() {
	  var space = makeRect(0, 0, window.innerWidth, window.innerHeight);
	  space.fill = "rgb(32, 32, 32)";
	  space.noStroke();
	};

	var drawPlayer = function drawPlayer() {
	  var angle = Math.atan2(mouseY - window.innerHeight / 2, mouseX - window.innerWidth / 2);
	  pDeg = angle;
	  if (DEBUG_MODE) {
	    var laser = two.makeLine(window.innerWidth / 2 + Math.cos(angle) * 30, window.innerHeight / 2 + Math.sin(angle) * 30, window.innerWidth / 2 + Math.cos(angle) * 1500, window.innerHeight / 2 + Math.sin(angle) * 1500);
	    laser.stroke = "rgb(212, 88, 88)";
	  }
	  var base = two.makeCircle(window.innerWidth / 2, window.innerHeight / 2, 30);
	  base.stroke = "rgb(230, 230, 230)";
	  base.linewidth = 4;
	  base.fill = "rgb(32, 32, 32)";
	  var mainGun = two.makeLine(window.innerWidth / 2 + Math.cos(angle) * 30, window.innerHeight / 2 + Math.sin(angle) * 30, window.innerWidth / 2 + Math.cos(angle) * 40, window.innerHeight / 2 + Math.sin(angle) * 40);
	  mainGun.linewidth = 4;
	  mainGun.stroke = "rgb(230, 230, 230)";
	};

	var drawHealthBar = function drawHealthBar() {
	  var healthLabel = new Two.Text("Health:", 10, window.innerHeight - 35, { size: 25, leading: 44, alignment: "left", fill: "#fff", family: "\"Audiowide\", cursive" });
	  two.add(healthLabel);
	  var bar = makeRect(0, window.innerHeight - 20, window.innerWidth * health, 20);
	  bar.fill = health >= 0.3 ? "rgb(14, 219, 41)" : health >= 0.1 ? "rgb(213, 211, 33)" : "rgb(200, 51, 51)";
	  bar.noStroke();
	};

	var drawPointCounter = function drawPointCounter() {
	  var pCounter = new Two.Text("Score: " + points, window.innerWidth - 5, 10, { size: 18, leading: 22, alignment: "right", baseline: "baseline", fill: "#fff", family: "\"Audiowide\", cursive" });
	  two.add(pCounter);
	};

	var mainloop = function mainloop() {
	  if (clicking && reload >= 1) {
	    reload = 0;
	    var newLaser = new Laser(pDeg);
	    lasers.push(newLaser);
	  } else if (reload < 1) {
	    reload += 0.1;
	  }

	  if (health <= 0) {
	    route = "gameover";
	  }

	  if (timeToGenerateNewEnemy <= 0) {
	    var randRank = random(0, 11);
	    var rank = 1;
	    if (randRank > 5 && randRank < 8) {
	      rank = 3;
	    } else if (randRank >= 8 && randRank <= 9) {
	      rank = 5;
	    } else if (randRank === 10) {
	      rank = random(7, 15);
	    }
	    var newEnemy = new Enemy(random(0, 361), rank);
	    enemies.push(newEnemy);
	    timeToGenerateNewEnemy = random(30, 120);
	  } else {
	    timeToGenerateNewEnemy -= 1;
	  }

	  for (var i = 0; i < enemies.length; i++) {
	    enemies[i].draw();
	    enemies[i].advance();
	  }
	  enemies = enemies.filter(function (e, index) {
	    var didNotAttackBase = e.percent > 0;
	    if (!didNotAttackBase) {
	      health -= 0.01 * e.health;
	      return false;
	    }
	    var didDie = false;
	    var laserThatKilled = 0;
	    var kLaserX = 0,
	        kLaserY = 0;
	    for (var i = 0; i < lasers.length; i++) {
	      if (!didDie) {
	        var percBasis = Math.sqrt(Math.pow(window.innerWidth / 2, 2) + Math.pow(window.innerHeight / 2, 2));
	        var laserLoc = 30 + lasers[i].percent * percBasis;
	        var laserX = window.innerWidth / 2 + Math.cos(lasers[i].deg) * laserLoc;
	        var laserY = window.innerHeight / 2 + Math.sin(lasers[i].deg) * laserLoc;
	        var enemyLoc = e.percent * percBasis;
	        var enemyX = window.innerWidth / 2 + Math.cos(e.deg * (Math.PI / 180)) * enemyLoc;
	        var enemyY = window.innerHeight / 2 + Math.sin(e.deg * (Math.PI / 180)) * enemyLoc;
	        var enemyRad = 15 + e.health * 1.5 - 1;
	        didDie = Math.sqrt(Math.pow(enemyX - laserX, 2) + Math.pow(enemyY - laserY, 2)) <= enemyRad;
	        if (didDie) {
	          kLaserX = laserX;
	          kLaserY = laserY;
	        }
	      }
	    }
	    if (didDie) {
	      lasers.splice(laserThatKilled, 1);
	      var aHealth = e.health;
	      if (aHealth - 1 <= 0) {
	        points += e.maxHealth;
	        var newPointMarker = new PointMarker(kLaserX, kLaserY, "+" + e.maxHealth);
	        pointMarkers.push(newPointMarker);
	        return false;
	      }
	      enemies[index].health -= 1;
	    }
	    return true;
	  });

	  for (var i = 0; i < lasers.length; i++) {
	    lasers[i].draw();
	    lasers[i].advance();
	  }
	  lasers = lasers.filter(function (e) {
	    return e.percent < 1;
	  });

	  for (var i = 0; i < pointMarkers.length; i++) {
	    pointMarkers[i].draw();
	    pointMarkers[i].step();
	  }
	  pointMarkers = pointMarkers.filter(function (e) {
	    return e.percent < 1;
	  });
	};

	var drawHomeScreen = function drawHomeScreen() {
	  var title = new Two.Text("Onslaught!", window.innerWidth / 2, window.innerHeight / 2 - 40, { size: 60, leading: 64, fill: "#fff", family: "\"Audiowide\", cursive" });
	  two.add(title);
	  var subtitle = new Two.Text("Press Space To Start", window.innerWidth / 2, window.innerHeight / 2 + 20, { size: 40, leading: 44, fill: "#fff", family: "\"Audiowide\", cursive" });
	  two.add(subtitle);
	  var instruct = new Two.Text("Move mouse to rotate gun. Click to shoot.", window.innerWidth / 2, window.innerHeight / 2 + 65, { size: 20, leading: 44, fill: "#fff", family: "\"Audiowide\", cursive" });
	  two.add(instruct);
	};

	var drawGameOver = function drawGameOver() {
	  var title = new Two.Text("Game Over", window.innerWidth / 2, 40, { size: 40, leading: 44, fill: "#fff", family: "\"Audiowide\", cursive" });
	  two.add(title);
	  var finalScore = new Two.Text(points, window.innerWidth / 2, 140, { size: 80, leading: 84, fill: "#fff", family: "\"Audiowide\", cursive" });
	  two.add(finalScore);
	  var finalScoreLabel = new Two.Text("Points", window.innerWidth / 2, 200, { size: 50, leading: 54, fill: "#fff", family: "\"Audiowide\", cursive" });
	  two.add(finalScoreLabel);
	  var replayIntructions = new Two.Text("Press Space To Play Again", window.innerWidth / 2, 250, { size: 30, leading: 34, fill: "#fff", family: "\"Audiowide\", cursive" });
	  two.add(replayIntructions);
	};

	var stats = new _stats2.default();
	stats.showPanel(0);
	document.body.appendChild(stats.dom);

	var route = "home";
	var points = 0;
	var mouseX = 0;
	var mouseY = 0;
	var clicking = false;
	var health = 1;
	var reload = 1;
	var pDeg = 0;
	var timeToGenerateNewEnemy = random(30, 120);
	var lasers = [];
	var enemies = [];
	var pointMarkers = [];

	_mousetrap2.default.bind("space", function () {
	  if (route === "home") {
	    route = "game";
	  }
	  if (route === "gameover") {
	    health = 1;
	    reload = 1;
	    pDeg = 0;
	    timeToGenerateNewEnemy = random(30, 120);
	    pointMarkers = [];
	    enemies = [];
	    lasers = [];
	    points = 0;
	    route = "game";
	  }
	});

	window.addEventListener("mousedown", function (e) {
	  clicking = true;
	});
	window.addEventListener("mouseup", function (e) {
	  clicking = false;
	});
	window.addEventListener("mouseout", function (e) {
	  clicking = false;
	});
	window.addEventListener("mousemove", function (e) {
	  mouseX = e.pageX;mouseY = e.pageY;
	});

	two.bind("update", function (frameCount) {
	  stats.begin();

	  setupScene();
	  makeBackground();
	  if (route === "game") {
	    mainloop();
	    drawPlayer();
	    drawHealthBar();
	    drawPointCounter();
	  } else if (route === "home") {
	    drawHomeScreen();
	  } else if (route === "gameover") {
	    drawGameOver();
	  }

	  stats.end();
	}).play();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	// stats.js - http://github.com/mrdoob/stats.js
	var Stats = function Stats() {
	  function h(a) {
	    c.appendChild(a.dom);return a;
	  }function k(a) {
	    for (var d = 0; d < c.children.length; d++) {
	      c.children[d].style.display = d === a ? "block" : "none";
	    }l = a;
	  }var l = 0,
	      c = document.createElement("div");c.style.cssText = "position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000";c.addEventListener("click", function (a) {
	    a.preventDefault();k(++l % c.children.length);
	  }, !1);var g = (performance || Date).now(),
	      e = g,
	      a = 0,
	      r = h(new Stats.Panel("FPS", "#0ff", "#002")),
	      f = h(new Stats.Panel("MS", "#0f0", "#020"));
	  if (self.performance && self.performance.memory) var t = h(new Stats.Panel("MB", "#f08", "#201"));k(0);return { REVISION: 16, dom: c, addPanel: h, showPanel: k, begin: function begin() {
	      g = (performance || Date).now();
	    }, end: function end() {
	      a++;var c = (performance || Date).now();f.update(c - g, 200);if (c > e + 1E3 && (r.update(1E3 * a / (c - e), 100), e = c, a = 0, t)) {
	        var d = performance.memory;t.update(d.usedJSHeapSize / 1048576, d.jsHeapSizeLimit / 1048576);
	      }return c;
	    }, update: function update() {
	      g = this.end();
	    }, domElement: c, setMode: k };
	};
	Stats.Panel = function (h, k, l) {
	  var c = Infinity,
	      g = 0,
	      e = Math.round,
	      a = e(window.devicePixelRatio || 1),
	      r = 80 * a,
	      f = 48 * a,
	      t = 3 * a,
	      u = 2 * a,
	      d = 3 * a,
	      m = 15 * a,
	      n = 74 * a,
	      p = 30 * a,
	      q = document.createElement("canvas");q.width = r;q.height = f;q.style.cssText = "width:80px;height:48px";var b = q.getContext("2d");b.font = "bold " + 9 * a + "px Helvetica,Arial,sans-serif";b.textBaseline = "top";b.fillStyle = l;b.fillRect(0, 0, r, f);b.fillStyle = k;b.fillText(h, t, u);b.fillRect(d, m, n, p);b.fillStyle = l;b.globalAlpha = .9;b.fillRect(d, m, n, p);return { dom: q, update: function update(f, v) {
	      c = Math.min(c, f);g = Math.max(g, f);b.fillStyle = l;b.globalAlpha = 1;b.fillRect(0, 0, r, m);b.fillStyle = k;b.fillText(e(f) + " " + h + " (" + e(c) + "-" + e(g) + ")", t, u);b.drawImage(q, d + a, m, n - a, p, d, m, n - a, p);b.fillRect(d + n - a, m, a, p);b.fillStyle = l;b.globalAlpha = .9;b.fillRect(d + n - a, m, a, e((1 - f / v) * p));
	    } };
	};"object" === ( false ? "undefined" : _typeof(module)) && (module.exports = Stats);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module)))

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	/* mousetrap v1.5.3 craig.is/killing/mice */
	(function (C, r, g) {
	  function t(a, b, h) {
	    a.addEventListener ? a.addEventListener(b, h, !1) : a.attachEvent("on" + b, h);
	  }function x(a) {
	    if ("keypress" == a.type) {
	      var b = String.fromCharCode(a.which);a.shiftKey || (b = b.toLowerCase());return b;
	    }return l[a.which] ? l[a.which] : p[a.which] ? p[a.which] : String.fromCharCode(a.which).toLowerCase();
	  }function D(a) {
	    var b = [];a.shiftKey && b.push("shift");a.altKey && b.push("alt");a.ctrlKey && b.push("ctrl");a.metaKey && b.push("meta");return b;
	  }function u(a) {
	    return "shift" == a || "ctrl" == a || "alt" == a || "meta" == a;
	  }function y(a, b) {
	    var h,
	        c,
	        e,
	        g = [];h = a;"+" === h ? h = ["+"] : (h = h.replace(/\+{2}/g, "+plus"), h = h.split("+"));for (e = 0; e < h.length; ++e) {
	      c = h[e], z[c] && (c = z[c]), b && "keypress" != b && A[c] && (c = A[c], g.push("shift")), u(c) && g.push(c);
	    }h = c;e = b;if (!e) {
	      if (!k) {
	        k = {};for (var m in l) {
	          95 < m && 112 > m || l.hasOwnProperty(m) && (k[l[m]] = m);
	        }
	      }e = k[h] ? "keydown" : "keypress";
	    }"keypress" == e && g.length && (e = "keydown");return { key: c, modifiers: g, action: e };
	  }function B(a, b) {
	    return null === a || a === r ? !1 : a === b ? !0 : B(a.parentNode, b);
	  }function c(a) {
	    function b(a) {
	      a = a || {};var b = !1,
	          n;for (n in q) {
	        a[n] ? b = !0 : q[n] = 0;
	      }b || (v = !1);
	    }function h(a, b, n, f, c, h) {
	      var g,
	          e,
	          l = [],
	          m = n.type;if (!d._callbacks[a]) return [];"keyup" == m && u(a) && (b = [a]);for (g = 0; g < d._callbacks[a].length; ++g) {
	        if (e = d._callbacks[a][g], (f || !e.seq || q[e.seq] == e.level) && m == e.action) {
	          var k;(k = "keypress" == m && !n.metaKey && !n.ctrlKey) || (k = e.modifiers, k = b.sort().join(",") === k.sort().join(","));k && (k = f && e.seq == f && e.level == h, (!f && e.combo == c || k) && d._callbacks[a].splice(g, 1), l.push(e));
	        }
	      }return l;
	    }function g(a, b, n, f) {
	      d.stopCallback(b, b.target || b.srcElement, n, f) || !1 !== a(b, n) || (b.preventDefault ? b.preventDefault() : b.returnValue = !1, b.stopPropagation ? b.stopPropagation() : b.cancelBubble = !0);
	    }function e(a) {
	      "number" !== typeof a.which && (a.which = a.keyCode);var b = x(a);b && ("keyup" == a.type && w === b ? w = !1 : d.handleKey(b, D(a), a));
	    }function l(a, c, n, f) {
	      function e(c) {
	        return function () {
	          v = c;++q[a];clearTimeout(k);k = setTimeout(b, 1E3);
	        };
	      }function h(c) {
	        g(n, c, a);"keyup" !== f && (w = x(c));setTimeout(b, 10);
	      }for (var d = q[a] = 0; d < c.length; ++d) {
	        var p = d + 1 === c.length ? h : e(f || y(c[d + 1]).action);m(c[d], p, f, a, d);
	      }
	    }function m(a, b, c, f, e) {
	      d._directMap[a + ":" + c] = b;a = a.replace(/\s+/g, " ");var g = a.split(" ");1 < g.length ? l(a, g, b, c) : (c = y(a, c), d._callbacks[c.key] = d._callbacks[c.key] || [], h(c.key, c.modifiers, { type: c.action }, f, a, e), d._callbacks[c.key][f ? "unshift" : "push"]({ callback: b, modifiers: c.modifiers, action: c.action, seq: f, level: e, combo: a }));
	    }var d = this;a = a || r;if (!(d instanceof c)) return new c(a);d.target = a;d._callbacks = {};d._directMap = {};var q = {},
	        k,
	        w = !1,
	        p = !1,
	        v = !1;d._handleKey = function (a, c, e) {
	      var f = h(a, c, e),
	          d;c = {};var k = 0,
	          l = !1;for (d = 0; d < f.length; ++d) {
	        f[d].seq && (k = Math.max(k, f[d].level));
	      }for (d = 0; d < f.length; ++d) {
	        f[d].seq ? f[d].level == k && (l = !0, c[f[d].seq] = 1, g(f[d].callback, e, f[d].combo, f[d].seq)) : l || g(f[d].callback, e, f[d].combo);
	      }f = "keypress" == e.type && p;e.type != v || u(a) || f || b(c);p = l && "keydown" == e.type;
	    };d._bindMultiple = function (a, b, c) {
	      for (var d = 0; d < a.length; ++d) {
	        m(a[d], b, c);
	      }
	    };t(a, "keypress", e);t(a, "keydown", e);t(a, "keyup", e);
	  }var l = { 8: "backspace", 9: "tab", 13: "enter", 16: "shift", 17: "ctrl", 18: "alt",
	    20: "capslock", 27: "esc", 32: "space", 33: "pageup", 34: "pagedown", 35: "end", 36: "home", 37: "left", 38: "up", 39: "right", 40: "down", 45: "ins", 46: "del", 91: "meta", 93: "meta", 224: "meta" },
	      p = { 106: "*", 107: "+", 109: "-", 110: ".", 111: "/", 186: ";", 187: "=", 188: ",", 189: "-", 190: ".", 191: "/", 192: "`", 219: "[", 220: "\\", 221: "]", 222: "'" },
	      A = { "~": "`", "!": "1", "@": "2", "#": "3", $: "4", "%": "5", "^": "6", "&": "7", "*": "8", "(": "9", ")": "0", _: "-", "+": "=", ":": ";", '"': "'", "<": ",", ">": ".", "?": "/", "|": "\\" },
	      z = { option: "alt", command: "meta", "return": "enter",
	    escape: "esc", plus: "+", mod: /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? "meta" : "ctrl" },
	      k;for (g = 1; 20 > g; ++g) {
	    l[111 + g] = "f" + g;
	  }for (g = 0; 9 >= g; ++g) {
	    l[g + 96] = g;
	  }c.prototype.bind = function (a, b, c) {
	    a = a instanceof Array ? a : [a];this._bindMultiple.call(this, a, b, c);return this;
	  };c.prototype.unbind = function (a, b) {
	    return this.bind.call(this, a, function () {}, b);
	  };c.prototype.trigger = function (a, b) {
	    if (this._directMap[a + ":" + b]) this._directMap[a + ":" + b]({}, a);return this;
	  };c.prototype.reset = function () {
	    this._callbacks = {};this._directMap = {};return this;
	  };c.prototype.stopCallback = function (a, b) {
	    return -1 < (" " + b.className + " ").indexOf(" mousetrap ") || B(b, this.target) ? !1 : "INPUT" == b.tagName || "SELECT" == b.tagName || "TEXTAREA" == b.tagName || b.isContentEditable;
	  };c.prototype.handleKey = function () {
	    return this._handleKey.apply(this, arguments);
	  };c.init = function () {
	    var a = c(r),
	        b;for (b in a) {
	      "_" !== b.charAt(0) && (c[b] = function (b) {
	        return function () {
	          return a[b].apply(a, arguments);
	        };
	      }(b));
	    }
	  };c.init();C.Mousetrap = c;"undefined" !== typeof module && module.exports && (module.exports = c);"function" === "function" && __webpack_require__(4) && !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	    return c;
	  }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(window, document);

/***/ },
/* 4 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;

	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }
/******/ ]);