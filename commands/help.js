const { Client, Intents, MessageEmbed } = require('discord.js'); //references to functions from discord

module.exports = {
    name: "help",
    inVoiceChannel: false,
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
        .setTitle('List of available commands')
        .setAuthor(`${client.user.tag}`)
        .setColor('#ebba34')
        .addFields({name: '-help', value: 'Displays a list of commands'})
        .addFields({name: '-play <song url>', value: 'Play a song'})
        .addFields({name: '-skip', value: 'Skip the current song' })
        .addFields({name: '-queue', value: 'See the current queue'})
    message.channel.send({ embeds: [embed] });
    }
}