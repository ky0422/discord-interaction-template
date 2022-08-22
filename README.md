# Discord interaction template (TypeScript) (v14)

**EN | [KO](README_kr.md)**

<br>

> **_The source code requires 'basic knowledge' of TypeScript or JavaScript (Node.js)._**
>
> ignoring this, we do not answer questions about basic problems or problems that can be solved through **Googling**.

<br>

> **Note**
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

### config

> **Note:**
>
> If you have not configured `dev_guild`, it will be registered in **global commands**.
>
> _**It may take up to an hour to register global commands.**_

```ts
import { GatewayIntentBits } from 'discord.js'
import { Types } from './utils'

const defaultAs = <T>(data: T) => data

export default defaultAs<Types.Config>({
    token: process.env.TOKEN, // Discord bot token
    clientId: process.env.CLIENT_ID, // Discord bot client id
    devGuild: process.env.DEV_GUILD, // Discord guild id for development (production only)
    ownerId: process.env.OWNER_ID, // Discord owner id
    path: {
        path: 'commands/examples', // path to commands (default 'commands')
        defaultPath: 'default.js', // default command (default 'default.js')
    },
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent], // Discord intents (Some intents need to enable in the Discord developer portal)
})
```

# Command

> See [**commands**](./commands/README.md).
