import { ApplicationCommandDataResolvable } from 'discord.js';
import fs from 'fs';

export default async () => {
    const commands: Array<ApplicationCommandDataResolvable> = Array();
    await fs.readdirSync('./dist/commands').forEach(async (file) => {
        await import(`../commands/${file}`).then(async (command) => {
            const _command = command.default.command;
            if (!_command) return;
            await commands.push(_command.toJSON());
        });
    });
    return commands;
};
