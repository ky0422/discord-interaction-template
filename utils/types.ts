import {
    Awaitable,
    Client,
    ClientEvents,
    ClientOptions,
    CommandInteraction,
    ContextMenuInteraction,
    Interaction,
    MessageComponentInteraction,
    ModalActionRowComponent,
    SelectMenuInteraction,
} from 'discord.js';
import { Config } from '../config';
import { Logger } from './logger';

type R_Optional<T> = {
    [K in keyof T]-?: T[K];
};

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

type I = Interaction;
type ICommand = CommandInteraction;
type IMessageComponent = MessageComponentInteraction;
type IContextMenu = ContextMenuInteraction;
type ISelectMenu = SelectMenuInteraction;
type ActionRowModal = ModalActionRowComponent;

export {
    R_Optional,
    IBotOptions,
    IBot,
    PathOptions,
    I,
    ICommand,
    IMessageComponent,
    IContextMenu,
    ISelectMenu,
    ActionRowModal,
};
