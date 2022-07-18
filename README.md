# Discord interaction template (TypeScript) (v13)

> 한국어 문서: [**README_kr.md**](README_kr.md)

> **`discord.js` will be upgraded to `v14` soon. Unless you plan to use `v13`, wait until `v14` is released.**

<br>

> **_The source code requires 'basic knowledge' of TypeScript._**
>
> ignoring this, we do not answer questions about basic problems or problems that can be solved through **Googling**.

<br>

> **Note:**
>
> `Node.js`: `v16.15.0 (stable)`, test on `v18.2.0 (latest)`
>
> `TypeScript`: `v4.7.2`
>
> For other dependencies, see [**dependencies**](#dependencies)

---

```
npm i
```

> After completing the setting in the [`config.ts`](#config), use the following command.

```sh
npm run build
npm run start # build automatically
```

---

### dependencies

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

### config

> **Note:**
>
> If you have not configured `dev_guild`, it will be registered in **global commands**.
>
> _**It may take up to an hour to register global commands.**_

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

# Command

> See [**commands**](./commands/README.md).

---

**License: [**MIT License**](LICENSE)**
