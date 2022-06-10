import { SlashCommandBuilder } from '@discordjs/builders';
import {
    InteractionCollector,
    MessageActionRow,
    MessageComponentInteraction,
    Modal,
    ModalActionRowComponent,
    ModalSubmitInteraction,
    TextInputComponent,
    TextInputComponentOptions,
} from 'discord.js';
import client from '../..';
import { v4 as uuid } from 'uuid';
import { ActionRowModal, ICommand, IMessageComponent } from '../../utils/types';

export default {
    process: (interaction: IMessageComponent) => {
        const _id = uuid();
        interaction.showModal(
            new Modal()
                .setCustomId(_id)
                .setTitle('Text Input')
                .addComponents(
                    new MessageActionRow<ActionRowModal>().addComponents(
                        new TextInputComponent()
                            .setCustomId(`${_id}_${uuid()}`)
                            .setLabel("What's your name?")
                            .setPlaceholder('Type here')
                            .setRequired(true)
                            .setStyle('SHORT')
                            .setMinLength(3)
                            .setMaxLength(10)
                    )
                )
                .addComponents(
                    new MessageActionRow<ActionRowModal>().addComponents(
                        new TextInputComponent()
                            .setCustomId(`${_id}_${uuid()}`)
                            .setLabel('Type something here')
                            .setPlaceholder('Type here')
                            .setRequired(true)
                            .setStyle('PARAGRAPH')
                            .setMaxLength(500)
                    )
                )
        );

        new InteractionCollector(client._client, {
            filter: (m: IMessageComponent) =>
                m.user.id === interaction.user.id && m.customId === _id,
        }).on('collect', (i: ModalSubmitInteraction) => {
            i.reply({
                content: `${i.components
                    .map((c) => `\`${c.components[0].value}\``)
                    .join('\n\n')}`,
            });
        });
    },
    command: new SlashCommandBuilder()
        .setName('text_input')
        .setDescription('Text Input modal message component'),
};
