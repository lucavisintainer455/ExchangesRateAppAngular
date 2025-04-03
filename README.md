# 💱 Currency Converter - Real-Time Exchange Rates

Questo progetto è un'applicazione web sviluppata con Angular che permette agli utenti di convertire valute in tempo reale utilizzando l'API di ExchangeRate-API. L'app offre un'interfaccia intuitiva per selezionare le valute e visualizzare rapidamente i tassi di cambio aggiornati.

## ✨ Funzionalità
- 💱 Conversione in tempo reale tra valute
- 🌍 Ricerca valute per paese
- ⭐ Aggiungi coppie di valute ai preferiti
- 📝 Aggiungi una descrizione alle coppie preferite
- 📊 Grafico storico delle valute preferite (dal momento dell'aggiunta ai preferiti)


🗝️ Come Ottenere la Tua Chiave API
Per ottenere una chiave API e accedere ai tassi di cambio, segui questi semplici passaggi:

1. Registrati sul Sito di ExchangeRate-API
Vai sul sito ufficiale di ExchangeRate-API: https://www.exchangerate-api.com/

Clicca sul pulsante "Get Started" o "Sign Up" (Registrati).

Se hai già un account, accedi; altrimenti, compila il modulo di registrazione con le tue informazioni.

2. Scegli il Piano API
ExchangeRate-API offre vari piani, incluso un piano gratuito:

Piano gratuito: consente un aggiornamento giornaliero dei tassi di cambio.

Piani a pagamento: offrono aggiornamenti più frequenti e funzionalità aggiuntive, come l'accesso ai tassi in tempo reale.

Seleziona il piano che meglio si adatta alle tue necessità.

3. Ottieni la Tua Chiave API
Una volta effettuato l'accesso, vai alla sezione "Dashboard".

Nella dashboard, troverai la tua API Key (chiave API). La chiave sarà una stringa alfanumerica univoca.

Copia questa chiave, che utilizzerai per configurare il tuo progetto.

## 🛠️ Guida di Installazione e Configurazione

### 📦 Prerequisiti
- Node.js (v18 o superiore)
- npm (v9 o superiore)
- Git installato
- Chiave API
---

### 🚀 1. Clona il Progetto
Apri il terminale e clona il repository:
```bash
git clone <URL-REPOSITORY>
cd nome-progetto
```

---

### 🟢 2. Installa le Dipendenze
Esegui il comando:
```bash
npm install
```
Questo comando installerà tutte le dipendenze necessarie.

---

### 📝 3. Configura l'Ambiente
1. Vai nella cartella `src/environments`
2. Duplica il file di esempio e rinominalo:
```bash
cp src/environments/environment.example.ts src/environments/environment.ts
```
3. Apri `environment.ts` e inserisci la tua chiave API:
```typescript
export const environment = {
  production: false,
  apiKey: 'INSERISCI_LA_TUA_API_KEY',
  apiUrl: 'https://v6.exchangerate-api.com/v6'
};
```

---

### 🟢 4. Avvia il Progetto
Avvia l'applicazione in modalità sviluppo:
```bash
npm start
```
Il progetto sarà accessibile all’indirizzo `http://localhost:4200`

---

### ✅ 5. Build per la Produzione
Per creare un pacchetto pronto per la produzione, esegui:
```bash
npm run build
```
Il risultato si troverà nella cartella `dist`.

---

## 🎉 Complimenti!
Il progetto è ora configurato e funzionante! Se hai domande, contatta l’amministratore del progetto.

