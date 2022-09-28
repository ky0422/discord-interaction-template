import fs from 'node:fs'
import { SlashCommandBuilder } from 'discord.js'
import { Routes, REST } from 'discord.js'
import { also } from '../utils/fp'
import type Logger from '../utils/logger'
import type { BotOptions } from '../utils/types'

const fulfilledOnly = <T>(res: PromiseSettledResult<T>): res is PromiseFulfilledResult<T> =>
    res.status === 'fulfilled'

export const registerCommand = (logger: Logger<unknown>, path: string) =>
    Promise.allSettled(fs.readdirSync(`./dist/${path}`)
        .map((file) =>
            import(`../${path}/${file}`)
                .then<SlashCommandBuilder | null>((command) => command.default.command)
                .then((command) => !command ? Promise.reject() : command)
                .then(also((command) => logger.info(`Command ${command.name} (${file}) loaded. (./${path})`)))
                .then((command) => command.toJSON())
        )
    )
        .then((res) =>
            res
                .filter(fulfilledOnly)
                .map(res => res.value)
        )

export default async (options: Required<Omit<BotOptions, 'clientOptions' | 'interactionHandler'>>) => {
    const { config, logger } = options

    if ([config.token, config.clientId, config.ownerId].some(value => !value))
        throw new Error('You must provide a token, client_id, and owner_id in your config.(ts|js) file.')

    const commands = await registerCommand(logger, options.path.path)

    const { clientId = '' } = config
    const inDev = config.devGuild != null

    const route = inDev
        ? Routes.applicationGuildCommands(clientId, config.devGuild!)
        : Routes.applicationCommands(clientId)

    await new REST({ version: '10' })
        .setToken(config.token!)
        .put(route, { body: commands })

    logger.info(`Registered ${commands.length} commands. (${inDev ? 'DEV' : 'GLOBAL'})`)
}
