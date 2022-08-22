import { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } from 'discord.js'
import { v4 as uuid } from 'uuid'
import { Types } from '../../utils'

export default {
    process: (interaction: Types.IMessageComponent) => {
        const buttonComponentCustomId = uuid()

        interaction.reply({
            content: `** **`,
            components: [
                new ActionRowBuilder<ButtonBuilder>().addComponents(
                    new ButtonBuilder().setCustomId(buttonComponentCustomId).setLabel('Click here!').setStyle(ButtonStyle.Primary)
                ),
            ],
        })

        const collector = interaction.channel?.createMessageComponentCollector({
            filter: (m) => m.user.id === interaction.user.id && m.customId === buttonComponentCustomId,
            // max: 1,
        })

        collector?.on('collect', (i) => {
            i.reply({
                content: 'Button clicked.',
                ephemeral: true,
            })
        })
    },
    command: new SlashCommandBuilder().setName('button').setDescription('Button message component'),
}
