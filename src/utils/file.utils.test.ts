import * as fileUtils from "./file.utils";
import { vol, fs } from "memfs";

describe("getFirstLineFromFile", () => {
    const getFirstLineFromFileSpy = jest.spyOn(
        fileUtils,
        "getFirstLineFromFile"
    );

    afterEach(() => {
        getFirstLineFromFileSpy.mockClear();
        vol.reset();
    });

    it("should return only the first line in the file", async () => {
        const filePath = "/validFile.txt";
        const firstLine = "This is line one";
        const secondLine = "ThisIsLineTwo";
        await fs.promises.writeFile(
            filePath,
            `${firstLine}

            ${secondLine}`
        );

        const x = fileUtils.getFirstLineFromFile(filePath);

        expect(getFirstLineFromFileSpy).toHaveBeenCalledTimes(1);
        await expect(x).resolves.toBe(firstLine);
        await expect(x).resolves.not.toBe(secondLine);
    });

    it("should return null if there is nothing in the file", () => {});

    it("should throw an error if the file cannot be found", () => {});

    it("should throw an error if the file cannot be read", () => {});
});
