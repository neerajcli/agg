# AGG — A Levelling System Based Discord Bot

AGG is a lightweight and extensible **Discord bot** built using **Discord.js**.  
It features a levelling system that rewards user activity and encourages community engagement within the server.

---

## Features

- **Levelling System** — Rewards users with XP and levels based on their activity in the server.
- **Welcomer Messages** — Sends a welcome message when a new member joins the server.
- **Nickname Moderation** — Automatically checks and moderates usernames when users join the server.
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
client.login('Your Bot TOKEN here')
```

### Start the bot

```bash
node index.js
```

---

## Security Notes

- Never commit your Discord token.
- Use environment variables if hosting online.
