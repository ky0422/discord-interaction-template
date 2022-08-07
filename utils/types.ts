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

abstract class IBot implements IBotOptions {
    public abstract readonly client: Client;
    public abstract readonly logger: Logger<string>;
    public abstract readonly config: Config;
    public abstract readonly handleInteraction:
        | ((
              interaction: Interaction,
              path: string,
              default_path: string
          ) => any)
        | undefined;
}

interface PathOptions {
    readonly path?: string;
    readonly defaultPath?: string;
}

interface Config {
    token?: string;
    client_id?: string;
    dev_guild?: string;
    owner_id?: string;
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
