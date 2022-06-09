import { ContextMenuCommandBuilder } from '@discordjs/builders';
import { ContextMenuInteraction } from 'discord.js';

export default {
    process: (interaction: ContextMenuInteraction) => {
        interaction.reply({
            content: `${interaction.options.data[0].message?.content}`,
            ephemeral: true,
        });
    },
    command: new ContextMenuCommandBuilder().setName('context_menu').setType(3),
};
