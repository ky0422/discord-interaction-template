# 디스코드 인터렉션 템플릿 (타입스크립트) (v13)

> `discord.js@v14`가 곧 릴리즈됩니다. `v14`가 릴리즈될 때까지 기다려주시거나, `v13`으로 계속 사용하셔도 됩니다.

<br>

> **해당 소스코드는 타입스크립트에 대한 기초적인 지식을 가지고 있다는 한에 사용하실 수 있습니다.**
>
> 기초적인 문제나, **구글링**(**또는 문서 참조**)를 통해 해결 가능한 문제를 질문할 경우, 대답해드릴 수 없습니다.

<br>

> **참고:**
>
> `Node.js`: `v16.15.0 (stable)`, `v18.2.0 (latest)` 환경에서 테스트
>
> `TypeScript`: `v4.7.2`
>
> 다른 의존성(패키지)는 [**dependencies**](#의존성)를 참고해주세요.

---

```
npm i
```

> [`config.ts`](#config)를 수정하신 뒤, 아래의 명령어를 입력해주세요.

```sh
npm run build
npm run start # 자동으로 빌드됩니다.
```

---

### 의존성 (dependencies)

```json
"dependencies": {
    "@discordjs/rest": "^0.4.1",
    "@types/uuid": "^8.3.4",         // optional
    "colors": "^1.4.0",              // for Logger
    "discord-api-types": "^0.33.0",
    "discord.js": "^13.8.0",
    "typescript": "^4.7.2",
    "uuid": "^8.3.2"                 // optional
}
```

---

### 설정

> **참고:**
>
> `dev_guild`를 설정하지 않으면 (`undefined`), 명령어가 전역 명령어로 등록됩니다.
>
> _**전역 명령어가 등록되기까지 최대 1시간 이상 걸릴 수 있습니다.**_

```ts
import { Intents, IntentsString } from 'discord.js';

export interface Config {
    token: string;
    client_id: string;
    dev_guild?: string;
    owner_id: string;
    intents: Array<IntentsString | number>;
}

export default {
    token: process.env.TOKEN,
    client_id: process.env.CLIENT_ID,
    dev_guild: process.env.DEV_GUILD,
    owner_id: process.env.OWNER_ID,
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
} as Config;
```

# 명령어

> [**commands**](./commands/README_kr.md)를 참조해주세요.
