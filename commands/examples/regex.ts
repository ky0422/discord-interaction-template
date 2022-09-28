import { SlashCommandBuilder, inlineCode, userMention } from 'discord.js'
import type * as Types from '../../utils/types'

export default {
    process: (interaction: Types.IMessageComponent) => {
        const [word1, word2] = ['Hello, World!', 'Bye, World!']

        const content = `Write a regular expression that matches the ${inlineCode(word1)} and ${inlineCode(word2)}.`

        interaction.reply({ content })

        if (interaction.channel === null) return

        const collector = interaction.channel.createMessageCollector({
            filter: (m) => m.author.id === interaction.user.id,
            time: 60000,
        })

        collector.on('collect', (message) => {
            const regex = new RegExp(message.content.replace(/```(\w+)?/g, '').trim())

            if (regex.test(word1) && regex.test(word2)) {
                interaction.editReply({
                    content: `${content}\n\nCorrect: ${userMention(message.author.id)}`,
                })

                message.react('🎉')

                collector.stop()
            } else message.react('❌')
        })

        collector.on('end', (collected, reason) => {
            if (reason === 'time')
                interaction.editReply({
                    content: 'Wrong answer, try again in a minute.',
                })
        })
    },
    command: new SlashCommandBuilder()
        .setName('regex')
        .setDescription('A simple regex game.'),
}
