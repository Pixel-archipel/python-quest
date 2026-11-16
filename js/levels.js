// Inhalte von Python Quest.
// Neue Level immer HINTEN in einer Welt anhängen, sonst passen alte Fortschrittscodes nicht mehr.
//
// Aufbau eines Levels:
//   tests    Eingaben und erwartete Ausgabezeilen. Die Fragen aus input() zählen nicht zur Ausgabe.
//   must     Muster, die im Code vorkommen müssen, mit Rückmeldung
//   mustNot  Muster, die nicht vorkommen dürfen, mit Rückmeldung
//   parsons  Stufe 1: richtige Zeilen und falsche Bausteine
//   gaps     Stufe 2: Code mit Lücken, jede Lücke ist {{}}
//   starter  Stufe 3: Startinhalt des Editors

const WORLDS = [
  {
    id: "w1",
    title: "Welt 1: Erste Schritte",
    sub: "Ausgaben, Variablen und Eingaben",
    levels: [
      {
        id: "w1l1",
        primm: {
          predict: {
            options: [`Guten Morgen! Los geht es.`, `Guten Morgen!\nLos geht es.`, `"Guten Morgen!"\n"Los geht es."`, `print("Guten Morgen!")\nprint("Los geht es.")`],
            correct: 1,
            explain: `Jeder <code>print</code> Befehl schreibt in eine eigene Zeile. Die Anführungszeichen zeigen Python nur, wo der Text anfängt und aufhört. Sie werden nicht mit ausgegeben.`
          },
          investigate: {
            task: `<p>Jetzt darfst du das Programm kaputt machen. Lösche in der ersten Zeile das letzte Anführungszeichen und führe das Programm aus.</p>`,
            question: `Was passiert?`,
            options: [`Die erste Zeile fehlt, die zweite wird ausgegeben.`, `Alles läuft wie vorher.`, `Python meldet einen Fehler und gibt gar nichts aus.`],
            correct: 2,
            explain: `Python liest erst das ganze Programm. Findet es einen Schreibfehler, startet es gar nicht. Deshalb erscheint auch die zweite Zeile nicht.`
          }
        },
        title: "Hallo Welt",
        intro: `<p>Ein Programm ist eine Liste von Befehlen. Der Computer führt sie von oben nach unten aus.</p>
<p>Mit dem Befehl <code>print()</code> schreibt dein Programm etwas auf den Bildschirm. Text steht dabei immer in Anführungszeichen.</p>`,
        example: `print("Guten Morgen!")
print("Los geht es.")`,
        task: `<p>Dein Programm soll zwei Zeilen ausgeben. Zuerst <code>Hallo Welt!</code> und danach <code>Ich lerne Python.</code></p>`,
        sample: `Hallo Welt!
Ich lerne Python.`,
        tests: [{ inputs: [], expect: ["Hallo Welt!", "Ich lerne Python."] }],
        hints: [
          `Jede Zeile der Ausgabe braucht einen eigenen <code>print</code> Befehl.`,
          `Der Text steht in runden Klammern und in Anführungszeichen. Schau dir das Beispiel an.`,
          `Die erste Zeile lautet <code>print("Hallo Welt!")</code>. Die zweite baust du genauso.`
        ],
        parsons: {
          lines: [`print("Hallo Welt!")`, `print("Ich lerne Python.")`],
          distractors: [`print(Hallo Welt!)`]
        },
        gaps: `{{6}}("Hallo Welt!")
print({{20}})`,
        starter: `# Schreibe hier dein Programm
`
      },
      {
        id: "w1l2",
        primm: {
          predict: {
            options: [`Mein Haustier ist ein tier`, `Mein Haustier ist einHund`, `Mein Haustier ist ein Hund`, `Python meldet einen Fehler.`],
            correct: 2,
            explain: `Ohne Anführungszeichen ist <code>tier</code> der Name der Variable. Python setzt an dieser Stelle ihren Inhalt ein. Das Komma sorgt für das Leerzeichen.`
          },
          investigate: {
            task: `<p>Setze in der zweiten Zeile das Wort <code>tier</code> in Anführungszeichen, sodass dort <code>"tier"</code> steht. Führe das Programm dann aus.</p>`,
            question: `Was wird jetzt ausgegeben?`,
            options: [`Mein Haustier ist ein Hund`, `Mein Haustier ist ein tier`, `Python meldet einen Fehler.`],
            correct: 1,
            explain: `Mit Anführungszeichen ist <code>"tier"</code> einfach ein Text. Python schaut dann nicht mehr in die Variable.`
          }
        },
        title: "Variablen",
        intro: `<p>Eine Variable ist wie eine beschriftete Kiste. Mit dem Zeichen <code>=</code> legst du einen Wert hinein. Über den Namen holst du ihn später wieder heraus.</p>
<p>Wichtig: Der Name der Variable steht ohne Anführungszeichen.</p>
<p>Mit einem Komma gibst du in <code>print</code> mehrere Dinge hintereinander aus. Python setzt von selbst ein Leerzeichen dazwischen.</p>`,
        example: `tier = "Hund"
print("Mein Haustier ist ein", tier)`,
        task: `<p>Lege die Variable <code>name</code> mit dem Wert <code>"Mika"</code> an und die Variable <code>hobby</code> mit dem Wert <code>"Skaten"</code>.</p>
<p>Gib dann beide Sätze aus und benutze dabei die Variablen.</p>`,
        sample: `Hallo Mika
Dein Hobby ist Skaten`,
        tests: [{ inputs: [], expect: ["Hallo Mika", "Dein Hobby ist Skaten"] }],
        must: [
          { re: /print\s*\([^\n]*\bname\b\s*\)/, msg: `Die Ausgabe stimmt. Benutze in <code>print</code> aber die Variable <code>name</code>, statt den Namen direkt hinzuschreiben.` },
          { re: /print\s*\([^\n]*\bhobby\b\s*\)/, msg: `Die Ausgabe stimmt. Benutze in <code>print</code> aber die Variable <code>hobby</code>, statt das Hobby direkt hinzuschreiben.` }
        ],
        hints: [
          `Du brauchst vier Zeilen. Zwei legen die Variablen an, zwei geben etwas aus.`,
          `Eine Variable legst du so an: <code>name = "Mika"</code>`,
          `Die erste Ausgabe lautet <code>print("Hallo", name)</code>. Die zweite baust du genauso mit <code>hobby</code>.`
        ],
        parsons: {
          lines: [`name = "Mika"`, `hobby = "Skaten"`, `print("Hallo", name)`, `print("Dein Hobby ist", hobby)`],
          distractors: [`print("Hallo", Mika)`]
        },
        gaps: `name = {{8}}
hobby = "Skaten"
print("Hallo", {{6}})
print("Dein Hobby ist", {{6}})`,
        starter: `# Lege zuerst die Variablen an
`
      },
      {
        id: "w1l3",
        primm: {
          predict: {
            options: [`Summe: 8`, `Summe: 15`, `Summe: 35`, `Summe: preis * anzahl`],
            correct: 1,
            explain: `Python setzt für <code>preis</code> die 3 und für <code>anzahl</code> die 5 ein und rechnet dann 3 mal 5.`
          },
          investigate: {
            task: `<p>Ändere die Rechnung in der letzten Zeile zu <code>preis + 2 * anzahl</code> und führe das Programm aus.</p>`,
            question: `Welches Ergebnis kommt heraus?`,
            options: [`25`, `10`, `13`],
            correct: 2,
            explain: `Python rechnet wie in Mathe Punkt vor Strich. Also erst 2 mal 5 und dann plus 3. Wer zuerst addieren will, braucht Klammern.`
          }
        },
        title: "Rechnen",
        intro: `<p>Python ist auch ein Taschenrechner. Es gibt <code>+</code> für plus, <code>-</code> für minus, <code>*</code> für mal und <code>/</code> für geteilt.</p>
<p>Zahlen stehen ohne Anführungszeichen. Klammern funktionieren wie in Mathe.</p>`,
        example: `preis = 3
anzahl = 5
print("Summe:", preis * anzahl)`,
        task: `<p>Ein Kinoticket kostet 9 Euro, eine Portion Popcorn 5 Euro. Vier Personen nehmen jeweils beides.</p>
<p>Lege die Variablen <code>ticket</code>, <code>popcorn</code> und <code>personen</code> an. Lass Python den Gesamtpreis berechnen und speichere ihn in der Variable <code>gesamt</code>.</p>`,
        sample: `Gesamtpreis: 56`,
        tests: [{ inputs: [], expect: ["Gesamtpreis: 56"] }],
        mustNot: [
          { re: /56/, msg: `Die Ausgabe stimmt, aber du hast das Ergebnis selbst ausgerechnet. Lass Python rechnen. Die Zahl 56 soll in deinem Code nicht vorkommen.` }
        ],
        must: [
          { re: /\bgesamt\s*=/, msg: `Die Ausgabe stimmt. Speichere das Ergebnis noch in der Variable <code>gesamt</code>.` }
        ],
        hints: [
          `Überlege zuerst ohne Computer: Was kostet eine Person? Und was kosten dann vier?`,
          `Punkt vor Strich gilt auch in Python. Du brauchst also Klammern um die Addition.`,
          `Die Rechnung lautet <code>gesamt = (ticket + popcorn) * personen</code>`
        ],
        parsons: {
          lines: [`ticket = 9`, `popcorn = 5`, `personen = 4`, `gesamt = (ticket + popcorn) * personen`, `print("Gesamtpreis:", gesamt)`],
          distractors: [`gesamt = ticket + popcorn * personen`]
        },
        gaps: `ticket = 9
popcorn = 5
personen = 4
gesamt = (ticket {{2}} popcorn) {{2}} personen
print("Gesamtpreis:", {{7}})`,
        starter: `ticket = 9
`
      },
      {
        id: "w1l4",
        primm: {
          predict: {
            inputs: ["Blau"],
            options: [`Schöne Farbe: farbe`, `Blau`, `Schöne Farbe: Blau`],
            correct: 2,
            explain: `Die Antwort landet in der Variable <code>farbe</code>. In der zweiten Zeile setzt Python sie wieder ein.`
          },
          investigate: {
            task: `<p>Führe das Programm aus und antworte nicht mit einer Farbe, sondern mit der Zahl 7.</p>`,
            question: `Was passiert?`,
            options: [`Python meldet einen Fehler, weil 7 keine Farbe ist.`, `Das Programm gibt Schöne Farbe: 7 aus.`, `Das Programm stellt die Frage noch einmal.`],
            correct: 1,
            explain: `Python prüft nicht, ob eine Antwort sinnvoll ist. Alles, was eingetippt wird, landet als Text in der Variable.`
          }
        },
        title: "Eingaben",
        intro: `<p>Bisher macht dein Programm immer dasselbe. Mit <code>input()</code> kann es Fragen stellen.</p>
<p>Der Befehl zeigt die Frage an und wartet auf eine Antwort. Die Antwort speicherst du in einer Variable.</p>`,
        example: `farbe = input("Was ist deine Lieblingsfarbe? ")
print("Schöne Farbe:", farbe)`,
        task: `<p>Dein Programm fragt nach dem Namen. Danach begrüßt es die Person mit <code>Hallo</code> und ihrem Namen.</p>
<p>Zum Schluss gibt es den Satz <code>Schön, dass du da bist.</code> aus.</p>`,
        sample: `Wie heißt du? <b>Mika</b>
Hallo Mika
Schön, dass du da bist.`,
        tests: [
          { inputs: ["Mika"], expect: ["Hallo Mika", "Schön, dass du da bist."] },
          { inputs: ["Zeynep"], expect: ["Hallo Zeynep", "Schön, dass du da bist."] }
        ],
        hints: [
          `Du brauchst drei Zeilen. Eine fragt, zwei geben etwas aus.`,
          `Die Antwort muss in eine Variable. Das sieht so aus: <code>name = input("Wie heißt du? ")</code>`,
          `Die Begrüßung lautet <code>print("Hallo", name)</code>`
        ],
        parsons: {
          lines: [`name = input("Wie heißt du? ")`, `print("Hallo", name)`, `print("Schön, dass du da bist.")`],
          distractors: [`print("Hallo", "name")`]
        },
        gaps: `name = {{6}}("Wie heißt du? ")
print("Hallo", {{6}})
print("Schön, dass du da bist.")`,
        starter: `# Stelle zuerst die Frage
`
      },
      {
        id: "w1l5",
        primm: {
          predict: {
            inputs: ["6"],
            options: [`Das Doppelte ist 66`, `Das Doppelte ist 12`, `Das Doppelte ist zahl * 2`],
            correct: 1,
            explain: `<code>int()</code> macht aus der Eingabe eine Zahl. Danach rechnet Python 6 mal 2.`
          },
          investigate: {
            task: `<p>Entferne <code>int</code> und die beiden Klammern, die dazugehören. In der ersten Zeile steht dann nur noch <code>zahl = input("Nenne eine Zahl: ")</code>. Führe das Programm aus und tippe 6 ein.</p>`,
            question: `Was kommt heraus?`,
            options: [`Das Doppelte ist 12`, `Python meldet einen Fehler.`, `Das Doppelte ist 66`],
            correct: 2,
            explain: `Ohne <code>int()</code> ist die 6 ein Text. Text mal 2 bedeutet für Python: denselben Text zweimal hintereinander.`
          }
        },
        title: "Mit Eingaben rechnen",
        intro: `<p>Achtung, Falle: Alles, was über <code>input()</code> hereinkommt, ist für Python ein Text. Auch wenn jemand 14 eintippt.</p>
<p>Mit Text kann Python nicht rechnen. Der Befehl <code>int()</code> macht aus dem Text eine ganze Zahl.</p>`,
        example: `zahl = int(input("Nenne eine Zahl: "))
print("Das Doppelte ist", zahl * 2)`,
        task: `<p>Dein Programm fragt nach dem Alter. Dann gibt es aus, wie alt die Person in 10 Jahren ist.</p>`,
        sample: `Wie alt bist du? <b>14</b>
In 10 Jahren bist du 24`,
        tests: [
          { inputs: ["14"], expect: ["In 10 Jahren bist du 24"] },
          { inputs: ["31"], expect: ["In 10 Jahren bist du 41"] }
        ],
        hints: [
          `Drei Schritte: Alter erfragen, zehn dazurechnen, Ergebnis ausgeben.`,
          `Die Eingabe muss eine Zahl werden. Setze <code>int()</code> um den ganzen <code>input</code> Befehl.`,
          `Die erste Zeile lautet <code>alter = int(input("Wie alt bist du? "))</code>`
        ],
        parsons: {
          lines: [`alter = int(input("Wie alt bist du? "))`, `spaeter = alter + 10`, `print("In 10 Jahren bist du", spaeter)`],
          distractors: [`alter = input("Wie alt bist du? ")`]
        },
        gaps: `alter = {{4}}(input("Wie alt bist du? "))
spaeter = alter {{2}} 10
print("In 10 Jahren bist du", {{8}})`,
        starter: `# Denke an int()
`
      },
      {
        id: "w1l6",
        primm: {
          predict: {
            inputs: ["5"],
            options: [`Du verdienst 17 Euro.`, `Du verdienst lohn Euro.`, `Du verdienst 512 Euro.`, `Du verdienst 60 Euro.`],
            correct: 3,
            explain: `Die Eingabe wird zur Zahl 5. Python rechnet 5 mal 12 und speichert das Ergebnis in <code>lohn</code>. Die Ausgabe setzt drei Teile mit Kommas zusammen.`
          },
          investigate: {
            task: `<p>Führe das Programm aus und tippe statt einer Zahl das Wort <code>fünf</code> ein.</p>`,
            question: `Was passiert?`,
            options: [`Das Programm gibt Du verdienst 60 Euro. aus.`, `Python meldet einen Fehler, weil sich das Wort nicht in eine Zahl umwandeln lässt.`, `Das Programm gibt Du verdienst fünf Euro. aus.`],
            correct: 1,
            explain: `<code>int()</code> versteht nur Ziffern. Gute Programme rechnen damit, dass Menschen etwas Unerwartetes eintippen. Wie ein Programm auf verschiedene Eingaben unterschiedlich reagiert, lernst du in Welt 2.`
          }
        },
        title: "Der Sparrechner",
        boss: true,
        intro: `<p>Im Bosslevel brauchst du alles aus dieser Welt auf einmal: Eingaben, Variablen, Rechnen und Ausgaben.</p>
<p>Hier gibt es kein neues Wissen mehr. Du baust dein erstes kleines Programm, das wirklich etwas kann.</p>`,
        example: `stunden = int(input("Wie viele Stunden? "))
lohn = stunden * 12
print("Du verdienst", lohn, "Euro.")`,
        task: `<p>Baue einen Sparrechner. Er fragt nach dem Namen, nach dem Taschengeld pro Woche und nach der Anzahl der Wochen.</p>
<p>Dann rechnet er aus, wie viel Geld zusammenkommt, und gibt einen Satz wie im Beispiel unten aus.</p>`,
        sample: `Wie heißt du? <b>Mika</b>
Wie viel Taschengeld bekommst du pro Woche? <b>10</b>
Wie viele Wochen sparst du? <b>8</b>
Mika hat nach 8 Wochen 80 Euro gespart.`,
        tests: [
          { inputs: ["Mika", "10", "8"], expect: ["Mika hat nach 8 Wochen 80 Euro gespart."] },
          { inputs: ["Zeynep", "7", "12"], expect: ["Zeynep hat nach 12 Wochen 84 Euro gespart."] }
        ],
        hints: [
          `Du brauchst drei Eingaben in der Reihenfolge Name, Taschengeld, Wochen. Zwei davon sind Zahlen.`,
          `Rechne erst und speichere das Ergebnis, zum Beispiel so: <code>gesamt = geld * wochen</code>`,
          `Die Ausgabe besteht aus vielen Teilen mit Kommas: <code>print(name, "hat nach", wochen, "Wochen", gesamt, "Euro gespart.")</code>`
        ],
        parsons: {
          lines: [
            `name = input("Wie heißt du? ")`,
            `geld = int(input("Wie viel Taschengeld bekommst du pro Woche? "))`,
            `wochen = int(input("Wie viele Wochen sparst du? "))`,
            `gesamt = geld * wochen`,
            `print(name, "hat nach", wochen, "Wochen", gesamt, "Euro gespart.")`
          ],
          distractors: [`gesamt = geld + wochen`]
        },
        gaps: `name = input("Wie heißt du? ")
geld = {{4}}(input("Wie viel Taschengeld bekommst du pro Woche? "))
wochen = int({{6}}("Wie viele Wochen sparst du? "))
gesamt = geld {{2}} wochen
print(name, "hat nach", wochen, "Wochen", {{7}}, "Euro gespart.")`,
        starter: `# Dein Sparrechner
`
      }
    ]
  },
  {
    id: "w2",
    title: "Welt 2: Entscheidungen",
    sub: "Vergleiche, if und else",
    levels: [
      {
        id: "w2l1",
        title: "Wenn, dann",
        primm: {
          predict: {
            inputs: ["30"],
            options: [`Bestanden!\nDanke fürs Mitmachen.`, `Danke fürs Mitmachen.`, `Es wird nichts ausgegeben.`],
            correct: 1,
            explain: `30 ist nicht größer als 50. Deshalb überspringt Python die eingerückte Zeile. Die letzte Zeile ist nicht eingerückt und läuft immer.`
          },
          investigate: {
            task: `<p>Führe das Programm aus und tippe genau 50 ein.</p>`,
            question: `Wird Bestanden! ausgegeben?`,
            options: [`Ja, denn 50 Punkte reichen aus.`, `Nein, denn 50 ist nicht größer als 50.`],
            correct: 1,
            explain: `Das Zeichen <code>&gt;</code> bedeutet echt größer. Für größer oder gleich gibt es <code>&gt;=</code>. Solche Grenzfälle solltest du bei jedem Programm ausprobieren.`
          }
        },
        intro: `<p>Mit <code>if</code> trifft dein Programm Entscheidungen. Nach <code>if</code> steht eine Bedingung und am Ende der Zeile ein Doppelpunkt.</p>
<p>Alles, was danach um vier Leerzeichen eingerückt ist, läuft nur, wenn die Bedingung stimmt. Vergleichen kannst du mit <code>&gt;</code> für größer und <code>&lt;</code> für kleiner.</p>`,
        example: `punkte = int(input("Wie viele Punkte hast du? "))
if punkte > 50:
    print("Bestanden!")
print("Danke fürs Mitmachen.")`,
        task: `<p>Dein Programm fragt nach der Temperatur. Ist es wärmer als 25 Grad, gibt es <code>Zeit für ein Eis!</code> aus.</p>
<p>Danach gibt es in jedem Fall <code>Schönen Tag noch.</code> aus.</p>`,
        sample: `Wie warm ist es? <b>30</b>
Zeit für ein Eis!
Schönen Tag noch.`,
        tests: [
          { inputs: ["30"], expect: ["Zeit für ein Eis!", "Schönen Tag noch."] },
          { inputs: ["12"], expect: ["Schönen Tag noch."] },
          { inputs: ["25"], expect: ["Schönen Tag noch."] }
        ],
        hints: [
          `Du brauchst vier Zeilen: Eingabe, Bedingung, eine eingerückte Ausgabe und eine Ausgabe ohne Einrückung.`,
          `Die Bedingung lautet <code>if temperatur &gt; 25:</code> Vergiss den Doppelpunkt nicht.`,
          `Die Zeile mit dem Eis ist um vier Leerzeichen eingerückt. Die Zeile mit dem schönen Tag beginnt ganz links.`
        ],
        parsons: {
          lines: [`temperatur = int(input("Wie warm ist es? "))`, `if temperatur > 25:`, `    print("Zeit für ein Eis!")`, `print("Schönen Tag noch.")`],
          distractors: [`if temperatur > 25`]
        },
        gaps: `temperatur = int(input("Wie warm ist es? "))
{{2}} temperatur {{2}} 25{{1}}
    print("Zeit für ein Eis!")
print("Schönen Tag noch.")`,
        starter: `temperatur = int(input("Wie warm ist es? "))
`
      },
      {
        id: "w2l2",
        title: "Sonst",
        primm: {
          predict: {
            inputs: ["16"],
            options: [`Der Film ist erst ab 16.`, `Du darfst den Film sehen.\nDer Film ist erst ab 16.`, `Du darfst den Film sehen.`],
            correct: 2,
            explain: `<code>&gt;=</code> bedeutet größer oder gleich, also zählt die 16 mit. Bei <code>if</code> und <code>else</code> läuft immer genau einer der beiden Blöcke.`
          },
          investigate: {
            task: `<p>Lösche die vier Leerzeichen vor dem letzten <code>print</code>, sodass die Zeile ganz links beginnt. Führe das Programm dann aus.</p>`,
            question: `Was passiert?`,
            options: [`Beide Sätze werden ausgegeben.`, `Python meldet einen Fehler, weil nach else nichts Eingerücktes mehr kommt.`, `Alles läuft wie vorher.`],
            correct: 1,
            explain: `In Python gehört die Einrückung zur Sprache. Sie zeigt, welche Zeilen zu <code>if</code> oder <code>else</code> gehören. Fehlt sie, versteht Python das Programm nicht.`
          }
        },
        intro: `<p>Oft soll ein Programm auch dann etwas tun, wenn die Bedingung nicht stimmt. Dafür gibt es <code>else</code>. Das bedeutet sonst.</p>
<p><code>else</code> steht auf derselben Höhe wie <code>if</code> und bekommt auch einen Doppelpunkt. Neu ist außerdem <code>&gt;=</code> für größer oder gleich und <code>&lt;=</code> für kleiner oder gleich.</p>`,
        example: `alter = int(input("Wie alt bist du? "))
if alter >= 16:
    print("Du darfst den Film sehen.")
else:
    print("Der Film ist erst ab 16.")`,
        task: `<p>Ein Onlineshop fragt nach dem Bestellwert. Ab 50 Euro gibt das Programm <code>Der Versand ist kostenlos.</code> aus.</p>
<p>Bei weniger gibt es <code>Der Versand kostet 5 Euro.</code> aus.</p>`,
        sample: `Wie hoch ist der Bestellwert? <b>20</b>
Der Versand kostet 5 Euro.`,
        tests: [
          { inputs: ["20"], expect: ["Der Versand kostet 5 Euro."] },
          { inputs: ["80"], expect: ["Der Versand ist kostenlos."] },
          { inputs: ["50"], expect: ["Der Versand ist kostenlos."] }
        ],
        must: [{ re: /\belse\b/, msg: `Die Ausgabe stimmt. Löse die Aufgabe aber mit <code>else</code> statt mit zwei getrennten <code>if</code>.` }],
        hints: [
          `Ab 50 Euro heißt: Genau 50 Euro zählen schon dazu.`,
          `Die Bedingung lautet <code>if bestellung &gt;= 50:</code>`,
          `Nach dem ersten <code>print</code> folgt ganz links <code>else:</code> und darunter eingerückt das zweite <code>print</code>.`
        ],
        parsons: {
          lines: [`bestellung = int(input("Wie hoch ist der Bestellwert? "))`, `if bestellung >= 50:`, `    print("Der Versand ist kostenlos.")`, `else:`, `    print("Der Versand kostet 5 Euro.")`],
          distractors: [`if bestellung > 50:`]
        },
        gaps: `bestellung = int(input("Wie hoch ist der Bestellwert? "))
if bestellung {{2}} 50:
    print("Der Versand ist kostenlos.")
{{5}}
    print({{28}})`,
        starter: `bestellung = int(input("Wie hoch ist der Bestellwert? "))
`
      },
      {
        id: "w2l3",
        title: "Text vergleichen",
        primm: {
          predict: {
            inputs: ["paris"],
            options: [`Richtig!`, `Leider falsch.`],
            correct: 1,
            explain: `<code>==</code> vergleicht ganz genau. Für Python sind <code>paris</code> und <code>Paris</code> zwei verschiedene Texte.`
          },
          investigate: {
            task: `<p>Ersetze das doppelte <code>==</code> durch ein einfaches <code>=</code> und führe das Programm aus.</p>`,
            question: `Was passiert?`,
            options: [`Python meldet einen Fehler.`, `Das Programm gibt immer Richtig! aus.`, `Alles läuft wie vorher.`],
            correct: 0,
            explain: `Ein einfaches <code>=</code> speichert etwas in einer Variable. Zum Vergleichen brauchst du immer das doppelte <code>==</code>. Das ist einer der häufigsten Fehler überhaupt.`
          }
        },
        intro: `<p>Mit <code>==</code> prüfst du, ob zwei Dinge gleich sind. Das klappt auch mit Text.</p>
<p>Achtung: Es sind zwei Gleichheitszeichen. Das Gegenteil ist <code>!=</code> und bedeutet ungleich.</p>`,
        example: `antwort = input("Was ist die Hauptstadt von Frankreich? ")
if antwort == "Paris":
    print("Richtig!")
else:
    print("Leider falsch.")`,
        task: `<p>Baue eine Passwortabfrage. Das richtige Passwort lautet <code>python123</code>.</p>
<p>Bei richtigem Passwort gibt das Programm <code>Zugang erlaubt.</code> aus, sonst <code>Zugang verweigert.</code></p>`,
        sample: `Wie lautet das Passwort? <b>hallo</b>
Zugang verweigert.`,
        tests: [
          { inputs: ["hallo"], expect: ["Zugang verweigert."] },
          { inputs: ["python123"], expect: ["Zugang erlaubt."] },
          { inputs: ["Python123"], expect: ["Zugang verweigert."] }
        ],
        hints: [
          `Die Eingabe ist hier ein Text. Du brauchst also kein <code>int()</code>.`,
          `Das Passwort steht in der Bedingung in Anführungszeichen, weil es ein Text ist.`,
          `Die Bedingung lautet <code>if passwort == "python123":</code>`
        ],
        parsons: {
          lines: [`passwort = input("Wie lautet das Passwort? ")`, `if passwort == "python123":`, `    print("Zugang erlaubt.")`, `else:`, `    print("Zugang verweigert.")`],
          distractors: [`if passwort = "python123":`]
        },
        gaps: `passwort = input("Wie lautet das Passwort? ")
if passwort {{2}} {{11}}:
    print("Zugang erlaubt.")
else:
    print({{20}})`,
        starter: `passwort = input("Wie lautet das Passwort? ")
`
      },
      {
        id: "w2l4",
        title: "Mehr als zwei Wege",
        primm: {
          predict: {
            inputs: ["1"],
            options: [`Stark!\nBestanden.`, `Bestanden.`, `Stark!`],
            correct: 2,
            explain: `Python prüft die Bedingungen von oben nach unten. Die erste, die stimmt, gewinnt. Alle weiteren werden übersprungen, auch wenn sie ebenfalls stimmen würden.`
          },
          investigate: {
            task: `<p>Ersetze <code>elif</code> durch <code>if</code>. Führe das Programm aus und tippe wieder 1 ein.</p>`,
            question: `Was wird jetzt ausgegeben?`,
            options: [`Stark!`, `Stark!\nBestanden.`, `Python meldet einen Fehler.`],
            correct: 1,
            explain: `Zwei getrennte <code>if</code> werden beide geprüft, und die 1 erfüllt beide Bedingungen. Mit <code>elif</code> gehören die Fälle zusammen, und es läuft nur einer.`
          }
        },
        intro: `<p>Manchmal gibt es mehr als zwei Fälle. Dafür gibt es <code>elif</code>. Das ist die Kurzform von else if und bedeutet: sonst, falls.</p>
<p>Du kannst beliebig viele <code>elif</code> zwischen <code>if</code> und <code>else</code> setzen.</p>`,
        example: `note = int(input("Welche Note hast du? "))
if note <= 2:
    print("Stark!")
elif note <= 4:
    print("Bestanden.")
else:
    print("Das üben wir noch.")`,
        task: `<p>Ein Schwimmbad berechnet den Eintritt nach dem Alter. Kinder unter 6 Jahren bekommen <code>Der Eintritt ist frei.</code></p>
<p>Wer unter 18 ist, bekommt <code>Der Eintritt kostet 3 Euro.</code> Alle anderen bekommen <code>Der Eintritt kostet 5 Euro.</code></p>`,
        sample: `Wie alt bist du? <b>12</b>
Der Eintritt kostet 3 Euro.`,
        tests: [
          { inputs: ["12"], expect: ["Der Eintritt kostet 3 Euro."] },
          { inputs: ["4"], expect: ["Der Eintritt ist frei."] },
          { inputs: ["30"], expect: ["Der Eintritt kostet 5 Euro."] },
          { inputs: ["6"], expect: ["Der Eintritt kostet 3 Euro."] },
          { inputs: ["18"], expect: ["Der Eintritt kostet 5 Euro."] }
        ],
        must: [{ re: /\belif\b/, msg: `Die Ausgabe stimmt. Löse die Aufgabe aber mit <code>elif</code>.` }],
        hints: [
          `Es gibt drei Fälle. Du brauchst also <code>if</code>, <code>elif</code> und <code>else</code>.`,
          `Beginne mit den Jüngsten: <code>if alter &lt; 6:</code>`,
          `Der zweite Fall lautet <code>elif alter &lt; 18:</code> Für alle anderen reicht <code>else:</code>`
        ],
        parsons: {
          lines: [`alter = int(input("Wie alt bist du? "))`, `if alter < 6:`, `    print("Der Eintritt ist frei.")`, `elif alter < 18:`, `    print("Der Eintritt kostet 3 Euro.")`, `else:`, `    print("Der Eintritt kostet 5 Euro.")`],
          distractors: [`if alter < 18:`]
        },
        gaps: `alter = int(input("Wie alt bist du? "))
if alter < {{2}}:
    print("Der Eintritt ist frei.")
{{4}} alter < 18:
    print("Der Eintritt kostet 3 Euro.")
{{5}}
    print("Der Eintritt kostet 5 Euro.")`,
        starter: `alter = int(input("Wie alt bist du? "))
`
      },
      {
        id: "w2l5",
        title: "Zwei Bedingungen",
        primm: {
          predict: {
            inputs: ["13", "135"],
            options: [`Du darfst mitfahren.`, `Leider noch nicht.`],
            correct: 1,
            explain: `Bei <code>and</code> müssen beide Bedingungen stimmen. Das Alter passt, die Größe aber nicht.`
          },
          investigate: {
            task: `<p>Ersetze <code>and</code> durch <code>or</code>. Führe das Programm aus und tippe wieder 13 und 135 ein.</p>`,
            question: `Was wird jetzt ausgegeben?`,
            options: [`Du darfst mitfahren.`, `Leider noch nicht.`],
            correct: 0,
            explain: `Bei <code>or</code> reicht es, wenn eine der beiden Bedingungen stimmt. Ein einziges Wort ändert hier die ganze Regel.`
          }
        },
        intro: `<p>Bedingungen lassen sich verbinden. Bei <code>and</code> müssen beide Teile stimmen. Bei <code>or</code> reicht einer.</p>
<p>Wichtig: Links und rechts von <code>and</code> oder <code>or</code> steht jeweils ein vollständiger Vergleich.</p>`,
        example: `alter = int(input("Wie alt bist du? "))
groesse = int(input("Wie groß bist du in cm? "))
if alter >= 12 and groesse >= 140:
    print("Du darfst mitfahren.")
else:
    print("Leider noch nicht.")`,
        task: `<p>Dein Programm fragt nach dem Wochentag. Bei <code>Samstag</code> oder <code>Sonntag</code> gibt es <code>Du kannst ausschlafen.</code> aus.</p>
<p>An allen anderen Tagen gibt es <code>Der Wecker klingelt.</code> aus.</p>`,
        sample: `Welcher Tag ist heute? <b>Sonntag</b>
Du kannst ausschlafen.`,
        tests: [
          { inputs: ["Sonntag"], expect: ["Du kannst ausschlafen."] },
          { inputs: ["Samstag"], expect: ["Du kannst ausschlafen."] },
          { inputs: ["Montag"], expect: ["Der Wecker klingelt."] }
        ],
        must: [{ re: /\bor\b/, msg: `Die Ausgabe stimmt. Löse die Aufgabe aber mit <code>or</code> in einer einzigen Bedingung.` }],
        hints: [
          `Zwei Tage führen zum selben Ergebnis. Dafür passt <code>or</code>.`,
          `Schreibe den Vergleich zweimal vollständig hin. <code>tag == "Samstag" or "Sonntag"</code> funktioniert nicht.`,
          `Die Bedingung lautet <code>if tag == "Samstag" or tag == "Sonntag":</code>`
        ],
        parsons: {
          lines: [`tag = input("Welcher Tag ist heute? ")`, `if tag == "Samstag" or tag == "Sonntag":`, `    print("Du kannst ausschlafen.")`, `else:`, `    print("Der Wecker klingelt.")`],
          distractors: [`if tag == "Samstag" and tag == "Sonntag":`]
        },
        gaps: `tag = input("Welcher Tag ist heute? ")
if tag == "Samstag" {{3}} tag {{2}} "Sonntag":
    print("Du kannst ausschlafen.")
{{5}}
    print("Der Wecker klingelt.")`,
        starter: `tag = input("Welcher Tag ist heute? ")
`
      },
      {
        id: "w2l6",
        title: "Das Quiz",
        boss: true,
        primm: {
          predict: {
            inputs: ["12"],
            options: [`Punkte: 0`, `Punkte: punkte + 1`, `Punkte: 1`],
            correct: 2,
            explain: `Die Zeile <code>punkte = punkte + 1</code> ist ein Zähler. Python rechnet zuerst die rechte Seite aus und speichert das Ergebnis dann wieder in <code>punkte</code>.`
          },
          investigate: {
            task: `<p>Ändere die erste Zeile zu <code>punkte = 10</code>. Führe das Programm aus und antworte richtig mit 12.</p>`,
            question: `Was wird ausgegeben?`,
            options: [`Punkte: 1`, `Punkte: 10`, `Punkte: 11`],
            correct: 2,
            explain: `Der Zähler baut immer auf dem alten Wert auf. Deshalb muss die Variable vorher einen Startwert haben, meistens die 0.`
          }
        },
        intro: `<p>Im Bosslevel baust du ein Quiz, das Punkte zählt. Dafür brauchst du mehrere <code>if</code> hintereinander und eine Variable als Zähler.</p>
<p>Neu ist nur der Zähler. Schau ihn dir im Einstieg genau an.</p>`,
        example: `punkte = 0
antwort = input("Was ergibt 3 mal 4? ")
if antwort == "12":
    punkte = punkte + 1
print("Punkte:", punkte)`,
        task: `<p>Dein Quiz stellt zwei Fragen. Die erste fragt, wie viele Beine eine Spinne hat. Richtig ist <code>8</code>. Die zweite fragt nach der Hauptstadt von Italien. Richtig ist <code>Rom</code>.</p>
<p>Für jede richtige Antwort gibt es einen Punkt. Am Ende gibt das Programm den Punktestand wie im Beispiel unten aus. Bei 2 Punkten folgt <code>Perfekt!</code>, sonst <code>Versuch es noch einmal.</code></p>`,
        sample: `Wie viele Beine hat eine Spinne? <b>8</b>
Wie heißt die Hauptstadt von Italien? <b>Paris</b>
Du hast 1 von 2 Punkten.
Versuch es noch einmal.`,
        tests: [
          { inputs: ["8", "Paris"], expect: ["Du hast 1 von 2 Punkten.", "Versuch es noch einmal."] },
          { inputs: ["8", "Rom"], expect: ["Du hast 2 von 2 Punkten.", "Perfekt!"] },
          { inputs: ["6", "Rom"], expect: ["Du hast 1 von 2 Punkten.", "Versuch es noch einmal."] },
          { inputs: ["6", "Mailand"], expect: ["Du hast 0 von 2 Punkten.", "Versuch es noch einmal."] }
        ],
        hints: [
          `Plane zuerst: Startwert für die Punkte, erste Frage mit <code>if</code>, zweite Frage mit <code>if</code>, Punktestand ausgeben, Schlusssatz mit <code>if</code> und <code>else</code>.`,
          `Die Antworten sind Texte. Vergleiche deshalb mit <code>"8"</code> in Anführungszeichen oder wandle die Eingabe mit <code>int()</code> um.`,
          `Der Punktestand wird so ausgegeben: <code>print("Du hast", punkte, "von 2 Punkten.")</code>`
        ],
        parsons: {
          lines: [
            `punkte = 0`,
            `a = input("Wie viele Beine hat eine Spinne? ")`,
            `if a == "8":`,
            `    punkte = punkte + 1`,
            `b = input("Wie heißt die Hauptstadt von Italien? ")`,
            `if b == "Rom":`,
            `    punkte = punkte + 1`,
            `print("Du hast", punkte, "von 2 Punkten.")`,
            `if punkte == 2:`,
            `    print("Perfekt!")`,
            `else:`,
            `    print("Versuch es noch einmal.")`
          ],
          distractors: [`    punkte + 1`]
        },
        gaps: `punkte = {{2}}
a = input("Wie viele Beine hat eine Spinne? ")
if a == "8":
    punkte = punkte {{2}} 1
b = input("Wie heißt die Hauptstadt von Italien? ")
if b {{2}} "Rom":
    punkte = punkte + 1
print("Du hast", {{7}}, "von 2 Punkten.")
if punkte == {{2}}:
    print("Perfekt!")
{{5}}
    print("Versuch es noch einmal.")`,
        starter: `punkte = 0
`
      }
    ]
  },
  {
    id: "w3",
    title: "Welt 3: Schleifen",
    sub: "Wiederholungen mit for und while",
    levels: [
      {
        id: "w3l1",
        title: "Wiederholen",
        primm: {
          predict: {
            options: [`Tor!\nAbpfiff.`, `Tor!\nAbpfiff.\nTor!\nAbpfiff.\nTor!\nAbpfiff.`, `Tor!\nTor!\nTor!\nAbpfiff.`],
            correct: 2,
            explain: `Die eingerückte Zeile gehört zur Schleife und läuft dreimal. Die letzte Zeile ist nicht eingerückt. Sie kommt erst dran, wenn die Schleife fertig ist.`
          },
          investigate: {
            task: `<p>Rücke auch die letzte Zeile um vier Leerzeichen ein und führe das Programm aus.</p>`,
            question: `Wie oft erscheint Abpfiff. jetzt?`,
            options: [`Einmal`, `Dreimal`, `Gar nicht`],
            correct: 1,
            explain: `Die Einrückung entscheidet, was wiederholt wird. Alles Eingerückte gehört zur Schleife.`
          }
        },
        intro: `<p>Computer sind gut darin, Dinge zu wiederholen. Dafür gibt es Schleifen. Die Zeile <code>for i in range(3):</code> bedeutet: Wiederhole das Folgende dreimal.</p>
<p>Wie bei <code>if</code> steht am Ende ein Doppelpunkt, und alles Eingerückte gehört dazu.</p>`,
        example: `for i in range(3):
    print("Tor!")
print("Abpfiff.")`,
        task: `<p>Dein Programm gibt fünfmal <code>Python ist cool!</code> aus und danach einmal <code>Fertig.</code></p>
<p>Der Satz darf in deinem Code nur einmal vorkommen.</p>`,
        sample: `Python ist cool!
Python ist cool!
Python ist cool!
Python ist cool!
Python ist cool!
Fertig.`,
        tests: [{ inputs: [], expect: ["Python ist cool!", "Python ist cool!", "Python ist cool!", "Python ist cool!", "Python ist cool!", "Fertig."] }],
        mustNot: [{ re: /Python ist cool![\s\S]*Python ist cool!/, msg: `Die Ausgabe stimmt. Schreibe den Satz aber nur einmal in deinen Code. Das Wiederholen übernimmt die Schleife.` }],
        must: [{ re: /\bfor\b/, msg: `Die Ausgabe stimmt. Löse die Aufgabe aber mit einer <code>for</code> Schleife.` }],
        hints: [
          `Du brauchst nur drei Zeilen: die Schleife, eine eingerückte Ausgabe und eine Ausgabe ohne Einrückung.`,
          `Die Zahl in <code>range()</code> bestimmt, wie oft wiederholt wird.`,
          `Die erste Zeile lautet <code>for i in range(5):</code>`
        ],
        parsons: {
          lines: [`for i in range(5):`, `    print("Python ist cool!")`, `print("Fertig.")`],
          distractors: [`    print("Fertig.")`]
        },
        gaps: `{{3}} i in range({{2}}){{1}}
    print("Python ist cool!")
print("Fertig.")`,
        starter: `# Benutze eine Schleife
`
      },
      {
        id: "w3l2",
        title: "Mitzählen",
        primm: {
          predict: {
            options: [`Runde 0\nRunde 1\nRunde 2\nRunde 3`, `Runde 1\nRunde 2\nRunde 3`, `Runde 1\nRunde 2\nRunde 3\nRunde 4`, `Runde i\nRunde i\nRunde i`],
            correct: 1,
            explain: `<code>range(1, 4)</code> zählt ab der 1 und hört vor der 4 auf. Die erste Zahl ist dabei, die zweite nicht mehr.`
          },
          investigate: {
            task: `<p>Ändere <code>range(1, 4)</code> zu <code>range(4)</code> und führe das Programm aus.</p>`,
            question: `Mit welcher Zahl beginnt die Ausgabe jetzt?`,
            options: [`Mit 1`, `Mit 4`, `Mit 0`],
            correct: 2,
            explain: `Ohne Startwert beginnt Python bei 0. <code>range(4)</code> zählt also 0, 1, 2, 3. Das sind vier Durchläufe, aber die 4 selbst kommt nie vor.`
          }
        },
        intro: `<p>Das <code>i</code> in der Schleife ist eine Variable. Sie zählt bei jedem Durchlauf mit, und du kannst sie benutzen.</p>
<p>Mit zwei Zahlen in <code>range()</code> legst du Anfang und Ende fest.</p>`,
        example: `for i in range(1, 4):
    print("Runde", i)`,
        task: `<p>Baue einen Einmaleins-Trainer. Das Programm fragt, welche Reihe geübt werden soll.</p>
<p>Dann gibt es die Reihe von 1 bis 10 aus, so wie im Beispiel unten.</p>`,
        sample: `Welche Reihe möchtest du üben? <b>7</b>
1 mal 7 ist 7
2 mal 7 ist 14
3 mal 7 ist 21
...
10 mal 7 ist 70`,
        tests: [
          { inputs: ["7"], expect: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => `${i} mal 7 ist ${i * 7}`) },
          { inputs: ["3"], expect: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => `${i} mal 3 ist ${i * 3}`) }
        ],
        hints: [
          `Die Schleife soll von 1 bis 10 zählen. Denke daran, dass die zweite Zahl in <code>range()</code> nicht mehr dabei ist.`,
          `Die Schleife lautet <code>for i in range(1, 11):</code>`,
          `Die Ausgabe hat fünf Teile: <code>print(i, "mal", zahl, "ist", i * zahl)</code>`
        ],
        parsons: {
          lines: [`zahl = int(input("Welche Reihe möchtest du üben? "))`, `for i in range(1, 11):`, `    print(i, "mal", zahl, "ist", i * zahl)`],
          distractors: [`for i in range(1, 10):`]
        },
        gaps: `zahl = int(input("Welche Reihe möchtest du üben? "))
for {{2}} in range(1, {{3}}):
    print(i, "mal", zahl, "ist", {{9}})`,
        starter: `zahl = int(input("Welche Reihe möchtest du üben? "))
`
      },
      {
        id: "w3l3",
        title: "Zusammenzählen",
        primm: {
          predict: {
            options: [`Summe: 4`, `Summe: 10`, `Summe: 15`, `Summe: 1\nSumme: 3\nSumme: 6\nSumme: 10`],
            correct: 1,
            explain: `Die Schleife zählt 1, 2, 3, 4. Bei jedem Durchlauf kommt die aktuelle Zahl zur Summe dazu. Am Ende steht dort 1 plus 2 plus 3 plus 4.`
          },
          investigate: {
            task: `<p>Rücke die letzte Zeile ein, sodass sie zur Schleife gehört. Führe das Programm dann aus.</p>`,
            question: `Wie viele Zeilen gibt das Programm jetzt aus?`,
            options: [`Eine`, `Vier`, `Zehn`],
            correct: 1,
            explain: `Jetzt siehst du jeden Zwischenstand. Das ist ein guter Trick bei der Fehlersuche: Lass dir in der Schleife anzeigen, was gerade in den Variablen steht.`
          }
        },
        intro: `<p>Den Zähler kennst du aus dem Quiz. In einer Schleife wird daraus ein mächtiges Werkzeug: Du kannst Werte Schritt für Schritt aufsummieren.</p>
<p>Wichtig ist der Startwert vor der Schleife.</p>`,
        example: `summe = 0
for i in range(1, 5):
    summe = summe + i
print("Summe:", summe)`,
        task: `<p>Du sparst nach einem Plan: in der ersten Woche 1 Euro, in der zweiten 2 Euro, in der dritten 3 Euro und so weiter.</p>
<p>Dein Programm fragt nach der Anzahl der Wochen und gibt aus, wie viel Geld am Ende zusammengekommen ist.</p>`,
        sample: `Wie viele Wochen sparst du? <b>4</b>
Gespart: 10 Euro`,
        tests: [
          { inputs: ["4"], expect: ["Gespart: 10 Euro"] },
          { inputs: ["10"], expect: ["Gespart: 55 Euro"] },
          { inputs: ["1"], expect: ["Gespart: 1 Euro"] }
        ],
        must: [{ re: /\b(for|while)\b/, msg: `Die Ausgabe stimmt. Löse die Aufgabe aber mit einer Schleife.` }],
        hints: [
          `Du brauchst eine Variable für das gesparte Geld. Sie startet vor der Schleife bei 0.`,
          `Die Schleife soll bis zur eingegebenen Wochenzahl zählen und diese noch mitnehmen. Dafür brauchst du <code>wochen + 1</code> als Ende.`,
          `Die Schleife lautet <code>for i in range(1, wochen + 1):</code> und darin steht <code>gespart = gespart + i</code>`
        ],
        parsons: {
          lines: [`wochen = int(input("Wie viele Wochen sparst du? "))`, `gespart = 0`, `for i in range(1, wochen + 1):`, `    gespart = gespart + i`, `print("Gespart:", gespart, "Euro")`],
          distractors: [`for i in range(1, wochen):`]
        },
        gaps: `wochen = int(input("Wie viele Wochen sparst du? "))
gespart = {{2}}
for i in range(1, wochen {{2}} 1):
    gespart = gespart + {{2}}
print("Gespart:", gespart, "Euro")`,
        starter: `wochen = int(input("Wie viele Wochen sparst du? "))
`
      },
      {
        id: "w3l4",
        title: "Solange",
        primm: {
          predict: {
            options: [`3\n2\n1\n0\nStart!`, `3\n3\n3\nStart!`, `3\n2\n1\nStart!`],
            correct: 2,
            explain: `Vor jedem Durchlauf prüft Python die Bedingung. Sobald <code>zahl</code> bei 0 ankommt, stimmt sie nicht mehr. Die Schleife endet, und die 0 wird nicht mehr ausgegeben.`
          },
          investigate: {
            task: `<p>Lösche die Zeile <code>zahl = zahl - 1</code> und führe das Programm aus.</p>`,
            question: `Was passiert?`,
            options: [`Das Programm gibt einmal 3 und dann Start! aus.`, `Das Programm gibt immer wieder 3 aus und hört nicht von selbst auf.`, `Python meldet sofort einen Fehler.`],
            correct: 1,
            explain: `Das nennt man Endlosschleife. Die Bedingung stimmt für immer, weil sich <code>zahl</code> nie ändert. In einer <code>while</code> Schleife muss sich immer etwas ändern, das die Bedingung irgendwann falsch macht.`
          }
        },
        intro: `<p>Bei <code>for</code> steht vorher fest, wie oft wiederholt wird. Manchmal weiß man das nicht. Dafür gibt es <code>while</code>. Das bedeutet solange.</p>
<p>Die Schleife läuft, solange die Bedingung stimmt.</p>`,
        example: `zahl = 3
while zahl > 0:
    print(zahl)
    zahl = zahl - 1
print("Start!")`,
        task: `<p>Baue einen Countdown. Das Programm fragt nach der Startzahl und zählt dann bis 1 herunter.</p>
<p>Zum Schluss gibt es <code>Abheben!</code> aus.</p>`,
        sample: `Bei welcher Zahl startet der Countdown? <b>3</b>
3
2
1
Abheben!`,
        tests: [
          { inputs: ["3"], expect: ["3", "2", "1", "Abheben!"] },
          { inputs: ["5"], expect: ["5", "4", "3", "2", "1", "Abheben!"] }
        ],
        must: [{ re: /\bwhile\b/, msg: `Die Ausgabe stimmt. Löse die Aufgabe aber mit einer <code>while</code> Schleife.` }],
        hints: [
          `In der Schleife passieren zwei Dinge: die Zahl ausgeben und die Zahl um 1 verkleinern.`,
          `Die Schleife läuft, solange die Zahl größer als 0 ist.`,
          `Die Schleife lautet <code>while zahl &gt; 0:</code> und darin stehen <code>print(zahl)</code> und <code>zahl = zahl - 1</code>`
        ],
        parsons: {
          lines: [`zahl = int(input("Bei welcher Zahl startet der Countdown? "))`, `while zahl > 0:`, `    print(zahl)`, `    zahl = zahl - 1`, `print("Abheben!")`],
          distractors: [`    zahl = zahl + 1`]
        },
        gaps: `zahl = int(input("Bei welcher Zahl startet der Countdown? "))
{{5}} zahl {{2}} 0:
    print(zahl)
    zahl = zahl {{2}} 1
print("Abheben!")`,
        starter: `zahl = int(input("Bei welcher Zahl startet der Countdown? "))
`
      },
      {
        id: "w3l5",
        title: "Fragen, bis es stimmt",
        primm: {
          predict: {
            inputs: ["Barcelona", "Madrid"],
            options: [`Richtig!`, `Leider falsch.\nRichtig!`, `Leider falsch.\nLeider falsch.\nRichtig!`],
            correct: 1,
            explain: `Die erste Antwort ist falsch, also läuft die Schleife einmal und fragt neu. Die zweite Antwort stimmt. Damit ist die Bedingung nicht mehr erfüllt, und die Schleife endet.`
          },
          investigate: {
            task: `<p>Führe das Programm aus und antworte gleich beim ersten Mal richtig mit Madrid.</p>`,
            question: `Wie oft erscheint Leider falsch.?`,
            options: [`Einmal`, `Gar nicht`],
            correct: 1,
            explain: `<code>while</code> prüft die Bedingung schon vor dem ersten Durchlauf. Eine Schleife kann also auch null Mal laufen.`
          }
        },
        intro: `<p>Mit <code>while</code> und <code>input()</code> kann ein Programm so lange nachfragen, bis die Antwort passt.</p>
<p>Der Trick: In der Schleife steht noch einmal ein <code>input()</code>, das dieselbe Variable neu füllt.</p>`,
        example: `antwort = input("Wie heißt die Hauptstadt von Spanien? ")
while antwort != "Madrid":
    print("Leider falsch.")
    antwort = input("Versuch es noch einmal: ")
print("Richtig!")`,
        task: `<p>Verbessere die Passwortabfrage aus Welt 2. Das Programm fragt so lange nach, bis das Passwort <code>python123</code> eingegeben wird.</p>
<p>Bei jedem falschen Versuch gibt es <code>Falsches Passwort.</code> aus. Am Ende gibt es <code>Zugang erlaubt.</code> aus.</p>`,
        sample: `Wie lautet das Passwort? <b>hallo</b>
Falsches Passwort.
Noch einmal: <b>python123</b>
Zugang erlaubt.`,
        tests: [
          { inputs: ["hallo", "python123"], expect: ["Falsches Passwort.", "Zugang erlaubt."] },
          { inputs: ["python123"], expect: ["Zugang erlaubt."] },
          { inputs: ["a", "b", "c", "python123"], expect: ["Falsches Passwort.", "Falsches Passwort.", "Falsches Passwort.", "Zugang erlaubt."] }
        ],
        hints: [
          `Die Schleife läuft, solange das Passwort falsch ist. Dafür brauchst du <code>!=</code>.`,
          `In der Schleife stehen zwei Zeilen: die Meldung ausgeben und neu nach dem Passwort fragen.`,
          `Die Schleife lautet <code>while passwort != "python123":</code> und die Zeile <code>Zugang erlaubt.</code> steht ohne Einrückung dahinter.`
        ],
        parsons: {
          lines: [`passwort = input("Wie lautet das Passwort? ")`, `while passwort != "python123":`, `    print("Falsches Passwort.")`, `    passwort = input("Noch einmal: ")`, `print("Zugang erlaubt.")`],
          distractors: [`while passwort == "python123":`]
        },
        gaps: `passwort = input("Wie lautet das Passwort? ")
while passwort {{2}} "python123":
    print("Falsches Passwort.")
    passwort = {{5}}("Noch einmal: ")
print("Zugang erlaubt.")`,
        starter: `passwort = input("Wie lautet das Passwort? ")
`
      },
      {
        id: "w3l6",
        title: "Zahlenraten",
        boss: true,
        primm: {
          predict: {
            inputs: ["1", "9", "4"],
            options: [`Fehlversuche: 3`, `Fehlversuche: 0`, `Fehlversuche: 2`],
            correct: 2,
            explain: `Zwei Tipps sind falsch, also läuft die Schleife zweimal und zählt jedes Mal hoch. Der dritte Tipp stimmt und beendet die Schleife, ohne dass noch einmal gezählt wird.`
          },
          investigate: {
            task: `<p>Führe das Programm aus und rate gleich beim ersten Mal richtig mit 4.</p>`,
            question: `Was wird ausgegeben?`,
            options: [`Fehlversuche: 1`, `Fehlversuche: 0`],
            correct: 1,
            explain: `Die Schleife läuft kein einziges Mal, also bleibt der Zähler bei seinem Startwert. Überlege bei jedem Zähler, mit welchem Wert er starten muss.`
          }
        },
        intro: `<p>Im Bosslevel baust du dein erstes richtiges Spiel. Du brauchst dafür eine <code>while</code> Schleife, einen Zähler und in der Schleife ein <code>if</code> mit <code>else</code>.</p>
<p>Neu ist: Das <code>if</code> steht innerhalb der Schleife und ist deshalb doppelt eingerückt.</p>`,
        example: `versuche = 0
tipp = int(input("Rate die Zahl: "))
while tipp != 4:
    versuche = versuche + 1
    tipp = int(input("Falsch. Rate noch einmal: "))
print("Fehlversuche:", versuche)`,
        task: `<p>Die geheime Zahl ist 7. Dein Programm fragt so lange nach einem Tipp, bis die Zahl erraten ist.</p>
<p>Ist der Tipp zu niedrig, gibt es <code>Zu klein.</code> aus. Ist er zu hoch, gibt es <code>Zu groß.</code> aus. Am Ende nennt es die Anzahl aller Versuche, den richtigen mitgezählt.</p>`,
        sample: `Rate die Zahl: <b>3</b>
Zu klein.
Rate noch einmal: <b>9</b>
Zu groß.
Rate noch einmal: <b>7</b>
Richtig! Anzahl der Versuche: 3`,
        tests: [
          { inputs: ["3", "9", "7"], expect: ["Zu klein.", "Zu groß.", "Richtig! Anzahl der Versuche: 3"] },
          { inputs: ["7"], expect: ["Richtig! Anzahl der Versuche: 1"] },
          { inputs: ["10", "8", "1", "6", "7"], expect: ["Zu groß.", "Zu groß.", "Zu klein.", "Zu klein.", "Richtig! Anzahl der Versuche: 5"] }
        ],
        hints: [
          `Plane zuerst: Startwerte festlegen, ersten Tipp erfragen, Schleife solange der Tipp falsch ist, am Ende das Ergebnis ausgeben.`,
          `Der richtige Versuch zählt mit. Der Zähler startet deshalb bei 1 und nicht bei 0.`,
          `In der Schleife stehen drei Dinge: das <code>if</code> mit <code>else</code> für die Meldung, der Zähler und die neue Frage mit <code>input()</code>.`
        ],
        parsons: {
          lines: [
            `geheim = 7`,
            `versuche = 1`,
            `tipp = int(input("Rate die Zahl: "))`,
            `while tipp != geheim:`,
            `    if tipp < geheim:`,
            `        print("Zu klein.")`,
            `    else:`,
            `        print("Zu groß.")`,
            `    versuche = versuche + 1`,
            `    tipp = int(input("Rate noch einmal: "))`,
            `print("Richtig! Anzahl der Versuche:", versuche)`
          ],
          distractors: [`    versuche = 1`]
        },
        gaps: `geheim = 7
versuche = {{2}}
tipp = int(input("Rate die Zahl: "))
while tipp {{2}} geheim:
    if tipp {{2}} geheim:
        print("Zu klein.")
    else:
        print("Zu groß.")
    versuche = versuche + 1
    tipp = int({{6}}("Rate noch einmal: "))
print("Richtig! Anzahl der Versuche:", {{9}})`,
        starter: `geheim = 7
`
      }
    ]
  },
  {
    id: "w4",
    title: "Welt 4: Listen",
    sub: "Viele Werte in einer Variable",
    levels: [
      {
        id: "w4l1",
        title: "Die Liste",
        primm: {
          predict: {
            options: [`Schach\nUno`, `Schach\nPoker`, `Uno\nPoker`],
            correct: 1,
            explain: `Python zählt die Plätze einer Liste ab 0. Der erste Eintrag hat also die Nummer 0, der dritte die Nummer 2.`
          },
          investigate: {
            task: `<p>Ändere die letzte Zeile zu <code>print(spiele[3])</code> und führe das Programm aus.</p>`,
            question: `Was passiert?`,
            options: [`Das Programm gibt Poker aus.`, `Das Programm gibt eine leere Zeile aus.`, `Python meldet einen Fehler, weil es diesen Platz nicht gibt.`],
            correct: 2,
            explain: `Die Liste hat drei Einträge mit den Nummern 0, 1 und 2. Die Nummer 3 gibt es nicht. Dieser Fehler passiert sehr oft, weil man beim Zählen gern mit 1 anfängt.`
          }
        },
        intro: `<p>Eine Liste speichert viele Werte in einer einzigen Variable. Sie steht in eckigen Klammern, und die Einträge werden durch Kommas getrennt.</p>
<p>Einen einzelnen Eintrag holst du über seine Nummer in eckigen Klammern. Achtung: Python zählt ab 0.</p>`,
        example: `spiele = ["Schach", "Uno", "Poker"]
print(spiele[0])
print(spiele[2])`,
        task: `<p>Lege die Liste <code>tage</code> mit den fünf Schultagen von Montag bis Freitag an.</p>
<p>Gib dann den ersten und den letzten Tag aus der Liste aus, so wie im Beispiel unten.</p>`,
        sample: `Erster Tag: Montag
Letzter Tag: Freitag`,
        tests: [{ inputs: [], expect: ["Erster Tag: Montag", "Letzter Tag: Freitag"] }],
        must: [
          { re: /tage\s*\[\s*0\s*\]/, msg: `Die Ausgabe stimmt. Hole den ersten Tag aber mit <code>tage[0]</code> aus der Liste.` },
          { re: /tage\s*\[\s*(4|-1)\s*\]/, msg: `Die Ausgabe stimmt. Hole den letzten Tag aber über seine Nummer aus der Liste.` }
        ],
        hints: [
          `Die Liste beginnt mit <code>tage = ["Montag", "Dienstag",</code> und geht so weiter bis Freitag.`,
          `Fünf Einträge haben die Nummern 0 bis 4.`,
          `Die letzte Zeile lautet <code>print("Letzter Tag:", tage[4])</code>`
        ],
        parsons: {
          lines: [`tage = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag"]`, `print("Erster Tag:", tage[0])`, `print("Letzter Tag:", tage[4])`],
          distractors: [`print("Letzter Tag:", tage[5])`]
        },
        gaps: `tage = {{1}}"Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag"{{1}}
print("Erster Tag:", tage[{{2}}])
print("Letzter Tag:", {{8}})`,
        starter: `tage = [
`
      },
      {
        id: "w4l2",
        title: "Listen wachsen",
        primm: {
          predict: {
            options: [`2\nCem`, `3\nBea`, `3\nCem`],
            correct: 2,
            explain: `<code>append</code> hängt Cem hinten an. Danach hat die Liste drei Einträge, und Cem steht auf Platz 2.`
          },
          investigate: {
            task: `<p>Füge direkt unter der zweiten Zeile eine neue Zeile ein: <code>team.append("Dana")</code>. Führe das Programm dann aus.</p>`,
            question: `Welche Zahl steht jetzt in der ersten Zeile der Ausgabe?`,
            options: [`2`, `3`, `4`],
            correct: 2,
            explain: `Jedes <code>append</code> verlängert die Liste um einen Eintrag. <code>len()</code> zählt immer den aktuellen Stand.`
          }
        },
        intro: `<p>Listen können wachsen. Mit <code>.append()</code> hängst du einen Eintrag hinten an. Der Punkt gehört dazu: erst der Name der Liste, dann der Punkt, dann der Befehl.</p>
<p>Mit <code>len()</code> zählst du, wie viele Einträge eine Liste hat.</p>`,
        example: `team = ["Ali", "Bea"]
team.append("Cem")
print(len(team))
print(team[2])`,
        task: `<p>Auf der Einkaufsliste stehen schon Brot und Milch. Dein Programm fragt, was noch fehlt, und hängt die Antwort an die Liste an.</p>
<p>Danach gibt es die Anzahl der Einträge und den neuen Eintrag aus.</p>`,
        sample: `Was fehlt noch? <b>Käse</b>
Anzahl: 3
Neu auf der Liste: Käse`,
        tests: [
          { inputs: ["Käse"], expect: ["Anzahl: 3", "Neu auf der Liste: Käse"] },
          { inputs: ["Eier"], expect: ["Anzahl: 3", "Neu auf der Liste: Eier"] }
        ],
        must: [
          { re: /\.append\s*\(/, msg: `Die Ausgabe stimmt. Hänge die Antwort aber mit <code>.append()</code> an die Liste an.` },
          { re: /\blen\s*\(/, msg: `Die Ausgabe stimmt. Lass die Anzahl aber von <code>len()</code> zählen.` }
        ],
        hints: [
          `Speichere die Antwort zuerst in einer Variable und hänge diese dann an die Liste an.`,
          `Das Anhängen sieht so aus: <code>einkauf.append(neu)</code>`,
          `Der neue Eintrag steht auf Platz 2. Die Ausgabe lautet <code>print("Neu auf der Liste:", einkauf[2])</code>`
        ],
        parsons: {
          lines: [`einkauf = ["Brot", "Milch"]`, `neu = input("Was fehlt noch? ")`, `einkauf.append(neu)`, `print("Anzahl:", len(einkauf))`, `print("Neu auf der Liste:", einkauf[2])`],
          distractors: [`einkauf.append("neu")`]
        },
        gaps: `einkauf = ["Brot", "Milch"]
neu = input("Was fehlt noch? ")
einkauf.{{6}}(neu)
print("Anzahl:", {{3}}(einkauf))
print("Neu auf der Liste:", einkauf[{{2}}])`,
        starter: `einkauf = ["Brot", "Milch"]
`
      },
      {
        id: "w4l3",
        title: "Jeden Eintrag besuchen",
        primm: {
          predict: {
            options: [`Hallo Ali`, `Hallo name\nHallo name\nHallo name`, `Hallo Ali\nHallo Bea\nHallo Cem`],
            correct: 2,
            explain: `Die Schleife geht die Liste von vorn nach hinten durch. Bei jedem Durchlauf steckt der nächste Eintrag in der Variable <code>name</code>.`
          },
          investigate: {
            task: `<p>Ergänze in der ersten Zeile einen vierten Namen in der Liste und führe das Programm aus.</p>`,
            question: `Musstest du die Schleife ändern, damit auch der neue Name begrüßt wird?`,
            options: [`Ja`, `Nein`],
            correct: 1,
            explain: `Die Schleife passt sich der Länge der Liste an. Deshalb passen Listen und Schleifen so gut zusammen: Das Programm bleibt gleich, egal ob die Liste 3 oder 3000 Einträge hat.`
          }
        },
        intro: `<p>Mit einer <code>for</code> Schleife besuchst du jeden Eintrag einer Liste. Statt <code>range()</code> steht hinter <code>in</code> einfach der Name der Liste.</p>
<p>Den Namen der Variable vor <code>in</code> darfst du frei wählen.</p>`,
        example: `freunde = ["Ali", "Bea", "Cem"]
for name in freunde:
    print("Hallo", name)`,
        task: `<p>Die Liste <code>lieder</code> enthält die Titel Sonne, Regen und Wind. Dein Programm kündigt jedes Lied mit <code>Jetzt läuft:</code> an.</p>
<p>Zum Schluss gibt es <code>Ende der Playlist.</code> aus.</p>`,
        sample: `Jetzt läuft: Sonne
Jetzt läuft: Regen
Jetzt läuft: Wind
Ende der Playlist.`,
        tests: [{ inputs: [], expect: ["Jetzt läuft: Sonne", "Jetzt läuft: Regen", "Jetzt läuft: Wind", "Ende der Playlist."] }],
        mustNot: [{ re: /Jetzt läuft[\s\S]*Jetzt läuft/, msg: `Die Ausgabe stimmt. Schreibe <code>Jetzt läuft:</code> aber nur einmal in deinen Code. Das Wiederholen übernimmt die Schleife.` }],
        must: [{ re: /\bfor\b/, msg: `Die Ausgabe stimmt. Löse die Aufgabe aber mit einer <code>for</code> Schleife.` }],
        hints: [
          `Du brauchst vier Zeilen: die Liste, die Schleife, eine eingerückte Ausgabe und eine Ausgabe ohne Einrückung.`,
          `Die Schleife lautet <code>for lied in lieder:</code>`,
          `In der Schleife steht <code>print("Jetzt läuft:", lied)</code>. Achte auf den Unterschied zwischen <code>lied</code> und <code>lieder</code>.`
        ],
        parsons: {
          lines: [`lieder = ["Sonne", "Regen", "Wind"]`, `for lied in lieder:`, `    print("Jetzt läuft:", lied)`, `print("Ende der Playlist.")`],
          distractors: [`    print("Jetzt läuft:", lieder)`]
        },
        gaps: `lieder = ["Sonne", "Regen", "Wind"]
for {{4}} in {{6}}:
    print("Jetzt läuft:", {{4}})
print("Ende der Playlist.")`,
        starter: `lieder = ["Sonne", "Regen", "Wind"]
`
      },
      {
        id: "w4l4",
        title: "Rechnen mit Listen",
        primm: {
          predict: {
            options: [`Gesamt: 3`, `Gesamt: 20`, `Gesamt: 39`],
            correct: 2,
            explain: `Die Schleife besucht jede Zahl der Liste und zählt sie zur Summe dazu. Das ist dasselbe Muster wie beim Sparplan in Welt 3.`
          },
          investigate: {
            task: `<p>Ändere die Zeile in der Schleife zu <code>summe = p</code> und führe das Programm aus.</p>`,
            question: `Was wird ausgegeben?`,
            options: [`Gesamt: 39`, `Gesamt: 12`, `Gesamt: 20`],
            correct: 2,
            explain: `Ohne <code>summe +</code> wird der alte Wert bei jedem Durchlauf überschrieben. Am Ende bleibt nur die letzte Zahl der Liste übrig.`
          }
        },
        intro: `<p>In Listen können auch Zahlen stehen. Mit einer Schleife kannst du sie zusammenzählen.</p>
<p>Teilst du die Summe durch die Anzahl der Einträge, bekommst du den Durchschnitt.</p>`,
        example: `punkte = [12, 7, 20]
summe = 0
for p in punkte:
    summe = summe + p
print("Gesamt:", summe)`,
        task: `<p>In der Liste <code>noten</code> stehen die Noten 2, 3, 1, 4 und 2. Dein Programm zählt sie mit einer Schleife zusammen und gibt die Summe aus.</p>
<p>Danach gibt es den Durchschnitt aus. Lass Python dafür die Summe durch die Anzahl der Noten teilen.</p>`,
        sample: `Summe: 12
Durchschnitt: 2.4`,
        tests: [{ inputs: [], expect: ["Summe: 12", "Durchschnitt: 2.4"] }],
        mustNot: [{ re: /2\.4|\b12\b/, msg: `Die Ausgabe stimmt, aber du hast ein Ergebnis selbst ausgerechnet. Lass Python rechnen. Die Zahlen 12 und 2.4 sollen in deinem Code nicht vorkommen.` }],
        must: [
          { re: /\bfor\b/, msg: `Die Ausgabe stimmt. Zähle die Noten aber mit einer <code>for</code> Schleife zusammen.` },
          { re: /\blen\s*\(/, msg: `Die Ausgabe stimmt. Lass die Anzahl der Noten aber von <code>len()</code> zählen.` }
        ],
        hints: [
          `Die Summe startet vor der Schleife bei 0.`,
          `In der Schleife steht <code>summe = summe + n</code>, wenn deine Schleifenvariable <code>n</code> heißt.`,
          `Der Durchschnitt ist <code>summe / len(noten)</code>. Python schreibt Kommazahlen mit einem Punkt.`
        ],
        parsons: {
          lines: [`noten = [2, 3, 1, 4, 2]`, `summe = 0`, `for n in noten:`, `    summe = summe + n`, `print("Summe:", summe)`, `print("Durchschnitt:", summe / len(noten))`],
          distractors: [`    summe = n`]
        },
        gaps: `noten = [2, 3, 1, 4, 2]
summe = {{2}}
for n in {{5}}:
    summe = summe + n
print("Summe:", summe)
print("Durchschnitt:", summe / {{3}}(noten))`,
        starter: `noten = [2, 3, 1, 4, 2]
`
      },
      {
        id: "w4l5",
        title: "Ist es dabei?",
        primm: {
          predict: {
            inputs: ["Bea"],
            options: [`Willkommen!`, `Du stehst nicht auf der Liste.`],
            correct: 0,
            explain: `<code>in</code> prüft, ob ein Wert irgendwo in der Liste vorkommt. Das Ergebnis ist eine Bedingung, die du in einem <code>if</code> benutzen kannst.`
          },
          investigate: {
            task: `<p>Führe das Programm aus und tippe <code>bea</code> ein, also klein geschrieben.</p>`,
            question: `Was wird ausgegeben?`,
            options: [`Willkommen!`, `Du stehst nicht auf der Liste.`],
            correct: 1,
            explain: `Auch <code>in</code> vergleicht ganz genau. Für Python ist <code>bea</code> ein anderer Text als <code>Bea</code>.`
          }
        },
        intro: `<p>Oft will man wissen, ob etwas in einer Liste steht. Dafür gibt es das Wort <code>in</code>. Du kennst es schon aus der Schleife, hier steht es in einer Bedingung.</p>
<p>So ersparst du dir viele Vergleiche mit <code>or</code>.</p>`,
        example: `gaeste = ["Ali", "Bea", "Cem"]
name = input("Wie heißt du? ")
if name in gaeste:
    print("Willkommen!")
else:
    print("Du stehst nicht auf der Liste.")`,
        task: `<p>Eine Pizzeria hat die Beläge Salami, Pilze, Paprika und Mais. Sie stehen in der Liste <code>belag</code>.</p>
<p>Dein Programm fragt nach dem Wunschbelag. Gibt es ihn, antwortet es <code>Kommt sofort.</code> Sonst antwortet es <code>Das haben wir leider nicht.</code></p>`,
        sample: `Welchen Belag möchtest du? <b>Ananas</b>
Das haben wir leider nicht.`,
        tests: [
          { inputs: ["Ananas"], expect: ["Das haben wir leider nicht."] },
          { inputs: ["Pilze"], expect: ["Kommt sofort."] },
          { inputs: ["Mais"], expect: ["Kommt sofort."] }
        ],
        must: [{ re: /\bin\s+belag\b/, msg: `Die Ausgabe stimmt. Prüfe aber mit <code>in belag</code>, statt jeden Belag einzeln zu vergleichen.` }],
        hints: [
          `Du brauchst die Eingabe und danach ein <code>if</code> mit <code>else</code>.`,
          `Die Bedingung prüft, ob der Wunsch in der Liste steht.`,
          `Die Bedingung lautet <code>if wunsch in belag:</code>`
        ],
        parsons: {
          lines: [`belag = ["Salami", "Pilze", "Paprika", "Mais"]`, `wunsch = input("Welchen Belag möchtest du? ")`, `if wunsch in belag:`, `    print("Kommt sofort.")`, `else:`, `    print("Das haben wir leider nicht.")`],
          distractors: [`if wunsch == belag:`]
        },
        gaps: `belag = ["Salami", "Pilze", "Paprika", "Mais"]
wunsch = input("Welchen Belag möchtest du? ")
if wunsch {{2}} {{5}}:
    print("Kommt sofort.")
{{5}}
    print("Das haben wir leider nicht.")`,
        starter: `belag = ["Salami", "Pilze", "Paprika", "Mais"]
`
      },
      {
        id: "w4l6",
        title: "Die Wunschliste",
        boss: true,
        primm: {
          predict: {
            inputs: ["5", "8", "stopp"],
            options: [`Anzahl: 3`, `Anzahl: 2`, `Anzahl: 0`],
            correct: 1,
            explain: `Die Liste startet leer. Bei jedem Durchlauf kommt eine Zahl dazu. Das Wort stopp beendet die Schleife und wird selbst nicht angehängt.`
          },
          investigate: {
            task: `<p>Führe das Programm aus und tippe gleich beim ersten Mal <code>stopp</code> ein.</p>`,
            question: `Was wird ausgegeben?`,
            options: [`Anzahl: 0`, `Python meldet einen Fehler, weil die Liste leer ist.`],
            correct: 0,
            explain: `Eine leere Liste ist erlaubt. Sie wird mit <code>[]</code> angelegt und hat die Länge 0. So beginnt fast jedes Programm, das Daten sammelt.`
          }
        },
        intro: `<p>Im Bosslevel kommt alles zusammen: eine leere Liste, eine <code>while</code> Schleife zum Sammeln und eine <code>for</code> Schleife zum Ausgeben.</p>
<p>Neu ist nur die leere Liste. Sie wird mit zwei eckigen Klammern ohne Inhalt angelegt.</p>`,
        example: `zahlen = []
eingabe = input("Zahl oder stopp: ")
while eingabe != "stopp":
    zahlen.append(int(eingabe))
    eingabe = input("Zahl oder stopp: ")
print("Anzahl:", len(zahlen))`,
        task: `<p>Dein Programm sammelt Wünsche. Es fragt so lange nach, bis <code>fertig</code> eingegeben wird. Das Wort fertig selbst ist kein Wunsch.</p>
<p>Danach gibt es die Anzahl der Wünsche aus und darunter jeden Wunsch in einer eigenen Zeile mit einem Strich davor, so wie im Beispiel unten.</p>`,
        sample: `Was wünschst du dir? <b>Fahrrad</b>
Was wünschst du dir? <b>Buch</b>
Was wünschst du dir? <b>fertig</b>
Anzahl der Wünsche: 2
- Fahrrad
- Buch`,
        tests: [
          { inputs: ["Fahrrad", "Buch", "fertig"], expect: ["Anzahl der Wünsche: 2", "- Fahrrad", "- Buch"] },
          { inputs: ["fertig"], expect: ["Anzahl der Wünsche: 0"] },
          { inputs: ["Hund", "Kopfhörer", "Reise", "fertig"], expect: ["Anzahl der Wünsche: 3", "- Hund", "- Kopfhörer", "- Reise"] }
        ],
        hints: [
          `Plane zuerst: leere Liste anlegen, ersten Wunsch erfragen, sammeln solange nicht fertig eingegeben wird, Anzahl ausgeben, alle Wünsche ausgeben.`,
          `Das Sammeln funktioniert wie im Beispiel oben: in der Schleife erst anhängen, dann neu fragen.`,
          `Die Ausgabe am Ende ist eine eigene Schleife: <code>for w in wuensche:</code> und darin <code>print("-", w)</code>`
        ],
        parsons: {
          lines: [
            `wuensche = []`,
            `wunsch = input("Was wünschst du dir? ")`,
            `while wunsch != "fertig":`,
            `    wuensche.append(wunsch)`,
            `    wunsch = input("Was wünschst du dir? ")`,
            `print("Anzahl der Wünsche:", len(wuensche))`,
            `for w in wuensche:`,
            `    print("-", w)`
          ],
          distractors: [`    wuensche.append("wunsch")`]
        },
        gaps: `wuensche = {{2}}
wunsch = input("Was wünschst du dir? ")
while wunsch {{2}} "fertig":
    wuensche.{{6}}(wunsch)
    wunsch = input("Was wünschst du dir? ")
print("Anzahl der Wünsche:", {{3}}(wuensche))
for w in {{8}}:
    print("-", w)`,
        starter: `wuensche = []
`
      }
    ]
  },
  { id: "w5", title: "Welt 5: Funktionen", sub: "Eigene Befehle bauen", levels: [] },
  { id: "w6", title: "Welt 6: Dein Projekt", sub: "Ein eigenes kleines Spiel", levels: [] }
];
