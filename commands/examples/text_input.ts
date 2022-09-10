import * as Discord from 'discord.js'
import { Types } from '../../utils'
import { v4 as uuid } from 'uuid'
import client from '../..'

export default {
    process: (interaction: Types.IMessageComponent) => {
        const textModalCustomId = uuid()

        interaction.showModal(
            new Discord.ModalBuilder()
                .setCustomId(textModalCustomId)
                .setTitle('Text Input')
                .addComponents(
                    new Discord.ActionRowBuilder<Discord.TextInputBuilder>().addComponents(
                        new Discord.TextInputBuilder()
                            .setCustomId(`${textModalCustomId}_${uuid()}`)
                            .setLabel("What's your name?")
                            .setPlaceholder('Type here')
                            .setRequired(true)
                            .setStyle(Discord.TextInputStyle.Short)
                            .setMinLength(3)
                            .setMaxLength(10)
                    )
                )
                .addComponents(
                    new Discord.ActionRowBuilder<Discord.TextInputBuilder>().addComponents(
                        new Discord.TextInputBuilder()
                            .setCustomId(`${textModalCustomId}_${uuid()}`)
                            .setLabel('Type something here')
                            .setPlaceholder('Type here')
                            .setRequired(true)
                            .setStyle(Discord.TextInputStyle.Paragraph)
                            .setMaxLength(500)
                    )
                )
        )

        new Discord.InteractionCollector(client.client, {
            filter: (m) => m.user.id === interaction.user.id && m.customId === textModalCustomId,
        }).on(
            'collect',
            (i: Discord.ModalSubmitInteraction) =>
                void i.reply({
                    content: `${i.components.map((c) => `\`${(c.components[0] as unknown as Discord.TextInputComponent).value}\``).join('\n\n')}`,
                })
        )
    },
    command: new Discord.SlashCommandBuilder().setName('text_input').setDescription('Text Input modal message component'),
}
