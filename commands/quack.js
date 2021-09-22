module.exports = {
    name: "quack",
    inVoiceChannel: true,
    run: async (client, message, args) => {
        const url = "https://www.youtube.com/watch?v=aqd5_kPfwvA"
        // const url = 'quack'
        // return message.channel.send(url);
        try {
            console.log(url)

            client.distube.play(message, url)

        } catch (e) {
            message.channel.send(`Error: \`${e}\``)
        }
    }
}