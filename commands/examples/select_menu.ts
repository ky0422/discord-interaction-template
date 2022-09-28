import { ActionRowBuilder, SelectMenuBuilder, SlashCommandBuilder, bold, inlineCode } from 'discord.js'
import type * as Types from '../../utils/types'
import { v4 as uuid } from 'uuid'

export default {
    process: (interaction: Types.IChatInput) => {
        const selectComponentCustomID = uuid()

        interaction.reply({
            content: bold(' '),
            components: [
                new ActionRowBuilder<SelectMenuBuilder>()
                    .addComponents(
                        new SelectMenuBuilder()
                            .setCustomId(selectComponentCustomID)
                            .setPlaceholder('Select an item')
                            .setMinValues(1)
                            .setMaxValues(2)
                            .addOptions([
                                {
                                    label: 'item 1',
                                    description: 'description 1',
                                    value: 'item 1',
                                },
                                {
                                    label: 'item 2',
                                    description: 'description 2',
                                    value: 'item 2',
                                },
                                {
                                    label: 'item 3',
                                    description: 'description 3',
                                    value: 'item 3',
                                },
                            ])
                    ),
            ],
        })

        if (interaction.channel === null) return

        const collector = interaction.channel.createMessageComponentCollector({
            filter: (m) => m.user.id === interaction.user.id && m.customId === selectComponentCustomID,
        })

        collector.on('collect', (interaction: Types.ISelectMenu) => {
            const selectedValues = interaction.values.map(inlineCode).join(', ')
            interaction.reply({
                content: `Selected ${selectedValues}.`,
                ephemeral: true,
            })
        })
    },
    command: new SlashCommandBuilder()
        .setName('select_menu')
        .setDescription('Select Menu message component'),
}
