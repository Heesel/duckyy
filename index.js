const { Client, Intents, MessageEmbed } = require('discord.js'); //references to functions from discord
const fs = require("fs")
const DisTube = require("distube");
const Discord = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, 'GUILD_VOICE_STATES'] }); //defining intents (permissions)
const config = require("./config.json")

client.config = require("./config.json")
client.distube = new DisTube.default(client, { searchSongs: 2, emitNewSongOnly: true, leaveOnFinish: false })
client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()



client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity({ type: "Custom", name: `Just vibing` })
  // const server = client.voice.connections.size
  // client.user.setActivity({ type: "PLAYING", name: `music on ${server} servers` })
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



client.on('messageCreate', async message => { //called when user sends a message
  const prefix = config.prefix
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
      let msg = `Playing \`${song.name}\` - \`${song.formattedDuration}\``
      if (song.playlist) msg = `Playlist: ${song.playlist.name}\n${msg}`
      queue.textChannel.send(msg)
    })
    
    .on("addSong", (queue, song) => {
      let msg = `Playing \`${song.name}\` - \`${song.formattedDuration}\``
      if (song.playlist) msg = `Playlist: ${song.playlist.name}\n${msg}`
      queue.textChannel.send(msg)
    })
      
    // .on("addList", (queue, song) => {
    //   let msg = `Playing \`${song.name}\` - \`${song.formattedDuration}\``
    //   if (song.playlist) msg = `Playlist: ${song.playlist.name}\n${msg}`
    //   queue.textChannel.send(msg)
    // })
    //   .on("addSong", (message, queue, song) => message.channel.send(
    //     `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
    // ))
    // .on("playList", (message, queue, playlist, song) => message.channel.send(
    //     `Play \`${playlist.title}\` playlist (${playlist.total_items} songs).\nRequested by: ${song.user}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`
    // ))
    // .on("addList", (message, queue, playlist) => message.channel.send(
    //     `Added \`${playlist.title}\` playlist (${playlist.total_items} songs) to queue\n${status(queue)}`
    // ))
    // DisTubeOptions.searchSongs = true
    .on("searchResult", (message, result) => {
        let i = 0
        message.channel.send(`**Choose an option from below**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`)
    })
    // DisTubeOptions.searchSongs = true
    .on("searchCancel", message => message.channel.send(`Searching canceled`))
    .on("error", (message, err) => message.channel.send(`An error encountered: ${err}`))
    console.log(status);
    client.login(config.token);


  
  
  
  
  
  
  
  //   if(command == "play"){
  //     if(!message.member.voice.channel)
  //       return message.channel.send('You are not in a voice channel!');
  //     if(!args[0])
  //       return message.channel.send('Tell me which song I should play!');

  //     client.distube.play(message, args.join(" "));
  //     return message.channel.send("playing: "+args.join(" "));
  // }
  
  //   if(command == "stop"){
  //     const bot = message.guild.members.cache.get(client.user.id);
  //     if(!message.member.voice.channel)
  //       return message.channel.send('You are not in a voice channel!');
  //     if(bot.voice.channel !== message.member.voice.channel)
  //       return message.channel.send('You are not in the same voice channel as duckyy!');

  //     client.distube.stop(message);
  //     message.channel.send("⏹️");
  // }
  
  // if (command == "help") {
  //   const embed = new MessageEmbed()
  //       .setTitle('List of available commands')
  //       .setAuthor(`${client.user.tag}`)
  //       .setColor('#ebba34')
  //       .addFields({name: '-d help', value: 'Displays a list of commands'})
  //       .addFields({name: '-d connect', value: 'Connect me to vc'})
  //       .addFields({name: '-d play <name>', value: 'Play a song'})
  //       .addFields({name: '-d play <song url>', value: 'Play a song'})
  //       .addFields({name: '-d play next', value: 'Play the next song in queue'})
  //   message.channel.send({ embeds: [embed] });
  // }


