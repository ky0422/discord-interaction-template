import { Interaction, InteractionType } from 'discord.js'
import client from '..'

export default async (interaction: Interaction, path: string, default_path: string) => {
    if (interaction.type !== InteractionType.ApplicationCommand) return

    import(`../${path}/${interaction.commandName.replace('dev_', '')}`)
        .then(async (command) => await command.default.process(interaction))
        .catch(async (e) =>
            import(`../${path.split('/')[0]}/${default_path}`).then(async (command) => {
                command.default.process(interaction as any)

                client.logger.error(e)
            })
        )
}
