module.exports = {
    name: "skip",
    inVoiceChannel: true,
    run: async (client, message, args) => {
        let queue = client.player.getQueue(message.guild.id);
        if (!queue) return message.channel.send(`There is nothing in the queue right now!`)
        if(queue.songs.length === 1) return message.channel.send("There is no song to skip")
        try {
            queue.skip();
            message.channel.send(`Skipped! Now playing:\n${queue.songs[0].name}`)
        } catch(e) {
            message.channel.send(`${e}`)
        }
        
    }    
}