import { startServer, stopServer } from "./express";

beforeAll(() => {
    startServer();
});

afterAll(() => {
    stopServer();
});

describe("express server", () => {
    it("serves the correct root page content", async () => {
        const response = await fetch("http://localhost:3000");

        expect(response.ok).toBe(true);
    });
});
