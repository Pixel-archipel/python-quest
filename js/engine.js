// Führt Python im Browser aus, prüft Lösungen und übersetzt Fehlermeldungen.
const Engine = (() => {
  "use strict";
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // opts.inputs: feste Eingaben für Tests. Sonst opts.onInput(frage) -> Promise<string>.
  async function run(code, opts = {}) {
    let out = "";
    let starved = false;
    const queue = opts.inputs ? opts.inputs.slice() : null;
    Sk.configure({
      output: t => {
        out += t;
        if (out.length > 8000) throw new Error("ZuVielAusgabe");
        if (opts.onOutput) opts.onOutput(t);
      },
      inputfun: prompt => {
        if (queue) {
          if (!queue.length) { starved = true; throw new Error("KeineEingabeMehr"); }
          return queue.shift();
        }
        return opts.onInput(prompt).then(v => { Sk.execStart = new Date(); return v; });
      },
      inputfunTakesPrompt: true,
      __future__: Sk.python3,
      execLimit: 4000
    });
    let error = null;
    try {
      await Sk.misceval.asyncToPromise(() => Sk.importMainWithBody("<stdin>", false, code, true));
    } catch (e) { error = e; }
    return { output: out, error, starved, left: queue ? queue.length : 0 };
  }

  // ---------- Fehlermeldungen ----------
  function explain(err, code) {
    const original = String(err && err.toString ? err.toString() : err);
    const type = (err && err.tp$name) || original.split(":")[0];
    let line = err && err.traceback && err.traceback[0] ? err.traceback[0].lineno : null;
    if (!line) { const m = original.match(/on line (\d+)/); if (m) line = +m[1]; }
    const src = code.split("\n");
    const at = n => (n && src[n - 1] !== undefined ? src[n - 1] : "");
    let title = "Python meldet einen Fehler";
    let text = "Lies die Zeile noch einmal genau und vergleiche sie mit dem Beispiel.";

    if (original.includes("ZuVielAusgabe") || type === "TimeLimitError") {
      title = "Dein Programm hört nicht auf";
      text = "Es läuft zu lange oder gibt endlos Text aus. Prüfe, ob sich etwas ohne Ende wiederholt.";
      line = null;
    } else if (type === "SyntaxError" || type === "IndentationError") {
      const odd = s => (s.match(/"/g) || []).length % 2 === 1;
      const open = s => (s.match(/\(/g) || []).length - (s.match(/\)/g) || []).length;
      const cand = [line, line ? line - 1 : null].filter(n => n && at(n).trim());
      const q = cand.find(n => odd(at(n)));
      const p = cand.find(n => open(at(n)) !== 0);
      const bare = n => at(n).replace(/#.*$/, "").trimEnd();
      const indent = s => s.match(/^ */)[0].length;
      const eq = cand.find(n => /^\s*(if|elif|while)\b/.test(at(n)) && /[^=!<>]=[^=]/.test(at(n)));
      const colon = cand.find(n => /^\s*(if|elif|else|for|while|def)\b/.test(at(n)) && !bare(n).endsWith(":"));
      // Zeile mit Doppelpunkt, nach der nichts Eingerücktes folgt
      let block = null;
      for (let n = 1; n <= src.length && !block; n++) {
        if (!bare(n).endsWith(":")) continue;
        let m = n + 1;
        while (m <= src.length && !bare(m).trim()) m++;
        if (m > src.length || indent(at(m)) <= indent(at(n))) block = n;
      }
      if (q) {
        line = q;
        title = "Ein Anführungszeichen fehlt";
        text = "Text braucht immer ein Anführungszeichen am Anfang und eins am Ende.";
      } else if (eq) {
        line = eq;
        title = "Zum Vergleichen brauchst du zwei Gleichheitszeichen";
        text = "Ein einfaches <code>=</code> speichert etwas in einer Variable. Zum Vergleichen schreibst du <code>==</code>.";
      } else if (colon) {
        line = colon;
        title = "Der Doppelpunkt fehlt";
        text = "Zeilen mit <code>if</code>, <code>elif</code>, <code>else</code>, <code>for</code> und <code>while</code> enden immer mit einem Doppelpunkt.";
      } else if (block) {
        line = block;
        title = "Nach dem Doppelpunkt fehlt die Einrückung";
        text = "Nach dieser Zeile muss mindestens eine Zeile folgen, die um vier Leerzeichen eingerückt ist.";
      } else if (type === "IndentationError" || /indent/i.test(original)) {
        title = "Die Einrückung stimmt nicht";
        text = "Eine Zeile beginnt mit zu vielen oder zu wenigen Leerzeichen. Zeilen, die zusammengehören, müssen gleich weit eingerückt sein.";
      } else if (q) {
        line = q;
        title = "Ein Anführungszeichen fehlt";
        text = "Text braucht immer ein Anführungszeichen am Anfang und eins am Ende.";
      } else if (p) {
        line = p;
        title = "Eine Klammer fehlt oder ist zu viel";
        text = "Jede Klammer, die aufgeht, muss auch wieder zugehen. Zähle die Klammern in dieser Zeile.";
      } else {
        title = "Python versteht diese Zeile nicht";
        text = "Irgendetwas ist anders geschrieben, als Python es erwartet. Prüfe Klammern, Anführungszeichen, Kommas und Tippfehler.";
      }
    } else if (type === "NameError") {
      const m = original.match(/name '([^']+)'/);
      const name = m ? m[1] : "";
      title = "Python kennt dieses Wort nicht";
      if (name && name !== name.toLowerCase() && ["print", "input", "int", "str", "range", "len"].includes(name.toLowerCase())) {
        text = `Python unterscheidet große und kleine Buchstaben. Schreibe <code>${esc(name.toLowerCase())}</code> komplett klein.`;
      } else {
        text = `Das Wort <code>${esc(name)}</code> ist Python unbekannt. Soll es ein Text sein, dann fehlen die Anführungszeichen. Soll es eine Variable sein, dann prüfe die Schreibweise und ob du sie weiter oben angelegt hast.`;
      }
    } else if (type === "TypeError") {
      title = "Text und Zahl passen so nicht zusammen";
      text = "Du rechnest hier mit etwas, das für Python ein Text ist. Eine Eingabe aus <code>input()</code> ist immer Text. Mit <code>int()</code> machst du daraus eine Zahl.";
    } else if (type === "ValueError") {
      title = "Das lässt sich nicht in eine Zahl umwandeln";
      text = "<code>int()</code> hat einen Text bekommen, der keine ganze Zahl ist. Prüfe, was eingegeben wurde.";
    } else if (type === "IndexError") {
      title = "Diesen Platz gibt es in der Liste nicht";
      text = "Die Nummer in den eckigen Klammern ist zu groß. Python zählt ab 0. Eine Liste mit drei Einträgen hat also die Plätze 0, 1 und 2.";
    } else if (type === "AttributeError") {
      title = "Diesen Befehl gibt es hier nicht";
      text = "Hinter dem Punkt steht ein Befehl, den Python an dieser Stelle nicht kennt. Prüfe die Schreibweise, zum Beispiel bei <code>append</code>.";
    } else if (type === "ZeroDivisionError") {
      title = "Durch null teilen geht nicht";
      text = "In dieser Zeile wird durch null geteilt. Prüfe die Werte deiner Variablen.";
    }
    return { title, text, line, lineText: at(line), original };
  }

  function errorHtml(x) {
    return `<p class="fb-title">${esc(x.title)}</p>` +
      (x.line ? `<p>Schau in Zeile ${x.line}:</p><pre class="code small">${esc(x.lineText)}</pre>` : "") +
      `<p>${x.text}</p><p class="orig">So sagt es Python: ${esc(x.original)}</p>`;
  }

  // ---------- Ausgabe vergleichen ----------
  function toLines(s) {
    const a = s.replace(/\r/g, "").split("\n").map(x => x.replace(/\s+$/, ""));
    while (a.length && a[a.length - 1] === "") a.pop();
    return a;
  }
  const loose = s => s.toLowerCase().replace(/[\s.,!?:"']/g, "");

  function compare(out, expect) {
    const got = toLines(out);
    if (!got.length) return `<p>Dein Programm gibt noch nichts aus. Für Ausgaben brauchst du <code>print()</code>.</p>`;
    const n = Math.max(got.length, expect.length);
    for (let i = 0; i < n; i++) {
      if (got[i] === expect[i]) continue;
      const before = i === 0 ? "" : i === 1 ? "Zeile 1 der Ausgabe stimmt schon. " : `Die ersten ${i} Zeilen der Ausgabe stimmen schon. `;
      if (got[i] === undefined) {
        return `<p>${before}Danach fehlt noch diese Zeile:</p><pre class="code small">${esc(expect[i])}</pre>`;
      }
      if (expect[i] === undefined) {
        return `<p>${before}Dein Programm gibt aber mehr aus als verlangt. Diese Zeile ist zu viel:</p><pre class="code small">${esc(got[i])}</pre>`;
      }
      const near = loose(got[i]) === loose(expect[i]);
      return `<p>${before}Zeile ${i + 1} passt noch nicht.</p>
<table class="diff"><tr><th>Erwartet</th><td><code>${esc(expect[i])}</code></td></tr>
<tr><th>Dein Programm</th><td><code>${esc(got[i])}</code></td></tr></table>` +
        (near ? `<p>Du bist ganz nah dran. Vergleiche Leerzeichen, Satzzeichen und große und kleine Buchstaben.</p>` : "");
    }
    return null;
  }

  // ---------- Lösung prüfen ----------
  async function check(level, code) {
    const src = code.replace(/#.*$/gm, "");
    if (!src.trim()) return { ok: false, html: `<p>Dein Programm ist noch leer.</p>`, output: "" };
    let firstOut = "";
    for (let i = 0; i < level.tests.length; i++) {
      const t = level.tests[i];
      const r = await run(code, { inputs: t.inputs || [] });
      if (i === 0) firstOut = r.output;
      const tested = t.inputs && t.inputs.length
        ? `<p class="orig">Getestet mit den Eingaben: ${t.inputs.map(esc).join(", ")}</p>` : "";
      if (r.starved) {
        return { ok: false, output: firstOut, html: `<p>Dein Programm fragt öfter nach einer Eingabe, als die Aufgabe verlangt. Zähle deine <code>input</code> Befehle. Bei einer Schleife: Prüfe, ob sie rechtzeitig aufhört.</p>${tested}` };
      }
      if (r.error) return { ok: false, output: firstOut, html: errorHtml(explain(r.error, code)) + tested };
      if (r.left > 0) {
        return { ok: false, output: firstOut, html: `<p>Dein Programm fragt zu selten nach einer Eingabe. Die Aufgabe verlangt ${t.inputs.length === 1 ? "eine Eingabe" : t.inputs.length + " Eingaben"}.</p>` };
      }
      const diff = compare(r.output, t.expect);
      if (diff) {
        const second = i > 0 ? `<p>Mit den ersten Eingaben klappt dein Programm, mit anderen noch nicht. Prüfe, ob es bei jeder Eingabe das Richtige tut.</p>` : "";
        return { ok: false, output: firstOut, html: second + diff + tested };
      }
    }
    for (const m of level.mustNot || []) if (m.re.test(src)) return { ok: false, output: firstOut, html: `<p>${m.msg}</p>` };
    for (const m of level.must || []) if (!m.re.test(src)) return { ok: false, output: firstOut, html: `<p>${m.msg}</p>` };
    return { ok: true, output: firstOut };
  }

  return { run, check, explain, errorHtml, esc };
})();
