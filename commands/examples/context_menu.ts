import { ContextMenuCommandBuilder } from '@discordjs/builders';
import { IContextMenu } from '../../utils/types';

export default {
    process: (interaction: IContextMenu) => {
        interaction.reply({
            content: `${interaction.options.data[0].message?.content}`,
            ephemeral: true,
        });
    },
    command: new ContextMenuCommandBuilder().setName('context_menu').setType(3),
};
