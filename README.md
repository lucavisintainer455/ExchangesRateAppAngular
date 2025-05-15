# 💱 Currency Converter - Real-Time Exchange Rates

Questo progetto è un'applicazione web sviluppata con Angular che permette agli utenti di convertire valute in tempo reale utilizzando l'API di ExchangeRate-API. L'app offre un'interfaccia intuitiva per selezionare le valute e visualizzare rapidamente i tassi di cambio aggiornati.

## ✨ Funzionalità Principali
- 🔄 Conversione in tempo reale tra valute
- 🌍 Ricerca di valute per nome o paese
- ⭐ Salvataggio di coppie di valute nei preferiti
- 📝 Aggiunta e modifica di descrizioni personalizzate per le valute salvate
- 📊 Grafico storico delle valute preferite (dal momento dell'aggiunta ai preferiti)


## Come Ottenere la Tua Chiave API

Per utilizzare l'applicazione, è necessario ottenere una chiave API gratuita da [ExchangeRate-API](https://www.exchangerate-api.com):

1. Visita [exchangerate-api.com](https://www.exchangerate-api.com)
2. Clicca su **"Get Started"** e registrati gratuitamente
3. Dopo la registrazione, accedi alla **Dashboard**
4. Copia la tua **API Key**, una stringa alfanumerica univoca
5. Utilizza questa chiave come descritto nella sezione di configurazione


## 🛠️ Installazione e Avvio

### 📦 Prerequisiti

Node.js (v18 o superiore)
npm (v9 o superiore)
Git installato
Una chiave API valida
---

### 🚀 1. Clona il Progetto
Apri il terminale e clona il repository:
```bash
git clone https://github.com/tuo-username/currency-converter-angular.git
cd ExchangesRateAppAngular
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
2. Duplica il file di `environment.example.ts` rinominalo:
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


## 🎉 Complimenti!
Il progetto è ora configurato e funzionante! Se hai domande, contatta l’amministratore del progetto.


## ✅ Operazioni CRUD Implementate

| Operazione  | Tipo     | Implementazione                                                                     |
| ----------- | -------- | ----------------------------------------------------------------------------------- |
| `GET`       | Da API   | Recupero tassi di cambio in tempo reale da ExchangeRate-API                         |
| `POST`      | Simulata | Aggiunta di valute ai preferiti (con `localStorage`)                                |
| `PUT/PATCH` | Simulata | Modifica delle descrizioni associate alle coppie di valute preferite                |
| `DELETE`    | Simulata | Rimozione di una coppia dai preferiti (con aggiornamento dinamico dell’interfaccia) |


## 🎨 Interfaccia Utente

- L’interfaccia è progettata con semplicità e chiarezza:
- Layout responsive e ordinato
- Feedback visuali per operazioni completate
- Navigazione fluida tra le sezioni tramite Angular Routing
- Pagina di errore 404 per URL non validi

## 🏁 Conclusione
Currency Converter è un'applicazione completa che integra un'API esterna per fornire tassi di cambio aggiornati e offre una gestione locale dei dati con operazioni CRUD simulate. Tutte le funzionalità sono sviluppate con buone pratiche Angular, garantendo un'esperienza utente fluida, semplice ed estensibile.

## 🔧 Per qualsiasi domanda o suggerimento, apri una issue nel repository o [contatta il maintainer del progetto](mailto:tuluca.visintainer100@gmail.com) 📧



