# Installation 🛠️

Før du kan arbejde med projekterne, skal du installere nogle få ting.

Dette skal kun gøres én gang.

---

## 1. Installer Node.js

Socket.IO bruger Node.js.

Download og installer Node.js:

👉 https://nodejs.org

Vi anbefaler den nyeste LTS-version.

---

## 2. Kontroller installationen

Åbn en terminal.

Skriv:

```bash
node --version
```

Du bør se noget i stil med:

```text
v22.x.x
```

Prøv derefter:

```bash
npm --version
```

Du bør se et versionsnummer.

Hvis begge kommandoer virker, er Node.js installeret korrekt.

---

## 3. Installer Visual Studio Code

Download VS Code:

👉 https://code.visualstudio.com

VS Code er den editor, vi bruger i dette repository.

---

## 4. Klon repository'et

```bash
git clone <repository-url>
```

Eller download projektet som ZIP-fil fra GitHub.

---

## 5. Åbn projektet

Åbn projektmappen i VS Code.

Eksempel:

```text
socketio-chat-gym-kids
```

---

## 6. Installer projektets afhængigheder

Gå ind i den ønskede projektmappe.

Eksempel:

```bash
cd projects/01_echo_chat
```

Kør derefter:

```bash
npm install
```

Dette installerer de pakker projektet har brug for.

---

## 7. Start projektet

Kør:

```bash
npm start
```

eller:

```bash
node starter_file.js
```

afhængigt af hvad README.md for projektet beskriver.

---

## 8. Åbn browseren

Åbn browseren.

Gå til:

```text
http://localhost:3000
```

Hvis projektet bruger en anden port, vil det stå i projektets README.md.

---

# Golden Rule ⭐

Du bør kunne:

1. Installere Node.js
2. Køre `npm install`
3. Starte projektet
4. Åbne browseren

...og se noget virke inden for få minutter.

Hvis ikke dette sker, så kig i:

```text
setup/troubleshooting.md
```

---

# Klar til at kode? 🚀

Start med:

```text
projects/01_echo_chat
```

og byg dig gradvist op gennem roadmap'en.