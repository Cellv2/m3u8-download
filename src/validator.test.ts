import { m3u8FilePath, videoFilePath } from "./__tests__/setup/express";
import { M3U8_CONTENT_TYPE } from "./constants/content-type.consts";
import { M3U8_FILE_EXTENSION } from "./constants/file-exts.consts";
import { downloadFile } from "./download-file";

import * as validator from "./validator"
const { validateFileisM3u8, validateResponseHasM3u8ContentType } = validator

import crypto from 'crypto'

jest.mock("./download-file");
const mockedDownloadFile = downloadFile as jest.MockedFunction<
    typeof downloadFile
>;

describe("validateisM3u8", () => {
    const validFilePath = m3u8FilePath;
    const invalidFilePath = crypto.randomBytes(16).toString("hex");
    const validateFileisM3u8Spy = jest.spyOn(validator, "validateFileisM3u8")

    afterEach(() => {
        validateFileisM3u8Spy.mockReset()
    })

    it("should return true if input file is a valid m3u8", async () => {
        // const expectedFileExtension = M3U8_FILE_EXTENSION;
        // const fileExtRegex = new RegExp(`^.*${expectedFileExtension}$`, "i");

        // mockedDownloadFile.mockResolvedValue(m3u8FilePath);
        // const downloadedFile = mockedDownloadFile("http://localhost:3000/m3u8");
        // await expect(downloadedFile).resolves.toMatch(fileExtRegex);

        // mockedDownloadFile.mockRejectedValue(videoFilePath);
        // const downloadedFileWrong = mockedDownloadFile(
        //     "http://localhost:3000/video"
        // );
        // await expect(downloadedFileWrong).rejects.not.toMatch(fileExtRegex);


        const isM3u8 = await validateFileisM3u8(validFilePath);
        expect(isM3u8).toBe(true);

        expect(validateFileisM3u8Spy).toHaveBeenCalledTimes(1);
        expect(validateFileisM3u8Spy).toHaveBeenCalledWith(validFilePath);
    });

    it("should return false if the input file is not a valid m3u8", () => {
        expect("").toBe({});
    })

    it("should throw if the input file is not on disk", async () => {
        mockedDownloadFile.mockRejectedValue(videoFilePath);
        const downloadedFileWrong = mockedDownloadFile(
            "http://localhost:3000/video"
        );

        expect("").toBe({});
    });
});

describe("validateIsM3u8ContentType", () => {
    it("should check the content type is valid", () => {
        const fakeResponse: Response = {
            headers: new Headers(),
            ok: false,
            redirected: false,
            status: 0,
            statusText: "",
            type: "basic",
            url: "",
            clone: function (): Response {
                throw new Error("Function not implemented.");
            },
            body: null,
            bodyUsed: false,
            arrayBuffer: function (): Promise<ArrayBuffer> {
                throw new Error("Function not implemented.");
            },
            blob: function (): Promise<Blob> {
                throw new Error("Function not implemented.");
            },
            formData: function (): Promise<FormData> {
                throw new Error("Function not implemented.");
            },
            json: function (): Promise<any> {
                throw new Error("Function not implemented.");
            },
            text: function (): Promise<string> {
                throw new Error("Function not implemented.");
            },
        };
        fakeResponse.headers.set("Content-Type", M3U8_CONTENT_TYPE);

        const hasCorrectContentType =
            validateResponseHasM3u8ContentType(fakeResponse);

        expect(hasCorrectContentType).toBe(true);
    });
});
