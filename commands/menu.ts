import { SlashCommandBuilder } from '@discordjs/builders';
import {
    MessageActionRow,
    MessageComponentInteraction,
    MessageSelectMenu,
    SelectMenuInteraction,
} from 'discord.js';
import uuid from '../util/uuid';

export default {
    process: (interaction: MessageComponentInteraction) => {
        const _id_select = uuid();
        interaction.reply({
            content: `Select a item`,
            components: [
                new MessageActionRow().addComponents(
                    new MessageSelectMenu()
                        .setCustomId(_id_select)
                        .setPlaceholder('up to 3p only')
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
        });

        const collector = interaction.channel?.createMessageComponentCollector({
            filter: (m) =>
                m.user.id === interaction.user.id && m.customId === _id_select,
            // max: 1,
        });

        collector?.on('collect', (i) => {
            i.reply({
                content: `selected ${(i as SelectMenuInteraction).values.join(
                    ', '
                )}`,
                ephemeral: true,
            });
        });
    },
    command: new SlashCommandBuilder()
        .setName('menu')
        .setDescription('button component test'),
};
