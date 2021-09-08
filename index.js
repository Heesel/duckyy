const { Client, Intents, MessageEmbed } = require('discord.js'); //references to functions from discord
const { generateDependencyReport } = require('@discordjs/voice');
const DisTube = require("distube");
const Discord = require("discord.js");
//const client = new Discord.Client()
//const client = new Client({ ws: { intents: ['GUILD_VOICE_STATES'] } });
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, 'GUILD_VOICE_STATES'] }); //defining intents (permissions)
//const distube = new DisTube.default(client, {searchSongs: false, emitNewSongOnly: true});
const config = require("./config.json")
client.config = require("./config.json")
client.distube = new DisTube.default(client, { searchSongs: 1, emitNewSongOnly: true, leaveOnFinish: true })

const { token } = require('./auth.json') //to log in

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});


const prefix = "-d"
//const queue = new Map();
//const vc = message.member.voice.channel;

//dunno if we need this
client.on("ready", () => {
  console.log('$(client.user.tag) has logged in.');
});

client.on('message', async message => { //called when user sends a message
    if(message.author.bot) return; //so that bots cant give commands to bots
    if(!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift();

    //queue status template
    const status = (queue) => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``
    client.distube
    .on("playSong", (message, queue, song) => message.channel.send(
        `${client.emotes.play} | Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user.tag}\n${status(queue)}`
    ))
    .on("addSong", (message, queue, song) => message.channel.send(
        `${client.emotes.success} | Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user.tag}`
    ))
    .on("playList", (message, queue, playlist, song) => message.channel.send(
        `${client.emotes.play} | Play \`${playlist.title}\` playlist (${playlist.total_items} songs).\nRequested by: ${song.user.tag}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`
    ))
    .on("addList", (message, queue, playlist) => message.channel.send(
        `${client.emotes.success} | Added \`${playlist.title}\` playlist (${playlist.total_items} songs) to queue\n${status(queue)}`
    ))
    // DisTubeOptions.searchSongs = true
    .on("searchResult", (message, result) => {
        let i = 0
        message.channel.send(`**Choose an option from below**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`)
    })
    // DisTubeOptions.searchSongs = true
    .on("searchCancel", message => message.channel.send(`${client.emotes.error} | Searching canceled`))
    //.on("error", (message, err) => message.channel.send(`${client.emotes.error} | An error encountered: ${err}`));
    //.on("error", send(`${client.emotes.error} | An error encountered: ${err}`));

    if (command == "help") {
        console.log(generateDependencyReport());
        const embed = new MessageEmbed()
            .setTitle('List of available commands')
            .setAuthor(`${client.user.tag}`)
            .setColor('#ebba34')
            .addFields({name: '-d help', value: 'Displays a list of commands'})
            .addFields({name: '-d connect', value: 'Connect me to vc'})
            .addFields({name: '-d play <name>', value: 'Play a song'})
            .addFields({name: '-d play <song url>', value: 'Play a song'})
            .addFields({name: '-d play next', value: 'Play the next song in queue'})
        message.channel.send({ embeds: [embed] });
    }

    if(command == "play"){
      if(!message.member.voice.channel)
        return message.channel.send('You are not in a voice channel!');
      if(!args[0])
        return message.channel.send('Tell me which song I should play!');

      client.distube.play(message, args.join(" "));
      return message.channel.send("playing: "+args.join(" "));
    }

    if(command == "stop"){
      const bot = message.guild.members.cache.get(client.user.id);
      if(!message.member.voice.channel)
        return message.channel.send('You are not in a voice channel!');
      if(bot.voice.channel !== message.member.voice.channel)
        return message.channel.send('You are not in the same voice channel as duckyy!');

      client.distube.stop(message);
      message.channel.send("⏹️");
    }
    //https://gabrieltanner.org/blog/dicord-music-bot
});

client.login(token);

function send (text){
  message.channel.send(text);
}
