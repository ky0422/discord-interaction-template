import client, { logger } from '..';

export default () =>
    logger.info(`${client.guilds.cache.size} guilds, ${client.user?.tag}.`);
