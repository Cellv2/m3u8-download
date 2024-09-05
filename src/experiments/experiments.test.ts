// import fsPromises from 'fs/promises'
// import { checkHelloSync } from "./experiment";
import * as experiment from "./experiment";

// import fs from 'fs'
import { fs, vol } from "memfs";

jest.mock("fs");
jest.mock("fs/promises");

describe(experiment.checkHelloSync, () => {
    const spy = jest.spyOn(experiment, "checkHelloSync")

    beforeEach(() => {
        spy.mockClear()
        vol.reset();
    });

    it("should return true if file starts with hello", async () => {
        const filePath = "/file.txt";
        const word = "hello"
        // await fs.promises.writeFile(filePath, "666hello");
        await fs.promises.writeFile(filePath, word);

        const result = await experiment.checkHelloSync(filePath);
        // expect(result).toBe(true);
        expect(result).toBe(word);
        expect(result).not.toBe(word);
        expect(spy).toHaveBeenCalledTimes(1)
    });
});
