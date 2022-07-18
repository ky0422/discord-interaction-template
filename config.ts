import { GatewayIntentBits } from 'discord.js';
import { Types } from './utils';

export default {
    token: process.env.TOKEN,
    client_id: process.env.CLIENT_ID,
    dev_guild: process.env.DEV_GUILD,
    owner_id: process.env.OWNER_ID,
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
} as Types.Config;
