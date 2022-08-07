import { GatewayIntentBits } from 'discord.js';
import { Types } from './utils';

const defaultAs = <T>(data: T) => data;

export default defaultAs<Types.Config>({
    token: process.env.TOKEN,
    client_id: process.env.CLIENT_ID,
    dev_guild: process.env.DEV_GUILD,
    owner_id: process.env.OWNER_ID,
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});
