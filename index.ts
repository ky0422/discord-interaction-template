import { RequestData, REST, RouteLike } from '@discordjs/rest';
import { Client } from 'discord.js';
import { Routes } from 'discord-api-types/v10';

import config from './config';
import { ready, interactionCreate } from './events';
import registCommand from './src/commandRegister';
import logger from './src/logger';

if (!config.token || !(typeof config.token === 'string'))
    throw new Error(
        `Token is an invalid value.\nSee \`https://github.com/tsukiroku/discord-interaction-template#config\` for more info.\n`
    );

const client = new Client({
    intents: config.intents,
});

client.on('ready', ready);
client.on('interactionCreate', interactionCreate);

(async () => {
    await registCommand('commands').then(async (commands) => {
        const rest = async (
            route: RouteLike,
            options: RequestData = {
                body: commands,
            }
        ) =>
            await new REST({ version: '10' })
                .setToken(config.token)
                .put(route, options);
        if (config.dev_guild) {
            commands.map((c) => (c.name = `dev_${c.name}`));
            await rest(
                Routes.applicationGuildCommands(
                    config.client_id,
                    config.dev_guild
                )
            );
            logger.info(`Registered ${commands.length} commands. (DEV)`);
        } else {
            await rest(Routes.applicationCommands(config.client_id));
            logger.info(`Registered ${commands.length} commands. (GLOBAL)`);
        }
    });
    client.login(config.token);
})();

export default client;
