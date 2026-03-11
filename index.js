const Discord = require('discord.js')
const { QuickDB } = require('quick.db')
const db = new QuickDB()
const ms = require("parse-ms")
const { createCanvas, loadImage } = require('canvas')

const client = new Discord.Client({
  disableEveryone: true,
}); 
client.on('ready', async () => {
    console.log('Bot is ready')
    client.user.setActivity(`Anime Gaming Galaxy!`, {type : "WATCHING"})
    await db.set('on_', false)
}) 

client.on("message", async message => {
    if(message.content === "<@784671168673873952>" || message.content === "<@!784671168673873952>") return message.channel.send('I am here!')
})

client.on('message', async message => {
if(message.content.startsWith("!eval")) { 
    let owners = [
      "504635146553524234",
    ];
    if (!owners.includes(message.author.id)) return;
    const args = message.content.split(" ").slice(1);
const clean = text => {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
} 
 try {
      const code = args.join(" ");
      let evaled = eval(code);
 
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
 
      message.channel.send(clean(evaled), {code:"xl"});
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  } 
})

client.on('guildMemberAdd', async member => {
   var regex = /[^A-Za-z0-9 *&\|.,-_#$%=+:;]/
var aaaa = regex.test(member.user.username)
if(member.guild.id === "498898363350253569" && aaaa === true) member.setNickname('Moderated Nickname');
/*let toBan1 = member.user.username
let toBan = toBan1.toLowerCase()
let toBanWords = "h0nda"
let toBanWords1 = "honda"
if(toBan.includes(toBanWords) && member.guild.id === "498898363350253569") member.ban();
if(toBan.includes(toBanWords1) && member.guild.id === "498898363350253569") member.ban();*/
let words = ["nigga", "nibba", "gga", "nigger", "wigger", "ass", "fuck"]
let dddd = member.user.username
let eeee = dddd.toLowerCase()
if(words.includes(eeee) && member.guild.id === "498898363350253569") member.setNickname("Moderated Nickname"); 
    const channel1 = member.guild.channels.cache.get('498898363350253571')
channel1.send(`Welcome <@${member.id}> to **${member.guild.name}!**`)
})

/*client.on('message', async message => {
    const a = await db.fetch('on_')
    if(a === false) {
        const channel11 = client.channels.cache.get('498898363350253571')
        if(!channel11) return
        const embed11 = new Discord.MessageEmbed()
        .setTitle('Subscribe Notification')
        .setColor('#FFFFF')
        .setDescription(`Everyone, subscribe to the Anime Clasher Channel with the link down below \n https://www.youtube.com/c/AnimeClasher`)
        setInterval(() => {
         channel11.send(embed11)
        }, 3600000)
        db.set('on_', true)
    } else {
        return;
    }
})*/

client.on('message', async message => {
    if(message.content !== '!trialsinfo') return
    if (message.guild.id === "498898363350253569" && message.member.roles.cache.has('498898597681561620')) {
        const embed = new Discord.MessageEmbed()
        .setTitle('Trial Mod Guidelines')
        .setColor('#FFFFFF')
        .setFooter('Failing to follow these guidelines may result in a direct demotion')
        .setDescription(`- 2k messages weekly. \n- Non toxic. \n- Friendly behaviour with everyone. \n- Must know MOD command uses or experience. [Even if you dont have exp as long as you are willing to work and learn them its all good] \n- Read rules and info. \n- Must do the task given by your seniors.`)
        message.channel.send(embed)
      } else if (message.guild.id === "498898363350253569" && message.member.roles.cache.has('530279836451864586')) {
           const embed1 = new Discord.MessageEmbed()
       .setTitle('Trial Mod Guidelines')
        .setColor('#FFFFFF')
        .setFooter('Failing to follow these guidelines may result in a direct demotion')
        .setDescription(`- 2k messages weekly. \n- Non toxic. \n- Friendly behaviour with everyone. \n- Must know MOD command uses or experience. [Even if you dont have exp as long as you are willing to work and learn them its all good] \n- Read rules and info. \n- Must do the task given by your seniors.`)
           message.channel.send(embed1)
      } else if(message.guild.id === "498898363350253569" && message.member.roles.cache.has('498899750662438937')) {
           const embed2 = new Discord.MessageEmbed()
       .setTitle('Trial Mod Guidelines')
        .setColor('#FFFFFF')
        .setFooter('Failing to follow these guidelines may result in a direct demotion')
        .setDescription(`- 2k messages weekly. \n- Non toxic. \n- Friendly behaviour with everyone. \n- Must know MOD command uses or experience. [Even if you dont have exp as long as you are willing to work and learn them its all good] \n- Read rules and info. \n- Must do the task given by your seniors. \n- If you have to go inactive due to some days, go by telling your seniors and the amount of time for which you will be inactive.`)
           message.channel.send(embed2)
      } else {
    return;
    }
})

client.on('message', async message => {
    if(message.content !== '!eventmanagersinfo') return
    if (message.guild.id === "498898363350253569" && message.member.roles.cache.has('498898597681561620')) {
        const embed = new Discord.MessageEmbed()
        .setTitle('Event Managers Guidelines')
        .setColor('#FFFFFF')
        .setFooter('Failing to follow these guidelines may result in a direct demotion')
        .setDescription(`- 1k messages weekly. \n- 1 event weekly [can host alone or with the help of others in staff or event managers which are present, also complete the event within the week]. \n- Update <#513975623048364032> channel accordingly.`)
        message.channel.send(embed)
      } else if (message.guild.id === "498898363350253569" && message.member.roles.cache.has('530279836451864586')) {
           const embed1 = new Discord.MessageEmbed()
      .setTitle('Event Managers Guidelines')
        .setColor('#FFFFFF')
        .setFooter('Failing to follow these guidelines may result in a direct demotion')
        .setDescription(`- 1k messages weekly. \n- 1 event weekly [can host alone or with the help of others in staff or event managers which are present, also complete the event within the week]. \n- Update <#513975623048364032> channel accordingly.`)
           message.channel.send(embed1)
      } else if(message.guild.id === "498898363350253569" && message.member.roles.cache.has('498899750662438937')) {
           const embed2 = new Discord.MessageEmbed()
      .setTitle('Event Managers Guidelines')
        .setColor('#FFFFFF')
        .setFooter('Failing to follow these guidelines may result in a direct demotion')
        .setDescription(`- 1k messages weekly. \n- 1 event weekly [can host alone or with the help of others in staff or event managers which are present, also complete the event within the week]. \n- Update <#513975623048364032> channel accordingly.`)
           message.channel.send(embed2)
      } else {
    return;
    }
})

client.on('message', async message => {
    if(message.content !== '!modinfo') return
     if (message.guild.id === "498898363350253569" && message.member.roles.cache.has('498898597681561620')) {
        const embed = new Discord.MessageEmbed()
        .setTitle('Mod Guidelines')
        .setColor('#FFFFFF')
        .setFooter('Failing to follow these guidelines may result in a direct demotion')
        .setDescription(`- 2k messages weekly. \n- Moderation without partiality. \n- Don't fight with fellow staff members over moderation issues outside staff channels. \n- Don't be toxic with people u don't know personally. \n- Change the nickname which ain't pingable or are in other languages or fonts. \n- Read staff channels on a regular basis. \n- If you have to go inactive due to some days, go by telling your seniors and the amount of time for which you will be inactive. \n \nNOTE :- You work is not only to moderate but also to make chat active, non-toxic, friendly and social.`)
        message.channel.send(embed)
      } else if (message.guild.id === "498898363350253569" && message.member.roles.cache.has('530279836451864586')) {
           const embed1 = new Discord.MessageEmbed()
        .setTitle('Mod Guidelines')
        .setColor('#FFFFFF')
        .setFooter('Failing to follow these guidelines may result in a direct demotion')
        .setDescription(`- 2k messages weekly. \n- Moderation without partiality. \n- Don't fight with fellow staff members over moderation issues outside staff channels. \n- Don't be toxic with people u don't know personally. \n- Change the nickname which ain't pingable or are in other languages or fonts. \n- Read staff channels on a regular basis. \n \nNOTE :- You work is not only to moderate but also to make chat active, non-toxic, friendly and social.`)
           message.channel.send(embed1)
      } else if(message.guild.id === "498898363350253569" && message.member.roles.cache.has('498899750662438937')) {
           const embed2 = new Discord.MessageEmbed()
        .setTitle('Mod Guidelines')
        .setColor('#FFFFFF')
        .setFooter('Failing to follow these guidelines may result in a direct demotion')
        .setDescription(`- 2k messages weekly. \n- Moderation without partiality. \n- Don't fight with fellow staff members over moderation issues outside staff channels. \n- Don't be toxic with people u don't know personally. \n- Change the nickname which ain't pingable or are in other languages or fonts. \n- Read staff channels on a regular basis. \n \nNOTE :- You work is not only to moderate but also to make chat active, non-toxic, friendly and social.`)
           message.channel.send(embed2)
      } else {
    return;
    }
})

client.on('message', async message => {
    if(message.content !== '!gamingmanagersinfo') return
         if (message.guild.id === "498898363350253569" && message.member.roles.cache.has('498898597681561620')) {
        const embed = new Discord.MessageEmbed()
        .setTitle('Gaming Managers Guidelines')
        .setColor('#FFFFFF')
        .setFooter('Failing to follow these guidelines may result in a direct demotion')
        .setDescription(`- 1k messages weekly. \n- You can stream the games or host game related events yourself or with the help of event managers. \n- Update <#590141817031491584> channel.`)
        message.channel.send(embed)
      } else if (message.guild.id === "498898363350253569" && message.member.roles.cache.has('530279836451864586')) {
           const embed1 = new Discord.MessageEmbed()
     .setTitle('Gaming Managers Guidelines')
        .setColor('#FFFFFF')
        .setFooter('Failing to follow these guidelines may result in a direct demotion')
        .setDescription(`- 1k messages weekly. \n- You can stream the games or host game related events yourself or with the help of event managers. \n- Update <#590141817031491584> channel.`)
           message.channel.send(embed1)
      } else if(message.guild.id === "498898363350253569" && message.member.roles.cache.has('498899750662438937')) {
           const embed2 = new Discord.MessageEmbed()
     .setTitle('Gaming Managers Guidelines')
        .setColor('#FFFFFF')
        .setFooter('Failing to follow these guidelines may result in a direct demotion')
        .setDescription(`- 1k messages weekly. \n- You can stream the games or host game related events yourself or with the help of event managers. \n- Update <#590141817031491584> channel.`)
           message.channel.send(embed2)
      } else {
    return;
    }
})

client.on('message', async message => {
  if(message.author.bot) return
    if(message.channel.id === "499533661771792406" || message.channel.id === "503614955472420878" || message.channel.id === "540467584126943243" || message.channel.id === "498911483531624467" || message.channel.id === "525607058121162762" || message.channel.id === "502052026486751233") return;
    let isNewUser = await db.get('level_' + message.author.id + message.guild.id)
  if (isNewUser === null) await db.set('nextXP_' + message.author.id + message.guild.id, 1000)
    let timeout = 60000; 
        let levelOut = await db.get(`levelOut_${message.author.id}${message.guild.id}`);
if (levelOut !== null && timeout - (Date.now() - levelOut) > 0) {
    let time = ms(timeout - (Date.now() - levelOut));
    const XP = await db.get('levelXP_' + message.author.id + message.guild.id)
  const level = await db.get('level_' + message.author.id + message.guild.id)
  const nextXP = await db.get('nextXP_' + message.author.id + message.guild.id)
  if(XP >= nextXP || (XP<0 && level>0)) {
     /* let level12 = level+1
      let xp12 = XP/1000
      for(let i = level12;xp12-i>=0;i++) {
          let toSubLevel = i*1000
         await db.sub('levelXP_' + message.author.id + message.guild.id, toSubLevel)
         await db.add('level_' + message.author.id + message.guild.id, 1)
         await db.add('nextXP_' + message.author.id + message.guild.id, 1000)
          xp12 = xp12-i
          }*/
  let currentXP = XP
let currentLevel = level
let requiredXP = nextXP

// Level up
while (currentXP >= requiredXP) {
    currentXP -= requiredXP
    currentLevel += 1
    requiredXP += 1000
}

// Level down
while (currentXP < 0 && currentLevel > 0) {
    requiredXP -= 1000
    currentLevel -= 1
    currentXP += requiredXP
}

// Save values
await db.set('level_' + message.author.id + message.guild.id, currentLevel)
await db.set('levelXP_' + message.author.id + message.guild.id, currentXP)
await db.set('nextXP_' + message.author.id + message.guild.id, requiredXP)
      let newLevel = await db.get('level_' + message.author.id + message.guild.id)  
    const channel = client.channels.cache.get('502936933471748126')
    const embed = new Discord.MessageEmbed()
    .setDescription(`Congratulations <@${message.author.id}>, you just levelled up to level ${newLevel}! Keep going!`)
    .setColor("#FFFFFF")
    .setTimestamp()
    channel.send(embed)
      const user = message.guild.members.cache.get(message.author.id)
    if(newLevel >= 1) user.roles.add('498915544876056577')
    if(newLevel >= 7) user.roles.add('836422040591925248')
    if(newLevel >= 15) user.roles.add('836421588684898342')
if(newLevel >= 25) user.roles.add('500011042357772288')
    if(newLevel >= 38) user.roles.add('500011531430395905')
    if(newLevel >= 51) user.roles.add('500011920540303362')
    if(newLevel >= 62) user.roles.add('500012144243507201')
    if(newLevel >= 75) user.roles.add('500012320089440286')
    if(newLevel >= 88) user.roles.add('500012762228064285')
    if(newLevel >= 100) user.roles.add('499120445501603840')
      
  } else {
      return;
      }
  } else {
      await db.set(`levelOut_${message.author.id}${message.guild.id}`, Date.now())
      let boosts = await db.get('xboost_' + message.guild.id) 
            //Normal
let number = Math.round(Math.random()*30)+20 // normal
let number1 = Math.round(Math.random()*45)+30 // 1.5x
let number2 = Math.round(Math.random()*60)+40 // 2x
let number3 = Math.round(Math.random()*75)+50 // 2.5x
let number4 = Math.round(Math.random()*90)+60 // 3x
let number5 = Math.round(Math.random()*105)+70 // 3.5x
      if(boosts==1) {
                //3x xp boost
 number = Math.round(Math.random()*120)+80 // normal
number1 = Math.round(Math.random()*135)+90 // 1.5x
number2 = Math.round(Math.random()*150)+100 // 2x
number3 = Math.round(Math.random()*165)+110 // 2.5x
number4 = Math.round(Math.random()*180)+120 // 3x
number5 = Math.round(Math.random()*195)+130 // 3.5x
      } 


      if(!message.member.roles.cache.has('698097735739637760') && !message.member.roles.cache.has('698098130620514374') && !message.member.roles.cache.has('698098009233293392') && !message.member.roles.cache.has('813998590644191232') && !message.member.roles.cache.has('648199869860806671') && !message.member.roles.cache.has('586457992002666536') && !message.member.roles.cache.has('705353616944267284'))  await db.add('levelXP_' + message.author.id + message.guild.id, number); // no role - 1x
      if(message.member.roles.cache.has('698097735739637760') && !message.member.roles.cache.has('698098130620514374') && !message.member.roles.cache.has('698098009233293392') && !message.member.roles.cache.has('813998590644191232') && !message.member.roles.cache.has('648199869860806671') && !message.member.roles.cache.has('586457992002666536') && !message.member.roles.cache.has('705353616944267284'))  await db.add('levelXP_' + message.author.id + message.guild.id, number1); // tryhard - 1.5x
      if(message.member.roles.cache.has('698098130620514374') && !message.member.roles.cache.has('698098009233293392') && !message.member.roles.cache.has('813998590644191232') && !message.member.roles.cache.has('648199869860806671') && !message.member.roles.cache.has('586457992002666536') && !message.member.roles.cache.has('705353616944267284'))  await db.add('levelXP_' + message.author.id + message.guild.id, number2); // god of destruction - 2x
      if(message.member.roles.cache.has('698098009233293392') && !message.member.roles.cache.has('813998590644191232') && !message.member.roles.cache.has('648199869860806671') && !message.member.roles.cache.has('586457992002666536') && !message.member.roles.cache.has('705353616944267284'))  await db.add('levelXP_' + message.author.id + message.guild.id, number2); // grand priest - 2x
      if(message.member.roles.cache.has('813998590644191232') && !message.member.roles.cache.has('648199869860806671') && !message.member.roles.cache.has('586457992002666536') && !message.member.roles.cache.has('705353616944267284'))  await db.add('levelXP_' + message.author.id + message.guild.id, number3); // event winner - 2.5x
      if(message.member.roles.cache.has('648199869860806671') && !message.member.roles.cache.has('586457992002666536') && !message.member.roles.cache.has('705353616944267284'))  await db.add('levelXP_' + message.author.id + message.guild.id, number3); // MOTM 2.5x
      if(message.member.roles.cache.has('586457992002666536') && !message.member.roles.cache.has('705353616944267284'))  await db.add('levelXP_' + message.author.id + message.guild.id, number4); // nitro booster - 3x
      if(message.member.roles.cache.has('705353616944267284')) await db.add('levelXP_' + message.author.id + message.guild.id, number5); // Donators 3.5x
      }
})

client.on('message', async message => {
  if(message.author.bot) return
  if(message.content.startsWith('!level')) {
    let user = message.mentions.users.first() || message.author
    let level = await db.get('level_' + user.id + message.guild.id)
    if (level === null) level = 0;
    let XP = await db.get('levelXP_' + user.id + message.guild.id)
    if (XP === null) XP = 0;
    let nextXP = await db.get('nextXP_' + user.id + message.guild.id)
    if (nextXP === null) nextXP = 1000;
    const canvas = createCanvas(1000, 300),
            ctx = canvas.getContext('2d'),
            bar_width = 600,
            bg = await loadImage("https://t3.ftcdn.net/jpg/06/17/02/90/360_F_617029052_963IucmI1GE8fTgR5U8HDGyEDBbMwQZt.jpg"),
            av = await loadImage(user.displayAvatarURL({ format: 'png', dynamic: false }));

        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

        // Middle circle for Avatar Background
        ctx.beginPath();
        ctx.arc(120, 120, 110, 0, 2 * Math.PI);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.closePath();

        // XP Bar
        ctx.lineJoin = "round";
        ctx.lineWidth = 69;

        // Shadow of xp bar
        ctx.strokeRect(298, 199, bar_width, 2);

        // Empty Bar
        ctx.strokeStyle = "black";
        ctx.strokeRect(300, 200, bar_width, 0);

        // Filled Bar
        ctx.strokeStyle = "#1762e8"
        ctx.strokeRect(300, 200, bar_width * XP / nextXP, 0);

        // Adding Username
        ctx.font = "bold 40px Sans";
        ctx.fillStyle = "#ffffff"; // Username color
        ctx.textAlign = "center";
        ctx.fillText(user.username, 120, 275, 200);

        // Adding stats
        ctx.font = "bold 40px Sans";
        ctx.fillStyle = "#ffffff"; 
        ctx.textAlign = "center";
        ctx.fillText(level, 930, 40, 80);

        // Adding titles
        ctx.fillStyle = "white";
        ctx.font = "bold 25px Sans";
        ctx.fillText("Level", 850, 40, 200);

        // Adding bar title
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 22px Serif";
        ctx.fillText(`${XP}/${nextXP} XP`, 850, 150);
    
    //Adding Percentage
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 22px Serif";
        ctx.fillText(`${((XP * 100) / nextXP).toFixed(0)}/100 %`, 350, 150);

        // Remove the corners
        ctx.beginPath();
        ctx.arc(120, 120, 110, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.clip();

        // Add the avatar
        ctx.drawImage(av, 10, 10, 220, 220);
    const at = new Discord.MessageAttachment(canvas.toBuffer(), "rank.png")
    message.channel.send(at)

    
    
  } else { return }
})

client.on('message', async message => {
    if(message.author.bot) return
    if(message.content.startsWith("!addXP")) {
    const prefix = '!';
    if(!message.member.hasPermission("ADMINISTRATOR")) return;
    const user = message.mentions.users.first()
    if(!user) return message.channel.send("Invalid User")
    const args = message.content.slice(prefix.length).trim().split(' ');
    if(!args[2]) return message.channel.send('Invalid XP amount.')
    if(isNaN(args[2])) return message.channel.send("Invalid XP amount.")
    if(args[2] <= 0) return message.channel.send("Invalid XP amount.")
    await db.add("levelXP_" + user.id + message.guild.id, args[2])
    message.channel.send(`Gave ${args[2]}XP to ${user.username}.`)
       }
})

client.on('message', async message => {
    if(message.author.bot) return
    if(message.content.startsWith("!removeXP")) {
    const prefix = '!';
    if(!message.member.hasPermission("ADMINISTRATOR")) return;
    const user = message.mentions.users.first()
    if(!user) return message.channel.send("Invalid User")
    const args = message.content.slice(prefix.length).trim().split(' ');
    if(!args[2]) return message.channel.send('Invalid XP amount.')
    if(isNaN(args[2])) return message.channel.send("Invalid XP amount.")
    if(args[2] <= 0) return message.channel.send("Invalid XP amount.")
    await db.sub("levelXP_" + user.id + message.guild.id, args[2])
    message.channel.send(`Removed ${args[2]}XP from ${user.username}.`)
       }
})

client.on('message', async message => {
    if(message.author.bot) return
    if(message.content.startsWith("!reset")) {
    const prefix = '!';
    if(!message.member.hasPermission("ADMINISTRATOR")) return;
    const user = message.mentions.users.first()
    if(!user) return message.channel.send("Invalid User")
    await db.delete("levelXP_" + user.id + message.guild.id)
    await db.delete("level_" + user.id + message.guild.id)
    await db.delete("nextXP_" + user.id + message.guild.id)
    message.channel.send(`Resetted ${user.username}.`)
       }
})

client.on('message', async message => {
    if(message.author.bot) return
    if(message.content.startsWith("!enable-boost")) {
    if(!message.member.hasPermission("ADMINISTRATOR")) return;
    await db.set('xboost_' + message.guild.id, 1);
     message.channel.send("Successfully enabled 3x boost.")
     }
})

client.on('message', async message => {
    if(message.author.bot) return
    if(message.content.startsWith("!disable-boost")) {
    if(!message.member.hasPermission("ADMINISTRATOR")) return;
    await db.set('xboost_' + message.guild.id, 0);
     message.channel.send("Successfully disabled 3x boost.")
     }
})

client.on('guildMemberRemove', async member => {
  await db.delete('level_' + member.id + member.guild.id)
  await db.delete('levelXP_' + member.id + member.guild.id)
     await db.delete('nextXP_' + member.id + member.guild.id)
})
 
client.login('Your Bot TOKEN here')
