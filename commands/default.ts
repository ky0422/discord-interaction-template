import { Types } from '../utils'

export default {
    process: (interaction: Types.IMessageComponent) =>
        interaction.reply({
            content: '** **',
            ephemeral: true,
        }),
    command: null,
}
