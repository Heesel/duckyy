const paginationEmbed = require('discordjs-button-pagination');
const { MessageEmbed, MessageButton, Util } = require('discord.js');

module.exports = {
    name: "queue",
    aliases: ["q"],
    inVoiceChannel: true,
    run: async (client, message, args) => {
        let queue = client.player.getQueue(message.guild.id);
        if (!queue || !queue.songs || queue.songs.length === 0) return message.channel.send('There is nothing playing!')
        if (queue.songs.length === 1) return message.channel.send(`Currently playing: \`${queue.songs[0].name}\` - \`${queue.songs[0].duration}\``)
        const queueSongs = queue.songs.map((song, index) => `${index === 0 ? "Playing:" : `${index}.`} ${song.name} - \`${song.duration}\``);
        // console.log(queueSongs)

        const pages = [];

        for(let i = 0; i < queueSongs.length; i += 10) {

            let pageContent = '';
            for(let n = i; n < ( i+ 10) && n < queueSongs.length; n++) {

                if(pageContent !== '') pageContent += '\n';
                pageContent += queueSongs[n]
            }

            pages.push(pageContent);
            // console.log(pageContent)
        }

        const previous = new MessageButton()
            .setCustomId('previousbtn')
            .setLabel('Previous')
            .setStyle('DANGER');

        const next = new MessageButton()
            .setCustomId('nextbtn')
            .setLabel('Next')
            .setStyle('SUCCESS');

        const buttons = [previous, next];
        // console.log(buttons)
        // console.log('pages: ' + pages.length);

        const embeds = pages.map((page, index) => {
            const pageEmbed = new MessageEmbed();
            pageEmbed
            .setTitle(`Page ${index + 1}`)
            .setDescription(page);
            
            
            return pageEmbed;
        });
        console.log(message)
        paginationEmbed(message, embeds, buttons, 100000)
    }   
}