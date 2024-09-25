import fs from "fs";
import { server } from "./__mocks__/node";
import { m3u8FilePath } from "./__tests__/setup/express";
import * as downloader from "./downloader";

describe(downloader.downloader, () => {
    beforeAll(() => server.listen());
    afterAll(() => server.close());

    afterEach(() => downloaderSpy.mockClear());

    const downloaderSpy = jest.spyOn(downloader, "downloader");

    it("should download the correct m3u8 at the link provided", async () => {
        const downloaded = await downloader.downloader(
            `http://localhost:3000/m3u8`
        );

        const fileAsBuffer = await fs.promises.readFile(m3u8FilePath);
        expect(fileAsBuffer.equals(downloaded));
    });

    it("should throw if the link is invalid", async () => {
        const url = "wrong";
        const downloadedFunc = downloader.downloader(url);

        await expect(downloadedFunc).rejects.toThrow(
            TypeError(`Failed to parse URL from ${url}`)
        );
    });

    it("should reject if response is not ok", async () => {
        const url = "http://error500/";
        const statusText = "500 Internal Server Error";
        const response = downloader.downloader("http://error500/");

        await expect(response).rejects.toBe(
            `Received ${statusText} when trying to fetch ${url}`
        );
        expect(downloaderSpy).toHaveBeenCalledTimes(1);
    });

    it("should reject on network error", async () => {
        const response = downloader.downloader("http://this-errors/");

        await expect(response).rejects.toBe(`Failed to fetch`);
        expect(downloaderSpy).toHaveBeenCalledTimes(1);
    });
});
