
module.exports = {
    name: "playlist",
    aliases: ["pl"],
    inVoiceChannel: true,
    run: async (client, message, args) => {
        try {
            const string = args.join(" ")
            if (!string) return message.channel.send(`Please enter a playlist url to start a playlist.`)
            let queue = client.player.createQueue(message.guild.id, {
                data: {
                    channel: message.channel
                }
            });
            let guildQueue = client.player.getQueue(message.guild.id);
            await queue.join(message.member.voice.channel);
            let song = await queue.playlist(args.join(string)).catch(_ => {
                if(!guildQueue)
                    queue.stop();
            });
        } catch(e) {
            console.log(e)
        }
    }
}