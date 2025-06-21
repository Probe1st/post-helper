import { Context } from "grammy";

/**
 * Ответ на команду /start
 * @param {Context} ctx
 */
export async function mainScene(ctx) {
    try {

        const message = `
            Добро пожаловать в post-helper!
        `;

        const replyConfig = [
            message
        ];

        ctx.update.callback_query
            ? await ctx.editMessageText(...replyConfig)
            : await ctx.reply(...replyConfig);
    } catch (e) {
        console.error(e);
    }
}