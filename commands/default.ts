import { MessageComponentInteraction } from 'discord.js';

export default {
    process: (interaction: MessageComponentInteraction) => {
        interaction.reply({
            content: `Command not found`,
            ephemeral: true,
        });
    },
    command: null,
};
