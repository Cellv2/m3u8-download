import Stream from "stream";
import { M3U8_CONTENT_TYPE } from "./constants/content-type.consts";
import { M3U8_FILE_EXTENSION } from "./constants/file-exts.consts";
import fs, { read } from 'fs'
import readline from 'readline/promises'

// TODO: remove null
// TODO: check for 0 length file
export const validateFileisM3u8 = async (filePath: string): Promise<boolean | null> => {
    try {
        // first line
        const firstLine = getFirstLineFromFile(filePath);
        if (firstLine !== "#M3U") {
            return false
        }

        // last line
        const lastLine = await getLastLineFromFile(filePath);
        console.log(lastLine)
        if (lastLine !== "#EXT-X-ENDLIST") {
            return false
        }

        return true


    } catch (error: unknown) {

    }

    return null;
};

// TODO: not seeing anything awaited here, do we need the /promises version?
export const getFirstLineFromFile = (filePath: string): string | null => {
    try {

        const readableStream = fs.createReadStream(filePath, {encoding: "utf-8"});
        // const outputStream = new Stream.Writable
        // const reader = readline.createInterface(readableStream, outputStream)
        const reader = readline.createInterface(readableStream)

        let line: string | null = null;

        reader.on("line", (input) => {
            line = input

            // exit out on the first line
            reader.close()
        })



        return line;
    } catch (err) {
        console.error(err)
        return null
    }

}

export const getLastLineFromFile = async (filePath: string): Promise<string | null> => {
    const readableStream = fs.createReadStream(filePath, {encoding: "utf-8"});
    // const outputStream = new Stream.Writable
    // const reader = readline.createInterface(readableStream, outputStream)
    const reader = readline.createInterface(readableStream)

    let lastLine: string | null = null;

    // reader.on("line", (input) => {
    //     lastLine = input
    // })

    // reader.close()

    for await (const line of reader) {
        // Each line in input.txt will be successively available here as `line`.
        // console.log(`Line from file: ${line}`);
        lastLine = line
      }

      reader.close()

    return lastLine;
 }

export const validateResponseHasM3u8ContentType = (res: Response): boolean => {
    const responseHasCorrectContentType = res.headers.get("content-type") === M3U8_CONTENT_TYPE
    return responseHasCorrectContentType
}
