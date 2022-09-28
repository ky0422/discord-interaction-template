import { bold } from 'discord.js'
import type * as Types from '../utils/types'

export default {
    process: (interaction: Types.IMessageComponent) => {
        interaction.reply({
            content: bold(' '),
            ephemeral: true,
        })
    },
    command: null,
}
