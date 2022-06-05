import logger from '../utils/logger';
import client from '..';

export default () =>
    logger.info(`${client._client.guilds.cache.size} guilds, ${client._client.user?.tag}.`);
