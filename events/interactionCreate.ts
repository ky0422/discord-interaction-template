import type { Interaction } from 'discord.js'

export default async (interaction: Interaction, path: string, defaultPath: string) => {
    if (!interaction.isChatInputCommand()) return

    await import(`../${path}/${interaction.commandName}`)
        .then((command) => command.default.process(interaction))
        .catch((e) =>
            import(`../${path.split('/')[0]}/${defaultPath}`)
                .then((command) => command.default.process(interaction))
                .then(() => Promise.reject(e))
        )
}
