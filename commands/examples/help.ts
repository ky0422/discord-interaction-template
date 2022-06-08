import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageComponentInteraction } from 'discord.js';

export default {
    process: (interaction: MessageComponentInteraction) => {
        interaction.reply({
            content: `help`,
            ephemeral: true,
        });
    },
    command: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Help command'),
};
