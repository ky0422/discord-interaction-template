import { SlashCommandBuilder } from 'discord.js';
import { Types } from '../../utils';

export default {
    process: (interaction: Types.IMessageComponent) => {
        const subCommand = (
            interaction as unknown as Types.IChatInput
        ).options.getSubcommand();

        if (subCommand === 'all') {
            interaction.reply({
                content: `
> **\`(dev_)[command]\`**
> 
> \`/button\`
> \`/select_menu\`
> \`/eval [code]\`
                `,
                ephemeral: true,
            });
        } else if (subCommand === 'owner') {
            interaction.reply({
                content: `
> **\`(dev_)[command]\`**
> 
> \`/eval [code]\`
                `,
                ephemeral: true,
            });
        } else {
            interaction.reply('`/help [all | owner]`');
        }
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
};
