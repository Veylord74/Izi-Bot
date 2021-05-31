const Command = require("./command");

module.exports = class Repost extends Command {
    static match(message) {
        return message.content.startsWith("!repost");
    }

    static action(message) {
        let args = message.content.split(" ");
        args.shift();
    }
};
