// Speicherstand und Fortschrittscode. Wird von der Schülerseite und der Lehrerseite benutzt.
const PQ = (() => {
  "use strict";
  const KEY = "pythonquest.v1";
  const ALPHA = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // ohne I, O, 0, 1
  const SALT = "pq-erg9-2026";

  const allLevels = () => WORLDS.flatMap(w => w.levels);
  const empty = () => ({ name: "", stars: {}, drafts: {}, stage: 1 });

  function load() {
    try { return Object.assign(empty(), JSON.parse(localStorage.getItem(KEY)) || {}); }
    catch (e) { return empty(); }
  }
  function save(state) {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* privater Modus */ }
  }

  function hash(str) {
    let h = 2166136261;
    for (const b of new TextEncoder().encode(str)) { h ^= b; h = Math.imul(h, 16777619); }
    return h >>> 0;
  }
  const normName = n => String(n).trim().toLowerCase().replace(/\s+/g, " ");

  function payload(stars) {
    let bits = allLevels().map(l => (stars[l.id] || 0).toString(2).padStart(2, "0")).join("");
    while (bits.length % 5) bits += "0";
    let out = "";
    for (let i = 0; i < bits.length; i += 5) out += ALPHA[parseInt(bits.slice(i, i + 5), 2)];
    return out;
  }
  function checksum(p, name) {
    let h = hash(p + "|" + normName(name) + "|" + SALT);
    let out = "";
    for (let i = 0; i < 4; i++) { out += ALPHA[h & 31]; h >>>= 5; }
    return out;
  }
  function makeCode(state) {
    const p = payload(state.stars);
    return p + "-" + checksum(p, state.name);
  }
  // Gibt {levelId: Sterne} zurück oder null, wenn Code und Name nicht zusammenpassen.
  function readCode(code, name) {
    const clean = String(code).toUpperCase().replace(/[^A-Z2-9]/g, "");
    if (clean.length < 5) return null;
    const p = clean.slice(0, -4);
    if (checksum(p, name) !== clean.slice(-4)) return null;
    let bits = "";
    for (const ch of p) {
      const v = ALPHA.indexOf(ch);
      if (v < 0) return null;
      bits += v.toString(2).padStart(5, "0");
    }
    const stars = {};
    allLevels().forEach((l, i) => {
      const v = parseInt(bits.slice(i * 2, i * 2 + 2) || "0", 2);
      if (v) stars[l.id] = v;
    });
    return stars;
  }

  const totalStars = stars => allLevels().reduce((s, l) => s + (stars[l.id] || 0), 0);
  const maxStars = () => allLevels().length * 3;

  return { allLevels, load, save, empty, makeCode, readCode, totalStars, maxStars };
})();
