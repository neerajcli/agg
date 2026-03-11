# AGG — A Levelling System Based Discord Bot

AGG is a lightweight and extensible **Discord bot** built using **Discord.js**.
It features a levelling system that rewards user activity and encourages community engagement within the server.

---

## Features

- **Modular Command System** — Every command is stored as a separate file in `commands/`
- **Simple Configuration** — All important settings inside `config.json`
- **Clean Structure** — Easy to understand and extend
- **Beginner-Friendly** — Ideal for learning Discord bot development
- **Quick Startup** — Run the bot instantly with a single command

---

## Tech Stack

- **Node.js v16**
- **Discord.js v12**
- **Quick.db v9**

---

## Installation

### Clone the repository

```bash
git clone https://github.com/neerajcli/agg.git
cd agg
```

### Install dependencies

```bash
npm install
```

### Add the bot token in `index.js`

```js
const dbl = new DBL("YOUR DBL API KEY HERE", { webhookPort: 5000, webhookAuth: "YOUR DBL API KEY HERE" });
```

### Start the bot

```bash
node index.js
```

---

## Security Notes

- Never commit your Discord token.
- Use environment variables if hosting online.
