import * as extractors from "./extractors";

describe(extractors.extractM3u8Urls, () => {
    const extractM3u8UrlsSpy = jest.spyOn(extractors, "extractM3u8Urls");

    afterEach(() => extractM3u8UrlsSpy.mockClear());

    it("should return an array pf all .m3u8 URLs", () => {
        const fileContent = [
            "#EXTM3U",
            "#EXT-X-VERSION:6",
            "#EXT-X-STREAM-INF:BANDWIDTH=3440800,RESOLUTION=1920x1080,FRAME-RATE=30.000",
            "video/1080/stream.m3u8",
            "#EXT-X-STREAM-INF:BANDWIDTH=1790800,RESOLUTION=1280x720,FRAME-RATE=30.000",
            "video/720/stream.m3u8",
            "#EXT-X-STREAM-INF:BANDWIDTH=1240800,RESOLUTION=854x480,FRAME-RATE=30.000",
            "video/480/stream.m3u8",
        ].join("\n");

        const expected = [
            "video/1080/stream.m3u8",
            "video/720/stream.m3u8",
            "video/480/stream.m3u8",
        ];

        const result = extractors.extractM3u8Urls(fileContent);

        expect(result).toStrictEqual(expected);
        expect(extractM3u8UrlsSpy).toHaveBeenCalledTimes(1);
        expect(extractM3u8UrlsSpy).toHaveBeenCalledWith(fileContent);
    });

    it("should return an empty array if no .m3u8 URLs are found", () => {
        const fileContent = "";

        const expected: string[] = [];

        const result = extractors.extractM3u8Urls(fileContent);

        expect(result).toStrictEqual(expected);
        expect(extractM3u8UrlsSpy).toHaveBeenCalledTimes(1);
        expect(extractM3u8UrlsSpy).toHaveBeenCalledWith(fileContent);
    });
});

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
