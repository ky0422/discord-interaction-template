import { ready, interactionCreate } from './events';

import config from './config';
import BotClient from './src/bot';

if (!config.token || !(typeof config.token === 'string'))
    throw new Error(
        `Token is an invalid value.\nSee \`https://github.com/tsukiroku/discord-interaction-template/discussions/9#discussioncomment-2920521\` for more info.\n`
    );

/**
 * `path` option is where all commands are located.
 *
 * `defaultPath` option is where the file for handling when an error occurs in the command is located.
 */
const client = new BotClient({
    handleInteraction: interactionCreate,
    path: {
        path: 'commands/examples',
        defaultPath: 'default.js',
    },
});

client.client.on('ready', ready);

client.client.login(config.token);

export default client;
