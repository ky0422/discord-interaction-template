import { Client } from 'discord.js';
import { ready, interactionCreate } from './events';

import config from './config';
import logger from './src/logger';
import BotClient from './src/bot';

if (!config.token || !(typeof config.token === 'string'))
    throw new Error(
        `Token is an invalid value.\nSee \`https://github.com/tsukiroku/discord-interaction-template/issues/1#issuecomment-1145866930\` for more info.\n`
    );

const client = new Client({
    intents: config.intents,
});

client.on('ready', ready);
client.on('interactionCreate', interactionCreate);

new BotClient(client, logger, config).registCommand('commands');

client.login(config.token);

export default client;
