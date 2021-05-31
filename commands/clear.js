const Command = require("./command");

module.exports = class Clear extends Command {
    static match(message) {
        return message.content.startsWith("!clear");
    }

    static async action(message) {
        let args = message.content.split(" ");
        let amount;
        args.shift();
        if (!args[0])
            return message.reply(
                "Please specify the amount of messages to clear."
            );
        else if (isNaN(args[0]))
            return message.reply("**" + args[0] + "** is not a number.");
        else if (args[0] > 100)
            return message.reply(
                "The amount of messages to clear is limited to 100."
            );
        else if (args[0] < 1)
            return message.reply(
                "The amount of messages to clear should be at least one."
            );
        else {
            amount = parseInt(args[0]) + 1;
            await message.channel.messages
                .fetch({ limit: amount })
                .then((messages) => {
                    message.channel.bulkDelete(messages);
                });
        }
    }
};
