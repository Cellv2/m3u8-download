import Stream from "stream";
import { M3U8_CONTENT_TYPE } from "./constants/content-type.consts";
import { M3U8_FILE_EXTENSION } from "./constants/file-exts.consts";
import fs, { read } from "fs";
// import readline from 'readline/promises'
import readline from "readline";

// TODO: remove null
// TODO: check for 0 length file
export const validateFileisM3u8 = async (
    filePath: string
): Promise<boolean | null> => {
    try {
        // TODO: is this reliable? can we not use readline for this?
        const firstLineRegex = new RegExp("^.*");
        const lastLineRegex = new RegExp(".*$");

        const fileContent = await fs.promises.readFile(filePath, "utf-8");
        // const contentFirstLine = fileContent.match(firstLineRegex)?.[0]
        // if (contentFirstLine !== "#EXTM3U") {
        //     console.log("first line was false")
        //     return false;
        // }

        // // TODO: this hates newlines on the m3u8
        // const contentLastLine = fileContent.match(lastLineRegex)?.[0].trimEnd()
        // console.log("last line: ", contentLastLine)
        // if (contentLastLine !== "#EXT-X-ENDLIST") {
        //     console.log("last line was false")
        //     return false;
        // }

        // first line
        const firstLine = await getFirstLineFromFile(filePath);
        if (firstLine !== "#EXTM3U") {
            return false;
        }

        // last line
        const lastLine = await getLastLineFromFile(filePath);
        if (lastLine !== "#EXT-X-ENDLIST") {
            return false;
        }

        return true;
    } catch (error: unknown) {
        console.error("panic");
    }

    return null;
};

// TODO: not seeing anything awaited here, do we need the /promises version?
export const getFirstLineFromFile = async (
    filePath: string
): Promise<string | null> => {
    try {
        const readableStream = fs.createReadStream(filePath, {
            encoding: "utf-8",
        });
        const reader = readline.createInterface({
            input: readableStream,
            crlfDelay: Infinity,
        });

        for await (const line of reader) {
            reader.close();
            readableStream.close();

            return line;
        }

        return null;
    } catch (err) {
        console.error(err);
        return null;
    }
};
// export const getFirstLineFromFile = async (filePath: string) => {
//     const readable = fs.createReadStream(filePath);
//     const reader = readline.createInterface({ input: readable });
//     const line = await new Promise((resolve) => {
//       reader.on('line', (line) => {
//         reader.close();
//         resolve(line);
//       });
//     });
//     readable.close();
//     return line;
// }

export const getLastLineFromFile = async (
    filePath: string
): Promise<string | null> => {
    try {
        let line: string | null = null;

        const readableStream = fs.createReadStream(filePath, {
            encoding: "utf-8",
        });
        const reader = readline.createInterface({
            input: readableStream,
            crlfDelay: Infinity,
        });

        for await (const input of reader) {
            line = input;
        }

        reader.close();
        readableStream.close();

        return line;
    } catch (err: unknown) {
        console.error(err);
        return null;
    }
};

export const validateResponseHasM3u8ContentType = (res: Response): boolean => {
    const responseHasCorrectContentType =
        res.headers.get("content-type") === M3U8_CONTENT_TYPE;
    return responseHasCorrectContentType;
};
