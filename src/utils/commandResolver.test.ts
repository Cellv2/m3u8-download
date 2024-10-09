import commandExists from "command-exists-promise";
import * as commandResolver from "./commandResolver";

const mockedCommandExists = <jest.Mock<typeof commandExists>>(
    (<unknown>jest.mocked("command-exists-promise"))
);

describe(commandResolver.isCommandAvailable, () => {
    it("should return true if no args are passed and ffmpeg is available on the system", async () => {
        mockedCommandExists.mockImplementationOnce(() => {
            return function commandExists(command: any) {
                return Promise.resolve(true);
            };
        });

        const result = commandResolver.isCommandAvailable();

        await expect(result).resolves.toBe(true);
    });

    it("should return false if no args are passed and ffmpeg is not available on the system", async () => {
        mockedCommandExists.mockImplementationOnce(() => {
            return function commandExists(command: any) {
                return Promise.resolve(false);
            };
        });

        const result = commandResolver.isCommandAvailable();

        await expect(result).resolves.toBe(false);
    });

    it("should return true if command arg is passed and command is available on the system", async () => {
        const command = "iDoubtThisCommandExists";

        mockedCommandExists.mockImplementationOnce(() => {
            return function commandExists(command: any) {
                return Promise.resolve(true);
            };
        });

        const result = commandResolver.isCommandAvailable(command);

        await expect(result).resolves.toBe(true);
    });

    it("should return false if command arg is passed but command is not available on the system", async () => {
        const command = "iDoubtThisCommandExists";

        mockedCommandExists.mockImplementationOnce(() => {
            return function commandExists(command: any) {
                return Promise.resolve(false);
            };
        });

        const result = commandResolver.isCommandAvailable(command);

        await expect(result).resolves.toBe(false);
    });

    it("should reject with an error if the command resolver errors", async () => {
        mockedCommandExists.mockImplementationOnce(() => {
            return function commandExists(command: any) {
                return Promise.reject();
            };
        });

        const result = commandResolver.isCommandAvailable();

        await expect(result).rejects.toThrow(
            TypeError("Unable to determine whether command exists on system")
        );
    });
});
