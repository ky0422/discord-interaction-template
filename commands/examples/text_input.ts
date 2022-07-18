import {
    ActionRowBuilder,
    InteractionCollector,
    ModalBuilder,
    ModalSubmitInteraction,
    SlashCommandBuilder,
    TextInputBuilder,
    TextInputComponent,
    TextInputStyle,
} from 'discord.js';
import client from '../..';
import { v4 as uuid } from 'uuid';
import { Types } from '../../utils';

export default {
    process: (interaction: Types.IMessageComponent) => {
        const _id = uuid();
        interaction.showModal(
            new ModalBuilder()
                .setCustomId(_id)
                .setTitle('Text Input')
                .addComponents(
                    new ActionRowBuilder<TextInputBuilder>().addComponents(
                        new TextInputBuilder()
                            .setCustomId(`${_id}_${uuid()}`)
                            .setLabel("What's your name?")
                            .setPlaceholder('Type here')
                            .setRequired(true)
                            .setStyle(TextInputStyle.Short)
                            .setMinLength(3)
                            .setMaxLength(10)
                    )
                )
                .addComponents(
                    new ActionRowBuilder<TextInputBuilder>().addComponents(
                        new TextInputBuilder()
                            .setCustomId(`${_id}_${uuid()}`)
                            .setLabel('Type something here')
                            .setPlaceholder('Type here')
                            .setRequired(true)
                            .setStyle(TextInputStyle.Paragraph)
                            .setMaxLength(500)
                    )
                )
        );

        new InteractionCollector(client._client, {
            filter: (m) =>
                m.user.id === interaction.user.id && m.customId === _id,
        }).on('collect', (i: ModalSubmitInteraction) => {
            i.reply({
                content: `${i.components
                    .map(
                        (c) =>
                            `\`${
                                (
                                    c
                                        .components[0] as unknown as TextInputComponent
                                ).value
                            }\``
                    )
                    .join('\n\n')}`,
            });
        });
    },
    command: new SlashCommandBuilder()
        .setName('text_input')
        .setDescription('Text Input modal message component'),
};
