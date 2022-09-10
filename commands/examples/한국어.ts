import { SlashCommandBuilder } from 'discord.js'
import { Types } from '../../utils'

export default {
    process: (interaction: Types.IMessageComponent) => interaction.reply('안녕, 세상아!'),
    command: new SlashCommandBuilder().setName('한국어').setDescription('한글 명령어 테스트'),
}
