import { Intents, IntentsString } from 'discord.js';

interface Config {
    token: string;
    client_id: string;
    dev_guild?: string;
    intents: Array<IntentsString | number>;
}

export default {
    token: process.env.TOKEN,
    client_id: process.env.CLIENT_ID,
    // dev_guild: process.env.DEV_GUILD,
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
} as Config;
