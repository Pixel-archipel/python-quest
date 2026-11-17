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

  // Je Level 2 Bit für 0 bis 3 Sterne. Nicht gespielte Level am Ende fallen weg,
  // deshalb wächst der Code mit dem Fortschritt: am Anfang 4, bei allen 37 Einträgen 17 Zeichen.
  const CHECK = 2;
  function payload(stars) {
    let bits = allLevels().map(l => (stars[l.id] || 0).toString(2).padStart(2, "0")).join("");
    bits = bits.replace(/0+$/, "");
    while (bits.length % 5 || !bits.length) bits += "0";
    let out = "";
    for (let i = 0; i < bits.length; i += 5) out += ALPHA[parseInt(bits.slice(i, i + 5), 2)];
    return out;
  }
  function checksum(p, name) {
    let h = hash(p + "|" + normName(name) + "|" + SALT);
    let out = "";
    for (let i = 0; i < CHECK; i++) { out += ALPHA[h & 31]; h >>>= 5; }
    return out;
  }
  function makeCode(state) {
    const p = payload(state.stars);
    return (p + checksum(p, state.name)).match(/.{1,4}/g).join("-");
  }
  // Gibt {levelId: Sterne} zurück oder null, wenn Code und Name nicht zusammenpassen.
  function readCode(code, name) {
    // Kopierte Codes haben die Form "Name: CODE". Dann zählt nur der Teil nach dem Doppelpunkt.
    const clean = String(code).split(":").pop().toUpperCase().replace(/[^A-Z2-9]/g, "");
    if (clean.length < CHECK + 1) return null;
    const p = clean.slice(0, -CHECK);
    if (checksum(p, name) !== clean.slice(-CHECK)) return null;
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
