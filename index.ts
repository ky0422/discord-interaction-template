import { ready, interactionCreate } from './events'
import config from './config'
import BotClient from './src/BotClient'

if (!config.token)
    throw new Error(
        `Token is an invalid value.\nSee \`https://github.com/ky0422/discord-interaction-template/discussions/9#discussioncomment-2920521\` for more info.\n`
    )

/**
 * `path` option is where all commands are located.
 *
 * `defaultPath` option is where the file for handling when an error occurs in the command is located.
 */
const client = new BotClient({
    interactionHandler: interactionCreate,
    path: config.path ?? {
        path: 'commands',
        defaultPath: 'default.js',
    },
})

client.on('ready', ready)

client.login(config.token)

export default client
