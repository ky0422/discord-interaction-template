import { ApplicationCommandDataResolvable } from 'discord.js';
import fs from 'fs';
import { logger } from '..';

export default async () => {
    const commands: Array<ApplicationCommandDataResolvable> = Array();
    await fs.readdirSync('./dist/commands').forEach(async (file) => {
        await import(`../commands/${file}`).then(async (command) => {
            const _command = command.default.command;
            if (!_command) return;
            logger.info(`Command ${_command.name} (${file}) loaded.`);
            commands.push(_command.toJSON());
        });
    });
    return commands;
};
