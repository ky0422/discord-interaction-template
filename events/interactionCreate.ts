import { Interaction } from 'discord.js';

export default async (interaction: Interaction) => {
    if (!interaction.isCommand()) return;
    import(`../commands/${interaction.commandName}`)
        .then(async (cmd) => {
            await cmd.default.process(interaction);
        })
        .catch(async () => {
            import('../commands/default').then(async (cmd) => {
                cmd.default.process(interaction as any);
            });
        });
};
