import { ApplicationCommandDataResolvable } from 'discord.js';
import fs from 'fs';
import logger from './logger';

export default async (path: string) => {
    const commands: Array<ApplicationCommandDataResolvable> = Array();
    await fs.readdirSync(`./dist/${path}`).forEach(
        async (file) =>
            await import(`../${path}/${file}`).then(async (command) => {
                const _command = command.default.command;
                if (!_command) return;
                logger.info(
                    `Command ${_command.name} (${file}) loaded. (./${path})`
                );
                commands.push(_command.toJSON());
            })
    );
    return commands;
};
