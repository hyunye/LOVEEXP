"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const { Events, MessageFlags } = require('discord.js');
module.exports = {
    event: Events.InteractionCreate,
    once: false,
    script(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!interaction.isChatInputCommand)
                return;
            const command = interaction.client.commands.get(interaction.commandName);
            if (!command)
                return;
            try {
                yield command.script(interaction);
            }
            catch (error) {
                console.log(`에러 발생!! [${error}]`);
                if (interaction.replied || interaction.deferred)
                    yield interaction.followUp({ content: `에러 발생!!\n\`\`\`${error}\`\`\``, flags: MessageFlags.Ephemeral });
                else
                    yield interaction.reply({ content: `에러 발생!!\n\`\`\`${error}\`\`\``, flags: MessageFlags.Ephemeral });
            }
        });
    }
};
