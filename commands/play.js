module.exports = {
    name: "play",
    aliases: ["p"],
    inVoiceChannel: true,
    run: async (client, message, args) => {
        try {
            const string = args.join(" ")
            if (!string) return message.channel.send(`Please enter a song url or name to play a song.`)
            let queue = client.player.createQueue(message.guild.id, {
                data: {
                    channel: message.channel
                }
            });
            let guildQueue = client.player.getQueue(message.guild.id);
            await queue.join(message.member.voice.channel);
            let song = await queue.play(string).catch(_ => {
                if(!guildQueue)
                    queue.stop();
            });
        } catch(e) {
            console.log(e)
        }
    }
}