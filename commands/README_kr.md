> **명령어 파일과 명령어 이름은 일치해야 합니다.**

> **설정 파일에서 `dev_guild`가 존재할 경우 (이하, 개발 모드), 자동으로 `dev_(명령어)`로 변환됩니다.**

> **명령어 파일과 명령어 이름에 `dev_`가 포함되어있으면 안 됩니다.**
>
> (개발 모드에서 테스트를 진행하기 위함)

> [`index.ts#L11`](https://github.com/tsukiroku/discord-interaction-template/blob/main/index.ts#L11)

# 명령어 예제

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
