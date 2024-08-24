import express from "express";
import { Server } from "http";
import path from "path";

const app = express();

app.use(
    express.static(path.join(__dirname, "../../../data/tests/hls-content"))
);

// command to generate m3u8:
// ffmpeg -i ../test.mp4  -c:a libmp3lame -ar 48000 -ab 64k  -c:v libx264 -b:v 128k -flags -global_header -map 0 -f segment -segment_list test.m3u8 -segment_time 2 -segment_format mpegts segment_%05d.ts
export const m3u8FilePath = path.join(
    __dirname,
    "../../../data/tests/hls-content/test.m3u8"
);
app.get("/m3u8", (req, res) => {
    res.sendFile(m3u8FilePath);
});

export const videoFilePath = path.join(__dirname, "../../../data/tests/test.mp4");
app.get("/video", (req, res) => {
    res.sendFile(videoFilePath);
});

export const indexFilePath = path.join(__dirname, "../../../data/tests/index.html");
app.get("/", (req, res) => {
    res.sendFile(indexFilePath);
});

let server: Server | null;

export const startServer = (port: number = 3000) => {
    server = app.listen(port);
};

export const stopServer = () => {
    server?.close();
};
