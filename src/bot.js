const { Bot } = require("grammy");


const bot = new Bot(process.env.BOT_TOKEN);

bot.use(
    session({
        initial: () => ({
            step: 1,
        }),
    })
);

bot.command("start", async ctx => await mainScene(ctx));

bot.on("message");

export default bot;
