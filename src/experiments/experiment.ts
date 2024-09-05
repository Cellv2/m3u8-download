import fs from "fs";
import fsPromises from "fs/promises";
import readline from "readline";

// export async function checkHelloSync(filePath: string) {
//     const fd = await fsPromises.open(filePath, "r");
//     const { buffer, bytesRead} = await fd.read(Buffer.alloc(5), 0, 5, 0)
//     await fd.close()

//     return bytesRead === 5 && buffer.toString("utf8") === "hello";

// }

export const checkHelloSync = async (filePath: string) => {
    try {
        const readableStream = fs.createReadStream(filePath, {
            encoding: "utf-8",
        });
        const reader = readline.createInterface({
            input: readableStream,
            crlfDelay: Infinity,
        });

        console.log(filePath)

        for await (const line of reader) {
            reader.close();
            readableStream.close();

            return line;
        }

        return null;
    } catch (error: unknown) {
        if (!(error instanceof Error)) {
            throw error;
        }

        throw new Error(error.message);
    }

    // const fd = await fsPromises.open(filePath, "r");
    // const { buffer, bytesRead} = await fd.read(Buffer.alloc(5), 0, 5, 0)
    // await fd.close()

    // return bytesRead === 5 && buffer.toString("utf8") === "hello";
};
