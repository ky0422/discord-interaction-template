import { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, bold } from 'discord.js'
import { v4 as uuid } from 'uuid'
import type * as Types from '../../utils/types'

export default {
    process: (interaction: Types.IMessageComponent) => {
        const buttonComponentCustomId = uuid()

        interaction.reply({
            content: bold(' '),
            components: [
                new ActionRowBuilder<ButtonBuilder>()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(buttonComponentCustomId)
                            .setLabel('Click here!')
                            .setStyle(ButtonStyle.Primary)
                    ),
            ],
        })

        if (interaction.channel === null) return

        const collector = interaction.channel.createMessageComponentCollector({
            filter: (m) => m.user.id === interaction.user.id && m.customId === buttonComponentCustomId,
        })

        collector.on('collect', (interaction) => {
            interaction.reply({
                content: 'Button clicked.',
                ephemeral: true,
            })
        })
    },
    command: new SlashCommandBuilder()
        .setName('button')
        .setDescription('Button message component'),
}
