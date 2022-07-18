> 한국어 문서: [**README_kr.md**](README_kr.md)

> **Command file name and, command name must match.**

> **In `dev_guild` mode, the command name is automatically converted to `dev_(name)`.**

> **Do not include `dev_` in the `command file` or `command name`.**
>
> The corresponding indication is required for testing in `dev_guild`.

> [`index.ts#L11`](https://github.com/tsukiroku/discord-interaction-template/blob/main/index.ts#L11)

# Command template

-   [**Button**](./examples/button.ts)
    -   ![](../resource/button.gif)
-   [**Select Menu**](./examples/select_menu.ts)
    -   ![](../resource/select_menu.gif)
-   [**Context Menu**](./examples/context_menu.ts)
    -   ![](../resource/context_menu.gif)
-   [**Text Input (Modal)**](./examples/text_input.ts)
    -   ![](../resource/text_input.gif)

```ts
import { Types } from '../utils';

export default {
    process: (interaction: Types.IMessageComponent) => {
        interaction.reply({
            content: 'Hello, world!',
            ephemeral: true,
        });
    },
    command: null,
};
```
