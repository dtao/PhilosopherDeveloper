/*
 * The 100-mile chainsaw: an interactive parable.
 *
 * Each "day" John works the forest with a bigger tool. The world is drawn to
 * true scale, so as the saw grows the camera pulls back and the homes in the
 * forest shrink below what a pixel can show. The game keeps counting them.
 */
(function () {
  'use strict';

  var MILE = 5280;
  var SQFT_PER_TREE = 144;          // one tree per 12 ft x 12 ft
  var DAY_SECONDS = 24;
  var REDUCED_MOTION = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Sight (viewFt) barely grows while reach (bladeFt) grows by orders of
  // magnitude. On the "far" days the blade runs past the edge of what John can
  // see, into a world that is simulated but never shown until the end.
  var STAGES = [
    { key: 'axe', day: 'Day 1', tool: 'An axe', short: 'Axe',
      mode: 'objects', viewFt: 150, reachFt: 4, homes: 1,
      hint: 'Tap a tree to swing the axe. Three swings fell it.' },
    { key: 'chainsaw', day: 'Day 2', tool: 'A chainsaw', short: 'Chainsaw',
      mode: 'objects', viewFt: 150, bladeFt: 3, cutReachFt: 5, homes: 1,
      sound: { freq: 130, level: 0.06 },
      hint: 'Press and drag through the trees.' },
    { key: 'hundred-ft', day: 'Day 3', tool: 'A 100-foot chainsaw', short: '100-foot saw',
      mode: 'objects', viewFt: 240, bladeFt: 100, homes: 2,
      sound: { freq: 82, level: 0.08 },
      hint: 'Press and sweep.' },
    { key: 'mile', day: 'Day 4', tool: 'A chainsaw a mile long', short: 'Mile-long saw',
      mode: 'far', viewFt: 420, bladeFt: MILE,
      cabins: 16, villages: [{ homes: 7, radiusFt: 260 }],
      sound: { freq: 52, level: 0.1, rumble: 0.45 },
      hint: 'Press and sweep. Turning the blade reaches farther than moving it.' },
    { key: 'mile-survey', day: 'Day 5', tool: 'The mile-long saw, with surveyors', short: 'Mile-long saw + surveyors',
      mode: 'far', viewFt: 420, bladeFt: MILE,
      cabins: 18, villages: [{ homes: 6, radiusFt: 240 }, { homes: 8, radiusFt: 280 }],
      surveyed: 0.75,
      sound: { freq: 52, level: 0.1, rumble: 0.45 },
      hint: 'Flags at the edge mark homes your surveyors found, and how far away they are.' },
    { key: 'hundred-mile', day: 'Years later', tool: 'A chainsaw 100 miles long', short: '100-mile saw',
      mode: 'far', viewFt: 650, bladeFt: 100 * MILE,
      cabinsPerSqMi: 1 / 2.5, villagesPerSqMi: 1 / 240,
      surveyedCount: 40,
      sound: { freq: 34, level: 0.12, rumble: 0.8 },
      hint: 'Your surveyors flagged what they could.' }
  ];

  var COLORS = {
    floor: [143, 132, 92],
    meadow: [190, 178, 128],
    soil: [124, 96, 66],
    water: [92, 126, 142],
    sand: [196, 180, 140],
    canopy: ['#3c5638', '#46623d', '#527046', '#36503a', '#5b7a4a'],
    canopyHi: 'rgba(150, 180, 110, 0.35)',
    canopyShadow: 'rgba(16, 24, 14, 0.32)',
    bark: '#6e5238',
    stump: '#d6c08f',
    stumpRing: '#9a7a50',
    wall: '#cdb791',
    roof: '#9b4a32',
    roofDark: '#7f3c29',
    ruin: '#6f655b',
    pin: '#e8896a'
  };

  // ------------------------------------------------------------ Utilities

  function mulberry32(seed) {
    var a = seed >>> 0;
    return function () {
      a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function hash2(x, y, s) {
    var h = (Math.imul(x | 0, 374761393) + Math.imul(y | 0, 668265263) +
             Math.imul(s | 0, 1442695041)) | 0;
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  }

  function vnoise(x, y, s) {
    var xi = Math.floor(x), yi = Math.floor(y);
    var xf = x - xi, yf = y - yi;
    var u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
    var a = hash2(xi, yi, s), b = hash2(xi + 1, yi, s);
    var c = hash2(xi, yi + 1, s), d = hash2(xi + 1, yi + 1, s);
    return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
  }

  function fbm(x, y, s, octaves) {
    var sum = 0, amp = 0.5, f = 1, norm = 0;
    for (var i = 0; i < octaves; i++) {
      sum += amp * vnoise(x * f, y * f, s + i * 101);
      norm += amp;
      amp *= 0.5;
      f *= 2.03;
    }
    return sum / norm;
  }

  function fmt(n) {
    n = Math.round(n);
    if (n < 1e6) return n.toLocaleString('en-US');
    var units = [[1e12, 'trillion'], [1e9, 'billion'], [1e6, 'million']];
    for (var i = 0; i < units.length; i++) {
      var v = n / units[i][0];
      if (v >= 1) return (v < 10 ? v.toFixed(1) : Math.round(v).toLocaleString('en-US')) + ' ' + units[i][1];
    }
    return String(n);
  }

  function fmtLen(ft) {
    if (ft >= MILE * 0.5) {
      var mi = Math.round(ft / MILE * 10) / 10;
      return mi + (mi === 1 ? ' mile' : ' miles');
    }
    return Math.round(ft) + ' ft';
  }

  function fmtArea(sqmi) {
    if (sqmi < 0.1) return Math.round(sqmi * 640) + ' acres';
    if (sqmi < 10) return sqmi.toFixed(1) + ' sq mi';
    return Math.round(sqmi).toLocaleString('en-US') + ' sq mi';
  }

  function cross(ax, ay, bx, by, px, py) {
    return (bx - ax) * (py - ay) - (by - ay) * (px - ax);
  }

  function inTri(px, py, ax, ay, bx, by, cx, cy) {
    var d1 = cross(ax, ay, bx, by, px, py);
    var d2 = cross(bx, by, cx, cy, px, py);
    var d3 = cross(cx, cy, ax, ay, px, py);
    var neg = d1 < 0 || d2 < 0 || d3 < 0;
    var pos = d1 > 0 || d2 > 0 || d3 > 0;
    return !(neg && pos);
  }

  function distToSeg(px, py, ax, ay, bx, by) {
    var dx = bx - ax, dy = by - ay;
    var len2 = dx * dx + dy * dy;
    var t = len2 ? ((px - ax) * dx + (py - ay) * dy) / len2 : 0;
    t = Math.max(0, Math.min(1, t));
    var x = ax + t * dx - px, y = ay + t * dy - py;
    return Math.sqrt(x * x + y * y);
  }

  function rgb(c, k) {
    k = k === undefined ? 1 : k;
    return 'rgb(' + Math.round(c[0] * k) + ',' + Math.round(c[1] * k) + ',' + Math.round(c[2] * k) + ')';
  }

  function el(tag, attrs, text) {
    var e = document.createElement(tag);
    if (attrs) for (var k in attrs) {
      if (k === 'class') e.className = attrs[k];
      else e.setAttribute(k, attrs[k]);
    }
    if (text !== undefined) e.textContent = text;
    return e;
  }

  var store = {
    get: function (k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { window.localStorage.setItem(k, v); } catch (e) { /* ignore */ } }
  };

  // ---------------------------------------------------------------- DOM

  var $ = function (s) { return document.querySelector(s); };
  var stageEl = $('#stage');
  var canvas = $('#world');
  var ctx = canvas.getContext('2d');
  var hud = $('#hud');
  var card = $('#card');
  var dim = $('#dim');
  var revealEl = $('#reveal');
  var captionEl = $('#caption');
  var hintEl = $('#hint');

  var view = { w: 1, h: 1, dpr: 1 };

  function measure() {
    var r = stageEl.getBoundingClientRect();
    view.w = Math.max(1, Math.round(r.width));
    view.h = Math.max(1, Math.round(r.height));
    view.dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(view.w * view.dpr);
    canvas.height = Math.round(view.h * view.dpr);
  }

  function makeLayer(w, h, dpr) {
    var c = document.createElement('canvas');
    c.width = Math.round(w * dpr);
    c.height = Math.round(h * dpr);
    var x = c.getContext('2d');
    x.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { c: c, x: x };
  }

  // -------------------------------------------------------------- Sound

  var Sound = {
    ctx: null,
    on: store.get('chainsaw-sound') !== 'off',
    lastThud: 0,
    pendingThud: 0,

    ensure: function () {
      if (this.ctx) {
        if (this.ctx.state === 'suspended') this.ctx.resume();
        return;
      }
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      try {
        this.ctx = new AC();
      } catch (e) { return; }
      var c = this.ctx;
      this.master = c.createGain();
      this.master.gain.value = this.on ? 0.9 : 0;
      var comp = c.createDynamicsCompressor();
      this.master.connect(comp);
      comp.connect(c.destination);
      var len = c.sampleRate * 2;
      this.noise = c.createBuffer(1, len, c.sampleRate);
      var data = this.noise.getChannelData(0);
      for (var i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    },

    setOn: function (on) {
      this.on = on;
      store.set('chainsaw-sound', on ? 'on' : 'off');
      if (this.master) this.master.gain.setTargetAtTime(on ? 0.9 : 0, this.ctx.currentTime, 0.05);
    },

    sawStart: function (params) {
      this.sawStop();
      if (!this.ctx || !params) return;
      var c = this.ctx, t = c.currentTime;
      var o1 = c.createOscillator(), o2 = c.createOscillator();
      o1.type = 'sawtooth'; o2.type = 'square';
      o1.frequency.value = params.freq * 0.6;
      o2.frequency.value = params.freq * 0.6 * 1.012;
      var filter = c.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 900;
      var amp = c.createGain();
      amp.gain.value = 0.7;
      var lfo = c.createOscillator();
      lfo.frequency.value = 27;
      var lfoGain = c.createGain();
      lfoGain.gain.value = 0.3;
      lfo.connect(lfoGain); lfoGain.connect(amp.gain);
      var out = c.createGain();
      out.gain.value = 0;
      var o2g = c.createGain(); o2g.gain.value = 0.5;
      o1.connect(filter); o2.connect(o2g); o2g.connect(filter);
      filter.connect(amp); amp.connect(out); out.connect(this.master);
      o1.start(t); o2.start(t); lfo.start(t);

      var rumble = null;
      if (params.rumble) {
        var src = c.createBufferSource();
        src.buffer = this.noise; src.loop = true;
        var lp = c.createBiquadFilter();
        lp.type = 'lowpass'; lp.frequency.value = 140;
        var rg = c.createGain(); rg.gain.value = 0;
        src.connect(lp); lp.connect(rg); rg.connect(this.master);
        src.start(t);
        rumble = { src: src, gain: rg.gain, level: params.rumble };
      }
      this.saw = { o1: o1, o2: o2, lfo: lfo, filter: filter, out: out, params: params, rumble: rumble };
      this.sawSet(false, 0);
    },

    sawSet: function (active, load) {
      var s = this.saw;
      if (!s) return;
      var t = this.ctx.currentTime, p = s.params;
      var f = active ? p.freq * (1 - 0.2 * Math.min(1, load)) : p.freq * 0.6;
      s.o1.frequency.setTargetAtTime(f, t, 0.08);
      s.o2.frequency.setTargetAtTime(f * 1.012, t, 0.08);
      s.filter.frequency.setTargetAtTime(active ? 1800 : 700, t, 0.1);
      s.out.gain.setTargetAtTime(active ? p.level : p.level * 0.25, t, 0.08);
      if (s.rumble) {
        s.rumble.gain.setTargetAtTime(active ? s.rumble.level * Math.min(1, 0.25 + load) : 0, t, 0.25);
      }
    },

    sawStop: function () {
      var s = this.saw;
      if (!s) return;
      this.saw = null;
      var t = this.ctx.currentTime;
      s.out.gain.setTargetAtTime(0, t, 0.08);
      if (s.rumble) s.rumble.gain.setTargetAtTime(0, t, 0.2);
      setTimeout(function () {
        try {
          s.o1.stop(); s.o2.stop(); s.lfo.stop();
          if (s.rumble) s.rumble.src.stop();
        } catch (e) { /* already stopped */ }
      }, 1200);
    },

    burst: function (opts) {
      if (!this.ctx) return;
      var c = this.ctx, t = c.currentTime + (opts.delay || 0);
      var src = c.createBufferSource();
      src.buffer = this.noise;
      var f = c.createBiquadFilter();
      f.type = opts.type || 'lowpass';
      f.frequency.value = opts.freq;
      if (opts.q) f.Q.value = opts.q;
      var g = c.createGain();
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(opts.gain, t + (opts.attack || 0.005));
      g.gain.exponentialRampToValueAtTime(0.0001, t + opts.decay);
      src.connect(f); f.connect(g); g.connect(this.master);
      src.start(t, Math.random() * 1.5);
      src.stop(t + opts.decay + 0.05);
      if (opts.tone) {
        var o = c.createOscillator();
        o.frequency.setValueAtTime(opts.tone, t);
        o.frequency.exponentialRampToValueAtTime(opts.tone * 0.5, t + opts.decay);
        var og = c.createGain();
        og.gain.setValueAtTime(opts.gain * 0.6, t);
        og.gain.exponentialRampToValueAtTime(0.0001, t + opts.decay);
        o.connect(og); og.connect(this.master);
        o.start(t); o.stop(t + opts.decay + 0.05);
      }
    },

    chop: function () {
      this.burst({ type: 'bandpass', freq: 1700, q: 1.2, gain: 0.5, decay: 0.09, tone: 210 });
    },

    thud: function (intensity, delay) {
      var now = performance.now();
      if (now - this.lastThud < 70) return;
      this.lastThud = now;
      this.burst({ freq: 260, gain: Math.min(0.9, 0.35 + intensity * 0.12), attack: 0.01,
                   decay: 0.55 + Math.min(0.6, intensity * 0.05), tone: 60, delay: delay });
    },

    crash: function () {
      this.burst({ type: 'bandpass', freq: 900, q: 0.8, gain: 0.6, decay: 0.35, tone: 140 });
      this.burst({ type: 'highpass', freq: 2500, gain: 0.25, decay: 0.2, delay: 0.06 });
    }
  };

  var soundToggle = $('#sound-toggle');
  function syncSoundButton() {
    soundToggle.textContent = Sound.on ? 'Sound on' : 'Sound off';
    soundToggle.setAttribute('aria-pressed', Sound.on ? 'true' : 'false');
  }
  soundToggle.addEventListener('click', function () {
    Sound.ensure();
    Sound.setOn(!Sound.on);
    syncSoundButton();
  });
  syncSoundButton();

  // ------------------------------------------------------ Stage building

  function stageScale(def, w, h) {
    var ftPerPx = def.viewFt / Math.min(w, 1100);
    // Near days: keep the whole blade on screen. Far days: never.
    if (def.mode === 'objects' && def.bladeFt) {
      ftPerPx = Math.max(ftPerPx, def.bladeFt / (0.62 * Math.min(w, h)));
    }
    return ftPerPx;
  }

  function buildStage(index) {
    var def = STAGES[index];
    var S = {
      index: index,
      def: def,
      W: view.w,
      H: view.h,
      dpr: view.dpr,
      ftPerPx: stageScale(def, view.w, view.h),
      seed: (Math.random() * 1e9) | 0,
      trees: [],
      homes: [],
      falling: [],
      particles: [],
      lumber: 0,
      destroyed: 0,
      time: 0,
      running: false,
      cutting: false,
      blade: null,
      chain: 0,
      load: 0,
      shake: 0
    };
    S.rand = mulberry32(S.seed);
    S.wFt = S.W * S.ftPerPx;
    S.hFt = S.H * S.ftPerPx;
    S.bladePx = def.bladeFt ? def.bladeFt / S.ftPerPx : 0;
    S.ground = makeLayer(S.W, S.H, S.dpr);
    S.forest = makeLayer(S.W, S.H, S.dpr);
    genObjects(S);
    if (def.mode === 'far') genWorld(S);
    return S;
  }

  function clearedSqMi(S) {
    return S.world ? S.world.clearedSqFt / (MILE * MILE) : null;
  }

  function addHome(S, xf, yf, village) {
    var r = S.rand;
    var h = {
      id: S.homes.length + 1,
      xf: xf, yf: yf,
      x: xf / S.ftPerPx, y: yf / S.ftPerPx,
      wf: 26 + r() * 8, hf: 20 + r() * 6,
      rot: (r() - 0.5) * 0.6,
      village: village || 0,
      destroyed: false,
      flagged: false
    };
    S.homes.push(h);
    return h;
  }

  // What John can see: individual trees in a small window.
  function genObjects(S) {
    var r = S.rand, ft = S.ftPerPx;
    for (var i = 0; i < (S.def.homes || 0); i++) {
      for (var tries = 0; tries < 20; tries++) {
        var hx = S.W * (0.15 + r() * 0.7), hy = S.H * (0.22 + r() * 0.6);
        var ok = Math.abs(hx - S.W / 2) > S.W * 0.08 || Math.abs(hy - S.H / 2) > S.H * 0.1;
        for (var j = 0; j < S.homes.length; j++) {
          if (Math.hypot(S.homes[j].x - hx, S.homes[j].y - hy) < 90 / ft) ok = false;
        }
        if (ok) { addHome(S, hx * ft, hy * ft); break; }
      }
    }

    var g = S.ground.x;
    g.fillStyle = rgb(COLORS.floor);
    g.fillRect(0, 0, S.W, S.H);
    var speckles = Math.round(S.W * S.H / 60);
    for (i = 0; i < speckles; i++) {
      g.fillStyle = rgb(COLORS.floor, 0.82 + r() * 0.3);
      var s = 1 + r() * 2;
      g.fillRect(r() * S.W, r() * S.H, s, s);
    }
    S.homes.forEach(function (h) {
      g.fillStyle = rgb(COLORS.meadow);
      g.beginPath();
      g.arc(h.x, h.y, 24 / ft, 0, Math.PI * 2);
      g.fill();
    });

    var sp = 12 / ft;
    var cols = Math.ceil(S.W / sp) + 1, rows = Math.ceil(S.H / sp) + 1;
    for (var gy = 0; gy < rows; gy++) {
      for (var gx = 0; gx < cols; gx++) {
        var x = (gx + 0.5 + (r() - 0.5) * 0.85) * sp - sp * 0.5;
        var y = (gy + 0.5 + (r() - 0.5) * 0.85) * sp - sp * 0.5;
        var near = false;
        for (j = 0; j < S.homes.length; j++) {
          if (Math.hypot(S.homes[j].x - x, S.homes[j].y - y) < 26 / ft) near = true;
        }
        if (near) continue;
        S.trees.push({
          x: x, y: y,
          r: (4.6 + r() * 2.2) / ft,
          color: COLORS.canopy[(r() * COLORS.canopy.length) | 0],
          alive: true, hits: 0
        });
      }
    }
    S.trees.sort(function (a, b) { return a.y - b.y; });

    var f = S.forest.x;
    S.trees.forEach(function (t) {
      f.fillStyle = COLORS.canopyShadow;
      f.beginPath(); f.arc(t.x + t.r * 0.22, t.y + t.r * 0.3, t.r, 0, Math.PI * 2); f.fill();
    });
    S.trees.forEach(function (t) {
      f.fillStyle = t.color;
      f.beginPath(); f.arc(t.x, t.y, t.r, 0, Math.PI * 2); f.fill();
      f.fillStyle = COLORS.canopyHi;
      f.beginPath(); f.arc(t.x - t.r * 0.3, t.y - t.r * 0.3, t.r * 0.5, 0, Math.PI * 2); f.fill();
    });
  }

  // What John can reach: a coarse model of the whole forest around him, in
  // feet, centered on his window. It is never drawn during the day.
  function genWorld(S) {
    var def = S.def, r = S.rand;
    var side = def.bladeFt + Math.max(S.wFt, S.hFt) * 1.5;
    var G = 384, c = side / G, half = side / 2;
    var Wd = {
      side: side, G: G, c: c, half: half,
      cover: new Float32Array(G * G),
      density: new Float32Array(G * G),
      lake: new Float32Array(G * G),
      villages: [],
      quads: [],
      clearedSqFt: 0
    };
    S.world = Wd;

    var lakeScale = side / 3.2, toneScale = side / 7;
    var seed = S.seed;
    function computeLakes() {
      for (var gy = 0; gy < G; gy++) {
        for (var gx = 0; gx < G; gx++) {
          Wd.lake[gy * G + gx] = fbm(((gx + 0.5) * c - half) / lakeScale, ((gy + 0.5) * c - half) / lakeScale, seed + 11, 4);
        }
      }
      var sorted = Array.prototype.slice.call(Wd.lake).sort(function (a, b) { return a - b; });
      Wd.lakeT = sorted[Math.floor(sorted.length * 0.92)];
    }
    // John stands on dry land.
    for (var attempt = 0; attempt < 6; attempt++) {
      computeLakes();
      if (Wd.lake[(G / 2) * G + G / 2] < Wd.lakeT - 0.03) break;
      seed += 7919;
    }
    Wd.lakeAt = function (xf, yf) { return fbm(xf / lakeScale, yf / lakeScale, seed + 11, 4); };
    Wd.toneAt = function (xf, yf) { return fbm(xf / toneScale, yf / toneScale, seed + 23, 3); };
    Wd.cellOf = function (xf, yf) {
      var gx = Math.floor((xf + half) / c), gy = Math.floor((yf + half) / c);
      if (gx < 0 || gy < 0 || gx >= G || gy >= G) return -1;
      return gy * G + gx;
    };
    function dry(xf, yf) {
      var i = Wd.cellOf(xf, yf);
      return i >= 0 && Wd.lake[i] < Wd.lakeT - 0.01;
    }
    var winX = S.wFt / 2 + 60, winY = S.hFt / 2 + 60;
    function outsideWindow(xf, yf) { return Math.abs(xf) > winX || Math.abs(yf) > winY; }
    function randomPoint() { return [(r() - 0.5) * side * 0.96, (r() - 0.5) * side * 0.96]; }

    // Settlements.
    var areaSqMi = (side / MILE) * (side / MILE);
    var villageDefs = def.villages ? def.villages.slice() : [];
    if (def.villagesPerSqMi) {
      var nv = Math.round(areaSqMi * def.villagesPerSqMi);
      for (var i = 0; i < nv; i++) villageDefs.push({ homes: 15 + ((r() * 55) | 0), radiusFt: 600 + r() * 900 });
    }
    villageDefs.forEach(function (vd) {
      for (var tries = 0; tries < 40; tries++) {
        var p = randomPoint();
        var nearWindow = Math.abs(p[0]) < winX + vd.radiusFt && Math.abs(p[1]) < winY + vd.radiusFt;
        if (!dry(p[0], p[1]) || nearWindow) continue;
        var v = { id: Wd.villages.length + 1, xf: p[0], yf: p[1], rf: vd.radiusFt };
        Wd.villages.push(v);
        for (var k = 0; k < vd.homes; k++) {
          var a = r() * Math.PI * 2, d = Math.sqrt(r()) * v.rf * 0.8;
          var hx = v.xf + Math.cos(a) * d, hy = v.yf + Math.sin(a) * d;
          if (dry(hx, hy)) addHome(S, hx, hy, v.id);
        }
        break;
      }
    });
    var nc = def.cabins || Math.round(areaSqMi * (def.cabinsPerSqMi || 0));
    for (i = 0; i < nc; i++) {
      for (var t2 = 0; t2 < 10; t2++) {
        var q = randomPoint();
        if (dry(q[0], q[1]) && outsideWindow(q[0], q[1])) { addHome(S, q[0], q[1], 0); break; }
      }
    }

    // Surveyors.
    if (def.surveyed) {
      S.homes.forEach(function (h) { h.flagged = r() < def.surveyed; });
    } else if (def.surveyedCount) {
      for (i = 0; i < def.surveyedCount && S.homes.length; i++) {
        S.homes[(r() * S.homes.length) | 0].flagged = true;
      }
    }

    // Trees per square foot in each cell.
    for (var gy = 0; gy < G; gy++) {
      for (var gx = 0; gx < G; gx++) {
        var idx = gy * G + gx;
        if (Wd.lake[idx] >= Wd.lakeT) continue;
        var cx = (gx + 0.5) * c - half, cy = (gy + 0.5) * c - half;
        var inV = false;
        for (var vi = 0; vi < Wd.villages.length; vi++) {
          var vv = Wd.villages[vi];
          if (Math.abs(cx - vv.xf) < vv.rf && Math.abs(cy - vv.yf) < vv.rf && Math.hypot(cx - vv.xf, cy - vv.yf) < vv.rf) { inV = true; break; }
        }
        if (!inV) Wd.density[idx] = 1 / SQFT_PER_TREE;
      }
    }
  }

  // ------------------------------------------------------------- Drawing

  function drawHome(x, h, sx, sy, pxPerFt) {
    var w = h.wf * pxPerFt, d = h.hf * pxPerFt;
    if (w < 0.7) return;
    if (w < 4) {
      x.fillStyle = h.destroyed ? COLORS.ruin : COLORS.roof;
      x.fillRect(sx - w / 2, sy - d / 2, Math.max(w, 1), Math.max(d, 1));
      return;
    }
    x.save();
    x.translate(sx, sy);
    x.rotate(h.rot);
    if (!h.destroyed) {
      x.fillStyle = 'rgba(0,0,0,0.28)';
      x.fillRect(-w / 2 + w * 0.08, -d / 2 + d * 0.12, w, d);
      x.fillStyle = COLORS.roof;
      x.fillRect(-w / 2, -d / 2, w, d / 2);
      x.fillStyle = COLORS.roofDark;
      x.fillRect(-w / 2, 0, w, d / 2);
      x.strokeStyle = 'rgba(40,20,10,0.5)';
      x.lineWidth = Math.max(0.5, pxPerFt * 0.4);
      x.beginPath(); x.moveTo(-w / 2, 0); x.lineTo(w / 2, 0); x.stroke();
      x.fillStyle = '#4f4740';
      x.fillRect(w * 0.22, -d * 0.36, 3 * pxPerFt, 3 * pxPerFt);
    } else {
      var r = mulberry32(h.id * 7919 + 3);
      x.fillStyle = 'rgba(60,50,40,0.35)';
      x.fillRect(-w / 2, -d / 2, w, d);
      x.strokeStyle = '#5a5148';
      x.lineWidth = Math.max(1, pxPerFt * 0.7);
      x.beginPath();
      x.moveTo(-w / 2, -d / 2); x.lineTo(w * 0.1, -d / 2);
      x.moveTo(w / 2, -d * 0.2); x.lineTo(w / 2, d / 2); x.lineTo(-w * 0.2, d / 2);
      x.moveTo(-w / 2, d * 0.1); x.lineTo(-w / 2, -d / 2);
      x.stroke();
      for (var i = 0; i < 16; i++) {
        x.save();
        x.translate((r() - 0.5) * w * 1.5, (r() - 0.5) * d * 1.5);
        x.rotate(r() * Math.PI);
        x.fillStyle = r() < 0.5 ? COLORS.wall : (r() < 0.5 ? COLORS.roof : COLORS.roofDark);
        var len = (4 + r() * 9) * pxPerFt;
        x.fillRect(-len / 2, -0.4 * pxPerFt, len, 0.9 * pxPerFt);
        x.restore();
      }
      x.fillStyle = '#7b736b';
      x.fillRect(w * 0.22, -d * 0.36, 3 * pxPerFt, 3 * pxPerFt);
    }
    x.restore();
  }

  function drawPin(x, sx, sy, destroyed) {
    x.save();
    x.translate(sx, sy);
    if (destroyed) x.rotate(0.9);
    x.strokeStyle = destroyed ? 'rgba(220,214,204,0.7)' : '#f7f4ee';
    x.lineWidth = 1.5;
    x.beginPath(); x.moveTo(0, 0); x.lineTo(0, -13); x.stroke();
    x.fillStyle = destroyed ? 'rgba(160,150,140,0.8)' : COLORS.pin;
    x.beginPath(); x.moveTo(0, -13); x.lineTo(9, -10); x.lineTo(0, -7); x.closePath(); x.fill();
    x.fillStyle = 'rgba(0,0,0,0.35)';
    x.beginPath(); x.arc(0, 0, 1.6, 0, Math.PI * 2); x.fill();
    x.restore();
  }

  function bladeEnds(S) {
    var b = S.blade, h = S.bladePx / 2;
    var dx = Math.cos(b.ang) * h, dy = Math.sin(b.ang) * h;
    return { ax: b.x - dx, ay: b.y - dy, bx: b.x + dx, by: b.y + dy };
  }

  function drawBlade(x, S) {
    if (!S.blade || !S.def.bladeFt) return;
    // Only draw the part of the blade that could be on screen.
    var half = Math.min(S.bladePx / 2, Math.hypot(S.W, S.H) * 1.1);
    var dxh = Math.cos(S.blade.ang) * half, dyh = Math.sin(S.blade.ang) * half;
    var e = { ax: S.blade.x - dxh, ay: S.blade.y - dyh, bx: S.blade.x + dxh, by: S.blade.y + dyh };
    var w = Math.max(3, Math.min(9, S.bladePx * 0.035));
    x.lineCap = 'round';
    x.strokeStyle = 'rgba(0,0,0,0.3)';
    x.lineWidth = w + 3;
    x.beginPath(); x.moveTo(e.ax + 3, e.ay + 4); x.lineTo(e.bx + 3, e.by + 4); x.stroke();
    x.strokeStyle = '#d4d7d9';
    x.lineWidth = w;
    x.beginPath(); x.moveTo(e.ax, e.ay); x.lineTo(e.bx, e.by); x.stroke();
    x.setLineDash([w * 0.9, w * 0.9]);
    x.lineDashOffset = -S.chain;
    x.strokeStyle = '#43484e';
    x.lineWidth = Math.max(1.2, w * 0.38);
    x.beginPath(); x.moveTo(e.ax, e.ay); x.lineTo(e.bx, e.by); x.stroke();
    x.setLineDash([]);
    x.save();
    x.translate(S.blade.x, S.blade.y);
    x.rotate(S.blade.ang);
    var mw = Math.max(13, w * 3), mh = Math.max(10, w * 2.3);
    x.fillStyle = '#2b2a28';
    x.fillRect(-mw / 2 + 1.5, -mh / 2 + 2, mw, mh);
    x.fillStyle = '#b5472b';
    x.fillRect(-mw / 2, -mh / 2, mw, mh);
    x.fillStyle = 'rgba(255,255,255,0.25)';
    x.fillRect(-mw / 2, -mh / 2, mw, mh * 0.3);
    x.restore();
  }

  function fitFor(S) {
    var s = Math.min(view.w / S.W, view.h / S.H);
    return { s: s, ox: (view.w - S.W * s) / 2, oy: (view.h - S.H * s) / 2 };
  }

  var FOG = '226, 228, 220';

  function drawFog(x, S) {
    var cx = S.W / 2, cy = S.H / 2;
    var inner = Math.min(S.W, S.H) * 0.3, outer = Math.hypot(S.W, S.H) * 0.52;
    var g = x.createRadialGradient(cx, cy, inner, cx, cy, outer);
    g.addColorStop(0, 'rgba(' + FOG + ', 0)');
    g.addColorStop(0.55, 'rgba(' + FOG + ', 0.5)');
    g.addColorStop(1, 'rgba(' + FOG + ', 0.97)');
    x.fillStyle = g;
    x.fillRect(0, 0, S.W, S.H);
  }

  function fmtDist(ft) {
    if (ft < 0.2 * MILE) return Math.round(ft / 10) * 10 + ' ft';
    var mi = ft / MILE;
    return (mi < 10 ? mi.toFixed(1) : Math.round(mi)) + ' mi';
  }

  // Surveyors' reports: a direction and a distance, nothing more. Reports
  // pointing the same way are merged, showing the nearest and a count.
  function drawReports(x, S) {
    var cx = S.W / 2, cy = S.H / 2, R = Math.min(S.W, S.H) * 0.42;
    var reports = [];
    for (var i = 0; i < S.homes.length; i++) {
      var h = S.homes[i];
      if (h.flagged) reports.push({ ang: Math.atan2(h.yf, h.xf), dist: Math.hypot(h.xf, h.yf) });
    }
    if (!reports.length) return;
    reports.sort(function (a, b) { return a.ang - b.ang; });
    var groups = [];
    reports.forEach(function (rp) {
      var g = groups[groups.length - 1];
      if (g && rp.ang - g.start < 0.14) { g.angs.push(rp.ang); g.dist = Math.min(g.dist, rp.dist); }
      else groups.push({ start: rp.ang, angs: [rp.ang], dist: rp.dist });
    });
    x.font = '500 10px "IBM Plex Mono", ui-monospace, monospace';
    x.textAlign = 'center';
    x.textBaseline = 'middle';
    groups.forEach(function (g) {
      var a = g.angs.reduce(function (s2, v) { return s2 + v; }, 0) / g.angs.length;
      var c = Math.cos(a), s = Math.sin(a);
      var px = cx + c * R, py = cy + s * R;
      drawPin(x, px, py + 5, false);
      var label = fmtDist(g.dist) + (g.angs.length > 1 ? ' \u00d7' + g.angs.length : '');
      var tw = x.measureText(label).width;
      var lx = cx + c * (R + 20), ly = cy + s * (R + 20) + 4;
      x.fillStyle = 'rgba(30, 27, 24, 0.62)';
      x.fillRect(lx - tw / 2 - 4, ly - 7, tw + 8, 14);
      x.fillStyle = '#f7f4ee';
      x.fillText(label, lx, ly);
    });
    x.textBaseline = 'alphabetic';
  }

  function render(S, now, dt) {
    ctx.setTransform(view.dpr, 0, 0, view.dpr, 0, 0);
    ctx.fillStyle = '#2d3a2a';
    ctx.fillRect(0, 0, view.w, view.h);
    if (!S) return;
    var fit = fitFor(S);
    ctx.save();
    ctx.translate(fit.ox, fit.oy);
    ctx.scale(fit.s, fit.s);
    ctx.save();
    if (S.shake > 0.05 && !REDUCED_MOTION) {
      ctx.translate((Math.random() - 0.5) * S.shake, (Math.random() - 0.5) * S.shake);
    }
    ctx.drawImage(S.ground.c, 0, 0, S.W, S.H);
    ctx.drawImage(S.forest.c, 0, 0, S.W, S.H);

    var pxPerFt = 1 / S.ftPerPx;
    var i;
    // Axe progress marks.
    for (i = 0; i < S.trees.length; i++) {
      var t = S.trees[i];
      if (!t.alive || !t.hits) continue;
      ctx.strokeStyle = '#f0c674';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(t.x, t.y, t.r + 4, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * t.hits / 3);
      ctx.stroke();
    }
    if (S.def.mode === 'objects') {
      S.homes.forEach(function (h) { drawHome(ctx, h, h.x, h.y, pxPerFt); });
    }
    // Falling trees.
    var keep = [];
    for (i = 0; i < S.falling.length; i++) {
      var f = S.falling[i];
      var p = Math.min(1, (now - f.t0) / 650);
      var e = p * p;
      var L = f.r * 4.5;
      var ex = f.x + Math.cos(f.ang) * L * e, ey = f.y + Math.sin(f.ang) * L * e;
      ctx.strokeStyle = COLORS.bark;
      ctx.lineWidth = Math.max(1.5, f.r * 0.35);
      ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(f.x, f.y); ctx.lineTo(ex, ey); ctx.stroke();
      ctx.fillStyle = f.color;
      ctx.beginPath(); ctx.arc(ex, ey, f.r * (1 - 0.25 * e), 0, Math.PI * 2); ctx.fill();
      if (p >= 1) bakeLog(S, f);
      else keep.push(f);
    }
    S.falling = keep;

    // Particles.
    var alive = [];
    for (i = 0; i < S.particles.length; i++) {
      var q = S.particles[i];
      q.life -= dt;
      if (q.life <= 0) continue;
      q.x += q.vx * dt; q.y += q.vy * dt;
      q.vx *= 0.94; q.vy *= 0.94;
      ctx.globalAlpha = Math.min(1, q.life / q.max) * q.alpha;
      ctx.fillStyle = q.color;
      ctx.fillRect(q.x - q.size / 2, q.y - q.size / 2, q.size, q.size);
      alive.push(q);
    }
    ctx.globalAlpha = 1;
    S.particles = alive;

    drawBlade(ctx, S);
    ctx.restore();
    if (S.def.mode === 'far') {
      drawFog(ctx, S);
      drawReports(ctx, S);
    }
    ctx.restore();
  }

  // -------------------------------------------------------------- Cutting

  function spawn(S, x, y, n, kind) {
    var colors = kind === 'dust' ? ['#c9b48a', '#a88c62', '#dcc9a0'] : ['#e5cf9c', '#c9a66b', '#5b7a4a'];
    for (var i = 0; i < n && S.particles.length < 600; i++) {
      var a = Math.random() * Math.PI * 2, sp = 20 + Math.random() * (kind === 'dust' ? 50 : 120);
      var life = 0.4 + Math.random() * (kind === 'dust' ? 1.4 : 0.6);
      S.particles.push({
        x: x, y: y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp,
        life: life, max: life,
        size: kind === 'dust' ? 2 + Math.random() * 4 : 1.5 + Math.random() * 2.5,
        alpha: kind === 'dust' ? 0.35 : 0.9,
        color: colors[(Math.random() * colors.length) | 0]
      });
    }
  }

  function bakeLog(S, f) {
    var g = S.ground.x, L = f.r * 4.5;
    var ex = f.x + Math.cos(f.ang) * L, ey = f.y + Math.sin(f.ang) * L;
    g.fillStyle = 'rgba(96, 100, 60, 0.45)';
    g.beginPath(); g.ellipse(ex, ey, f.r * 0.7, f.r * 0.45, f.ang, 0, Math.PI * 2); g.fill();
    g.strokeStyle = COLORS.bark;
    g.lineCap = 'round';
    g.lineWidth = Math.max(1.5, f.r * 0.35);
    g.beginPath(); g.moveTo(f.x, f.y); g.lineTo(ex, ey); g.stroke();
    g.fillStyle = COLORS.stump;
    g.beginPath(); g.arc(f.x, f.y, Math.max(1.2, f.r * 0.28), 0, Math.PI * 2); g.fill();
  }

  function fell(S, t, dirAng, now) {
    t.alive = false;
    // On far days the world model does the counting; these are just the
    // trees John happens to see fall.
    if (S.def.mode === 'objects') S.lumber += 1;
    var f = S.forest.x;
    f.globalCompositeOperation = 'destination-out';
    f.beginPath(); f.arc(t.x + t.r * 0.1, t.y + t.r * 0.12, t.r * 1.32, 0, Math.PI * 2); f.fill();
    f.globalCompositeOperation = 'source-over';
    var g = S.ground.x;
    g.fillStyle = COLORS.stump;
    g.beginPath(); g.arc(t.x, t.y, Math.max(1.2, t.r * 0.28), 0, Math.PI * 2); g.fill();
    var fallen = { x: t.x, y: t.y, r: t.r, color: t.color,
                   ang: dirAng + (Math.random() - 0.5) * 1.2, t0: now + Math.random() * 120 };
    if (S.falling.length < 260) S.falling.push(fallen);
    else bakeLog(S, fallen);
    if (S.particles.length < 300) spawn(S, t.x, t.y, 4, 'chips');
  }

  function destroyHome(S, h) {
    if (h.destroyed) return;
    h.destroyed = true;
    S.destroyed += 1;
    if (S.def.mode === 'objects') {
      spawn(S, h.x, h.y, 30, 'chips');
      Sound.crash();
    }
  }

  // Sweep the blade from its previous position to its current one (pixels).
  function sweep(S, a0x, a0y, b0x, b0y, a1x, a1y, b1x, b1y, now) {
    var tol = Math.max((S.def.cutReachFt || 1.5) / S.ftPerPx, 2);
    var minX = Math.min(a0x, b0x, a1x, b1x) - tol, maxX = Math.max(a0x, b0x, a1x, b1x) + tol;
    var minY = Math.min(a0y, b0y, a1y, b1y) - tol, maxY = Math.max(a0y, b0y, a1y, b1y) + tol;
    var moveAng = S.blade.ang + Math.PI / 2;
    if (S.lastMove) moveAng = Math.atan2(S.lastMove.y, S.lastMove.x);

    function hit(px, py, extra) {
      if (px < minX - extra || px > maxX + extra || py < minY - extra || py > maxY + extra) return false;
      return inTri(px, py, a0x, a0y, b0x, b0y, b1x, b1y) ||
             inTri(px, py, a0x, a0y, b1x, b1y, a1x, a1y) ||
             distToSeg(px, py, a1x, a1y, b1x, b1y) < tol + extra;
    }

    var count = 0, i;
    for (i = 0; i < S.trees.length; i++) {
      var t = S.trees[i];
      if (t.alive && hit(t.x, t.y, 0)) {
        fell(S, t, moveAng, now);
        count++;
        Sound.thud(count, 0.6);
      }
    }
    if (S.def.mode === 'objects') {
      for (i = 0; i < S.homes.length; i++) {
        var h = S.homes[i];
        if (!h.destroyed && hit(h.x, h.y, Math.max(h.wf, h.hf) * 0.5 / S.ftPerPx)) destroyHome(S, h);
      }
      if (count) {
        S.load = Math.min(1, S.load + count * 0.08);
        if (S.index >= 2) S.shake = Math.min(7, S.shake + count * 0.12);
      }
      return;
    }
    sweepWorld(S, a0x, a0y, b0x, b0y, a1x, a1y, b1x, b1y);
  }

  // Everything the blade reaches beyond the window happens here, unseen.
  function sweepWorld(S, a0x, a0y, b0x, b0y, a1x, a1y, b1x, b1y) {
    var Wd = S.world, ft = S.ftPerPx, cx = S.W / 2, cy = S.H / 2;
    function F(v, c0) { return (v - c0) * ft; }
    var A0x = F(a0x, cx), A0y = F(a0y, cy), B0x = F(b0x, cx), B0y = F(b0y, cy);
    var A1x = F(a1x, cx), A1y = F(a1y, cy), B1x = F(b1x, cx), B1y = F(b1y, cy);
    var moved = Math.hypot(A1x - A0x, A1y - A0y) + Math.hypot(B1x - B0x, B1y - B0y);
    if (moved < 0.5) return;
    Wd.quads.push([A0x, A0y, B0x, B0y, B1x, B1y, A1x, A1y]);

    // Coverage: sample along the blade; each sample sweeps a thin strip.
    var L = S.def.bladeFt;
    var n = Math.min(4000, Math.ceil(L / (Wd.c * 0.5)));
    var spacing = L / n, cellArea = Wd.c * Wd.c, added = 0, lumber = 0;
    var d1x = (B1x - A1x) / L, d1y = (B1y - A1y) / L;
    for (var i = 0; i < n; i++) {
      var k = (i + 0.5) / n;
      var p0x = A0x + (B0x - A0x) * k, p0y = A0y + (B0y - A0y) * k;
      var p1x = A1x + (B1x - A1x) * k, p1y = A1y + (B1y - A1y) * k;
      var perp = Math.abs((p1x - p0x) * d1y - (p1y - p0y) * d1x);
      if (perp <= 0) continue;
      var idx = Wd.cellOf((p0x + p1x) / 2, (p0y + p1y) / 2);
      if (idx < 0 || !Wd.density[idx]) continue;
      var old = Wd.cover[idx];
      if (old >= cellArea) continue;
      var nw = Math.min(cellArea, old + perp * spacing);
      Wd.cover[idx] = nw;
      added += nw - old;
      lumber += (nw - old) * Wd.density[idx];
    }
    Wd.clearedSqFt += added;
    S.lumber += lumber;

    // Homes: exact test against the swept quad.
    var minX = Math.min(A0x, B0x, A1x, B1x), maxX = Math.max(A0x, B0x, A1x, B1x);
    var minY = Math.min(A0y, B0y, A1y, B1y), maxY = Math.max(A0y, B0y, A1y, B1y);
    for (i = 0; i < S.homes.length; i++) {
      var h = S.homes[i];
      if (h.destroyed) continue;
      var rr = Math.max(h.wf, h.hf) * 0.5;
      if (h.xf < minX - rr || h.xf > maxX + rr || h.yf < minY - rr || h.yf > maxY + rr) continue;
      if (inTri(h.xf, h.yf, A0x, A0y, B0x, B0y, B1x, B1y) ||
          inTri(h.xf, h.yf, A0x, A0y, B1x, B1y, A1x, A1y) ||
          distToSeg(h.xf, h.yf, A1x, A1y, B1x, B1y) < rr) {
        destroyHome(S, h);
      }
    }

    if (added > 0) {
      // Felt, not seen: load on the saw, a rumble, the ground shaking, and
      // dust drifting in from where the blade disappears into the fog.
      var rate = added / (L * S.wFt * 0.05);
      S.load = Math.min(1, S.load + rate);
      S.shake = Math.min(8, S.shake + rate * 3);
      var half = Math.hypot(S.W, S.H) * 0.5;
      var ux = Math.cos(S.blade.ang), uy = Math.sin(S.blade.ang);
      for (var sgn = -1; sgn <= 1; sgn += 2) {
        if (Math.random() < Math.min(0.9, 0.2 + rate * 4)) {
          var dd = half * (0.55 + Math.random() * 0.4);
          spawn(S, S.blade.x + ux * dd * sgn, S.blade.y + uy * dd * sgn, 2, 'dust');
        }
      }
    }
  }

  // --------------------------------------------------------------- Input

  var pointerDown = false;

  function pointerPos(S, e) {
    var rect = canvas.getBoundingClientRect();
    var fit = fitFor(S);
    return { x: (e.clientX - rect.left - fit.ox) / fit.s, y: (e.clientY - rect.top - fit.oy) / fit.s };
  }

  function moveBlade(S, p, cutting, now) {
    if (!S.blade) {
      S.blade = { x: p.x, y: p.y, ang: 0 };
      if (cutting) {
        var e0 = bladeEnds(S);
        sweep(S, e0.ax, e0.ay, e0.bx, e0.by, e0.ax, e0.ay, e0.bx, e0.by, now);
      }
      return;
    }
    var prev = bladeEnds(S);
    var dx = p.x - S.blade.x, dy = p.y - S.blade.y;
    var dist = Math.hypot(dx, dy);
    if (dist > 0.5) {
      S.lastMove = { x: dx, y: dy };
      var target = Math.atan2(dy, dx) + Math.PI / 2;
      // A blade has no front or back: pick the equivalent angle closest to now.
      while (target - S.blade.ang > Math.PI / 2) target -= Math.PI;
      while (target - S.blade.ang < -Math.PI / 2) target += Math.PI;
      S.blade.ang += (target - S.blade.ang) * Math.min(0.35, dist / 40);
    }
    S.blade.x = p.x; S.blade.y = p.y;
    if (cutting) {
      var e1 = bladeEnds(S);
      sweep(S, prev.ax, prev.ay, prev.bx, prev.by, e1.ax, e1.ay, e1.bx, e1.by, now);
    }
  }

  function chopAt(S, p, now) {
    var best = null, bestD = Infinity;
    for (var i = 0; i < S.trees.length; i++) {
      var t = S.trees[i];
      if (!t.alive) continue;
      var d = Math.hypot(t.x - p.x, t.y - p.y);
      if (d < t.r * 1.25 + 6 && d < bestD) { best = t; bestD = d; }
    }
    if (!best) return;
    best.hits += 1;
    Sound.chop();
    spawn(S, best.x, best.y, 6, 'chips');
    if (best.hits >= 3) {
      fell(S, best, Math.atan2(best.y - p.y, best.x - p.x) || Math.random() * 6.28, now);
      Sound.thud(1, 0.6);
    }
  }

  canvas.addEventListener('pointerdown', function (e) {
    var S = state.S;
    if (!S || !S.running) return;
    e.preventDefault();
    Sound.ensure();
    pointerDown = true;
    try { canvas.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
    var p = pointerPos(S, e), now = performance.now();
    if (S.def.key === 'axe') { chopAt(S, p, now); return; }
    S.cutting = true;
    if (e.pointerType !== 'mouse') S.blade = null;
    moveBlade(S, p, true, now);
    Sound.sawSet(true, S.load);
    hideHintSoon(400);
  });

  canvas.addEventListener('pointermove', function (e) {
    var S = state.S;
    if (!S || !S.running || S.def.key === 'axe') return;
    if (e.pointerType !== 'mouse' && !pointerDown) return;
    var events = e.getCoalescedEvents ? e.getCoalescedEvents() : [e];
    if (!events.length) events = [e];
    var now = performance.now();
    for (var i = 0; i < events.length; i++) moveBlade(S, pointerPos(S, events[i]), S.cutting, now);
  });

  function release() {
    pointerDown = false;
    var S = state.S;
    if (!S) return;
    S.cutting = false;
    if (S.running) Sound.sawSet(false, 0);
  }
  canvas.addEventListener('pointerup', release);
  canvas.addEventListener('pointercancel', release);

  // ---------------------------------------------------------------- HUD

  var hudCount = $('#hud-count'), hudSub = $('#hud-sub'), sunFill = $('#sun-fill');
  var lastCountText = '';

  function scaleBar(S) {
    var targetPx = 110, ftPerPx = S.ftPerPx / fitFor(S).s;
    var steps = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000];
    var miles = [0.5, 1, 2, 5, 10, 20, 50, 100, 200];
    var best = null;
    steps.forEach(function (ft) {
      if (ft / ftPerPx <= targetPx * 1.6) best = { len: ft, label: ft + ' ft' };
    });
    miles.forEach(function (mi) {
      if (mi * MILE / ftPerPx <= targetPx * 1.6 && mi * MILE / ftPerPx >= 30) best = { len: mi * MILE, label: mi + (mi === 1 ? ' mile' : ' miles') };
    });
    if (!best) best = { len: 1, label: '1 ft' };
    $('#scale-bar').style.width = Math.round(best.len / ftPerPx) + 'px';
    $('#scale-label').textContent = best.label;
  }

  function updateHud(S) {
    var text = fmt(S.lumber);
    if (text !== lastCountText) { hudCount.textContent = text; lastCountText = text; }
    if (S.world) {
      hudSub.textContent = fmtArea(clearedSqMi(S)) + ' cleared';
    } else {
      hudSub.textContent = '';
    }
    sunFill.style.width = Math.min(100, S.time / DAY_SECONDS * 100) + '%';
  }

  var hintTimer = null;
  function showHint(text) {
    hintEl.textContent = text;
    hintEl.classList.remove('gone');
    clearTimeout(hintTimer);
    hintTimer = setTimeout(function () { hintEl.classList.add('gone'); }, 7000);
  }
  function hideHintSoon(ms) {
    clearTimeout(hintTimer);
    hintTimer = setTimeout(function () { hintEl.classList.add('gone'); }, ms);
  }

  // --------------------------------------------------------------- Story

  var state = {
    S: null,
    next: null,
    results: [],
    visitors: 0,
    totalLumber: 0
  };

  function resultFor(key) {
    for (var i = 0; i < state.results.length; i++) if (state.results[i].key === key) return state.results[i];
    return null;
  }

  function showCard(build) {
    card.classList.remove('on');
    card.innerHTML = '';
    build(card);
    card.scrollTop = 0;
    requestAnimationFrame(function () {
      card.classList.add('on');
      var primary = card.querySelector('.primary');
      if (primary) primary.focus({ preventScroll: true });
    });
  }

  function hideCard() { card.classList.remove('on'); }

  function addParas(root, paras) {
    paras.forEach(function (p) {
      if (!p) return;
      if (typeof p === 'string') root.appendChild(el('p', null, p));
      else if (p.brk) root.appendChild(el('p', { class: 'break' }, p.brk));
      else root.appendChild(el('p', { class: p.cls || '' }, p.text));
    });
  }

  function addChoices(root, choices) {
    var wrap = el('div', { class: 'choices' });
    choices.forEach(function (c) {
      var b;
      if (c.href) {
        b = el('a', { href: c.href, class: c.primary ? 'primary' : '' }, c.label);
      } else {
        b = el('button', { type: 'button', class: c.primary ? 'primary' : '' }, c.label);
        b.addEventListener('click', function () {
          Sound.ensure();
          wrap.querySelectorAll('button').forEach(function (x) { x.disabled = true; });
          setTimeout(c.onClick, 30);
        });
      }
      wrap.appendChild(b);
    });
    root.appendChild(wrap);
  }

  function addTown(root) {
    var cv = el('canvas', { class: 'town', 'aria-hidden': 'true' });
    root.appendChild(cv);
    var big = state.totalLumber > 1e6;
    root.appendChild(el('p', { class: 'town-label' }, big ? 'The city' : 'The town'));
    requestAnimationFrame(function () { drawTown(cv, state.totalLumber); });
  }

  function drawTown(cv, lumber) {
    var w = cv.clientWidth || 400, h = cv.clientHeight || 96, dpr = view.dpr;
    cv.width = w * dpr; cv.height = h * dpr;
    var x = cv.getContext('2d');
    x.setTransform(dpr, 0, 0, dpr, 0, 0);
    var cs = getComputedStyle(document.documentElement);
    var ink = cs.getPropertyValue('--text-soft').trim() || '#3b3833';
    var rule = cs.getPropertyValue('--rule').trim() || '#e2ddd3';
    var accent = cs.getPropertyValue('--accent').trim() || '#a8462a';
    var L = Math.log10(1 + lumber);
    var n = Math.max(4, Math.min(110, Math.round(3 + L * L * 1.1)));
    var maxH = Math.min(h - 8, 10 + L * 7.5);
    var r = mulberry32(42);
    var bw = Math.max(3, Math.min(18, (w * 0.9) / n));
    var total = n * bw * 1.05;
    var x0 = (w - total) / 2;
    x.strokeStyle = rule;
    x.lineWidth = 1;
    x.beginPath(); x.moveTo(0, h - 0.5); x.lineTo(w, h - 0.5); x.stroke();
    // Build from the middle outward so growth reads as a town spreading.
    var order = [];
    for (var i = 0; i < n; i++) order.push(i);
    for (i = 0; i < n; i++) {
      var k = r();
      var center = 1 - Math.abs(i - n / 2) / (n / 2);
      var bh = Math.max(5, maxH * (0.25 + 0.75 * k * (0.4 + 0.6 * center)));
      var bx = x0 + i * bw * 1.05;
      x.fillStyle = ink;
      x.globalAlpha = 0.55 + 0.45 * k;
      x.fillRect(bx, h - bh, bw, bh);
      if (bh < 18 && bw > 5) {
        x.beginPath(); x.moveTo(bx - 1, h - bh); x.lineTo(bx + bw / 2, h - bh - bw * 0.5); x.lineTo(bx + bw + 1, h - bh); x.fill();
      }
      if (bh > 24 && bw > 6) {
        x.fillStyle = accent;
        x.globalAlpha = 0.6;
        for (var wy = h - bh + 5; wy < h - 6; wy += 7) {
          if (r() < 0.55) x.fillRect(bx + bw * 0.3, wy, Math.max(1, bw * 0.15), 2);
          if (r() < 0.55) x.fillRect(bx + bw * 0.6, wy, Math.max(1, bw * 0.15), 2);
        }
      }
    }
    x.globalAlpha = 1;
  }

  function addTally(root, S) {
    var dl = el('dl', { class: 'tally' });
    function row(k, v) { dl.appendChild(el('dt', null, k)); dl.appendChild(el('dd', null, v)); }
    row('Trees felled today', fmt(S.lumber));
    if (S.world) {
      row('Forest cleared', fmtArea(clearedSqMi(S)));
    }
    row('All-time', fmt(state.totalLumber) + ' trees');
    root.appendChild(dl);
  }

  function kicker(root, text) { root.appendChild(el('span', { class: 'kicker' }, text)); }

  function prebuild(index) {
    state.next = null;
    setTimeout(function () {
      if (index < STAGES.length) state.next = { index: index, S: buildStage(index), w: view.w, h: view.h };
    }, 700);
  }

  function startDay(index) {
    var S;
    if (state.next && state.next.index === index && state.next.w === view.w && state.next.h === view.h) S = state.next.S;
    else S = buildStage(index);
    state.next = null;
    state.S = S;
    S.running = true;
    S.time = 0;
    lastCountText = '';
    $('#hud-day').textContent = S.def.day;
    $('#hud-tool').textContent = S.def.tool;
    $('#hud-reach').textContent = 'Reach ' + fmtLen(S.def.bladeFt || S.def.reachFt) + ' \u00b7 Sight ' + fmtLen(S.wFt);
    hud.hidden = false;
    scaleBar(S);
    hideCard();
    dim.classList.remove('on');
    showHint(S.def.hint);
    Sound.ensure();
    if (S.def.sound) Sound.sawStart(S.def.sound);
    canvas.style.cursor = S.def.key === 'axe' ? 'pointer' : 'none';
  }

  function endDay() {
    var S = state.S;
    if (!S || !S.running) return;
    S.running = false;
    S.cutting = false;
    pointerDown = false;
    Sound.sawStop();
    canvas.style.cursor = 'default';
    state.totalLumber += S.lumber;
    state.results.push({
      key: S.def.key, label: S.def.short, trees: S.lumber, homes: S.destroyed,
      area: clearedSqMi(S)
    });
    setTimeout(function () {
      hud.hidden = true;
      dim.classList.add('on');
      night(S.index);
    }, 700);
  }

  $('#end-day').addEventListener('click', endDay);

  function continueOrStop(root, yes, no, nextIndex, stopTool) {
    addChoices(root, [
      { label: yes, primary: true, onClick: function () { startDay(nextIndex); } },
      { label: no, onClick: function () { epilogue(stopTool); } }
    ]);
    prebuild(nextIndex);
  }

  function intro() {
    state.S = buildStage(0);
    state.S.running = false;
    dim.classList.add('on');
    showCard(function (root) {
      kicker(root, 'An interactive parable');
      root.appendChild(el('h1', null, 'The 100-mile chainsaw'));
      addParas(root, [
        { cls: 'lede', text: 'A story about a lumberjack, a town that needed lumber, and a tool that kept getting bigger.' },
        { cls: 'note', text: 'Adapted from an essay by Dan Tao (2023). About five minutes. Best with sound on.' }
      ]);
      addChoices(root, [
        { label: 'Begin', primary: true, onClick: day1Intro },
        { label: 'Read the essay instead', href: '/posts/100-mile-chainsaw.html' }
      ]);
    });
  }

  function day1Intro() {
    showCard(function (root) {
      kicker(root, 'Day 1');
      addParas(root, [
        { cls: 'lede', text: 'John was a lumberjack. Every day he would go to the forest, chop down trees, and haul them back to town to sell to anyone who needed lumber.' },
        'Fortunately for John, everyone needed lumber, all the time, as the town had many flourishing businesses and the population was growing.'
      ]);
      addChoices(root, [{ label: 'Go to the forest', primary: true, onClick: function () { startDay(0); } }]);
    });
  }

  function night(index) {
    var S = state.S;
    showCard(function (root) {
      var key = S.def.key;
      if (key === 'axe') {
        kicker(root, 'Evening');
        addTally(root, S);
        addTown(root);
        addParas(root, [
          'Whenever John wanted to make a bit of extra money, he could push himself to work extra hard and cut down a few more trees to sell. While it was demanding work, he always felt incredibly gratified after such days.',
          { brk: 'One day' },
          'A traveling salesman came into town and showed John an incredible tool he had never seen before. The salesman called it a “chainsaw” and showed John that with very little effort, this tool could cut through logs in a fraction of the time it would take him with an axe.'
        ]);
        continueOrStop(root, 'Buy the chainsaw', 'Keep the axe', 1, 'the axe');
      } else if (key === 'chainsaw') {
        kicker(root, 'Evening');
        addTally(root, S);
        addTown(root);
        var axe = resultFor('axe');
        var ratio = axe && axe.trees ? S.lumber / axe.trees : 0;
        addParas(root, [
          ratio >= 1.5 ? { cls: 'lede', text: 'John brought ' + (ratio >= 10 ? Math.round(ratio) : ratio.toFixed(1)) + ' times his usual haul of lumber into town.' } : null,
          'The people were astounded and overjoyed, and everyone congratulated John on his wise investment. John made more money than he had ever earned in a single day before, and went to bed that night knowing that his life had changed.',
          { brk: 'Weeks went by' },
          'Seeing just how much of a difference the chainsaw had made, John soon began dreaming of other ways to achieve similarly transformative gains.',
          'After many late nights spent tinkering, he came to understand the inner workings of the tool well enough to recreate it. But instead of creating a chainsaw with the same dimensions, John produced one that was 100 feet long.'
        ]);
        continueOrStop(root, 'Take it to the forest', 'Leave it in the workshop', 2, 'the chainsaw');
      } else if (key === 'hundred-ft') {
        kicker(root, 'Evening');
        addTally(root, S);
        addTown(root);
        addParas(root, [
          'When John returned to town with his haul of lumber, the townspeople were speechless. They had never seen so much lumber produced in a single day. It changed everyone’s sense of what was possible.',
          'The business owners in the town updated their ambitions accordingly, planning for larger and larger construction projects.',
          { brk: 'Over a year passed' },
          'John had become a very rich man. Eventually he started having trouble sleeping. One night an obvious truth forced itself into his awareness:',
          { cls: 'thought', text: 'Why stop at 100 feet? Imagine how many trees you could cut in a day with a chainsaw a mile long.' }
        ]);
        continueOrStop(root, 'Build it', 'Let the thought go', 3, 'the 100-foot saw');
      } else if (key === 'mile') {
        kicker(root, 'Evening');
        addTally(root, S);
        addTown(root);
        var paras = [
          'For the first time, John cut down so many trees that he couldn’t even see how many were falling. He did his best to load up everything he found, but there seemed to be no end to it.'
        ];
        var harmed = S.destroyed + (resultFor('chainsaw') || { homes: 0 }).homes + (resultFor('hundred-ft') || { homes: 0 }).homes;
        if (harmed > 0) {
          state.visitors += 1;
          paras.push(
            { brk: 'Several days later' },
            'A stranger visited the town asking for the one who was tearing down parts of the forest with a howling blade. He explained that he had been living in a secluded cabin in the woods, until John’s fearsome weapon had appeared and destroyed his home.',
            'John was deeply moved by the visitor’s story. For a few days, he took time to reflect on his actions.',
            'Eventually, the townspeople started visiting John and asking him to resume his work. They needed it, they explained to him. Without it, the town could not continue to thrive.'
          );
        } else {
          paras.push(
            { brk: 'Several days later' },
            'No one came from the forest to complain. Still, John wondered what might be out there that he couldn’t see.'
          );
        }
        paras.push('John decided to hire some helpers. They would spread out to survey areas for dwellings or anything of value that he shouldn’t damage.');
        addParas(root, paras);
        continueOrStop(root, 'Hire surveyors and resume', 'Put the saw away', 4, 'the mile-long saw');
      } else if (key === 'mile-survey') {
        kicker(root, 'Evening');
        addTally(root, S);
        addTown(root);
        var p2 = ['This worked well for some time.'];
        if (S.destroyed > 0) {
          state.visitors += 1;
          p2.push('Unfortunately every now and then John would still discover that he had accidentally destroyed someone’s home. But this was rare enough, and the value he provided to his town was so great, that he was able to continue sleeping at night knowing he was doing far more good than harm.');
        }
        p2.push(
          { brk: 'Years passed' },
          'The town became a city. Its needs scaled tremendously, and so did John’s ambitions.'
        );
        addParas(root, p2);
        continueOrStop(root, 'Build the 100-mile chainsaw', 'Keep the mile-long saw', 5, 'the mile-long saw');
      } else {
        kicker(root, 'Evening');
        addTally(root, S);
        addTown(root);
        addParas(root, [
          'These days, it simply isn’t possible for John to know how much damage he is doing. Even with the help of his team, a single person simply cannot assess the impact to such a large area.',
          'He still believes that the good he is doing by producing such vast amounts of lumber outweighs the unfortunate cost.',
          { cls: 'thought', text: 'And if it weren’t, how would he know? Why should he stop?' },
          'What John knows is that the lumber he supplies is still being used by the city. And the visitors from the forest stopped making their pleas long ago.'
        ]);
        addChoices(root, [{ label: 'Look around', primary: true, onClick: lookAround }]);
      }
    });
  }

  function totals() {
    var t = { trees: 0, homes: 0 };
    state.results.forEach(function (r) { t.trees += r.trees; t.homes += r.homes; });
    return t;
  }

  function addLedger(root) {
    var table = el('table', { class: 'ledger' });
    var thead = el('thead');
    var hr = el('tr');
    ['Day', 'Tool', 'Trees', 'Homes'].forEach(function (h) { hr.appendChild(el('th', { scope: 'col' }, h)); });
    thead.appendChild(hr);
    table.appendChild(thead);
    var tb = el('tbody');
    state.results.forEach(function (r, i) {
      var tr = el('tr');
      tr.appendChild(el('td', null, String(i + 1)));
      tr.appendChild(el('td', null, r.label));
      tr.appendChild(el('td', null, fmt(r.trees)));
      tr.appendChild(el('td', { class: 'homes' }, fmt(r.homes)));
      tb.appendChild(tr);
    });
    table.appendChild(tb);
    root.appendChild(table);
    var t = totals();
    var dl = el('dl', { class: 'summary' });
    dl.appendChild(el('dt', null, 'Trees felled'));
    dl.appendChild(el('dd', null, fmt(t.trees)));
    dl.appendChild(el('dt', null, 'Homes destroyed'));
    dl.appendChild(el('dd', { class: 'big' }, fmt(t.homes)));
    dl.appendChild(el('dt', null, 'People who came to tell John'));
    dl.appendChild(el('dd', null, String(state.visitors)));
    root.appendChild(dl);
  }

  function endingChoices(root) {
    addChoices(root, [
      { label: 'Read the original essay', href: '/posts/100-mile-chainsaw.html', primary: true },
      { label: 'Start over', onClick: restart },
      { label: 'More from the blog', href: '/' }
    ]);
  }

  function epilogue(tool) {
    var t = totals();
    showCard(function (root) {
      kicker(root, 'Epilogue');
      addParas(root, [
        { cls: 'lede', text: 'John set the plans aside and kept working with ' + tool + '.' },
        'The town kept growing, more slowly than it might have. Some of its plans waited. Some were never built.',
        t.homes === 0 && state.visitors === 0
          ? 'Somewhere deep in the forest, a man in a secluded cabin never had a reason to come to town.'
          : (state.visitors > 0 ? 'John never forgot the stranger who came to town.' : null)
      ]);
      addLedger(root);
      endingChoices(root);
    });
  }

  function ledger() {
    revealEl.hidden = true;
    revealEl.innerHTML = '';
    captionEl.hidden = true;
    captionEl.classList.remove('on');
    dim.classList.add('on');
    showCard(function (root) {
      kicker(root, 'The ledger');
      addParas(root, [{ cls: 'lede', text: 'Every home in the forest was counted, whether or not anyone could see it.' }]);
      addLedger(root);
      root.appendChild(el('p', { class: 'note' }, 'Adapted from “The 100-mile chainsaw” by Dan Tao (2023).'));
      endingChoices(root);
    });
  }

  function restart() {
    Sound.sawStop();
    state.results = [];
    state.visitors = 0;
    state.totalLumber = 0;
    state.next = null;
    revealEl.hidden = true;
    revealEl.innerHTML = '';
    captionEl.hidden = true;
    intro();
  }

  // -------------------------------------------------------------- Reveal

  var soilPattern = null;
  function getSoilPattern(x) {
    if (!soilPattern) {
      var c = document.createElement('canvas');
      c.width = c.height = 64;
      var cx = c.getContext('2d');
      var img = cx.createImageData(64, 64);
      for (var i = 0; i < 64 * 64; i++) {
        var k = 0.72 + hash2(i % 64, (i / 64) | 0, 3) * 0.5;
        img.data[i * 4] = COLORS.soil[0] * k;
        img.data[i * 4 + 1] = COLORS.soil[1] * k;
        img.data[i * 4 + 2] = COLORS.soil[2] * k;
        img.data[i * 4 + 3] = 255;
      }
      cx.putImageData(img, 0, 0);
      soilPattern = c;
    }
    return x.createPattern(soilPattern, 'repeat');
  }

  // Draw the day's world at any scale: world origin (John) appears at screen
  // point P, at ftPerPx feet per CSS pixel.
  function renderWorldFrame(S, ftPerPx, P, opts) {
    var Wd = S.world, w = view.w, h = view.h, dpr = view.dpr;
    var base = makeLayer(w, h, dpr), lakes = makeLayer(w, h, dpr);
    var x = base.x;
    function sx(xf) { return P.x + xf / ftPerPx; }
    function sy(yf) { return P.y + yf / ftPerPx; }

    // Forest and water, sampled on a coarse grid of the screen.
    var bw = base.c.width, bh = base.c.height;
    var step = 4;
    var lw = Math.ceil(bw / step) + 2, lh = Math.ceil(bh / step) + 2;
    var lakeG = new Float32Array(lw * lh), toneG = new Float32Array(lw * lh);
    for (var gy = 0; gy < lh; gy++) {
      for (var gx = 0; gx < lw; gx++) {
        var xf = (gx * step / dpr - P.x) * ftPerPx, yf = (gy * step / dpr - P.y) * ftPerPx;
        lakeG[gy * lw + gx] = Wd.lakeAt(xf, yf);
        toneG[gy * lw + gx] = Wd.toneAt(xf, yf);
      }
    }
    var bimg = x.createImageData(bw, bh), limg = lakes.x.createImageData(bw, bh);
    var bd = bimg.data, ld = limg.data;
    var dark = [50, 76, 50], light = [96, 122, 72];
    for (var by = 0; by < bh; by++) {
      var fy = by / step, y0 = fy | 0, v = fy - y0;
      for (var bx = 0; bx < bw; bx++) {
        var fx = bx / step, x0 = fx | 0, u = fx - x0;
        var i00 = y0 * lw + x0;
        var lake = lakeG[i00] * (1 - u) * (1 - v) + lakeG[i00 + 1] * u * (1 - v) +
                   lakeG[i00 + lw] * (1 - u) * v + lakeG[i00 + lw + 1] * u * v;
        var o = (by * bw + bx) * 4;
        var j = hash2(bx, by, 17);
        if (lake >= Wd.lakeT - 0.012) {
          var col = lake >= Wd.lakeT ? COLORS.water : COLORS.sand;
          var kk = lake >= Wd.lakeT ? 0.94 + j * 0.06 : 1;
          ld[o] = col[0] * kk; ld[o + 1] = col[1] * kk; ld[o + 2] = col[2] * kk; ld[o + 3] = 255;
          continue;
        }
        var tone = toneG[i00];
        var tt = Math.max(0, Math.min(1, (tone - 0.3) * 2.2));
        var kf = 0.8 + j * 0.38;
        bd[o] = (dark[0] + (light[0] - dark[0]) * tt) * kf;
        bd[o + 1] = (dark[1] + (light[1] - dark[1]) * tt) * kf;
        bd[o + 2] = (dark[2] + (light[2] - dark[2]) * tt) * kf;
        bd[o + 3] = 255;
      }
    }
    x.putImageData(bimg, 0, 0);
    lakes.x.putImageData(limg, 0, 0);

    // Village clearings.
    x.fillStyle = rgb(COLORS.meadow);
    Wd.villages.forEach(function (vl) {
      var r = vl.rf / ftPerPx;
      if (r < 0.4) return;
      x.beginPath(); x.arc(sx(vl.xf), sy(vl.yf), Math.max(r, 0.8), 0, Math.PI * 2); x.fill();
    });

    // Everything the blade swept today.
    x.fillStyle = getSoilPattern(x);
    x.beginPath();
    // The same two triangles the hit test uses, so what's drawn matches
    // what was counted even when the blade turned mid-sweep.
    // Every triangle is wound the same way so overlaps add up instead of
    // cancelling out under the nonzero fill rule.
    function tri(ax, ay, bx, by, cx, cy) {
      if (cross(ax, ay, bx, by, cx, cy) < 0) { var tx = bx, ty = by; bx = cx; by = cy; cx = tx; cy = ty; }
      x.moveTo(sx(ax), sy(ay)); x.lineTo(sx(bx), sy(by)); x.lineTo(sx(cx), sy(cy)); x.closePath();
    }
    Wd.quads.forEach(function (q) {
      tri(q[0], q[1], q[2], q[3], q[4], q[5]);
      tri(q[0], q[1], q[4], q[5], q[6], q[7]);
    });
    x.fill('nonzero');
    // Hairline strokes close the seams between adjacent slivers.
    x.strokeStyle = rgb(COLORS.soil, 0.9);
    x.lineWidth = 1.6;
    x.lineJoin = 'round';
    x.stroke();
    if (ftPerPx < 3) {
      // Up close, show the window John actually saw, as he left it.
      x.drawImage(S.ground.c, sx(-S.wFt / 2), sy(-S.hFt / 2), S.wFt / ftPerPx, S.hFt / ftPerPx);
      x.drawImage(S.forest.c, sx(-S.wFt / 2), sy(-S.hFt / 2), S.wFt / ftPerPx, S.hFt / ftPerPx);
    }
    x.drawImage(lakes.c, 0, 0, w, h);

    // Homes. Destroyed ones are marked so they can be seen at any scale.
    var pxf = 1 / ftPerPx;
    S.homes.forEach(function (hm) {
      var hx = sx(hm.xf), hy = sy(hm.yf);
      if (hx < -20 || hy < -20 || hx > w + 20 || hy > h + 20) return;
      var size = hm.wf * pxf;
      if (size >= 4) {
        drawHome(x, hm, hx, hy, pxf);
      } else if (!hm.destroyed && size >= 1) {
        x.fillStyle = COLORS.roof;
        x.fillRect(hx - size / 2, hy - size / 2, size, size);
      }
      if (hm.destroyed && size < 14) {
        x.fillStyle = 'rgba(20, 10, 6, 0.5)';
        x.beginPath(); x.arc(hx, hy, 2.6, 0, Math.PI * 2); x.fill();
        x.fillStyle = '#ff6a45';
        x.beginPath(); x.arc(hx, hy, 1.9, 0, Math.PI * 2); x.fill();
      }
    });

    // The window John could see.
    var bwPx = S.wFt / ftPerPx, bhPx = S.hFt / ftPerPx;
    var rw = Math.max(5, bwPx), rh = Math.max(5 * bhPx / bwPx, bhPx);
    x.strokeStyle = 'rgba(255, 255, 255, 0.95)';
    x.lineWidth = 1.5;
    x.strokeRect(P.x - rw / 2, P.y - rh / 2, rw, rh);
    if (opts && opts.label) {
      x.font = '500 11px "IBM Plex Mono", ui-monospace, monospace';
      x.textAlign = 'left';
      var lx = P.x + rw / 2 + 8, ly = P.y + 4;
      var text = 'what John could see';
      var tw = x.measureText(text).width;
      if (lx + tw > w - 8) { x.textAlign = 'right'; lx = P.x - rw / 2 - 8; }
      x.fillStyle = 'rgba(20, 18, 16, 0.7)';
      x.fillRect(x.textAlign === 'left' ? lx - 4 : lx - tw - 4, ly - 12, tw + 8, 17);
      x.fillStyle = '#ffffff';
      x.fillText(text, lx, ly);
    }
    return base.c;
  }

  function lookAround() {
    var S = state.S;
    hideCard();
    dim.classList.remove('on');
    var Wd = S.world;
    var finalResult = state.results[state.results.length - 1];

    S.blade = null;
    S.particles = [];
    render(S, performance.now(), 0);
    var snap = document.createElement('canvas');
    snap.width = canvas.width; snap.height = canvas.height;
    snap.getContext('2d').drawImage(canvas, 0, 0);

    var fit = fitFor(S);
    var ft0 = S.ftPerPx / fit.s;
    var P0 = { x: fit.ox + (S.W / 2) * fit.s, y: fit.oy + (S.H / 2) * fit.s };

    // Frame the whole swath (and John's window).
    var minX = -S.wFt / 2, maxX = S.wFt / 2, minY = -S.hFt / 2, maxY = S.hFt / 2;
    Wd.quads.forEach(function (q) {
      for (var i = 0; i < 8; i += 2) {
        minX = Math.min(minX, q[i]); maxX = Math.max(maxX, q[i]);
        minY = Math.min(minY, q[i + 1]); maxY = Math.max(maxY, q[i + 1]);
      }
    });
    var padW = (maxX - minX) * 0.08, padH = (maxY - minY) * 0.08;
    minX -= padW; maxX += padW; minY -= padH; maxY += padH;
    var ftFull = Math.max((maxX - minX) / view.w, (maxY - minY) / (view.h * 0.86));
    ftFull = Math.max(ftFull, ft0 * 2);
    var Pfull = { x: view.w / 2 - ((minX + maxX) / 2) / ftFull, y: view.h * 0.45 - ((minY + maxY) / 2) / ftFull };

    var n = Math.max(2, Math.min(5, Math.ceil(Math.log(ftFull / ft0) / Math.log(6))));
    var factor = Math.pow(ftFull / ft0, 1 / n);
    var points = [], frames = [snap];
    for (var k = 0; k <= n; k++) {
      var tt = k / n;
      points.push({ x: P0.x + (Pfull.x - P0.x) * tt, y: P0.y + (Pfull.y - P0.y) * tt });
    }
    for (k = 1; k <= n; k++) {
      frames.push(renderWorldFrame(S, ft0 * Math.pow(factor, k), points[k], { label: k === n }));
    }

    revealEl.innerHTML = '';
    frames.forEach(function (c, i) {
      c.style.opacity = i === 0 ? '1' : '0';
      revealEl.appendChild(c);
    });
    revealEl.hidden = false;

    var dur = REDUCED_MOTION ? 600 : 1800;
    var easing = 'cubic-bezier(0.45, 0, 0.55, 1)';
    function step(i) {
      if (i >= n) { done(); return; }
      var a = frames[i], b = frames[i + 1], Pa = points[i], Pb = points[i + 1];
      var dx = Pb.x - Pa.x, dy = Pb.y - Pa.y;
      a.style.transformOrigin = Pa.x + 'px ' + Pa.y + 'px';
      b.style.transformOrigin = Pb.x + 'px ' + Pb.y + 'px';
      if (REDUCED_MOTION) {
        b.animate([{ opacity: 0 }, { opacity: 1 }], { duration: dur, fill: 'forwards' });
      } else {
        // Zooming out: the current frame shrinks into the next one.
        a.animate([
          { transform: 'translate(0px, 0px) scale(1)' },
          { transform: 'translate(' + dx + 'px, ' + dy + 'px) scale(' + (1 / factor) + ')' }
        ], { duration: dur, easing: easing, fill: 'forwards' });
        b.animate([
          { transform: 'translate(' + (-dx) + 'px, ' + (-dy) + 'px) scale(' + factor + ')', opacity: 0 },
          { opacity: 1, offset: 0.3 },
          { transform: 'translate(0px, 0px) scale(1)', opacity: 1 }
        ], { duration: dur, easing: easing, fill: 'forwards' });
      }
      setTimeout(function () {
        a.style.visibility = 'hidden';
        step(i + 1);
      }, dur + (REDUCED_MOTION ? 200 : 300));
    }
    function done() {
      captionEl.innerHTML = '';
      var homes = finalResult ? finalResult.homes : 0;
      captionEl.appendChild(document.createTextNode(
        homes > 0
          ? 'Everything John cut today. Each red dot was someone’s home: ' + fmt(homes) + ' of them.'
          : 'Everything John cut today.'));
      captionEl.hidden = false;
      requestAnimationFrame(function () { captionEl.classList.add('on'); });
      setTimeout(function () {
        var b = el('button', { type: 'button' }, 'See the ledger');
        b.addEventListener('click', ledger);
        captionEl.appendChild(b);
        b.focus({ preventScroll: true });
      }, REDUCED_MOTION ? 300 : 2600);
    }
    Sound.ensure();
    setTimeout(function () { step(0); }, 500);
  }

  // ---------------------------------------------------------------- Loop

  var last = performance.now();
  function frame(now) {
    // Keep the loop alive even if a single frame throws.
    requestAnimationFrame(frame);
    var dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    var S = state.S;
    if (S) {
      if (S.running) {
        S.time += dt;
        if (S.cutting) S.chain += dt * 60;
        S.load *= Math.pow(0.15, dt);
        S.shake *= Math.pow(0.02, dt);
        if (S.cutting) Sound.sawSet(true, S.load);
        updateHud(S);
        if (S.time >= DAY_SECONDS) endDay();
      }
      if (revealEl.hidden) render(S, now, dt);
    }
  }

  window.addEventListener('resize', function () {
    measure();
    if (state.S && state.S.running) scaleBar(state.S);
    if (state.S && !state.S.running && state.results.length === 0 && card.classList.contains('on')) {
      state.S = buildStage(0);
    }
  });

  measure();
  intro();
  requestAnimationFrame(frame);
})();
