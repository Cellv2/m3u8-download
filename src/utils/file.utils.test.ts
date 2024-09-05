import { fs } from "memfs";
import * as fileUtils from "./file.utils";

jest.mock("fs");
jest.mock("fs/promises");

describe("getFirstLineFromFile", () => {
    const getFirstLineFromFileSpy = jest.spyOn(
        fileUtils,
        "getFirstLineFromFile"
    );

    beforeEach(() => {
        getFirstLineFromFileSpy.mockClear();
    });

    afterEach(() => {
        // why don't I need this? it dies in fire with it?
        // vol.reset()
    });

    it("should return only the first line in the file", async () => {
        const filePath = "/valid.txt";
        const firstLine = "This is line one";
        const secondLine = "ThisIsLineTwo";

        await fs.promises.writeFile(filePath, `${firstLine}\r\n${secondLine}`);
        console.log(
            await fs.promises.readFile(filePath, { encoding: "utf-8" })
        );

        const resultPromise = fileUtils.getFirstLineFromFile(filePath);

        expect(getFirstLineFromFileSpy).toHaveBeenCalledTimes(1);
        await expect(resultPromise).resolves.toBe(firstLine);
        await expect(resultPromise).resolves.not.toBe(secondLine);
    });

    it("should return null if there is nothing in the file", () => {});

    it("should throw an error if the file cannot be found", () => {});

    it("should throw an error if the file cannot be read", () => {});
});
