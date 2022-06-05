import client from '..';

export default () =>
    client.logger.info(
        `${client._client.guilds.cache.size} guilds, ${client._client.user?.tag}.`
    );
