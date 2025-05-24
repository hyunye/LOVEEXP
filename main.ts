import { Client, GatewayIntentBits, Collection, REST, Routes } from 'discord.js'
import { token, clientId, guildId } from './config.json'
import fs from 'node:fs'

// 계정
const client = new Client({ intents: [
    GatewayIntentBits.Guilds
]})

// 이벤트
const eventFolder = fs.readdirSync('./event')
for (let file of eventFolder) {
    const event = require(`./event/${file}`)
    if (!('event' in event)) continue
    if (event.once) client.once(event.event, (...args) => event.script(...args))
    else client.on(event.event, (...args) => event.script(...args))
    console.log(`${event.event} 불러오기 성공! [ event/${file} ]`)
}

// 커멘드
const commands = []
client.commands = new Collection()
const commandFolder = fs.readdirSync('./command')
for (let folder of commandFolder) {
    const commandFiles = fs.readdirSync(`./command/${folder}`).filter((e) => e.endsWith('.js'))
    for (let file of commandFiles) {
        const command = require(`./command/${folder}/${file}`)
        if (!('command' in command && 'script' in command)) continue
        commands.push(command.command.toJSON())
        client.commands.set(command.command.name, command)
        console.log(`${command.command.name} 불러오기 성공! [ command/${folder}/${file} ]`)
    }
}
const rest = new REST().setToken(token)
rest.put(
    Routes.applicationGuildCommands(clientId, guildId),
    { body: commands }
)

client.login(token)