const { Client, Intents, MessageEmbed } = require('discord.js');
const fs = require("fs")
const DisTube = require("distube");
const Discord = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, 'GUILD_VOICE_STATES'] });
const config = require("./config.json")

client.config = require("./config.json")
client.distube = new DisTube.default(client, { searchSongs: 2, emitNewSongOnly: true, leaveOnFinish: false })
client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()



client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity({ type: "PLAYING", name: `your shitty music :)` })
});

fs.readdir("./commands/", (err, files) => {
  if (err) return console.log("Could not find any commands!")
  const jsFiles = files.filter(f => f.split(".").pop() === "js")
  if (jsFiles.length <= 0) return console.log("Could not find any commands!")
  jsFiles.forEach(file => {
      const cmd = require(`./commands/${file}`)
      console.log(`Loaded ${file}`)
      client.commands.set(cmd.name, cmd)
      if (cmd.aliases) cmd.aliases.forEach(alias => client.aliases.set(alias, cmd.name))
  })
})



client.on('messageCreate', async message => {
  const prefix = config.prefix
  if (message.content.includes('duckyy')) {
      const chance = Math.floor(Math.random() * 11);
      if (chance === 5) {
        const messages = [":eyes:", "Talkin about me?", "I heard my name", "Yes?", "At your service!"]
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        message.channel.send(randomMessage)
      }
  }
  if (!message.content.startsWith(prefix)) return
  const args = message.content.slice(prefix.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase()
  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
  if (!cmd) return
  if (cmd.inVoiceChannel && !message.member.voice.channel) return message.channel.send(`You must be in a voice channel!`)
  try {
      cmd.run(client, message, args)
  } catch (e) {
      console.error(e)
      message.reply(`Error: ${e}`)
  }
})
  

    const status = queue => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``
    client.distube
      .on("playSong", (queue, song) => {
        if (song.playlist) {
          let currentSong = `Playing \`${song.name}\` - \`${song.formattedDuration}\``
          let msg = `Playlist: ${song.playlist.name}\n${currentSong}`
          queue.textChannel.send(msg)
        } else {
          let msg = `Playing \`${song.name}\` - \`${song.formattedDuration}\``
          queue.textChannel.send(msg)
        }
    })
      .on("addSong", (queue, song) => {
        if (song.playlist) {
          let currentSong = `Added \`${song.name}\` - \`${song.formattedDuration}\``
          let msg = `Playlist: ${song.playlist.name}\n${currentSong}`
          queue.textChannel.send(msg)
        } else {
          let msg = `Added \`${song.name}\` - \`${song.formattedDuration}\` to the queue`
          queue.textChannel.send(msg)
        }
      
    })
      
    .on("searchResult", (message, result) => {
        let i = 0
        message.channel.send(`**Choose an option from below**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`)
    })
    .on("searchCancel", message => message.channel.send(`Searching canceled`))
    // .on("error", (message, err) => message.channel.send(`An error encountered: ${err}`))
    console.log(status);
    client.login(config.token);
  


