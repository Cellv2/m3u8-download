import * as extractors from "./extractors";

describe(extractors.extractTsUrls, () => {
    const extractTsUrlsSpy = jest.spyOn(extractors, "extractTsUrls");

    afterEach(() => extractTsUrlsSpy.mockClear());

    it("should return an array of all .ts relative URLs", () => {
        const m3u8FileContent = [
            "#EXTM3U",
            "#EXT-X-VERSION:3",
            "#EXT-X-MEDIA-SEQUENCE:0",
            "#EXT-X-ALLOW-CACHE:YES",
            "#EXT-X-TARGETDURATION:9",
            "#EXTINF:8.400000,",
            "segment_00000.ts",
            "#EXTINF:1.533333,",
            "segment_00001.ts",
            "#EXT-X-ENDLIST",
        ].join("\n");

        const expected = ["segment_00000.ts", "segment_00001.ts"];

        const result = extractors.extractTsUrls(m3u8FileContent);

        expect(result).toStrictEqual(expected);
        expect(extractTsUrlsSpy).toHaveBeenCalledTimes(1);
        expect(extractTsUrlsSpy).toHaveBeenCalledWith(m3u8FileContent);
    });

    it("should return an empty array if no .ts URLs are found", () => {
        const m3u8FileContent = "";

        const expected: string[] = [];

        const result = extractors.extractTsUrls(m3u8FileContent);

        expect(result).toStrictEqual(expected);
        expect(extractTsUrlsSpy).toHaveBeenCalledTimes(1);
        expect(extractTsUrlsSpy).toHaveBeenCalledWith(m3u8FileContent);
    });
});
