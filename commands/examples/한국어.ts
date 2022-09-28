import { SlashCommandBuilder } from 'discord.js'
import type * as Types from '../../utils/types'

export default {
    process: (interaction: Types.IChatInput) => {
        interaction.reply('안녕, 세상아!')
    },
    command: new SlashCommandBuilder()
        .setName('한국어')
        .setDescription('한글 명령어 테스트'),
}
