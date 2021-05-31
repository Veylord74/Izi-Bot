const Command = require("./command");

module.exports = class Setup extends Command {
    static match(message) {
        return message.content.startsWith("!setup");
    }

    static action(message) {
        let args = message.content.split(" ");
        args.shift();
    }
};
