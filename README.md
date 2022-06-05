## Installation

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```

## Usage/Examples

Create .env file

```bash
  touch .env
```

Add this to the file

```text
TOKEN=yourtoken
```

## Config

Path : `./config.exemple.json` - Duplicate and rename it `config.json`

````json
{
  "prefix": "$",
  "embed": {
    "color": "#4D6FFF"
  },
  "channelMessageJoin": "CHANNEL_ID",
  "channelMessageLeave": "CHANNEL_ID",
  "roles": [
    {
      "label": "Role 1",
      "description": "Add role 1",
      "value": "ROLE_ID"
    },
    {
      "label": "Role 2",
      "description": "Add role 2",
      "value": "ROLE_ID_2"
    },
    {
      "label": "Role 2",
      "description": "Add role 3",
      "value": "ROLE_ID_3"
    }
  ],
  "botStatusMessage": "the devs."
}
````


| Key | Description                                                    | Default | Required                     |
|---|----------------------------------------------------------------|------|------------------------------|
| prefix | This is the prefix of the bot.                                 | `$` | `True`                       |
| color | The color of the embeds.                                       | `#4D6FFF` | `True`                       |
| roles | This is only for the system of roles (with menu).              | None | `True if you use this system.` |
|  |                                                                |    |  |
| roles[].label | The name of the options.                                       | None | `True`                       |
| roles[].description | The description of the options.                                | None | `True`                         |
| roles[].value | Need to be an id role, only.                                   | None | `True`                         |
|  |                                                                |    |  |
| channelMessageJoin | Need to be an id of a channel (when the user join the server)  | None | `True`                         |
| channelMessageLeave | Need to be an id of a channel (when the user leave the server) | None | `True`                         |
| botStatusMessage | Discord status of your bot                                     | None | `True`                         |



