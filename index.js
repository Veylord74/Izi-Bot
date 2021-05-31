const Discord = require("discord.js");
const config = require("./config.json");
const Clear = require("./commands/clear");
const Ping = require("./commands/ping");
const Setup = require("./commands/setup");
require('dotenv').config();

const client = new Discord.Client();
const source_id = "848559124286799892";
const dest_id = "848559311348564018";
const delay = 600;

client.on("ready", () => {
    client.user.setUsername("Izi Bot");
    client.user.setActivity("www.izicookz.com");
    console.log("Izi Bot is up and running !");
});

client.on("message", (message) => {
    let commandUsed =
        Clear.parse(message) || Ping.parse(message) || Setup.parse(message);
    repost(message);
});

function repost(message) {
    let destination = client.channels.cache.get(dest_id);
    let urls = new Array();
    if (message.channel.id === source_id) {
        if (message.attachments) {
            message.attachments.forEach((attachment) => {
                urls.push(attachment.proxyURL);
            });
        }
        setTimeout(() => {
            destination.send(message.content, {
                files: urls,
            });
        }, delay * 1000);
    }
}

client.login(process.env.DISCORD_TOKEN);
