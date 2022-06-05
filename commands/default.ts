import { MessageComponentInteraction } from 'discord.js';

export default {
    process: (interaction: MessageComponentInteraction) => {
        interaction.reply({
            content: '** **',
            ephemeral: true,
        });
    },
    command: null,
};
