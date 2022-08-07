// If you don't have knowledge of this, don't modify the code.

import { RequestData, REST, RouteLike } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';
import {
    ApplicationCommandData,
    ApplicationCommandDataResolvable,
} from 'discord.js';
import { Types } from '../utils';
import fs from 'fs';
import client from '..';

export const registCommand = async (path: string) => {
    const commands: Array<ApplicationCommandDataResolvable> = [];

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
    options: Required<
        Omit<Types.IBotOptions, 'clientOptions' | 'handleInteraction'>
    >
) => {
    if (
        !options.config.token ||
        !options.config.client_id ||
        !options.config.owner_id
    )
        throw new Error(
            'You must provide a token, client_id, and owner_id in your config.(ts|js) file.'
        );

    await registCommand(options.path?.path!).then(async (commands) => {
        const rest = async (
            route: RouteLike,
            _options: RequestData = { body: commands }
        ) =>
            await new REST({ version: '10' })
                .setToken(options.config.token ?? '')
                .put(route, _options);

        if (options.config.dev_guild) {
            commands.map(
                (c) =>
                    ((c as ApplicationCommandData).name = `dev_${
                        (c as ApplicationCommandData).name
                    }`)
            );

            await rest(
                Routes.applicationGuildCommands(
                    options.config.client_id ?? '',
                    options.config.dev_guild
                )
            );

            options.logger.info(
                `Registered ${commands.length} commands. (DEV)`
            );
        } else {
            await rest(
                Routes.applicationCommands(options.config.client_id ?? '')
            );

            options.logger.info(
                `Registered ${commands.length} commands. (GLOBAL)`
            );
        }
    });
};
