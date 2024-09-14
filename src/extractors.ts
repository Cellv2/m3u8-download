// https://stackoverflow.com/questions/68574598/how-to-download-video-with-m3u8-extention-by-nodejs

// https://datatracker.ietf.org/doc/html/rfc8216

export const extractTsUrls = (fileContent: string): string[] => {
    const lines = fileContent.split("\n");
    const tsUrls = lines.filter((line) => line.endsWith(".ts"));

    return tsUrls;
};
