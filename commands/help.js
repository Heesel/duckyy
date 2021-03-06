const { Client, Intents, MessageEmbed } = require('discord.js');

module.exports = {
    name: "help",
    inVoiceChannel: false,
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
        .setTitle('List of available commands')
        .setAuthor(`${client.user.tag}`)
        .setColor('#ebba34')
        .addFields({name: '-help', value: 'Displays a list of commands'})
        .addFields({name: '-play <song url or name>', value: 'Play a song'})
        .addFields({name: '-playlist <url of playlist>', value: 'Play a playlist'})
        .addFields({name: '-skip', value: 'Skip the current song' })
        .addFields({name: '-queue', value: 'See the current queue'})
        .addFields({name: '-stop', value: 'Disconnect and clear queue'})
    message.channel.send({ embeds: [embed] });
    }
}