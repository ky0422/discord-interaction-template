import { SlashCommandBuilder } from 'discord.js'
import { Discord, Types } from '../../utils'
import config from '../../config'

export default {
    process: (interaction: Types.IMessageComponent) => {
        if (interaction.user.id !== config.ownerId) {
            interaction.reply({
                content: '**You are not the owner of this bot.**',
                ephemeral: true,
            })
            return
        }

        try {
            const result: string = eval(((interaction as unknown as Types.ICommand).options.get('code')?.value as string) ?? '')
            interaction.reply({
                content: Discord.codeBlock(result.replace(/[a-zA-Z\--_]{24}\.[a-zA-Z\--_]{6}\.[a-zA-Z\--_]{38}/g, 'TOKEN'), 'ts'),
            })
        } catch (e) {
            interaction.reply({
                content: Discord.codeBlock(e, 'ts'),
            })
        }
    },
    command: new SlashCommandBuilder()
        .setName('eval')
        .setDescription('Dangerous command. be careful when using it.')
        .addStringOption((option) => option.setName('code').setDescription('eval').setRequired(true)),
}
