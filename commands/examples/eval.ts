import { SlashCommandBuilder, bold, codeBlock } from 'discord.js'
import type * as Types from '../../utils/types'
import config from '../../config'

const tokenRegex = /[a-zA-Z\--_]{24}\.[a-zA-Z\--_]{6}\.[a-zA-Z\--_]{38}/g

export default {
    process: (interaction: Types.IChatInput) => {
        if (interaction.user.id !== config.ownerId) {
            interaction.reply({
                content: bold('You are not the owner of this bot.'),
                ephemeral: true,
            })
            return
        }

        try {
            const result: string = eval(interaction.options.getString('code') ?? '')
            interaction.reply({
                content: codeBlock('ts', result.replace(tokenRegex, 'TOKEN')),
            })
        } catch (e) {
            interaction.reply({
                content: codeBlock('ts', `${e}`),
            })
        }
    },
    command: new SlashCommandBuilder()
        .setName('eval')
        .setDescription('Dangerous command. be careful when using it.')
        .addStringOption((option) =>
            option
                .setName('code')
                .setDescription('eval')
                .setRequired(true)
        ),
}
