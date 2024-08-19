import fs from "fs";
import path from "path";
import { startServer, stopServer } from "../setup/express";

beforeAll(() => {
    startServer();
});

afterAll(() => {
    stopServer();
});

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

    it("serves the correct m3u8 when mp4 path is hit", async () => {})

    it("serves the correct mp4 when mp4 path is hit", async () => {})
});
