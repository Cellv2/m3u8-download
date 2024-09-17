import crypto from "crypto";
import { createFakeResponse } from "./__fakes__/fake-response";
import { blankM3u8FilePath, m3u8FilePath } from "./__tests__/setup/express";
import { M3U8_CONTENT_TYPE } from "./constants/content-type.consts";
import * as validator from "./validator";

describe("validateisM3u8", () => {
    const validFilePath = m3u8FilePath;
    const blankFilePath = blankM3u8FilePath;
    const invalidFilePath = crypto.randomBytes(16).toString("hex");
    const validateFileisM3u8Spy = jest.spyOn(validator, "validateFileisM3u8");

    afterEach(() => {
        validateFileisM3u8Spy.mockClear();
    });

    it("should return true if input file is a valid m3u8", async () => {
        const isM3u8 = validator.validateFileisM3u8(validFilePath);
        await expect(isM3u8).resolves.toBe(true);

        expect(validateFileisM3u8Spy).toHaveBeenCalledTimes(1);
        expect(validateFileisM3u8Spy).toHaveBeenCalledWith(validFilePath);
        expect(validateFileisM3u8Spy).not.toHaveBeenCalledWith(blankFilePath);
        expect(validateFileisM3u8Spy).not.toHaveBeenCalledWith(invalidFilePath);
    });

    it("should return false if the input file is not a valid m3u8", async () => {
        const isNotM3u8 = validator.validateFileisM3u8(blankFilePath);
        await expect(isNotM3u8).resolves.toBe(false);

        expect(validateFileisM3u8Spy).toHaveBeenCalledTimes(1);
        expect(validateFileisM3u8Spy).not.toHaveBeenCalledWith(validFilePath);
        expect(validateFileisM3u8Spy).toHaveBeenCalledWith(blankFilePath);
        expect(validateFileisM3u8Spy).not.toHaveBeenCalledWith(invalidFilePath);
    });

    it("should throw if the input file is not on disk", async () => {
        const invalidFilePathCheck =
            validator.validateFileisM3u8(invalidFilePath);
        const message = `ENOENT: no such file or directory, open '${invalidFilePath}'`;

        await expect(invalidFilePathCheck).rejects.toThrow(Error(`${message}`));

        expect(validateFileisM3u8Spy).toHaveBeenCalledTimes(1);
        expect(validateFileisM3u8Spy).not.toHaveBeenCalledWith(validFilePath);
        expect(validateFileisM3u8Spy).not.toHaveBeenCalledWith(blankFilePath);
        expect(validateFileisM3u8Spy).toHaveBeenCalledWith(invalidFilePath);
    });
});

describe("validateIsM3u8ContentType", () => {
    const validateResponseContentTypeSpy = jest.spyOn(
        validator,
        "validateResponseHasM3u8ContentType"
    );

    it("should check the content type is valid", () => {
        const fakeResponse = createFakeResponse();
        fakeResponse.headers.set("Content-Type", M3U8_CONTENT_TYPE);

        const hasCorrectContentType =
            validator.validateResponseHasM3u8ContentType(fakeResponse);

        expect(hasCorrectContentType).toBe(true);

        expect(validateResponseContentTypeSpy).toHaveBeenCalledTimes(1);
        expect(validateResponseContentTypeSpy).toHaveBeenCalledWith(
            fakeResponse
        );
    });
});
