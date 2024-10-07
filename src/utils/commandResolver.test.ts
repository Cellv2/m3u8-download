import commandExists from "command-exists-promise";
import { isFfmpegAvailable } from "./commandResolver";

const mockedCommandExists = <jest.Mock<typeof commandExists>>(
    (<unknown>jest.mocked("command-exists-promise"))
);

describe("ffmpegResolver", () => {
    it("should return true if ffmpeg is available on the system", async () => {
        mockedCommandExists.mockImplementationOnce(() => {
            return function commandExists(command: any) {
                return Promise.resolve(true);
            };
        });

        const result = isFfmpegAvailable();

        await expect(result).resolves.toBe(true);
    });

    it("should return false if ffmpeg is not available on the system", async () => {
        mockedCommandExists.mockImplementationOnce(() => {
            return function commandExists(command: any) {
                return Promise.resolve(false);
            };
        });

        const result = isFfmpegAvailable();

        await expect(result).resolves.toBe(false);
    });

    it("should reject with an error if the command resolver errors", async () => {
        mockedCommandExists.mockImplementationOnce(() => {
            return function commandExists(command: any) {
                return Promise.reject();
            };
        });

        const result = isFfmpegAvailable();

        await expect(result).rejects.toThrow(
            TypeError("Unable to determine whether command exists on system")
        );
    });
});
