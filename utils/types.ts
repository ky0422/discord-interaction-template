import type {
    BitFieldResolvable,
    ChatInputCommandInteraction,
    ClientOptions,
    CommandInteraction,
    ContextMenuCommandInteraction,
    GatewayIntentBits,
    GatewayIntentsString,
    Interaction,
    MessageComponentInteraction,
    ModalActionRowComponent,
    SelectMenuInteraction,
} from 'discord.js'
import type Logger from './logger'

export type IHandler = (interaction: Interaction, path: string, defaultPath: string) => void | Promise<void>

export interface BotOptions {
    readonly logger?: Logger<string>
    readonly config?: Config
    readonly path?: PathOptions
    readonly clientOptions?: ClientOptions
    readonly interactionHandler?: IHandler
}

export interface PathOptions {
    readonly path: string
    readonly defaultPath: string
}

export interface Config {
    token?: string
    clientId?: string
    devGuild?: string
    ownerId?: string
    path?: PathOptions
    intents: BitFieldResolvable<GatewayIntentsString, number> | Array<GatewayIntentBits>
}

export type I = Interaction
export type ICommand = CommandInteraction
export type IMessageComponent = MessageComponentInteraction
export type IContextMenu = ContextMenuCommandInteraction
export type ISelectMenu = SelectMenuInteraction
export type ActionRowModal = ModalActionRowComponent
export type IChatInput = ChatInputCommandInteraction
