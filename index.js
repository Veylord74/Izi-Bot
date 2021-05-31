const Discord = require("discord.js");
// const Clear = require("./commands/clear");
const Ping = require("./commands/ping");
require("dotenv").config();

const client = new Discord.Client();
const source_id = "738858508174360607";
const dest_id = "846778904676401203";
const delay = 600;

client.on("ready", () => {
    client.user.setUsername("Izi Bot");
    client.user.setActivity("www.izicookz.com");
    console.log("Izi Bot is up and running !");
});

client.on("message", (message) => {
    if (message.author.bot) return;
    let commandUsed =
        // Clear.parse(message) ||
        Ping.parse(message);
    if (!commandUsed) {
        repost(message);
    }
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
            console.log("Reposted message");
        }, delay * 1000);
    }
}

client.login(process.env.DISCORD_TOKEN);
