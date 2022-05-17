# Command template

```ts
import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageComponentInteraction } from 'discord.js';

export default {
    process: (interaction: MessageComponentInteraction) => {
        interaction.reply({
            content: 'owo',
            ephemeral: true,
        });
    },
    command: new SlashCommandBuilder()
        .setName('')         // command name
        .setDescription(''), // command description
};
```