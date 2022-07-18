import { ContextMenuCommandBuilder } from 'discord.js';
import { Types } from '../../utils';

export default {
    process: (interaction: Types.IContextMenu) => {
        interaction.reply({
            content: `${interaction.options.data[0].message?.content}`,
            ephemeral: true,
        });
    },
    command: new ContextMenuCommandBuilder().setName('context_menu').setType(3),
};
