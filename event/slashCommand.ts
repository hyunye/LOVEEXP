const { Events, MessageFlags } = require('discord.js')

module.exports = {
    event: Events.InteractionCreate,
    once: false,
    async script(interaction) {
        if (!interaction.isChatInputCommand) return
        const command = interaction.client.commands.get(interaction.commandName)
        if (!command) return
        try {
            await command.script(interaction)
        }
        catch (error) {
            console.log(`에러 발생!! [${error}]`)
            if (interaction.replied || interaction.deferred) await interaction.followUp({ content: `에러 발생!!\n\`\`\`${error}\`\`\``, flags: MessageFlags.Ephemeral})
            else await interaction.reply({ content: `에러 발생!!\n\`\`\`${error}\`\`\``, flags: MessageFlags.Ephemeral })
        }
    }
}