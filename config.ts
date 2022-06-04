import { Intents, IntentsString } from 'discord.js';

export interface Config {
    token: string;
    client_id: string;
    dev_guild?: string;
    owner_id: string;
    intents: Array<IntentsString | number>;
}

export default {
    token: process.env.TOKEN,
    client_id: process.env.CLIENT_ID,
    dev_guild: process.env.DEV_GUILD,
    owner_id: process.env.OWNER_ID,
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
} as Config;
