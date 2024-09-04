import fs from "fs";
import readline from "readline";

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
    } catch (error: unknown) {
        if (!(error instanceof Error)) {
            throw error;
        }

        throw new Error(error.message);
    }
};
