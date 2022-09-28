import { ContextMenuCommandBuilder } from 'discord.js'
import type * as Types from '../../utils/types'

export default {
    process: (interaction: Types.IContextMenu) => {
        interaction.reply({
            content: `${interaction.options.data[0].message?.content}`,
            ephemeral: true,
        })
    },
    command: new ContextMenuCommandBuilder()
        .setName('context_menu')
        .setType(3),
}
