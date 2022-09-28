import { SlashCommandBuilder, bold, inlineCode, quote } from 'discord.js'
import type * as Types from '../../utils/types'

export default {
    process: (interaction: Types.IChatInput) => {
        const subCommand = interaction.options.getSubcommand()

        if (subCommand === 'all')
            interaction.reply({
                content: [
                    quote(inlineCode(bold('(dev_)[command]'))),
                    '',
                    quote(inlineCode('/button')),
                    quote(inlineCode('/select_menu')),
                    quote(inlineCode('/eval [code]')),
                ].join('\n')
            })
        else if (subCommand === 'owner')
            interaction.reply({
                content: [
                    quote(inlineCode(bold('(dev_)[command]'))),
                    '',
                    quote(inlineCode('/eval [code]'))
                ].join('\n'),
                ephemeral: true,
            })
        else interaction.reply({ content: inlineCode('/help [all | owner]') })
    },
    command: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Help command')
        .addSubcommand((subcommand) =>
            subcommand
                .setName('all')
                .setDescription('Show help for all commands')
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName('owner')
                .setDescription('Show help for owner commands')
        ),
}
