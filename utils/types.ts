import {
    Awaitable,
    ChatInputCommandInteraction,
    Client,
    ClientEvents,
    ClientOptions,
    CommandInteraction,
    ContextMenuCommandInteraction,
    GatewayIntentBits,
    Interaction,
    MessageComponentInteraction,
    ModalActionRowComponent,
    SelectMenuInteraction,
} from 'discord.js';
import { Logger } from './logger';

interface IBotOptions {
    readonly logger?: Logger<string>;
    readonly config?: Config;
    readonly path?: PathOptions;
    readonly clientOptions?: ClientOptions;
    readonly handleInteraction?: (
        interaction: Interaction,
        path: string,
        default_path: string
    ) => any;
}

interface IBot extends IBotOptions {
    _client: Client;
    logger: Logger<string>;
    config: Config;
    login: (token: string) => Promise<any>;
    on: <K extends keyof ClientEvents>(
        event: K,
        callback: (...args: ClientEvents[K]) => Awaitable<void>
    ) => any;
}

interface PathOptions {
    readonly path?: string;
    readonly defaultPath?: string;
}

interface Config {
    token: string;
    client_id: string;
    dev_guild?: string;
    owner_id: string;
    intents: Array<GatewayIntentBits>;
}

type I = Interaction;
type ICommand = CommandInteraction;
type IMessageComponent = MessageComponentInteraction;
type IContextMenu = ContextMenuCommandInteraction;
type ISelectMenu = SelectMenuInteraction;
type ActionRowModal = ModalActionRowComponent;
type IChatInput = ChatInputCommandInteraction;

export {
    IBotOptions,
    IBot,
    PathOptions,
    I,
    ICommand,
    IMessageComponent,
    IContextMenu,
    ISelectMenu,
    IChatInput,
    ActionRowModal,
    Config,
};
