const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    command: new SlashCommandBuilder()
        .setName('테스트용')
        .setDescription('테스트용 입니다'),
    async script(interaction) {
        interaction.reply('테스트용 이에요!!')
    }
}