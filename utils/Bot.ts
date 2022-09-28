import type { Client } from 'discord.js'
import type Logger from './logger'
import type * as Types from './types'

export default abstract class Bot implements Types.BotOptions {
    public abstract readonly client: Client
    public abstract readonly logger: Logger<string>
    public abstract readonly config: Types.Config
    public abstract readonly interactionHandler: Types.IHandler | undefined
}
