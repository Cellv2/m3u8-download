import { m3u8FilePath, videoFilePath } from "./__tests__/setup/express";
import { M3U8_FILE_EXTENSION } from "./constants/file-exts.consts";
import { downloadFile } from "./download-file";
import { validateisM3u8 } from "./validator";

jest.mock("./download-file");
const mockedDownloadFile = downloadFile as jest.MockedFunction<
    typeof downloadFile
>;

describe("validator", () => {
    it("should validate that the input file is a valid m3u8", async () => {
        const expectedFileExtension = M3U8_FILE_EXTENSION;
        const fileExtRegex = new RegExp(`^.*${expectedFileExtension}$`, "i");

        mockedDownloadFile.mockResolvedValue(m3u8FilePath);
        const downloadedFile = mockedDownloadFile("http://localhost:3000/m3u8");
        await expect(downloadedFile).resolves.toMatch(fileExtRegex);

        mockedDownloadFile.mockRejectedValue(videoFilePath);
        const downloadedFileWrong = mockedDownloadFile(
            "http://localhost:3000/video"
        );
        await expect(downloadedFileWrong).rejects.not.toMatch(fileExtRegex);

        const isM3u8 = await validateisM3u8(await downloadedFile);
        expect(isM3u8).toBe(true);

        expect(validateisM3u8).toHaveBeenCalledTimes(1);
        expect(validateisM3u8).toHaveBeenCalledWith(downloadedFile);
    });

    it("should throw if the input file is not a valid m3u8", () => {});
});
