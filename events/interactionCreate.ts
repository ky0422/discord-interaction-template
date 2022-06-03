import { Interaction } from 'discord.js';

// If you don't have knowledge of this, don't modify the code.
export default async (interaction: Interaction) => {
    if (!interaction.isCommand() && !interaction.isContextMenu()) return;
    import(`../commands/${interaction.commandName.replace('dev_', '')}`)
        .then(async (cmd) => await cmd.default.process(interaction))
        .catch(async () =>
            import('../commands/default').then(async (cmd) => {
                cmd.default.process(interaction as any);
            })
        );
};
