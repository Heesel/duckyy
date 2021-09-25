const paginationEmbed = require('discordjs-button-pagination');
const { MessageEmbed, MessageButton, Util } = require('discord.js');

module.exports = {
    name: "queue",
    aliases: ["q"],
    run: async (client, message, args) => {
        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(`There is nothing playing!`)
        const q = queue.songs.map((song, i) => `${i === 0 ? "Playing:" : `${i}.`} ${song.name} - \`${song.formattedDuration}\``).join("\n")
        
        // const chunks = Discord.Util.splitMessage(queue);
        // const embed = new Discord.MessageEmbed().setTitle(`queue`)
        var result = [];
        var a = "";
        var i=0;
        var counter = 0;
        while(i<q.length){
            if(counter<=10){
                while(q[i] != '\n' && i<q.length ){
                    a += q[i];
                    i++;
                }
                a += '\n';
                i++;
                counter++;
            } else {
                counter = 0;
                result.push(a);
                a = "";
            }
        }

        for(let i=0; i<result.length; i++){
            console.log(result[i]);
            
            message.channel.send(`**Server Queue**\n${result[i]}`)
        }
        // console.log(res);
        
        // console.log(q);
    }
}