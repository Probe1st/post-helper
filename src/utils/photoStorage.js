import {
    mkdirSync,
    writeFileSync,
    existsSync,
    appendFileSync,
    readFileSync,
    WriteStream,
} from "fs";

const dbPath = "./db";
const photoStorageIdPath = dbPath + "/photoIdStorage.txt";

/**
 *
 * @param {string} photoId
 */
export function savePhotoId(photoId) {
    appendFileSync(photoStorageIdPath, photoId + "\n");
}

export function getPhotoIds() {
    const file = readFileSync(photoStorageIdPath, { encoding: "ascii" });

    return file.trim().split("\n");
}

export function getPhotoIdsCount() {
    const file = readFileSync(photoStorageIdPath, { encoding: "ascii" });

    return file.trim().split("\n").length;
}

export function deletePhotoId(photoId) {
    const file = readFileSync(photoStorageIdPath, { encoding: "ascii" });

    const updatedFile = file.replace(photoId + "\n", "");

    writeFileSync(photoStorageIdPath, updatedFile);
}

export function createPhotoIdsStorage() {
    if (!existsSync(dbPath)) {
        mkdirSync(dbPath, (err) => err && console.error(err));
    }

    if (!existsSync(photoStorageIdPath)) {
        writeFileSync(
            photoStorageIdPath,
            "",
            (err) => err && console.error(err),
        );
    }
}
