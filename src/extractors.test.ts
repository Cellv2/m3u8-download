import * as extractors from "./extractors";

describe(extractors.extractTsUrls, () => {
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

    it("should return an array of all .ts relative URLs", () => {
        const result = extractors.extractTsUrls(m3u8FileContent);

        expect(result).toBe(["segment_00000.ts", "segment_00001.ts"]);
    });
});

describe(extractors.extractM3u8Urls, () => {
    xit("should ...", () => {});
});

describe(extractors.extractLines, () => {
    xit("should ...", () => {});
});

describe(extractors.extractKeyUrls, () => {
    xit("should ...", () => {});
});
