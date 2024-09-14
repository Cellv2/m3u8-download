// https://stackoverflow.com/questions/68574598/how-to-download-video-with-m3u8-extention-by-nodejs

// https://datatracker.ietf.org/doc/html/rfc8216

// so it seems that ffmpeg accepts an URL to download...........
// don't need to go through all of this!
// https://stackoverflow.com/questions/47233304/how-to-download-m3u8-in-once-time
// ffmpeg -i "https://your-url/videos/the-video.m3u8" -codec copy file.mp4

export const extractTsUrls = (fileContent: string): string[] => {
    const lines = fileContent.split("\n");
    const tsUrls = lines.filter((line) => line.endsWith(".ts"));

    return tsUrls;
};
