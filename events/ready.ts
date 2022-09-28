import client from '..'

export default () => {
	const guildCount = client.client.guilds.cache.size
	const clientTag = client.client.user!.tag
	client.logger.info(`${guildCount} guilds, ${clientTag}.`)
}
