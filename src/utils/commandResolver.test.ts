import commandExists from 'command-exists-promise'

const mockedCommandExists = <jest.Mock<typeof commandExists>><unknown>jest.mocked("command-exists-promise")


describe("ffmpegResolver", () => {
    it("should return true if ffmpeg is available on the system", async () => {
        mockedCommandExists.mockImplementationOnce(() => {
            return function commandExists(command: any) { return Promise.resolve(false) };
        });

        // const result = await isFfmpegAvailable();

    });

    it("should return false if ffmpeg is not available on the system", () => {
        mockedCommandExists.mockImplementationOnce(() => {
            return function commandExists(command: any) { return Promise.resolve(false) };
        });
    })

    it("should reject with an error if the command resolver errors", () => {
        mockedCommandExists.mockImplementationOnce(() => {
            return function commandExists(command: any) { return Promise.reject() };
        });

    })
})
