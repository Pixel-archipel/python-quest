// Oberfläche: Levelkarte, Levelansicht mit drei Stufen, Dialoge.
(function () {
  "use strict";
  const main = document.getElementById("main");
  const dlg = document.getElementById("dlg");
  const esc = Engine.esc;
  const $ = (sel, root = document) => root.querySelector(sel);

  const STAGES = [
    { n: 1, name: "Bausteine", desc: "Fertige Zeilen ordnen" },
    { n: 2, name: "Lücken", desc: "Fehlende Teile ergänzen" },
    { n: 3, name: "Frei", desc: "Alles selbst schreiben" }
  ];
  const RANKS = [[0, "Neuling"], [0.15, "Einsteiger"], [0.4, "Tüftler"], [0.7, "Coder"], [1, "Python-Profi"]];

  let state = PQ.load();
  let view = null;   // offenes Level
  let runId = 0;     // bricht alte Läufe ab

  const starHtml = (n, max = 3) =>
    Array.from({ length: max }, (_, i) => `<span class="star${i < n ? " on" : ""}">★</span>`).join("");

  function renderHeader() {
    const total = PQ.totalStars(state.stars), max = PQ.maxStars();
    const share = max ? total / max : 0;
    let rank = RANKS[0][1];
    for (const [min, name] of RANKS) if (share >= min) rank = name;
    $("#rank").textContent = rank;
    $("#starcount").innerHTML = `<span class="star on">★</span> ${total} von ${max}`;
  }

  // ---------- Karte ----------
  function showMap() {
    view = null; runId++;
    const levels = PQ.allLevels();
    let html = `<section class="hero"><h1>Hallo ${esc(state.name)}!</h1>
<p>Wähle ein Level. Jedes Level kannst du auf drei Stufen lösen. Je schwerer die Stufe, desto mehr Sterne bekommst du.</p></section>`;
    for (const w of WORLDS) {
      html += `<section class="world"><h2>${esc(w.title)}</h2><p class="sub">${esc(w.sub)}</p>`;
      if (!w.levels.length) {
        html += `<p class="soon">Diese Welt wird noch gebaut.</p>`;
      } else {
        html += `<div class="tiles">`;
        for (const l of w.levels) {
          const i = levels.indexOf(l);
          const open = i === 0 || (state.stars[levels[i - 1].id] || 0) > 0;
          const got = state.stars[l.id] || 0;
          html += `<button type="button" class="tile${l.boss ? " boss" : ""}${got ? " done" : ""}" data-id="${l.id}" ${open ? "" : "disabled"}>
<span class="num">${open ? i + 1 : "🔒"}</span>
<span class="tname">${l.boss ? "Bosslevel: " : ""}${esc(l.title)}</span>
<span class="tstars">${starHtml(got)}</span></button>`;
        }
        html += `</div>`;
      }
      html += `</section>`;
    }
    main.innerHTML = html;
    main.querySelectorAll(".tile").forEach(b =>
      b.addEventListener("click", () => openLevel(levels.find(l => l.id === b.dataset.id))));
    window.scrollTo(0, 0);
  }

  // ---------- Level ----------
  function openLevel(level) {
    runId++;
    const introDone = !level.primm || (state.intro || {})[level.id] || (state.stars[level.id] || 0) > 0;
    view = { level, stage: state.stage || 1, hints: 0, pool: null, prog: [], gapVals: [], mode: introDone ? "work" : "intro", istep: 1, pick: null };
    const l = level;
    const num = PQ.allLevels().indexOf(l) + 1;
    main.innerHTML = `<div class="level">
<section class="panel info">
  <button class="btn ghost" id="back" type="button">← Zur Karte</button>
  <p class="kicker">${l.boss ? "Bosslevel" : "Level " + num}</p>
  <h1>${esc(l.title)}</h1>
  <div class="prose">${l.intro}</div>
  <div id="taskpart">
  <h3>Beispiel</h3>
  <pre class="code">${esc(l.example)}</pre>
  <h3>Deine Aufgabe</h3>
  <div class="prose task">${l.task}</div>
  <h3>So soll es aussehen</h3>
  <pre class="sample">${l.sample}</pre>
  ${l.sample.includes("<b>") ? `<p class="note">Das Fettgedruckte tippt die Person ein, die dein Programm benutzt.</p>` : ""}
  </div>
</section>
<section class="panel work" id="work"></section></div>`;
    $("#back").addEventListener("click", showMap);
    if (view.mode === "intro") renderIntro(); else renderWork();
    window.scrollTo(0, 0);
  }

  const CONSOLE_HTML = `<div id="console" class="console" aria-live="polite"><span class="muted">Hier erscheint die Ausgabe des Programms.</span></div>
<div id="feedback"></div>`;

  function renderWork() {
    runId++;
    $("#taskpart").hidden = false;
    $("#work").innerHTML = `<p class="label">Wähle deine Stufe</p>
  <div class="stages" id="stages"></div>
  <div id="ws"></div>
  <div class="actions">
    <button id="run" class="btn" type="button">▶ Ausprobieren</button>
    <button id="check" class="btn primary" type="button">Prüfen</button>
    <button id="hint" class="btn ghost" type="button"></button>
  </div>
  ${CONSOLE_HTML}
  <ol id="hints" class="hints">${view.level.hints.slice(0, view.hints).map(h => `<li>${h}</li>`).join("")}</ol>
  ${view.level.primm ? `<p class="again"><button type="button" class="linkbtn" id="again">Einstieg noch einmal ansehen</button></p>` : ""}`;
    $("#run").addEventListener("click", doRun);
    $("#check").addEventListener("click", doCheck);
    $("#hint").addEventListener("click", showHint);
    const again = $("#again");
    if (again) again.addEventListener("click", () => { view.mode = "intro"; view.istep = 1; view.pick = null; renderIntro(); });
    renderStages();
    renderWorkspace();
    updateHintButton();
  }

  // ---------- Einstieg: Vorhersagen, Ausführen, Untersuchen ----------
  function stepsHtml() {
    return `<p class="label">Einstieg</p><ol class="steps">${["Vorhersagen", "Ausführen", "Untersuchen"].map((s, i) =>
      `<li class="${i + 1 === view.istep ? "active" : i + 1 < view.istep ? "done" : ""}">${s}</li>`).join("")}</ol>`;
  }
  const optsHtml = (options, off) => options.map((o, i) =>
    `<button type="button" class="opt" data-i="${i}" ${off ? "disabled" : ""}>${esc(o)}</button>`).join("");

  // Lässt ein Programm mit festen Eingaben laufen und zeigt Fragen und Eingaben in der Konsole.
  function runShown(code, inputs, my) {
    const queue = inputs.slice();
    return Engine.run(code, {
      onOutput: t => { if (my === runId) conPrint(t); },
      onInput: p => {
        const v = queue.length ? queue.shift() : "";
        if (my === runId) {
          conPrint(p);
          const b = document.createElement("b");
          b.textContent = v + "\n";
          con().appendChild(b);
        }
        return Promise.resolve(v);
      }
    });
  }

  function renderIntro() {
    runId++;
    const l = view.level, p = l.primm, work = $("#work");
    $("#taskpart").hidden = true;
    if (view.istep < 3) {
      const pr = p.predict;
      work.innerHTML = `${stepsHtml()}
<pre class="code">${esc(l.example)}</pre>
${pr.inputs ? `<p>Jemand startet dieses Programm und tippt <b>${pr.inputs.map(esc).join(" und ")}</b> ein.</p>` : ""}
<p class="q">Was gibt das Programm aus? Entscheide dich, bevor du es startest.</p>
<div class="opts" id="opts">${optsHtml(pr.options)}</div>
<div class="actions"><button id="prun" class="btn primary" type="button" disabled>▶ Programm ausführen</button></div>
${CONSOLE_HTML}`;
      const opts = [...work.querySelectorAll(".opt")];
      opts.forEach(b => b.addEventListener("click", () => {
        view.pick = +b.dataset.i;
        opts.forEach(o => o.classList.toggle("picked", o === b));
        $("#prun").disabled = false;
      }));
      $("#prun").addEventListener("click", async () => {
        const my = ++runId;
        view.istep = 2;
        work.querySelector(".steps").outerHTML = stepsHtml().replace(/^<p.*?<\/p>/, "");
        opts.forEach(o => { o.disabled = true; });
        $("#prun").disabled = true;
        conClear();
        await runShown(l.example, pr.inputs || [], my);
        if (my !== runId) return;
        opts[pr.correct].classList.add("right");
        const hit = view.pick === pr.correct;
        feedback(hit ? "ok" : "info", `<p class="fb-head">${hit ? "Richtig vorhergesagt" : "Das Programm macht etwas anderes als gedacht"}</p>
<p>${pr.explain}</p>
<div class="fb-actions"><button type="button" class="btn primary" id="tostep3">Weiter zum Untersuchen</button></div>`);
        $("#tostep3").addEventListener("click", () => { view.istep = 3; renderIntro(); });
      });
    } else {
      const inv = p.investigate;
      work.innerHTML = `${stepsHtml()}
<div class="prose task">${inv.task}</div>
<div id="edwrap"></div>
<div class="actions">
  <button id="irun" class="btn primary" type="button">▶ Ausführen</button>
  <button id="ireset" class="btn ghost" type="button">Zurücksetzen</button>
</div>
${CONSOLE_HTML}
<p class="q">${esc(inv.question)}</p>
<p class="note" id="optnote">Führe das Programm erst aus. Dann kannst du antworten.</p>
<div class="opts" id="opts">${optsHtml(inv.options, true)}</div>
<div id="ifb"></div>`;
      const ta = makeEditor($("#edwrap"), l.example);
      const opts = [...work.querySelectorAll(".opt")];
      $("#ireset").addEventListener("click", () => { ta.value = l.example; ta.dispatchEvent(new Event("input")); });
      $("#irun").addEventListener("click", async () => {
        const my = ++runId;
        $("#feedback").innerHTML = "";
        conClear();
        const code = getCode();
        const res = await Engine.run(code, {
          onOutput: t => { if (my === runId) conPrint(t); },
          onInput: q => (my === runId ? askInput(q) : new Promise(() => {}))
        });
        if (my !== runId) return;
        if (res.error) feedback("info", Engine.errorHtml(Engine.explain(res.error, code)));
        else if (!res.output) conNote("Das Programm ist durchgelaufen, hat aber nichts ausgegeben.");
        opts.forEach(o => { o.disabled = false; });
        $("#optnote").hidden = true;
      });
      opts.forEach(b => b.addEventListener("click", () => {
        opts.forEach(o => o.classList.toggle("picked", o === b));
        if (+b.dataset.i !== inv.correct) {
          $("#ifb").innerHTML = `<div class="fb retry"><p>Das passt nicht zu dem, was passiert. Führe das Programm noch einmal aus und schau genau hin.</p></div>`;
          return;
        }
        b.classList.add("right");
        opts.forEach(o => { o.disabled = true; });
        state.intro = state.intro || {};
        state.intro[l.id] = true;
        PQ.save(state);
        $("#ifb").innerHTML = `<div class="fb ok"><p class="fb-head">Genau</p><p>${inv.explain}</p>
<div class="fb-actions"><button type="button" class="btn primary" id="towork">Jetzt bist du dran</button></div></div>`;
        $("#towork").addEventListener("click", () => { view.mode = "work"; renderWork(); window.scrollTo(0, 0); });
      }));
    }
  }

  function renderStages() {
    const got = state.stars[view.level.id] || 0;
    $("#stages").innerHTML = STAGES.map(s =>
      `<button type="button" class="stage${s.n === view.stage ? " active" : ""}" data-n="${s.n}">
<span class="sname">${s.name}${got >= s.n ? " ✓" : ""}</span><span class="sstars">${starHtml(s.n, s.n)}</span>
<span class="sdesc">${s.desc}</span></button>`).join("");
    $("#stages").querySelectorAll(".stage").forEach(b => b.addEventListener("click", () => {
      view.stage = +b.dataset.n;
      state.stage = view.stage; PQ.save(state);
      runId++;
      $("#feedback").innerHTML = "";
      renderStages(); renderWorkspace();
    }));
  }

  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function renderWorkspace() {
    const l = view.level, ws = $("#ws");
    if (view.stage === 1) {
      if (!view.pool) {
        view.pool = shuffle([...l.parsons.lines, ...(l.parsons.distractors || [])].map((t, i) => ({ t, i })));
        view.prog = [];
      }
      const extra = (l.parsons.distractors || []).length;
      ws.innerHTML = `<p class="wshelp">Tippe die Bausteine in der richtigen Reihenfolge an. ${extra ? "Achtung: Ein Baustein ist falsch und gehört nicht ins Programm." : ""}</p>
<div class="pz">
  <div><h4>Bausteine</h4><div class="pool">${view.pool.map(x =>
        `<button type="button" class="chip" data-i="${x.i}">${esc(x.t)}</button>`).join("") || `<span class="muted">Alle Bausteine sind verbaut.</span>`}</div></div>
  <div><h4>Dein Programm</h4><ol class="prog">${view.prog.map((x, k) =>
        `<li><code>${esc(x.t)}</code><span class="pbtns">
<button type="button" data-act="up" data-k="${k}" aria-label="Nach oben" ${k === 0 ? "disabled" : ""}>↑</button>
<button type="button" data-act="down" data-k="${k}" aria-label="Nach unten" ${k === view.prog.length - 1 ? "disabled" : ""}>↓</button>
<button type="button" data-act="del" data-k="${k}" aria-label="Entfernen">✕</button></span></li>`).join("") ||
        `<li class="emptyprog muted">Noch leer</li>`}</ol></div>
</div>`;
      ws.querySelectorAll(".chip").forEach(b => b.addEventListener("click", () => {
        const idx = view.pool.findIndex(x => x.i === +b.dataset.i);
        view.prog.push(view.pool.splice(idx, 1)[0]);
        renderWorkspace();
      }));
      ws.querySelectorAll(".pbtns button").forEach(b => b.addEventListener("click", () => {
        const k = +b.dataset.k, p = view.prog;
        if (b.dataset.act === "del") view.pool.push(p.splice(k, 1)[0]);
        if (b.dataset.act === "up") [p[k - 1], p[k]] = [p[k], p[k - 1]];
        if (b.dataset.act === "down") [p[k + 1], p[k]] = [p[k], p[k + 1]];
        renderWorkspace();
      }));
    } else if (view.stage === 2) {
      let g = 0;
      const body = esc(l.gaps).replace(/\{\{(\d+)\}\}/g, (_, size) => {
        const v = view.gapVals[g] || "";
        return `<input class="gap" data-g="${g++}" size="${size}" value="${esc(v)}" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off" aria-label="Lücke ${g}">`;
      });
      ws.innerHTML = `<p class="wshelp">Fülle die Lücken, sodass das Programm die Aufgabe löst.</p><pre class="code gaps">${body}</pre>`;
      ws.querySelectorAll(".gap").forEach(inp =>
        inp.addEventListener("input", () => { view.gapVals[+inp.dataset.g] = inp.value; }));
    } else {
      const text = state.drafts[l.id] !== undefined ? state.drafts[l.id] : l.starter;
      ws.innerHTML = `<p class="wshelp">Schreibe das Programm selbst. Dein Text wird automatisch gespeichert.</p><div id="edwrap"></div>`;
      makeEditor($("#edwrap"), text, v => { state.drafts[l.id] = v; PQ.save(state); });
    }
  }

  function makeEditor(parent, text, onChange) {
      parent.innerHTML = `<div class="editor"><div class="gutter" id="gutter"></div>
<textarea id="code" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off" wrap="off" aria-label="Programmcode"></textarea></div>`;
      const ta = $("#code"), gutter = $("#gutter");
      ta.value = text;
      const sync = () => {
        const n = ta.value.split("\n").length;
        gutter.textContent = Array.from({ length: n }, (_, i) => i + 1).join("\n");
        gutter.scrollTop = ta.scrollTop;
        ta.style.height = Math.max(180, n * 24 + 28) + "px";
      };
      ta.addEventListener("input", () => { if (onChange) onChange(ta.value); sync(); });
      ta.addEventListener("scroll", () => { gutter.scrollTop = ta.scrollTop; });
      ta.addEventListener("keydown", e => {
        const s = ta.selectionStart, v = ta.value;
        if (e.key === "Tab") {
          e.preventDefault();
          ta.setRangeText("    ", s, ta.selectionEnd, "end");
          ta.dispatchEvent(new Event("input"));
        } else if (e.key === "Enter") {
          const lineStart = v.lastIndexOf("\n", s - 1) + 1;
          const cur = v.slice(lineStart, s);
          let indent = cur.match(/^ */)[0];
          if (cur.trimEnd().endsWith(":")) indent += "    ";
          if (indent) {
            e.preventDefault();
            ta.setRangeText("\n" + indent, s, ta.selectionEnd, "end");
            ta.dispatchEvent(new Event("input"));
          }
        }
      });
      sync();
      return ta;
  }

  function getCode() {
    const l = view.level;
    let code;
    if (view.mode === "intro") code = $("#code").value;
    else if (view.stage === 1) code = view.prog.map(x => x.t).join("\n");
    else if (view.stage === 2) { let g = 0; code = l.gaps.replace(/\{\{\d+\}\}/g, () => view.gapVals[g++] || ""); }
    else code = $("#code").value;
    // Tablets setzen gern typografische Anführungszeichen, die Python nicht versteht.
    return code.replace(/[“”„‟]/g, '"').replace(/[‘’‚]/g, "'");
  }
  function isEmpty() {
    if (view.stage === 1) return view.prog.length === 0;
    if (view.stage === 2) return !view.gapVals.some(v => v && v.trim());
    return !getCode().replace(/#.*$/gm, "").trim();
  }

  // ---------- Konsole ----------
  const con = () => $("#console");
  function conClear() { con().innerHTML = ""; }
  function conPrint(t) { con().appendChild(document.createTextNode(t)); con().scrollTop = con().scrollHeight; }
  function conNote(t) { const s = document.createElement("span"); s.className = "muted"; s.textContent = t; con().appendChild(s); }
  function askInput(prompt) {
    return new Promise(resolve => {
      conPrint(prompt);
      const wrap = document.createElement("span");
      wrap.className = "ask";
      wrap.innerHTML = `<input type="text" autocapitalize="off" autocomplete="off" aria-label="Eingabe"><button type="button">OK</button>`;
      con().appendChild(wrap);
      const inp = wrap.firstChild;
      const done = () => {
        const v = inp.value;
        const typed = document.createElement("b");
        typed.textContent = v + "\n";
        wrap.replaceWith(typed);
        resolve(v);
      };
      inp.addEventListener("keydown", e => { if (e.key === "Enter") done(); });
      wrap.lastChild.addEventListener("click", done);
      inp.focus();
    });
  }

  function feedback(kind, html) {
    $("#feedback").innerHTML = `<div class="fb ${kind}">${html}</div>`;
  }

  async function doRun() {
    const my = ++runId;
    $("#feedback").innerHTML = "";
    conClear();
    if (isEmpty()) { conNote("Dein Programm ist noch leer."); return; }
    const code = getCode();
    const res = await Engine.run(code, {
      onOutput: t => { if (my === runId) conPrint(t); },
      onInput: p => (my === runId ? askInput(p) : new Promise(() => {}))
    });
    if (my !== runId) return;
    if (res.error) feedback("retry", Engine.errorHtml(Engine.explain(res.error, code)));
    else {
      if (!res.output) conNote("Dein Programm ist durchgelaufen, hat aber nichts ausgegeben.");
      feedback("info", `<p>Dein Programm läuft ohne Fehler. Mit <b>Prüfen</b> siehst du, ob es die Aufgabe löst.</p>`);
    }
  }

  async function doCheck() {
    const my = ++runId;
    conClear();
    if (isEmpty()) { feedback("retry", `<p>Dein Programm ist noch leer.</p>`); return; }
    const l = view.level;
    const res = await Engine.check(l, getCode());
    if (my !== runId) return;
    if (res.output) conPrint(res.output); else conNote("Keine Ausgabe.");
    if (!res.ok) { feedback("retry", `<p class="fb-head">Noch nicht ganz</p>` + res.html); return; }

    const before = state.stars[l.id] || 0;
    if (view.stage > before) { state.stars[l.id] = view.stage; PQ.save(state); }
    renderHeader(); renderStages();
    const levels = PQ.allLevels();
    const next = levels[levels.indexOf(l) + 1];
    const gain = view.stage === 1 ? "einen Stern" : view.stage === 2 ? "zwei Sterne" : "drei Sterne";
    feedback("ok", `<p class="fb-head">Geschafft! <span class="pop">${starHtml(view.stage, view.stage)}</span></p>
<p>Dein Programm löst die Aufgabe. Auf der Stufe ${STAGES[view.stage - 1].name} gibt es dafür ${gain}.</p>
<div class="fb-actions">
${view.stage < 3 ? `<button type="button" class="btn" id="harder">Nächste Stufe probieren</button>` : ""}
${next ? `<button type="button" class="btn primary" id="next">Weiter zum nächsten Level</button>` : `<button type="button" class="btn primary" id="tomap">Zur Karte</button>`}
</div>`);
    const h = $("#harder"), n = $("#next"), m = $("#tomap");
    if (h) h.addEventListener("click", () => {
      view.stage++; state.stage = view.stage; PQ.save(state);
      $("#feedback").innerHTML = ""; conClear();
      renderStages(); renderWorkspace();
    });
    if (n) n.addEventListener("click", () => openLevel(next));
    if (m) m.addEventListener("click", showMap);
  }

  function updateHintButton() {
    const total = view.level.hints.length, b = $("#hint");
    b.textContent = view.hints >= total ? "Alle Tipps gezeigt" : `Tipp ${view.hints + 1} von ${total}`;
    b.disabled = view.hints >= total;
  }
  function showHint() {
    const li = document.createElement("li");
    li.innerHTML = view.level.hints[view.hints++];
    $("#hints").appendChild(li);
    updateHintButton();
  }

  // ---------- Dialoge ----------
  function askName(first) {
    dlg.innerHTML = `<form method="dialog" class="dform">
<h2>${first ? "Willkommen bei Python Quest" : "Namen ändern"}</h2>
<p>Wie heißt du? Dein Name bleibt auf diesem Gerät. Er wird nur gebraucht, damit dein Fortschrittscode zu dir gehört.</p>
<input id="nm" type="text" maxlength="40" placeholder="Vorname" value="${esc(state.name)}" autocomplete="off">
<div class="drow"><button class="btn primary" value="ok">Los geht es</button></div>
${first ? `<p class="note"><a href="#" id="restore">Ich habe schon einen Fortschrittscode</a></p>` : ""}
</form>`;
    dlg.oncancel = e => { if (!state.name) e.preventDefault(); };
    dlg.onclose = null;
    $("form", dlg).addEventListener("submit", e => {
      const v = $("#nm").value.trim();
      if (!v) { e.preventDefault(); $("#nm").focus(); return; }
      state.name = v; PQ.save(state);
      renderHeader();
      if (!view) showMap();
    });
    const r = $("#restore");
    if (r) r.addEventListener("click", e => { e.preventDefault(); askRestore(); });
    if (!dlg.open) dlg.showModal();
  }

  function askRestore() {
    dlg.innerHTML = `<form method="dialog" class="dform">
<h2>Mit Code weitermachen</h2>
<p>Gib deinen Namen genau so ein wie beim letzten Mal und dazu deinen Fortschrittscode.</p>
<input id="rn" type="text" maxlength="40" placeholder="Vorname" autocomplete="off">
<input id="rc" type="text" maxlength="40" placeholder="Fortschrittscode" autocomplete="off" autocapitalize="characters">
<p id="rerr" class="err"></p>
<div class="drow"><button class="btn" type="button" id="rback">Zurück</button><button class="btn primary" value="ok">Laden</button></div>
</form>`;
    $("#rback").addEventListener("click", () => (state.name ? showCode() : askName(true)));
    $("form", dlg).addEventListener("submit", e => {
      const name = $("#rn").value.trim();
      const stars = name ? PQ.readCode($("#rc").value, name) : null;
      if (!stars) { e.preventDefault(); $("#rerr").textContent = "Name und Code passen nicht zusammen. Prüfe beide auf Tippfehler."; return; }
      state = Object.assign(PQ.empty(), { name, stars });
      PQ.save(state); renderHeader(); showMap();
    });
    if (!dlg.open) dlg.showModal();
  }

  function showCode() {
    dlg.innerHTML = `<form method="dialog" class="dform">
<h2>Dein Fortschrittscode</h2>
<p>Name: <b>${esc(state.name)}</b></p>
<p class="bigcode">${esc(PQ.makeCode(state))}</p>
<p>Zeige oder schicke diesen Code deiner Lehrkraft. Schreib ihn dir auch auf. Damit machst du an einem anderen Gerät dort weiter, wo du aufgehört hast.</p>
<div class="drow">
<button class="btn ghost" type="button" id="c-restore">Code eingeben</button>
<button class="btn ghost" type="button" id="c-name">Namen ändern</button>
<button class="btn ghost" type="button" id="c-out">Abmelden</button>
<button class="btn primary" value="ok">Schließen</button></div>
<p class="note">Abmelden löscht den Stand auf diesem Gerät. Schreib dir vorher deinen Code auf.</p>
</form>`;
    $("#c-restore").addEventListener("click", askRestore);
    $("#c-name").addEventListener("click", () => askName(false));
    $("#c-out").addEventListener("click", () => {
      state = PQ.empty(); PQ.save(state); renderHeader(); view = null; main.innerHTML = ""; askName(true);
    });
    if (!dlg.open) dlg.showModal();
  }

  // ---------- Start ----------
  $("#btn-home").addEventListener("click", () => { if (state.name) showMap(); });
  $("#btn-code").addEventListener("click", () => { if (state.name) showCode(); });

  if (typeof Sk === "undefined") {
    main.innerHTML = `<p class="loading">Python konnte nicht geladen werden. Prüfe die Internetverbindung und lade die Seite neu.</p>`;
    return;
  }
  renderHeader();
  if (state.name) showMap(); else { main.innerHTML = ""; askName(true); }
})();
