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

     })

});
