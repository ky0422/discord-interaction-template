import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageActionRow, MessageSelectMenu } from 'discord.js';
import { v4 as uuid } from 'uuid';
import { IMessageComponent, ISelectMenu } from '../../utils/types';

export default {
    process: (interaction: IMessageComponent) => {
        const _id_select = uuid();
        interaction.reply({
            content: `** **`,
            components: [
                new MessageActionRow().addComponents(
                    new MessageSelectMenu()
                        .setCustomId(_id_select)
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
        });

        const collector = interaction.channel?.createMessageComponentCollector({
            filter: (m) =>
                m.user.id === interaction.user.id && m.customId === _id_select,
            // max: 1,
        });

        collector?.on('collect', (i) => {
            i.reply({
                content: `Selected ${(i as ISelectMenu).values
                    .map((v) => `\`${v}\``)
                    .join(', ')}.`,
                ephemeral: true,
            });
        });
    },
    command: new SlashCommandBuilder()
        .setName('select_menu')
        .setDescription('Select Menu message component'),
};
