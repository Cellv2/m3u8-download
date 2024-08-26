import fs from "fs";
import {
    m3u8FilePath,
    startServer,
    stopServer,
} from "./__tests__/setup/express";
import { downloader } from "./downloader";

beforeAll(() => {
    startServer();
});

afterAll(() => {
    stopServer();
});

describe("downloader", () => {
    it("should download the correct m3u8 at the link provided", async () => {
        const downloaded = await downloader(`http://localhost:3000/m3u8`);

        const fileAsBuffer = await fs.promises.readFile(m3u8FilePath);
        expect(fileAsBuffer.equals(downloaded));
    });

    it("should throw if the link is invalid", async () => {
        const url = "wrong";
        const downloadedFunc = downloader(url);

        await expect(downloadedFunc).rejects.toThrow(
            TypeError(`Failed to parse URL from ${url}`)
        );
    });
});
