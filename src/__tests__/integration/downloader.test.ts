import { m3u8Path } from "../setup/express";

describe("downloader", () => {
    it("should validate that the link is a m3u8 file", () => {});

    it("should download the correct m3u8 at the link provided", async () => {
        // download(url: string)
        const downloaded = Buffer.from("");

        const response = await fetch(m3u8Path);
        const responseAsBuffer = Buffer.from(await response.arrayBuffer());

        expect(responseAsBuffer.equals(downloaded));
    });

    it("should download all relevant mpegts files from the m3u8", () => {});
});
