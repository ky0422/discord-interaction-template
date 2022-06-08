import {
    Awaitable,
    Client,
    ClientEvents,
    ClientOptions,
    Interaction,
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

export { R_Optional, IBotOptions, IBot, PathOptions };
