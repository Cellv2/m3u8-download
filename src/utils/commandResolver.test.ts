import commandExists from "command-exists-promise";
import * as commandResolver from "./commandResolver";

jest.mock("command-exists-promise");
const mockedCommandExists = jest.mocked(commandExists);

describe(commandResolver.isCommandAvailable, () => {
    it("should return true if no args are passed and ffmpeg is available on the system", async () => {
        mockedCommandExists.mockImplementationOnce(() => Promise.resolve(true));

        const result = commandResolver.isCommandAvailable();

        await expect(result).resolves.toBe(true);
    });

    it("should return false if no args are passed and ffmpeg is not available on the system", async () => {
        mockedCommandExists.mockImplementationOnce(() =>
            Promise.resolve(false)
        );

        const result = commandResolver.isCommandAvailable();

        await expect(result).resolves.toBe(false);
    });

    it("should return true if command arg is passed and command is available on the system", async () => {
        const command = "iDoubtThisCommandExists";

        mockedCommandExists.mockImplementationOnce(() => Promise.resolve(true));

        const result = commandResolver.isCommandAvailable(command);

        await expect(result).resolves.toBe(true);
    });

    it("should return false if command arg is passed but command is not available on the system", async () => {
        const command = "iDoubtThisCommandExists";

        mockedCommandExists.mockImplementationOnce(() =>
            Promise.resolve(false)
        );

        const result = commandResolver.isCommandAvailable(command);

        await expect(result).resolves.toBe(false);
    });

    it("should reject with an error if the command resolver errors", async () => {
        const someFileSystemError = Error("There was a fs error");

        mockedCommandExists.mockImplementationOnce(() =>
            Promise.reject(someFileSystemError)
        );

        const result = commandResolver.isCommandAvailable();

        await expect(result).rejects.toBe(someFileSystemError);
    });
});
