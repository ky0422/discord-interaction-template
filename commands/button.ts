import { SlashCommandBuilder } from '@discordjs/builders';
import {
    MessageActionRow,
    MessageButton,
    MessageComponentInteraction,
} from 'discord.js';
import uuid from '../util/uuid';

export default {
    process: (interaction: MessageComponentInteraction) => {
        const _id = uuid();
        interaction.reply({
            content: `${_id}`,
            components: [
                new MessageActionRow().addComponents(
                    new MessageButton()
                        .setCustomId(_id)
                        .setLabel('ddd')
                        .setStyle('PRIMARY')
                ),
            ],
        });

        const collector = interaction.channel?.createMessageComponentCollector({
            filter: (m) =>
                m.user.id === interaction.user.id && m.customId === _id,
            // max: 1,
        });
        collector?.on('collect', (i) => {
            i.reply({
                content: `dd`,
                ephemeral: true,
            });
        });
    },
    command: new SlashCommandBuilder()
        .setName('button')
        .setDescription('button component test'),
};
