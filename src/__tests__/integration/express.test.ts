import fs from "fs";
import path from "path";
import request from "supertest";
import {
    app,
    m3u8ChainedFilePath,
    m3u8FilePath,
    videoFilePath,
} from "../setup/express";

describe("[integration] express server", () => {
    it("gives 20X when requesting root page", async () => {
        const response = await request(app).get("/");

        expect(response.ok).toBe(true);
    });

    it("serves the correct root page content", async () => {
        const response = await request(app).get("/");
        const responseContent = response.text;

        const indexPath = path.join(
            __dirname,
            "../../../data/tests/index.html"
        );
        const expected = await fs.promises.readFile(indexPath, "utf-8");

        expect(responseContent).toEqual(expected);
    });

    it("serves the correct m3u8 when m3u8 path is hit", async () => {
        const response = await request(app).get("/m3u8");
        const responseAsBuffer = Buffer.from(response.text);

        const expected = await fs.promises.readFile(m3u8FilePath);

        expect(responseAsBuffer.equals(expected)).toBe(true);
    });

    it("serves the correct m3u8 when the m3u8-chained path is hit", async () => {
        const response = await request(app).get("/m3u8-chained");
        const responseAsBuffer = Buffer.from(response.text);

        const expected = await fs.promises.readFile(m3u8ChainedFilePath);

        expect(responseAsBuffer.equals(expected)).toBe(true);
    });

    it("serves the correct mp4 when video path is hit", async () => {
        const response = await request(app).get("/video");
        const responseAsBuffer = Buffer.from(response.body);

        const expected = await fs.promises.readFile(videoFilePath);

        expect(responseAsBuffer.equals(expected)).toBe(true);
    });
});
