import { SlashCommandBuilder } from '@discordjs/builders';
import {
    CommandInteraction,
    CommandInteractionOptionResolver,
    Interaction,
    MessageComponentInteraction,
} from 'discord.js';
import config from '../config';

export default {
    process: (interaction: MessageComponentInteraction) => {
        if (interaction.user.id !== config.owner_id) {
            interaction.reply({
                content: '**You are not the owner of this bot.**',
                ephemeral: true,
            });
            return;
        }

        try {
            const result: string = eval(
                (
                    interaction as unknown as CommandInteraction
                ).options.getString('code') ?? ''
            );
            interaction.reply({
                content: `\`\`\`ts\n${result.replace(
                    /[a-zA-Z\--_]{24}\.[a-zA-Z\--_]{6}\.[a-zA-Z\--_]{38}/g,
                    'TOKEN'
                )}\n\`\`\``,
            });
        } catch (e) {
            interaction.reply({
                content: `\`\`\`ts\n${e}\n\`\`\``,
            });
        }
    },
    command: new SlashCommandBuilder()
        .setName('eval')
        .setDescription('Dangerous command. be careful when using it.')
        .addStringOption((option) =>
            option.setName('code').setDescription('eval').setRequired(true)
        ),
};
