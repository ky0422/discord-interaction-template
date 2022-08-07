import client from '..';

export default () =>
    client.logger.info(
        `${client.client.guilds.cache.size} guilds, ${client.client.user?.tag}.`
    );
