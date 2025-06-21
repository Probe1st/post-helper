import bot from "./src/bot.js";
import { createPhotoIdsStorage, deletePhotoId, getPhotoIds, getPhotoIdsCount, savePhotoId } from "./src/utils/photoStorage.js";

createPhotoIdsStorage();

bot.start();
