// If you don't have knowledge of this, don't modify the code.

import { Interaction } from 'discord.js';
import client from '..';

export default async (interaction: Interaction, path: string) => {
    if (!interaction.isCommand() && !interaction.isContextMenu()) return;
    import(`../${path}/${interaction.commandName.replace('dev_', '')}`)
        .then(async (command) => await command.default.process(interaction))
        .catch(async (e) =>
            import(`../${path}/default`).then(async (command) => {
                command.default.process(interaction as any);
                client.logger.error(e);
            })
        );
};
