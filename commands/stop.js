const voice = require('@discordjs/voice');

module.exports = {
    name: "stop",
    aliases: ["disconnect", "leave", "dc"],
    inVoiceChannel: true,
    run: async (client, message, args) => {
        const queue = client.player.getQueue(message.guild.id);
        if (!queue) {
            message.channel.send(`There is nothing in the queue right now!`)
            voice.getVoiceConnection(message.guild.id).disconnect();
            return;
        } 
        queue.stop();
        message.channel.send('The queue has been ended. Cya :wave:')
        voice.getVoiceConnection(message.guild.id).disconnect();
    }
}