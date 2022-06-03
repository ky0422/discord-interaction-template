// If you don't have knowledge of this, don't modify the code.

import { RequestData, REST, RouteLike } from '@discordjs/rest';

import { Routes } from 'discord-api-types/v10';
import { Client } from 'discord.js';
import { Config } from '../config';
import { Logger } from '../src/logger';

import registCommand from '../src/commandRegister';

interface IBot {
    client: Client;
    logger: Logger<string>;
    config: Config;
    registCommand: (path: string) => any;
}

export default class implements IBot {
    client: Client<boolean>;
    logger: Logger<string>;
    config: Config;

    constructor(client: Client, logger: Logger<string>, config: Config) {
        this.client = client;
        this.logger = logger;
        this.config = config;
    }

    public async registCommand(path: string) {
        await registCommand(path).then(async (commands) => {
            const rest = async (
                route: RouteLike,
                options: RequestData = {
                    body: commands,
                }
            ) =>
                await new REST({ version: '10' })
                    .setToken(this.config.token)
                    .put(route, options);
            if (this.config.dev_guild) {
                commands.map((c) => (c.name = `dev_${c.name}`));
                await rest(
                    Routes.applicationGuildCommands(
                        this.config.client_id,
                        this.config.dev_guild
                    )
                );
                this.logger.info(
                    `Registered ${commands.length} commands. (DEV)`
                );
            } else {
                await rest(Routes.applicationCommands(this.config.client_id));
                this.logger.info(
                    `Registered ${commands.length} commands. (GLOBAL)`
                );
            }
        });
    }
}
