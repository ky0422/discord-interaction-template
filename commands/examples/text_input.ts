import { ActionRowBuilder, ModalBuilder, SlashCommandBuilder, TextInputBuilder, TextInputModalData, TextInputStyle, inlineCode } from 'discord.js'
import { v4 as uuid } from 'uuid'
import type * as Types from '../../utils/types'

export default {
    process: async (interaction: Types.IMessageComponent) => {
        const textModalCustomId = uuid()

        await interaction.showModal(
            new ModalBuilder()
                .setCustomId(textModalCustomId)
                .setTitle('Text Input')
                .addComponents(
                    new ActionRowBuilder<TextInputBuilder>()
                        .addComponents(
                            new TextInputBuilder()
                                .setCustomId(`${textModalCustomId}_${uuid()}`)
                                .setLabel("What's your name?")
                                .setPlaceholder('Type here')
                                .setRequired(true)
                                .setStyle(TextInputStyle.Short)
                                .setMinLength(3)
                                .setMaxLength(10)
                        )
                )
                .addComponents(
                    new ActionRowBuilder<TextInputBuilder>()
                        .addComponents(
                            new TextInputBuilder()
                                .setCustomId(`${textModalCustomId}_${uuid()}`)
                                .setLabel('Type something here')
                                .setPlaceholder('Type here')
                                .setRequired(true)
                                .setStyle(TextInputStyle.Paragraph)
                                .setMaxLength(500)
                        )
                )
        )

        const modalSubmitInteraction = await interaction.awaitModalSubmit({ time: -1 })

        modalSubmitInteraction.reply({
            content: modalSubmitInteraction.components.map((c) =>
                inlineCode((c.components[0] as TextInputModalData).value)
            ).join('\n\n'),
        })
    },
    command: new SlashCommandBuilder()
        .setName('text_input')
        .setDescription('Text Input modal message component'),
}
