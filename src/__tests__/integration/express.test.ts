import fs from "fs";
import path from "path";
import {
    m3u8ChainedFilePath,
    m3u8FilePath,
    videoFilePath,
} from "../setup/express";

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

        const localArrBuffer = await fs.promises.readFile(m3u8FilePath);

        expect(responseAsBuffer.equals(localArrBuffer)).toBe(true);
    });

    it("serves the correct m3u8 when the m3u8-chained path is hit", async () => {
        const response = await fetch("http://localhost:3000/m3u8-chained");
        const responseAsBuffer = Buffer.from(await response.arrayBuffer());

        const localArrBuffer = await fs.promises.readFile(m3u8ChainedFilePath);

        expect(responseAsBuffer.equals(localArrBuffer)).toBe(true);
    });

    it("serves the correct mp4 when video path is hit", async () => {
        const response = await fetch("http://localhost:3000/video");
        const responseAsBuffer = Buffer.from(await response.arrayBuffer());

        const localArrBuffer = await fs.promises.readFile(videoFilePath);

        expect(responseAsBuffer.equals(localArrBuffer)).toBe(true);
    });
});
