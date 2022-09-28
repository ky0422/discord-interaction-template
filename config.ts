import { GatewayIntentBits } from 'discord.js'
import type { Config } from './utils/types'

const defaultAs = <T>(data: T) => data

export default defaultAs<Config>({
    token: process.env.TOKEN,
    clientId: process.env.CLIENT_ID,
    devGuild: process.env.DEV_GUILD,
    ownerId: process.env.OWNER_ID,
    path: {
        path: 'commands/examples',
        defaultPath: 'default.js',
    },
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
})
