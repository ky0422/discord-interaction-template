import { SlashCommandBuilder } from '@discordjs/builders';
import config from '../../config';
import codeblock from '../../utils/discord/codeblock';
import { ICommand, IMessageComponent } from '../../utils/types';

export default {
    process: (interaction: IMessageComponent) => {
        if (interaction.user.id !== config.owner_id) {
            interaction.reply({
                content: '**You are not the owner of this bot.**',
                ephemeral: true,
            });
            return;
        }

        try {
            const result: string = eval(
                (interaction as unknown as ICommand).options.getString(
                    'code'
                ) ?? ''
            );
            interaction.reply({
                content: codeblock(
                    result.replace(
                        /[a-zA-Z\--_]{24}\.[a-zA-Z\--_]{6}\.[a-zA-Z\--_]{38}/g,
                        'TOKEN'
                    ),
                    'ts'
                ),
            });
        } catch (e) {
            interaction.reply({
                content: codeblock(e, 'ts'),
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
