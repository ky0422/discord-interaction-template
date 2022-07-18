// If you don't have knowledge of this, don't modify the code.

import { Awaitable, Client, ClientEvents, Interaction } from 'discord.js';
import _config from '../config';
import { Logger } from '../utils/logger';

import registCommand from '../src/commandRegister';
import { Types } from '../utils';

export default class implements Types.IBot {
    public readonly _client: Client<boolean>;
    public readonly logger: Logger<string>;
    public readonly config: Types.Config;
    public readonly handleInteraction:
        | ((
              interaction: Interaction,
              path: string,
              default_path: string
          ) => any)
        | undefined;

    constructor(options?: Types.IBotOptions) {
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
            path: {
                path: options?.path?.path ?? 'commands',
                defaultPath: options?.path?.defaultPath ?? 'default.js',
            },
        });
        this.on('interactionCreate', (interaction: Interaction) => {
            if (!this.handleInteraction)
                throw new Error(
                    `\`handleInteraction\` option is required.\nSee \`https://github.com/tsukiroku/discord-interaction-template/discussions/9#discussioncomment-2920524\` for more info.\n`
                );
            this.handleInteraction(
                interaction,
                options?.path?.path ?? 'commands',
                options?.path?.defaultPath ?? 'default.js'
            );
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
