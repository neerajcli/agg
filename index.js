const { Client, GatewayIntentBits, EmbedBuilder, AttachmentBuilder, PermissionFlagsBits, ActivityType } = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB();
let ms;
const { createCanvas, loadImage } = require('canvas');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildMessageReactions
  ]
});

async function getLeaderboard(guildId) {
  const allData = await db.all();

  const xpEntries = allData
    .filter(entry => entry.id.startsWith('levelXP_') && entry.id.endsWith(guildId));

  const users = await Promise.all(xpEntries.map(async entry => {
    const userId = entry.id.replace('levelXP_', '').replace(guildId, '');
    const xp = entry.value ?? 0;
    const level = await db.get('level_' + userId + guildId) ?? 0;
    return { userId, xp, level };
  }));

  users.sort((a, b) => b.level - a.level || b.xp - a.xp);

  return users;
}

client.on('clientReady', async () => {
  ms = (await import("parse-ms")).default;
  console.log('Bot is ready');
  client.user.setActivity(`Anime Gaming Galaxy!`, { type: ActivityType.Watching });
  await db.set('on_', false);
});

client.on("messageCreate", async message => {
  if (message.author.bot) return;
  if (message.content === "<@784671168673873952>" || message.content === "<@!784671168673873952>") {
    return message.channel.send('I am here!');

  } else if (message.content.startsWith("!eval")) {
    let owners = ["504635146553524234"];
    if (!owners.includes(message.author.id)) return;
    const args = message.content.split(" ").slice(1);

    const clean = text => {
      if (typeof (text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
      else
        return text;
    };

    try {
      const code = args.join(" ");
      let evaled = eval(code);
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
      message.channel.send({ content: `\`\`\`xl\n${clean(evaled)}\n\`\`\`` });
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }

  } else if (message.content == '!trialsinfo') {
    if (message.guild.id === "498898363350253569" &&
      (message.member.roles.cache.has('498898597681561620') ||
        message.member.roles.cache.has('530279836451864586') ||
        message.member.roles.cache.has('498899750662438937'))) {
      const embed = new EmbedBuilder()
        .setTitle('Trial Mod Guidelines')
        .setColor('#FFFFFF')
        .setFooter({ text: 'Failing to follow these guidelines may result in a direct demotion' })
        .setDescription(`- 2k messages weekly. \n- Non toxic. \n- Friendly behaviour with everyone. \n- Must know MOD command uses or experience. [Even if you dont have exp as long as you are willing to work and learn them its all good] \n- Read rules and info. \n- Must do the task given by your seniors.`);
      message.channel.send({ embeds: [embed] });
    }

  } else if (message.content == '!eventmanagersinfo') {
    if (message.guild.id === "498898363350253569" &&
      (message.member.roles.cache.has('498898597681561620') ||
        message.member.roles.cache.has('530279836451864586') ||
        message.member.roles.cache.has('498899750662438937'))) {
      const embed = new EmbedBuilder()
        .setTitle('Event Managers Guidelines')
        .setColor('#FFFFFF')
        .setFooter({ text: 'Failing to follow these guidelines may result in a direct demotion' })
        .setDescription(`- 1k messages weekly. \n- 1 event weekly [can host alone or with the help of others in staff or event managers which are present, also complete the event within the week]. \n- Update <#513975623048364032> channel accordingly.`);
      message.channel.send({ embeds: [embed] });
    }

  } else if (message.content == '!modinfo') {
    if (message.guild.id === "498898363350253569" &&
      (message.member.roles.cache.has('498898597681561620') ||
        message.member.roles.cache.has('530279836451864586') ||
        message.member.roles.cache.has('498899750662438937'))) {
      const embed = new EmbedBuilder()
        .setTitle('Mod Guidelines')
        .setColor('#FFFFFF')
        .setFooter({ text: 'Failing to follow these guidelines may result in a direct demotion' })
        .setDescription(`- 2k messages weekly. \n- Moderation without partiality. \n- Don't fight with fellow staff members over moderation issues outside staff channels. \n- Don't be toxic with people u don't know personally. \n- Change the nickname which ain't pingable or are in other languages or fonts. \n- Read staff channels on a regular basis. \n- If you have to go inactive due to some days, go by telling your seniors and the amount of time for which you will be inactive. \n \nNOTE :- You work is not only to moderate but also to make chat active, non-toxic, friendly and social.`);
      message.channel.send({ embeds: [embed] });
    }

  } else if (message.content == '!gamingmanagersinfo') {
    if (message.guild.id === "498898363350253569" &&
      (message.member.roles.cache.has('498898597681561620') ||
        message.member.roles.cache.has('530279836451864586') ||
        message.member.roles.cache.has('498899750662438937'))) {
      const embed = new EmbedBuilder()
        .setTitle('Gaming Managers Guidelines')
        .setColor('#FFFFFF')
        .setFooter({ text: 'Failing to follow these guidelines may result in a direct demotion' })
        .setDescription(`- 1k messages weekly. \n- You can stream the games or host game related events yourself or with the help of event managers. \n- Update <#590141817031491584> channel.`);
      message.channel.send({ embeds: [embed] });
    }

  } else if (message.content.startsWith('!level')) {
    let user = message.mentions.users.first() || message.author;
    let level = await db.get('level_' + user.id + message.guild.id);
    if (level === null) level = 0;
    let XP = await db.get('levelXP_' + user.id + message.guild.id);
    if (XP === null) XP = 0;
    let nextXP = await db.get('nextXP_' + user.id + message.guild.id);
    if (nextXP === null) nextXP = 1000;

    const leaderboard = await getLeaderboard(message.guild.id);
    const rankIndex = leaderboard.findIndex(entry => entry.userId === user.id);
    const rank = rankIndex === -1 ? 'N/A' : `#${rankIndex + 1}`;

    const canvas = createCanvas(1000, 300);
    const ctx = canvas.getContext('2d');
    const bar_width = 600;
    const bg = await loadImage("https://t3.ftcdn.net/jpg/06/17/02/90/360_F_617029052_963IucmI1GE8fTgR5U8HDGyEDBbMwQZt.jpg");
    const av = await loadImage(user.displayAvatarURL({ extension: 'png', forceStatic: true }));

    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(120, 120, 110, 0, 2 * Math.PI);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.closePath();

    ctx.lineJoin = "round";
    ctx.lineWidth = 69;

    ctx.strokeRect(298, 199, bar_width, 2);
    ctx.strokeStyle = "black";
    ctx.strokeRect(300, 200, bar_width, 0);
    ctx.strokeStyle = "#1762e8";
    ctx.strokeRect(300, 200, bar_width * XP / nextXP, 0);

    ctx.font = "bold 40px Sans";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText(user.username, 120, 275, 200);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 25px Sans";
    ctx.fillText("Rank", 650, 40, 200);
    ctx.font = "bold 40px Sans";
    ctx.fillText(rank, 720, 40, 100);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 25px Sans";
    ctx.fillText("Level", 850, 40, 200);
    ctx.font = "bold 40px Sans";
    ctx.fillText(level, 930, 40, 80);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 22px Serif";
    ctx.fillText(`${XP}/${nextXP} XP`, 850, 150);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 22px Serif";
    ctx.fillText(`${((XP * 100) / nextXP).toFixed(0)}/100 %`, 350, 150);

    ctx.beginPath();
    ctx.arc(120, 120, 110, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.clip();

    ctx.drawImage(av, 10, 10, 220, 220);

    const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: 'level.png' });
    message.channel.send({ files: [attachment] });

  } else if (message.content.startsWith("!addXP")) {
    const prefix = '!';
    if (!message.member.permissions.has(PermissionFlagsBits.Administrator)) return;
    const user = message.mentions.users.first();
    if (!user) return message.channel.send("Invalid User");
    const args = message.content.slice(prefix.length).trim().split(' ');
    if (!args[2]) return message.channel.send('Invalid XP amount.');
    if (isNaN(args[2])) return message.channel.send("Invalid XP amount.");
    if (args[2] <= 0) return message.channel.send("Invalid XP amount.");
    await db.add("levelXP_" + user.id + message.guild.id, parseInt(args[2]));
    message.channel.send(`Gave ${args[2]}XP to ${user.username}.`);

  } else if (message.content.startsWith("!removeXP")) {
    const prefix = '!';
    if (!message.member.permissions.has(PermissionFlagsBits.Administrator)) return;
    const user = message.mentions.users.first();
    if (!user) return message.channel.send("Invalid User");
    const args = message.content.slice(prefix.length).trim().split(' ');
    if (!args[2]) return message.channel.send('Invalid XP amount.');
    if (isNaN(args[2])) return message.channel.send("Invalid XP amount.");
    if (args[2] <= 0) return message.channel.send("Invalid XP amount.");
    await db.sub("levelXP_" + user.id + message.guild.id, parseInt(args[2]));
    message.channel.send(`Removed ${args[2]}XP from ${user.username}.`);

  } else if (message.content.startsWith("!reset")) {
    if (!message.member.permissions.has(PermissionFlagsBits.Administrator)) return;
    const user = message.mentions.users.first();
    if (!user) return message.channel.send("Invalid User");
    await db.delete("levelXP_" + user.id + message.guild.id);
    await db.delete("level_" + user.id + message.guild.id);
    await db.delete("nextXP_" + user.id + message.guild.id);
    message.channel.send(`Resetted ${user.username}.`);

  } else if (message.content.startsWith("!enable-boost")) {
    if (!message.member.permissions.has(PermissionFlagsBits.Administrator)) return;
    await db.set('xboost_' + message.guild.id, 1);
    message.channel.send("Successfully enabled 3x boost.");

  } else if (message.content.startsWith("!disable-boost")) {
    if (!message.member.permissions.has(PermissionFlagsBits.Administrator)) return;
    await db.set('xboost_' + message.guild.id, 0);
    message.channel.send("Successfully disabled 3x boost.");

  } else if (message.content.startsWith('!leaderboard')) {
    const leaderboard = await getLeaderboard(message.guild.id);

    if (leaderboard.length === 0)
      return message.channel.send('No leaderboard data yet!');

    const USERS_PER_PAGE = 15;
    const totalPages = Math.ceil(leaderboard.length / USERS_PER_PAGE);
    let currentPage = 0;

    async function buildLeaderboardEmbed(page) {
      const start = page * USERS_PER_PAGE;
      const end = start + USERS_PER_PAGE;
      const pageEntries = leaderboard.slice(start, end);

      let description = '';
      for (let i = 0; i < pageEntries.length; i++) {
        const { userId, xp, level } = pageEntries[i];
        const globalIndex = start + i;
        const prefix = `**#${globalIndex + 1}**`;

        let member;
        try {
          member = await message.guild.members.fetch(userId);
        } catch {
          member = null;
        }

        const displayName = member ? member.user.username : `Unknown (${userId})`;
        description += `${prefix} **${displayName}** — Level ${level} | ${xp} XP\n`;
      }

      return new EmbedBuilder()
        .setTitle(`${message.guild.name} Leaderboard`)
        .setColor('#FFFFFF')
        .setDescription(description)
        .setFooter({ text: `Page ${page + 1} of ${totalPages} • ${leaderboard.length} total users • React ⏮ ◀ ▶ ⏭ to navigate` })
        .setTimestamp();
    }

    const initialEmbed = await buildLeaderboardEmbed(0);
    const lbMessage = await message.channel.send({ embeds: [initialEmbed] });

    if (totalPages > 1) {
      await lbMessage.react('⏮');
      await lbMessage.react('◀');
      await lbMessage.react('▶');
      await lbMessage.react('⏭');
    }

    const filter = (reaction, user) =>
      ['⏮', '◀', '▶', '⏭'].includes(reaction.emoji.name) && user.id === message.author.id;

    const collector = lbMessage.createReactionCollector({ filter, time: 120000 });

    collector.on('collect', async (reaction, user) => {
      await reaction.users.remove(user.id).catch(() => { });

      if (reaction.emoji.name === '⏮') currentPage = 0;
      else if (reaction.emoji.name === '◀') currentPage = Math.max(0, currentPage - 1);
      else if (reaction.emoji.name === '▶') currentPage = Math.min(totalPages - 1, currentPage + 1);
      else if (reaction.emoji.name === '⏭') currentPage = totalPages - 1;

      const newEmbed = await buildLeaderboardEmbed(currentPage);
      await lbMessage.edit({ embeds: [newEmbed] });
    });

    collector.on('end', async () => {
      await lbMessage.reactions.removeAll().catch(() => { });
    });

  } else if (message.content === '!cleanupleaderboard') {
    if (!message.member.permissions.has(PermissionFlagsBits.Administrator)) return;

    const leaderboard = await getLeaderboard(message.guild.id);
    if (leaderboard.length === 0)
      return message.channel.send('No leaderboard data to clean up!');
    let msg = await message.channel.send("Leaderboard cleaning in progress..... This will take some time, please wait....")
    const allMembers = await message.guild.members.fetch();
    let removed = 0;
    for (const entry of leaderboard) {
      if (!allMembers.has(entry.userId)) {
        await db.delete('level_' + entry.userId + message.guild.id);
        await db.delete('levelXP_' + entry.userId + message.guild.id);
        await db.delete('nextXP_' + entry.userId + message.guild.id);
        removed++;
      }
    }
    await msg.edit(`Cleanup complete! Removed **${removed}** users from the leaderboard!`)
  }
  else {
    return;
  }
});


client.on('messageCreate', async message => {
  if (message.author.bot) return;
  const excludedChannels = ["499533661771792406", "503614955472420878", "540467584126943243",
    "498911483531624467", "525607058121162762", "502052026486751233"];
  if (excludedChannels.includes(message.channel.id)) return;

  let isNewUser = await db.get('level_' + message.author.id + message.guild.id);
  if (isNewUser === null) await db.set('nextXP_' + message.author.id + message.guild.id, 1000);

  let timeout = 60000;
  let levelOut = await db.get(`levelOut_${message.author.id}${message.guild.id}`);

  if (levelOut !== null && timeout - (Date.now() - levelOut) > 0) {
    const XP = await db.get('levelXP_' + message.author.id + message.guild.id);
    const level = await db.get('level_' + message.author.id + message.guild.id);
    const nextXP = await db.get('nextXP_' + message.author.id + message.guild.id);

    if (XP >= nextXP || (XP < 0 && level > 0)) {
      let currentXP = XP;
      let currentLevel = level;
      let requiredXP = nextXP;

      while (currentXP >= requiredXP) {
        currentXP -= requiredXP;
        currentLevel += 1;
        requiredXP += 1000;
      }

      while (currentXP < 0 && currentLevel > 0) {
        requiredXP -= 1000;
        currentLevel -= 1;
        currentXP += requiredXP;
      }

      await db.set('level_' + message.author.id + message.guild.id, currentLevel);
      await db.set('levelXP_' + message.author.id + message.guild.id, currentXP);
      await db.set('nextXP_' + message.author.id + message.guild.id, requiredXP);

      let newLevel = await db.get('level_' + message.author.id + message.guild.id);
      const channel = client.channels.cache.get('502936933471748126');
      const embed = new EmbedBuilder()
        .setDescription(`Congratulations <@${message.author.id}>, you just levelled up to level ${newLevel}! Keep going!`)
        .setColor("#FFFFFF")
        .setTimestamp();

      channel.send({ embeds: [embed] });

      const user = message.guild.members.cache.get(message.author.id);
      if (newLevel >= 1) user.roles.add('498915544876056577');
      if (newLevel >= 7) user.roles.add('836422040591925248');
      if (newLevel >= 15) user.roles.add('836421588684898342');
      if (newLevel >= 25) user.roles.add('500011042357772288');
      if (newLevel >= 38) user.roles.add('500011531430395905');
      if (newLevel >= 51) user.roles.add('500011920540303362');
      if (newLevel >= 62) user.roles.add('500012144243507201');
      if (newLevel >= 75) user.roles.add('500012320089440286');
      if (newLevel >= 88) user.roles.add('500012762228064285');
      if (newLevel >= 100) user.roles.add('499120445501603840');
    } else {
      return;
    }
  } else {
    await db.set(`levelOut_${message.author.id}${message.guild.id}`, Date.now());
    let boosts = await db.get('xboost_' + message.guild.id);

    let number = Math.round(Math.random() * 30) + 20;
    let number1 = Math.round(Math.random() * 45) + 30;
    let number2 = Math.round(Math.random() * 60) + 40;
    let number3 = Math.round(Math.random() * 75) + 50;
    let number4 = Math.round(Math.random() * 90) + 60;
    let number5 = Math.round(Math.random() * 105) + 70;

    if (boosts == 1) {
      number = Math.round(Math.random() * 120) + 80;
      number1 = Math.round(Math.random() * 135) + 90;
      number2 = Math.round(Math.random() * 150) + 100;
      number3 = Math.round(Math.random() * 165) + 110;
      number4 = Math.round(Math.random() * 180) + 120;
      number5 = Math.round(Math.random() * 195) + 130;
    }

    const member = await message.guild.members.fetch(message.author.id);

    if (member.roles.cache.has('705353616944267284')) {
      await db.add('levelXP_' + message.author.id + message.guild.id, number5);
    } else if (member.roles.cache.has('586457992002666536')) {
      await db.add('levelXP_' + message.author.id + message.guild.id, number4);
    } else if (member.roles.cache.has('648199869860806671')) {
      await db.add('levelXP_' + message.author.id + message.guild.id, number3);
    } else if (member.roles.cache.has('813998590644191232')) {
      await db.add('levelXP_' + message.author.id + message.guild.id, number3);
    } else if (member.roles.cache.has('698098009233293392')) {
      await db.add('levelXP_' + message.author.id + message.guild.id, number2);
    } else if (member.roles.cache.has('698098130620514374')) {
      await db.add('levelXP_' + message.author.id + message.guild.id, number2);
    } else if (member.roles.cache.has('698097735739637760')) {
      await db.add('levelXP_' + message.author.id + message.guild.id, number1);
    } else {
      await db.add('levelXP_' + message.author.id + message.guild.id, number);
    }
  }
});

client.on('guildMemberAdd', async member => {
  var regex = /[^A-Za-z0-9 *&\|.,-_#$%=+:;]/;
  var aaaa = regex.test(member.user.username);

  if (member.guild.id === "498898363350253569" && aaaa === true)
    member.setNickname('Moderated Nickname');

  let words = ["nigga", "nibba", "gga", "nigger", "wigger", "ass", "fuck"];
  let dddd = member.user.username;
  let eeee = dddd.toLowerCase();

  if (words.includes(eeee) && member.guild.id === "498898363350253569")
    member.setNickname("Moderated Nickname");

  const channel1 = member.guild.channels.cache.get('498898363350253571');
  channel1.send(`Welcome <@${member.id}> to **${member.guild.name}!**`);
});

client.on('guildMemberRemove', async member => {
  await db.delete('level_' + member.id + member.guild.id);
  await db.delete('levelXP_' + member.id + member.guild.id);
  await db.delete('nextXP_' + member.id + member.guild.id);
});

client.login('YOUR_BOT_TOKEN');
