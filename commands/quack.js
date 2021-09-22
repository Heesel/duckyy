module.exports = {
    name: "quack",
    inVoiceChannel: true,
    run: async (client, message, args) => {
        const url = "https://www.youtube.com/watch?v=Fw3RB7xnb80"
        // const url = 'quack'
        // return message.channel.send(url);

        try {
            console.log(url)
            let queue = client.distube.getQueue(message)
            client.distube.getQueue(message)
            client.distube.play(message, url)
            client.distube.skip(message)
            setTimeout(function(){
              console.log("z")
            }, 3000);
            client.distube.play(message, queue.songs[0].name)
            //client.distube.previous(message)
            //client.distube.resume(queue)

        } catch (e) {
            message.channel.send(`Error: \`${e}\``)
        }
    }
}
