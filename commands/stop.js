module.exports = {
    name: "stop",
    aliases: ["disconnect", "leave", "dc"],
    inVoiceChannel: true,
    run: async (client, message, args) => {
        const queue = client.player.getQueue(message.guild.id);
        if (!queue) return message.channel.send(`There is nothing in the queue right now!`)
        queue.stop();
        message.channel.send(`Stopped!`)
    }
}