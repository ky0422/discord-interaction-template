> **명령어 파일과 명령어 이름은 일치해야 합니다.**

> **설정 파일에서 `dev_guild`가 존재할 경우 (이하, 개발 모드), 자동으로 `dev_(명령어)`로 변환됩니다.**

> **명령어 파일과 명령어 이름에 `dev_`가 포함되어있으면 안 됩니다.**
>
> (개발 모드에서 테스트를 진행하기 위함)

> [`index.ts#L11`](https://github.com/tsukiroku/discord-interaction-template/blob/main/index.ts#L11)

# 명령어 예제

> [**버튼**](#button)
>
> [**선택 메뉴**](#select-menu)
>
> [**컨텍스트 메뉴**](#context-menu)
>
> [**텍스트 인풋 (모달)**](#text-input)

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

> **소스 코드**: [button.ts](./examples/button.ts)

<br>

# Select Menu

![](../resource/select_menu.gif)

> **소스 코드**: [select_menu.ts](./examples/select_menu.ts)

<br>

# Context Menu

![](../resource/context_menu.gif)

> **소스 코드**: [context_menu.ts](./examples/context_menu.ts)

<br>

# Text Input

![](../resource/text_input.gif)

> **소스 코드**: [text_input.ts](./examples/text_input.ts)
