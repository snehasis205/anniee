/* ============ CONFIG: edit these ============ */
const CONFIG = {
  friendName: "Annie",
  // INSERT LEGITIMATE MUSIC SOURCE HERE: paste an embed URL, e.g. Spotify "https://open.spotify.com/embed/track/XXXX"
  musicEmbed: "https://open.spotify.com/embed/track/1n8NKQRg8LVHy7oUhUgbFF", // Hedwig's Theme (John Williams, Sorcerer's Stone soundtrack)
  message: "ANNIE,\n\nYou already know how much magic exists inside the Harry Potter world.\n\nA letter can change a life.\nA train can begin a journey.\nA castle can become a home.\n\nAnd sometimes, something as simple as starting a new chapter can become the beginning of something special.\n\nSo I made this little corner of Hogwarts for you.\n\nNot because everything has to be figured out.\nNot because we know exactly what comes next.\nBut because every new adventure deserves a beginning.\n\nMaybe this is just a tiny website. Maybe it is simply a little gesture.\nBut every story has a first page.\nAnd this can be ours to write.\n\nMay there always be a little magic in whatever comes next.",
  houses: {
    G: "Gryffindor: brave, daring and quietly loyal when it counts.",
    R: "Ravenclaw: curious, clever and always chasing the next good idea.",
    H: "Hufflepuff: warm, fair and the kind of friend everyone is lucky to have.",
    S: "Slytherin: resourceful, driven and unafraid to aim high."
  },
  // [question, [answer, house G/R/H/S], ...]
  sorting: [
    ["What quality matters most to you?", ["Courage", "G"], ["Intelligence", "R"], ["Loyalty", "H"], ["Ambition", "S"]],
    ["Your best friend is in trouble. You…", ["Rush in to help", "G"], ["Work out a clever plan", "R"], ["Stay by their side", "H"], ["Use every connection you have", "S"]],
    ["Which subject would you choose?", ["Defence Against the Dark Arts", "G"], ["Charms", "R"], ["Herbology", "H"], ["Potions", "S"]],
    ["Which magical object would you want?", ["Sword of Gryffindor", "G"], ["A Time-Turner", "R"], ["A never-empty cup", "H"], ["The Elder Wand", "S"]],
    ["Which place feels most like you?", ["A windswept pitch", "G"], ["A quiet library", "R"], ["A cosy kitchen", "H"], ["A candlelit dungeon", "S"]],
    ["What would you protect, even when it's hard?", ["Those who can't fight", "G"], ["The truth", "R"], ["My people", "H"], ["My goals", "S"]],
    ["Which adventure would you choose?", ["A dragon duel", "G"], ["Solving an ancient riddle", "R"], ["Hosting a feast", "H"], ["Winning the House Cup", "S"]]
  ],
  trivia: [ // [question, [options], correctIndex, explanation]
    ["Which house is known for its bravery?", ["Gryffindor", "Slytherin", "Ravenclaw", "Hufflepuff"], 0, "Gryffindor values courage."],
    ["What is the spell that makes things float?", ["Accio", "Wingardium Leviosa", "Lumos", "Protego"], 1, "Wingardium Leviosa."],
    ["Who is Harry's owl?", ["Errol", "Pigwidgeon", "Hedwig", "Crookshanks"], 2, "Hedwig was a gift from Hagrid."],
    ["Which platform leads to the Hogwarts Express?", ["Platform 7½", "Platform 9¾", "Platform 10", "Platform 3¼"], 1, "Platform 9¾ at King's Cross."],
    ["What position does Harry play in Quidditch?", ["Keeper", "Chaser", "Beater", "Seeker"], 3, "Harry is a Seeker."],
    ["Who teaches Potions when Harry arrives?", ["Snape", "Lupin", "Flitwick", "Sprout"], 0, "Severus Snape."],
    ["What creature is Buckbeak?", ["Dragon", "Hippogriff", "Thestral", "Phoenix"], 1, "Buckbeak is a hippogriff."],
    ["What does the spell Lumos do?", ["Opens doors", "Makes light", "Stuns", "Shields"], 1, "Lumos lights the wand tip."],
    ["Who is the Hogwarts Headmaster in the first book?", ["Dumbledore", "McGonagall", "Hagrid", "Fudge"], 0, "Albus Dumbledore."],
    ["Which object reveals who you truly are in Hogwarts' first sorting?", ["Mirror of Erised", "Sorting Hat", "Pensieve", "Goblet"], 1, "The Sorting Hat chooses your house."]
  ]
};

/* ============ HELPERS ============ */
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const wait = ms => new Promise(r => setTimeout(r, ms));
const rand = (a, b) => a + Math.random() * (b - a);
const shuffle = a => a.map(v => [Math.random(), v]).sort((x, y) => x[0] - y[0]).map(x => x[1]);
const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
let mouse = { x: innerWidth / 2, y: innerHeight / 2 };

function toast(t, ms = 3500) {
  const e = $('#toast'); e.textContent = t; e.classList.remove('hide');
  clearTimeout(toast.t); toast.t = setTimeout(() => e.classList.add('hide'), ms);
}

/* ============ PARTICLES (one shared canvas) ============ */
const cv = $('#fx'), cx = cv.getContext('2d'); let P = [];
function resize() { cv.width = innerWidth; cv.height = innerHeight; }
addEventListener('resize', resize); resize();
function spark(x, y, n = 1, v = 1, col = '255,215,120') {
  for (let i = 0; i < n && P.length < 350; i++)
    P.push({ x, y, vx: (Math.random() - .5) * 2 * v, vy: (Math.random() - .5) * 2 * v, l: 1, d: .008 + Math.random() * .02, r: 1 + Math.random() * 2, c: col });
}
const burst = (x = innerWidth / 2, y = innerHeight / 2) => spark(x, y, 40, 5);
function loop() {
  cx.clearRect(0, 0, cv.width, cv.height);
  if (!reduce && P.length < 90 && Math.random() < .25) spark(rand(0, cv.width), cv.height + 5, 1, .4);
  for (const p of P) {
    p.x += p.vx; p.y += p.vy - .35; p.l -= p.d;
    cx.fillStyle = `rgba(${p.c},${Math.max(p.l, 0)})`; cx.beginPath(); cx.arc(p.x, p.y, p.r, 0, 7); cx.fill();
  }
  P = P.filter(p => p.l > 0); requestAnimationFrame(loop);
}
loop();
addEventListener('pointermove', e => {
  mouse = { x: e.clientX, y: e.clientY };
  if (e.pointerType === 'mouse') { spark(e.clientX, e.clientY, e.target.closest('button,a') ? 3 : 1, .5); parallax(e); }
});
addEventListener('pointerdown', e => { burst(e.clientX, e.clientY); if (e.target.closest('button,a')) tone(520, .1); });
function parallax(e) { const h = $('#hero'); h.style.setProperty('--mx', (e.clientX / innerWidth - .5).toFixed(2)); h.style.setProperty('--my', (e.clientY / innerHeight - .5).toFixed(2)); }

/* ============ SOUND CONTROL (synth blips; no copyrighted audio) ============ */
let soundOn = false, ac;
function tone(f = 600, d = .15, type = 'sine') {
  if (!soundOn) return;
  try {
    ac = ac || new AudioContext();
    const o = ac.createOscillator(), g = ac.createGain();
    o.type = type; o.frequency.value = f; g.gain.value = .05; o.connect(g); g.connect(ac.destination);
    g.gain.exponentialRampToValueAtTime(.001, ac.currentTime + d); o.start(); o.stop(ac.currentTime + d);
  } catch (e) { }
}
$('#soundBtn').onclick = e => {
  soundOn = !soundOn; e.target.textContent = soundOn ? '🔊 SOUND ON' : '🔇 SOUND OFF';
  e.target.setAttribute('aria-pressed', soundOn); tone(700);
};

/* ============ INTRO ============ */
async function intro() {
  document.title = "The Wizarding World of " + CONFIG.friendName + " ✨";
  $$('.nm').forEach(e => e.textContent = CONFIG.friendName);
  const t = $('#introText');
  const lines = ["Every story begins somewhere…", "Some begin with a letter.", "Some begin with a journey.", "And some begin with simply deciding to start something new."];
  await wait(1200); spark(innerWidth / 2, innerHeight / 2, 25, 1.2);
  for (const l of lines) { t.className = ''; void t.offsetWidth; t.textContent = l; t.className = 'fade'; spark(innerWidth / 2, innerHeight / 2, 12, 2); await wait(2600); }
  t.classList.add('hide');
  const n = $('#introName'); n.textContent = CONFIG.friendName.toUpperCase(); n.className = 'fade';
  await wait(1500); $('#introSub').className = 'fade'; await wait(1500); $('#enterBtn').className = 'btn fade';
}
$('#enterBtn').onclick = async () => {
  burst(); burst(); tone(800, .4);
  const i = $('#intro'); i.style.transition = 'opacity 1.2s'; i.style.opacity = 0;
  $('#site').classList.remove('hide');
  await wait(1200); i.classList.add('hide'); i.style.opacity = 1; scrollTo(0, 0);
};

/* ============ NAVIGATION ============ */
$('#burger').onclick = () => $('#links').classList.toggle('show');
$('#links').onclick = () => $('#links').classList.remove('show');

/* ============ LETTER ============ */
$('#openLetter').onclick = e => {
  $('#envelope').classList.add('open'); burst(); tone(660, .5);
  e.target.classList.add('hide'); $('#letterBody').classList.remove('hide'); $('#letterBody').classList.add('fade');
};

/* ============ SORTING HAT ============ */
const HN = { G: 'Gryffindor', R: 'Ravenclaw', H: 'Hufflepuff', S: 'Slytherin' };
const HC = { G: '#c8372d', R: '#3a64c9', H: '#e0b72c', S: '#2f8f5a' };
function sorting() {
  const box = $('#sortBox'); let i, sc;
  const reset = () => { i = 0; sc = { G: 0, R: 0, H: 0, S: 0 }; ask(); };
  function ask() {
    if (i >= CONFIG.sorting.length) return end();
    const [q, ...o] = CONFIG.sorting[i];
    box.innerHTML = `<h3>${q}</h3>` + shuffle(o).map(([t, h]) => `<button class="btn opt" data-h="${h}">${t}</button>`).join('');
  }
  function end() {
    box.innerHTML = '<h2 class="fade">Hmmmm…</h2>'; tone(180, 1, 'triangle');
    setTimeout(() => {
      const w = Object.keys(sc).sort((a, b) => sc[b] - sc[a])[0];
      box.style.boxShadow = `0 0 60px ${HC[w]}`;
      box.innerHTML = `<h3>THE SORTING HAT HAS SPOKEN.</h3><h2 style="color:${HC[w]}">${HN[w]}</h2><p>${CONFIG.houses[w]}</p><button class="btn" id="sortAgain">SORT AGAIN</button>`;
      burst(); burst(); tone(880, .6);
      $('#sortAgain').onclick = () => { box.style.boxShadow = ''; reset(); };
    }, 2200);
  }
  box.onclick = e => { const b = e.target.closest('[data-h]'); if (!b) return; sc[b.dataset.h]++; i++; tone(500); ask(); };
  reset();
}

/* ============ GAMES ============ */
const area = () => $('#gameArea');
let stopGame = () => { };
function startGame(n) { stopGame(); stopGame = () => { }; ({ snitch, spells, trivia, memory })[n](); }
$('#tabs').onclick = e => { const b = e.target.closest('[data-g]'); if (b) startGame(b.dataset.g); };

function endScreen(title, body, again) {
  area().innerHTML = `<h3>${title}</h3><p>${body}</p><button class="btn" id="again">PLAY AGAIN</button>`;
  burst(); tone(900, .6); $('#again').onclick = again;
}

/* Game 1: Golden Snitch */
function snitch() {
  let t = 30, s = 0, m = 0, mv, tm, tr;
  area().innerHTML = `<p class="hud">TIME: <b id="gt">30</b> · SNITCHES CAUGHT: <b id="gs">0</b> · MISSES: <b id="gm">0</b></p><div id="arena"><button id="snitch" aria-label="Golden Snitch" style="left:45%;top:40%"></button></div><button class="btn" id="go">START</button>`;
  const sn = $('#snitch'), ar = $('#arena');
  const move = () => { sn.style.left = rand(3, 88) + '%'; sn.style.top = rand(3, 80) + '%'; };
  const hud = () => { $('#gt').textContent = t; $('#gs').textContent = s; $('#gm').textContent = m; };
  stopGame = () => { clearTimeout(mv); clearInterval(tm); clearInterval(tr); };
  sn.onclick = e => { e.stopPropagation(); if (!tm) return; s++; const r = sn.getBoundingClientRect(); burst(r.left + 22, r.top + 22); tone(900, .1); move(); hud(); };
  ar.onclick = () => { if (tm) { m++; hud(); } };
  $('#go').onclick = e => {
    e.target.classList.add('hide'); move();
    const step = () => { move(); mv = setTimeout(step, Math.max(350, 900 - (30 - t) * 20)); };
    mv = setTimeout(step, 900);
    tr = setInterval(() => { const r = sn.getBoundingClientRect(); spark(r.left + 22, r.top + 22, 1, .4); }, 90);
    tm = setInterval(() => { t--; hud(); if (t <= 0) { stopGame(); endScreen('MATCH COMPLETE', `Snitches caught: ${s}<br>Misses: ${m}`, snitch); } }, 1000);
  };
}

/* Game 2: Spell casting. Read the effect, pick the spell (click or keys 1-4) */
const SP = [["Lumos", "Lights the tip of your wand"], ["Accio", "Summons an object to you"], ["Alohomora", "Unlocks a door"], ["Expelliarmus", "Disarms an opponent"], ["Expecto Patronum", "Conjures a guardian against Dementors"], ["Wingardium Leviosa", "Makes an object float"], ["Protego", "Raises a shield"], ["Stupefy", "Stuns an opponent"]];
function spells() {
  let sc = 0, combo = 0, ok = 0, tot = 0, t = 45, cur, tm;
  const keyH = e => { const b = $$('#gameArea [data-n]')[+e.key - 1]; if (b) b.click(); };
  stopGame = () => { clearInterval(tm); removeEventListener('keydown', keyH); };
  area().innerHTML = `<p>Match each effect to its spell. You have 45 seconds. Click or press 1-4.</p><button class="btn" id="go">START</button>`;
  $('#go').onclick = () => {
    addEventListener('keydown', keyH);
    tm = setInterval(() => { t--; const e = $('#st'); if (e) e.textContent = t; if (t <= 0) { stopGame(); endScreen('MASTER OF SPELLS', `Score: ${sc}<br>Accuracy: ${tot ? Math.round(ok / tot * 100) : 0}%`, spells); } }, 1000);
    ask();
  };
  function ask() {
    cur = SP[Math.floor(Math.random() * SP.length)];
    const ch = shuffle([cur, ...shuffle(SP.filter(x => x !== cur)).slice(0, 3)]);
    area().innerHTML = `<p class="hud">TIME: <b id="st">${t}</b> · SCORE: ${sc} · COMBO: x${Math.min(combo, 5) || 1}</p><h3>${cur[1]}</h3>` +
      ch.map((x, i) => `<button class="btn opt" data-n="${x[0]}">${i + 1}. ${x[0]}</button>`).join('');
    $$('#gameArea [data-n]').forEach(b => b.onclick = () => {
      tot++;
      if (b.dataset.n === cur[0]) { ok++; combo++; sc += 10 * Math.min(combo, 5); burst(mouse.x, mouse.y); tone(880, .15); }
      else { combo = 0; area().classList.add('shake'); setTimeout(() => area().classList.remove('shake'), 300); tone(150, .3, 'sawtooth'); }
      ask();
    });
  }
}

/* Game 3: Trivia */
function trivia() {
  let i = 0, sc = 0; const Q = shuffle(CONFIG.trivia), N = Q.length;
  stopGame = () => { };
  function show() {
    if (i >= N) { const p = Math.round(sc / N * 100); return endScreen('YOUR WIZARDING KNOWLEDGE', `Score: ${sc} / ${N} (${p}%)<br>${p >= 80 ? 'Outstanding. Dumbledore would be proud.' : p >= 50 ? 'Well done. A fine wizard in the making.' : 'A good start. Every wizard begins somewhere.'}`, trivia); }
    const [q, o, c] = Q[i];
    area().innerHTML = `<p class="hud">QUESTION ${i + 1} / ${N} · SCORE: ${sc}</p><h3>${q}</h3>` + o.map((x, k) => `<button class="btn opt" data-k="${k}">${x}</button>`).join('') + '<p id="exp"></p>';
    $$('#gameArea [data-k]').forEach(b => b.onclick = () => {
      const k = +b.dataset.k; $$('#gameArea [data-k]').forEach(x => x.disabled = true);
      $$('#gameArea [data-k]')[c].classList.add('good');
      if (k === c) { sc++; burst(mouse.x, mouse.y); tone(880); } else { b.classList.add('bad'); tone(150, .3, 'sawtooth'); }
      $('#exp').innerHTML = Q[i][3] + '<br><button class="btn" id="nx">NEXT</button>';
      $('#nx').onclick = () => { i++; show(); };
    });
  }
  show();
}

/* Game 4: Memory charm */
function memory() {
  const sym = ['⚡', '🦉', '🪄', '🧪', '🏰', '🔮', '📜', '🕯️']; let first = null, lock = false, moves = 0, found = 0, t = 0, tm;
  area().innerHTML = `<p class="hud">MOVES: <b id="mo">0</b> · MATCHES: <b id="ma">0</b> · TIME: <b id="mt">0</b></p><div class="grid">${shuffle([...sym, ...sym]).map(s => `<button class="card" data-s="${s}" aria-label="Hidden card"></button>`).join('')}</div>`;
  stopGame = () => clearInterval(tm);
  $$('#gameArea .card').forEach(c => c.onclick = () => {
    if (lock || c.classList.contains('up')) return;
    if (!tm) tm = setInterval(() => { t++; $('#mt').textContent = t; }, 1000);
    c.classList.add('up'); c.textContent = c.dataset.s; tone(600, .08);
    if (!first) { first = c; return; }
    moves++; $('#mo').textContent = moves;
    if (first.dataset.s === c.dataset.s) {
      found++; $('#ma').textContent = found; first = null; burst(mouse.x, mouse.y);
      if (found === 8) { stopGame(); setTimeout(() => endScreen('MEMORY CHARM COMPLETE ✨', `Moves: ${moves}<br>Time: ${t}s`, memory), 500); }
    } else {
      lock = true; const a = first; first = null;
      setTimeout(() => { a.classList.remove('up'); c.classList.remove('up'); a.textContent = c.textContent = ''; lock = false; }, 800);
    }
  });
}

/* ============ MUSIC ============ */
function music() {
  if (CONFIG.musicEmbed) $('#embedSlot').innerHTML = `<iframe src="${CONFIG.musicEmbed}" allow="autoplay; encrypted-media" loading="lazy" title="Hedwig's Theme"></iframe>`;
  else $('#embedSlot').innerHTML = '<p><i>Placeholder: add your Spotify/YouTube embed link to CONFIG.musicEmbed in script.js (see README).</i></p>';
}

/* ============ MARAUDER'S MAP ============ */
const LOCS = [["Great Hall", 30, 45, "Floating candles, four long tables and the best feasts in the wizarding world."], ["Gryffindor Tower", 18, 15, "Hidden behind the Fat Lady's portrait."], ["Library", 50, 20, "Endless shelves, and a few books that whisper."], ["Potions Classroom", 20, 80, "Cold, dim and full of bubbling cauldrons."], ["Forbidden Forest", 80, 78, "Not for the faint-hearted. Not for the unprepared."], ["Quidditch Pitch", 80, 40, "Where seekers chase the Golden Snitch."], ["Room of Requirement", 55, 62, "Appears only when you truly need it."], ["Hogsmeade", 82, 12, "Butterbeer, sweets and a very good view."]];
function marauders() {
  $('#mapBoard').insertAdjacentHTML('beforeend', LOCS.map(l => `<button class="loc" style="left:${l[1]}%;top:${l[2]}%" data-i="${LOCS.indexOf(l)}">${l[0]}</button>`).join(''));
  $('#mapBoard').onclick = e => { const b = e.target.closest('.loc'); if (b) { const l = LOCS[b.dataset.i]; $('#mapInfo').textContent = l[0] + ': ' + l[3]; tone(500); } };
  $('#mischief').onclick = () => {
    const b = $('#mapBoard'); b.classList.toggle('fold');
    $('#mischief').textContent = b.classList.contains('fold') ? 'UNFOLD THE MAP' : 'MISCHIEF MANAGED';
  };
}

/* ============ QUIDDITCH TARGET CHALLENGE (replaces the photo section) ============ */
function quidditch() {
  const box = $('#qBox');
  const home = () => { box.innerHTML = '<p>30 seconds. Tap every hoop. Chain hits for a combo.</p><button class="btn" id="qGo">START</button>'; $('#qGo').onclick = play; };
  function play() {
    let t = 30, s = 0, c = 0, hit = 0, hp;
    box.innerHTML = '<p class="hud">TIME: <b id="qt">30</b> · SCORE: <b id="qs">0</b> · COMBO: <b id="qc">x1</b></p><div id="qarena"></div>';
    const ar = $('#qarena');
    const upd = () => { $('#qt').textContent = t; $('#qs').textContent = s; $('#qc').textContent = 'x' + Math.min(c + 1, 5); };
    function spawn() {
      ar.innerHTML = ''; const h = document.createElement('button'); h.className = 'hoop'; h.setAttribute('aria-label', 'Quidditch hoop');
      const z = Math.max(34, 70 - (30 - t) * 1.2); h.style.cssText = `width:${z}px;height:${z}px;left:${rand(2, 85)}%;top:${rand(2, 78)}%`;
      h.onclick = e => { e.stopPropagation(); s += 10 * Math.min(c + 1, 5); c++; hit++; const r = h.getBoundingClientRect(); burst(r.left + z / 2, r.top + z / 2); tone(880, .1); upd(); spawn(); };
      ar.append(h); clearTimeout(hp); hp = setTimeout(() => { c = 0; upd(); spawn(); }, Math.max(700, 1800 - (30 - t) * 35));
    }
    ar.onclick = () => { c = 0; upd(); };
    const tm = setInterval(() => {
      t--; upd();
      if (t <= 0) {
        clearInterval(tm); clearTimeout(hp);
        box.innerHTML = `<h3>QUICK WITCH / WIZARD REFLEXES</h3><p>Score: ${s}<br>Hoops hit: ${hit}</p><button class="btn" id="qAgain">PLAY AGAIN</button>`;
        burst(); tone(900, .6); $('#qAgain').onclick = play;
      }
    }, 1000);
    spawn();
  }
  home();
}

/* ============ NEW CHAPTER + MESSAGE ============ */
function chapter() {
  const n = CONFIG.friendName, L = ["Every great story begins with a first page.", "A new place.", "New memories.", "New adventures.", "Something new.", "And maybe this is the beginning.", "For " + n + "."];
  let started = false;
  new IntersectionObserver(async e => {
    if (!e[0].isIntersecting || started) return; started = true; const el = $('#chapText');
    for (const x of L) { el.className = 'big2'; void el.offsetWidth; el.textContent = x; el.className = 'big2 fade'; spark(innerWidth / 2, innerHeight / 2, 10, 2); await wait(1900); }
    $('#chapBtn').classList.remove('hide');
  }, { threshold: .6 }).observe($('#chapter'));
  let typing = false;
  $('#chapBtn').onclick = async () => {
    burst(); tone(800, .5); $('#message').classList.remove('hide'); $('#message').scrollIntoView();
    if (typing) return; typing = true; const el = $('#typed'); el.textContent = '';
    for (const ch of CONFIG.message) { el.textContent += ch; if (!reduce) await wait(ch === '\n' ? 200 : 28); }
  };
}

/* ============ ENDING ============ */
function ending() {
  let started = false;
  new IntersectionObserver(async e => {
    if (!e[0].isIntersecting || started) return; started = true; const el = $('#endText');
    for (const x of ["THE MAGIC NEVER REALLY ENDS.", "Until the next adventure, " + CONFIG.friendName + "…", "✨ MISCHIEF MANAGED ✨", "And this is only the first page.", "To be continued…"]) {
      el.className = 'big2'; void el.offsetWidth; el.textContent = x; el.className = 'big2 fade'; spark(innerWidth / 2, innerHeight / 2, 15, 2); await wait(2600);
    }
    $('#restart').classList.remove('hide');
  }, { threshold: .6 }).observe($('#ending'));
  $('#restart').onclick = () => location.reload(); // back to the opening screen
}

/* ============ EASTER EGGS ============ */
let buf = '', moonClicks = 0;
addEventListener('keydown', e => {
  if (e.key.length !== 1) return; buf = (buf + e.key.toLowerCase()).slice(-20);
  if (buf.endsWith('mischiefmanaged')) {
    buf = ''; const m = document.createElement('div'); m.id = 'mm'; m.textContent = 'Mischief managed.'; document.body.append(m);
    burst(); burst(); setTimeout(() => m.remove(), 3000);
  } else if (buf.endsWith('lumos')) { buf = ''; document.body.classList.add('bright'); setTimeout(() => document.body.classList.remove('bright'), 4000); }
  else if (buf.endsWith('accio')) {
    buf = ''; const o = document.createElement('div'); o.className = 'pull'; o.textContent = '🪄';
    o.style.left = rand(0, innerWidth - 40) + 'px'; o.style.top = rand(0, innerHeight - 40) + 'px'; document.body.append(o);
    requestAnimationFrame(() => requestAnimationFrame(() => { o.style.left = mouse.x + 'px'; o.style.top = mouse.y + 'px'; }));
    setTimeout(() => { burst(mouse.x, mouse.y); o.remove(); }, 1200);
  }
});
// Secret for Annie: tap the moon five times
$('#moon').onclick = () => { if (++moonClicks === 5) { moonClicks = 0; burst(); toast('You found the secret. Some magic is meant to be discovered.'); } };

/* ============ INIT ============ */
sorting(); music(); marauders(); quidditch(); chapter(); ending(); startGame('snitch'); intro();
