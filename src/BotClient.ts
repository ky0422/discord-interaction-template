import { Client, type ClientEvents, type Interaction } from 'discord.js'
import Logger from '../utils/logger'
import Bot from '../utils/Bot'
import type * as Types from '../utils/types'
import config from '../config'
import registerCommands from './registerCommands'

export default class extends Bot {
    public readonly client: Client<boolean>
    public readonly logger: Logger<string>
    public readonly config: Types.Config
    public readonly interactionHandler: Types.IHandler | undefined

    constructor(options?: Types.BotOptions) {
        super()

        this.logger = options?.logger ?? new Logger('MAIN')
        this.config = options?.config ?? config
        this.interactionHandler = options?.interactionHandler

        this.client = new Client({
            ...options?.clientOptions,
            intents: this.config.intents,
        })

        const pathOptionsWithDefault = {
            path: 'commands',
            defaultPath: 'default.js',
            ...options?.path,
        }

        registerCommands({
            logger: this.logger,
            config: this.config,
            path: pathOptionsWithDefault,
        })

        this.client.on('interactionCreate', async (interaction: Interaction) => {
            if (!this.interactionHandler)
                throw new Error([
                    '`interactionHandler` option is required.',
                    'See `https://github.com/ky0422/discord-interaction-template/discussions/9#discussioncomment-2920524` for more info.',
                ].join('\n'))

            try {
                await this.interactionHandler(interaction, pathOptionsWithDefault.path, pathOptionsWithDefault.defaultPath)
            } catch (e) {
                this.logger.error(`${e}`)
            }
        })
    }

    public async login(token: string) {
        await this.client.login(token)
    }

    public on<K extends keyof ClientEvents>(event: K, listener: (...args: ClientEvents[K]) => void) {
        this.client.on(event, listener)
    }
}
