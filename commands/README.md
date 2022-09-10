**EN | [KO](README_kr.md)**

<br>

> **Command file name and, command name must match.**

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
import { Types } from '../utils'

export default {
    process: (interaction: Types.IMessageComponent) => {
        interaction.reply({
            content: 'Hello, world!',
            ephemeral: true,
        })
    },
    command: null,
}
```
