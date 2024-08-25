import fs from "fs";
import {
    m3u8FilePath,
    startServer,
    stopServer,
} from "./__tests__/setup/express";
import { M3U8_FILE_EXTENSION } from "./constants/file-exts.consts";
import { downloader, downloadFile } from "./downloader";

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

describe("downloadFile", () => {
    it("should download all relevant mpegts files from the m3u8", () => {});
});

describe("validator", () => {
    it("should validate that the input file is a valid m3u8", async () => {
        const expectedFileExtension = M3U8_FILE_EXTENSION;

        const downloadedFile = downloadFile("http://localhost:3000/m3u8");

        // expect(downloadedFile.endsWith(expectedFileExtension)).toBe(true)
        const fileExtRegex = `/^.*${expectedFileExtension}$/i`;
        await expect(downloadedFile).resolves.toMatch(fileExtRegex);
        await expect(downloadedFile).rejects.not.toMatch(fileExtRegex);
    });

    it("should throw if the input file is not a valid m3u8", () => {});
});
