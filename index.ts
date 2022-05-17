import { REST } from '@discordjs/rest';
import { Client } from 'discord.js';
import { Routes } from 'discord-api-types/v10';

import config from './config';
import { ready, interactionCreate } from './events';
import registCommand from './src/commandRegister';

const client = new Client({
    intents: config.intents,
});

client.on('ready', ready);
client.on('interactionCreate', interactionCreate);

(async () => {
    await registCommand().then(async (commands) => {
        await new REST({ version: '10' })
            .setToken(config.token)
            .put(
                Routes.applicationGuildCommands(
                    config.client_id,
                    config.dev_guild
                ),
                {
                    body: commands,
                }
            );
    });
    client.login(config.token);
})();

export default client;
