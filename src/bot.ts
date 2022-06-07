// If you don't have knowledge of this, don't modify the code.

import {
    Awaitable,
    Client,
    ClientEvents,
    ClientOptions,
    Interaction,
} from 'discord.js';
import _config, { Config } from '../config';
import { Logger } from '../utils/logger';

import registCommand from '../src/commandRegister';

interface IBotOptions {
    readonly logger?: Logger<string>;
    readonly config?: Config;
    readonly path?: string;
    readonly clientOptions?: ClientOptions;
    readonly handleInteraction?: (
        interaction: Interaction,
        path: string
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

export default class implements IBot {
    public readonly _client: Client<boolean>;
    public readonly logger: Logger<string>;
    public readonly config: Config;
    public readonly handleInteraction:
        | ((interaction: Interaction, path: string) => any)
        | undefined;

    constructor(options?: IBotOptions) {
        this.logger = options?.logger ?? new Logger<string>('MAIN');
        this.config = options?.config ?? _config;
        this.handleInteraction = options?.handleInteraction;
        this._client = new Client({
            ...options?.clientOptions,
            intents: this.config.intents,
        });
        registCommand({
            logger: this.logger,
            config: this.config,
            path: options?.path ?? 'commands',
        });
        this.on('interactionCreate', (interaction: Interaction) => {
            if (!this.handleInteraction)
                throw new Error(
                    `\`handleInteraction\` option is required.\nSee \`https://github.com/tsukiroku/discord-interaction-template/issues/1#issuecomment-1145866930\` for more info.\n`
                );
            this.handleInteraction(interaction, options?.path ?? 'commands');
        });
    }

    public login(token: string) {
        return this._client.login(token);
    }

    public on<K extends keyof ClientEvents>(
        event: K,
        callback: (...args: ClientEvents[K]) => Awaitable<void>
    ) {
        return this._client.on(event, callback);
    }
}

export { IBotOptions, IBot };
