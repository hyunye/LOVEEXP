const { Events } = require('discord.js')

module.exports = {
    event: Events.ClientReady,
    once: true,
    async script(client) {
        console.log(`${client.user.username} (${client.user.tag}) 로 로그인 성공!`)
    }
}