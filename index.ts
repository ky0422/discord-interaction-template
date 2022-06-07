import { ready, interactionCreate } from './events';

import config from './config';
import BotClient from './src/bot';

if (!config.token || !(typeof config.token === 'string'))
    throw new Error(
        `Token is an invalid value.\nSee \`https://github.com/tsukiroku/discord-interaction-template/issues/1#issuecomment-1148360826\` for more info.\n`
    );

const client = new BotClient({
    handleInteraction: interactionCreate,
});

client.on('ready', ready);

client.login(config.token);

export default client;
