import { Client, Interaction } from 'discord.js'
import { Logger } from '../utils/logger'
import { Types } from '../utils'
import _config from '../config'
import registCommand from './commandRegister'

export default class extends Types.IBot {
    public readonly client: Client<boolean>
    public readonly logger: Logger<string>
    public readonly config: Types.Config
    public readonly handleInteraction: ((interaction: Interaction, path: string, default_path: string) => any) | undefined

    constructor(options?: Types.IBotOptions) {
        super()

        this.logger = options?.logger ?? new Logger<string>('MAIN')
        this.config = options?.config ?? _config
        this.handleInteraction = options?.handleInteraction

        this.client = new Client({
            ...options?.clientOptions,
            intents: this.config.intents,
        })

        registCommand({
            logger: this.logger,
            config: this.config,
            path: {
                path: options?.path?.path ?? 'commands',
                defaultPath: options?.path?.defaultPath ?? 'default.js',
            },
        })

        this.client.on('interactionCreate', (interaction: Interaction) => {
            if (!this.handleInteraction)
                throw new Error(
                    `\`handleInteraction\` option is required.\nSee \`https://github.com/ky0422/discord-interaction-template/discussions/9#discussioncomment-2920524\` for more info.\n`
                )

            this.handleInteraction(interaction, options?.path?.path ?? 'commands', options?.path?.defaultPath ?? 'default.js')
        })
    }

    public async login(token: string) {
        this.client.login(token)
    }

    public async on(event: string, listener: (...args: Array<any>) => void) {
        this.client.on(event, listener)
    }
}
