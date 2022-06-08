> **Command file name and, command name must match.**

> **In `dev_guild` mode, the command name is automatically converted to `dev_(name)`.**

> **Do not include `dev_` in the `command file` or `command name`.**
>
> The corresponding indication is required for testing in `dev_guild`.

> [`index.ts#L11`](https://github.com/tsukiroku/discord-interaction-template/blob/main/index.ts#L11)

# Command template

> [**Button**](#button)
>
> [**Select Menu**](#select-menu)
>
> [**Context Menu**](#context-menu)

```ts
import { MessageComponentInteraction } from 'discord.js';

export default {
    process: (interaction: MessageComponentInteraction) => {
        // Do something
    },
    command: new SlashCommandBuilder()
        .setName('command')
        .setDescription('Command description'),
};
```

---

# Button

![](../resource/button.gif)

> **Source code**: [button.ts](./examples/button.ts)

<br>

# Select Menu

![](../resource/select_menu.gif)

> **Source code**: [select_menu.ts](./examples/select_menu.ts)

<br>

# Context Menu

![](../resource/context_menu.gif)

> **Source code**: [context_menu.ts](./examples/context_menu.ts)
