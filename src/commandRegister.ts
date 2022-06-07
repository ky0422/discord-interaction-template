// If you don't have knowledge of this, don't modify the code.

import { RequestData, REST, RouteLike } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';
import { ApplicationCommandDataResolvable, ClientOptions } from 'discord.js';
import { R_Optional } from '../utils/types';
import { IBotOptions } from './bot';
import fs from 'fs';
import client from '..';

export const registCommand = async (path: string) => {
    const commands: Array<ApplicationCommandDataResolvable> = Array();
    await fs.readdirSync(`./dist/${path}`).forEach(
        async (file) =>
            await import(`../${path}/${file}`).then(async (command) => {
                const _command = command.default.command;
                if (!_command) return;
                client.logger.info(
                    `Command ${_command.name} (${file}) loaded. (./${path})`
                );
                commands.push(_command.toJSON());
            })
    );
    return commands;
};

export default async (
    options: R_Optional<
        Omit<IBotOptions, 'clientOptions' | 'handleInteraction'>
    >
) => {
    await registCommand(options.path).then(async (commands) => {
        const rest = async (
            route: RouteLike,
            _options: RequestData = {
                body: commands,
            }
        ) =>
            await new REST({ version: '10' })
                .setToken(options.config.token)
                .put(route, _options);
        if (options.config.dev_guild) {
            commands.map((c) => (c.name = `dev_${c.name}`));
            await rest(
                Routes.applicationGuildCommands(
                    options.config.client_id,
                    options.config.dev_guild
                )
            );
            options.logger.info(
                `Registered ${commands.length} commands. (DEV)`
            );
        } else {
            await rest(Routes.applicationCommands(options.config.client_id));
            options.logger.info(
                `Registered ${commands.length} commands. (GLOBAL)`
            );
        }
    });
};
