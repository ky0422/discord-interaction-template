import client from '..';

export default () => {
    console.log(`${client.guilds.cache.size} guilds, ${client.user?.tag}.`);
};
