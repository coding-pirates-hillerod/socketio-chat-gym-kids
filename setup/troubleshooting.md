# Fejlfinding 🔧

Ingen panik.

Alle programmører møder fejl.

De fleste problemer kan løses på få minutter.

---

# Problem: node virker ikke

Hvis du ser en fejl som:

```text
'node' is not recognized
```

eller:

```text
command not found: node
```

så er Node.js sandsynligvis ikke installeret korrekt.

Prøv:

```bash
node --version
```

Hvis det ikke virker:

1. Installer Node.js igen
2. Genstart computeren
3. Åbn terminalen igen

Se:

```text
setup/install_software.md
```

---

# Problem: npm virker ikke

Hvis du ser:

```text
'npm' is not recognized
```

eller:

```text
command not found: npm
```

så er Node.js sandsynligvis ikke installeret korrekt.

Prøv:

```bash
npm --version
```

Hvis det ikke virker:

1. Geninstaller Node.js
2. Genstart computeren

---

# Problem: Manglende pakker

Hvis du ser:

```text
Cannot find module ...
```

eller:

```text
Module not found
```

så mangler projektets pakker sandsynligvis.

Kør:

```bash
npm install
```

og prøv igen.

---

# Problem: Porten er allerede i brug

Hvis du ser noget i stil med:

```text
EADDRINUSE
```

så betyder det typisk:

- Projektet kører allerede
- Eller et andet program bruger porten

Prøv:

1. Luk alle terminalvinduer
2. Stop andre Node.js-programmer
3. Start projektet igen

---

# Problem: Browseren viser ingenting

Prøv:

```text
http://localhost:3000
```

Hvis det ikke virker:

1. Kontrollér at serveren faktisk kører
2. Kontrollér at terminalen ikke viser fejl
3. Prøv at genstarte projektet

---

# Problem: To browserfaner kan ikke se hinanden

Socket.IO-projekterne bygger ofte på flere brugere.

Prøv:

1. Åbn to browserfaner
2. Besøg samme adresse i begge faner
3. Test igen

Hvis det stadig ikke virker:

- Genstart serveren
- Opdatér begge faner

---

# Problem: VS Code viser røde streger

Dette er ofte mindre alvorligt end det ser ud.

Spørg først:

👉 Virker programmet faktisk?

Hvis appen virker i browseren, kan de røde streger ofte ignoreres midlertidigt.

Prøv:

1. Gem alle filer
2. Luk VS Code
3. Åbn VS Code igen

---

# Problem: Jeg har ødelagt koden

Perfekt!

Det betyder, at du eksperimenterer. 🚀

Prøv:

1. Fortryd ændringen (`Ctrl+Z`)
2. Sammenlign med den oprindelige kode
3. Bed en frivillig om hjælp

Alle programmører ødelægger deres kode.

Det er en del af læringen.

---

# Problem: Jeg forstår ikke koden

Det er helt normalt.

Du behøver ikke forstå al koden.

Prøv i stedet:

✅ Skift en farve

✅ Skift en tekst

✅ Skift en emoji

✅ Skift et brugernavn

✅ Tilføj en ny besked

Når du eksperimenterer, begynder koden gradvist at give mening.

---

# Golden Rule ⭐

Hvis du kan:

```bash
npm install
npm start
```

og åbne:

```text
http://localhost:3000
```

så er du allerede længere end mange professionelle udviklere var på deres første dag.

---

# Husk ❤️

Programmering handler ikke om aldrig at lave fejl.

Programmering handler om at lære at løse fejl.

Hvis noget virker efter 10 forsøg:

✅ Så virker det.

✅ Så har du lært noget.

✅ Så er du på rette vej.