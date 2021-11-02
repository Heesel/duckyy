const { Client, Intents, MessageEmbed } = require('discord.js');
const fs = require("fs")
const Discord = require("discord.js");
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES]});
const config = require("./config.json")

const { Player } = require("discord-music-player");
const player = new Player(client, {
    leaveOnEmpty: true,
    leaveOnEnd: false,
    quality: 'high',
    leaveOnStop: false,
    // deafenOnJoin: true
});

client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
client.player = player;

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


client.player
    // Emitted when channel was empty.
    .on('channelEmpty',  (queue) =>
        queue.data.channel.send(`Since everyone left, i shall leave too :wave: .`))
    // Emitted when a song was added to the queue.
    .on('songAdd',  (queue, song) =>
        queue.data.channel.send(`\`${song}\` has been added to the queue.`))
    // Emitted when a playlist was added to the queue.
    .on('playlistAdd',  (queue, playlist) =>
        queue.data.channel.send(`Playlist \`${playlist}\` with \`${playlist.songs.length}\` was added to the queue.`))
    // Emitted when there was no more music to play.
    .on('queueEnd',  (queue) =>
        console.log(`The queue has ended.`))
    // Emitted when a song changed.
    .on('songChanged', (queue, newSong, oldSong) =>
        queue.data.channel.send(`\`${newSong}\` is now playing.`))
    // Emitted when a first song in the queue started playing.
    .on('songFirst',  (queue, song) =>
        queue.data.channel.send(`Playing \`${song}\`.`))
    // Emitted when someone disconnected the bot from the channel.
    .on('clientDisconnect', (queue) =>
        console.log(`I was kicked from the Voice Channel, queue ended.`))
    // Emitted when deafenOnJoin is true and the bot was undeafened
    .on('clientUndeafen', (queue) =>
        console.log(`I got undefeanded.`))
    // Emitted when there was an error in runtime
    .on('error', (error, queue) => {
        console.log(`Error: ${error} in ${queue.guild.name}`);
    });

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity({ type: "PLAYING", name: `your shitty music :)` })
  });


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
    } catch(e) {
        console.error(e)
    }
})



client.login(config.token);
