const { Client, Intents, MessageEmbed } = require('discord.js');
const { generateDependencyReport } = require('@discordjs/voice');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const auth = require('./auth.json')

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});


const prefix = "-d"
const queue = new Map();
const vc = message.member.voice.channel;


client.on('messageCreate', message => {
    if (message.content === prefix + ' help') {
        console.log(generateDependencyReport());
        const embed = new MessageEmbed()
            .setTitle('List of available commands')
            .setAuthor(`${client.user.tag}`)
            .setColor('#ebba34')
            .addFields({name: '-d help', value: 'Displays a list of commands'})
            .addFields({name: '-d connect', value: 'Connect me to vc'})
            .addFields({name: '-d play <song url>', value: 'Play a song'})
            .addFields({name: '-d play next', value: 'Play the next song in queue'})
        message.channel.send({ embeds: [embed] });
    }
    //https://gabrieltanner.org/blog/dicord-music-bot
});

client.login(auth.token)