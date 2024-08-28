import fs from "fs";
import path from "path";

describe("express server", () => {
    it("gives 20X when requesting root page", async () => {
        const response = await fetch("http://localhost:3000");

        expect(response.ok).toBe(true);
    });

    it("serves the correct root page content", async () => {
        const response = await fetch("http://localhost:3000");
        const responseContent = await response.text();

        const indexPath = path.join(
            __dirname,
            "../../../data/tests/index.html"
        );
        const indexContent = await fs.promises.readFile(indexPath, "utf-8");

        expect(responseContent).toEqual(indexContent);
    });

    it("serves the correct m3u8 when m3u8 path is hit", async () => {
        const response = await fetch("http://localhost:3000/m3u8");
        const responseAsBuffer = Buffer.from(await response.arrayBuffer());

        const localM3u8Path = path.join(
            __dirname,
            "../../../data/tests/hls-content/test.m3u8"
        );
        const localArrBuffer = await fs.promises.readFile(localM3u8Path);

        expect(responseAsBuffer.equals(localArrBuffer)).toBe(true);
    });

    it("serves the correct mp4 when video path is hit", async () => {
        const response = await fetch("http://localhost:3000/video");
        const responseAsBuffer = Buffer.from(await response.arrayBuffer());

        const localMp4Path = path.join(
            __dirname,
            "../../../data/tests/test.mp4"
        );
        const localArrBuffer = await fs.promises.readFile(localMp4Path);

        expect(responseAsBuffer.equals(localArrBuffer)).toBe(true);
    });
});
