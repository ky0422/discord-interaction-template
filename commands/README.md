> 한국어 문서: [**README_kr.md**](README_kr.md)

> **Command file name and, command name must match.**

> **In `dev_guild` mode, the command name is automatically converted to `dev_(name)`.**

> **Do not include `dev_` in the `command file` or `command name`.**
>
> The corresponding indication is required for testing in `dev_guild`.

> [`index.ts#L11`](https://github.com/tsukiroku/discord-interaction-template/blob/main/index.ts#L11)

# Command template

## [**Button**](./examples/button.ts)

<img src="../resource/button.gif" width="512px" />

<br />

## [**Select Menu**](./examples/select_menu.ts)

<img src="../resource/select_menu.gif" width="512px" />

<br />

## [**Context Menu**](./examples/context_menu.ts)

<img src="../resource/context_menu.gif" width="512px" />

<br />

## [**Text Input (Modal)**](./examples/text_input.ts)

<img src="../resource/text_input.gif" width="512px" />

<br />

## [**Simple regex game (feat. `createMessageCollector` Example)**](./examples/regex.ts)

<img src="../resource/regex_game.gif" width="512px" />

<br />

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
