import { Bot, session } from "grammy";
import { mainScene } from "./scenes/mainScene/scene.js";
import {
    deletePhotoId,
    getPhotoIds,
    savePhotoId,
} from "./utils/photoStorage.js";

const bot = new Bot(process.env.BOT_TOKEN);

bot.use(
    session({
        initial: () => ({
            step: 1,
        }),
    }),
);

// check if user is owner
bot.use(async (ctx, next) => {
    if (ctx?.from?.id == process.env.OWNER_ID) {
        await next();
    }
});

bot.command("start", async (ctx) => await mainScene(ctx));

bot.on("message:photo", async (ctx) => {
    const photoId = ctx.message.photo.at(-1).file_id;
    savePhotoId(photoId);

    let countPosts = Math.floor(getPhotoIds().length / 10);

    for (let i = 0; i < countPosts; i++) {
        const sendPhotoIds = getPhotoIds()
            .slice(0, getPhotoIds().length > 10 ? 10 : undefined)
            .map((photoId) => ({ type: "photo", media: photoId }));
        
        console.log(sendPhotoIds)

        sendPhotoIds.forEach((photoId) => {
            deletePhotoId(photoId.media);
        });

        sendPhotoIds.length != 0 &&
            (await bot.api.sendMediaGroup(
                process.env.TARGET_CHANNEL_ID,
                sendPhotoIds,
            ));
    }

    ctx.reply("media is saved");
});

bot.on("message");

export default bot;
